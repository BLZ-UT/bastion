import { Company } from '@/data/companies'

export interface LiveQuote {
  price: number | null
  return1D: number | null
  return1M: number | null
  return3M: number | null
  return1Y: number | null
  fromHigh: number | null
  asOf: string | null
  live: boolean
}

export interface LiveCompany extends Company {
  price: number | null
  asOf: string | null
  isLive: boolean
}

const QUOTE_TTL_MS = 60_000
const FETCH_TIMEOUT_MS = 6_000
const BATCH_SIZE = 8

const quoteCache = new Map<string, { data: LiveQuote; expires: number }>()

const BROWSER_HEADERS: HeadersInit = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/json,text/plain,*/*',
  'Accept-Language': 'en-US,en;q=0.9',
}

function deadQuote(): LiveQuote {
  return {
    price: null,
    return1D: null,
    return1M: null,
    return3M: null,
    return1Y: null,
    fromHigh: null,
    asOf: null,
    live: false,
  }
}

async function fetchWithTimeout(url: string, headers?: HeadersInit): Promise<Response | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store', headers })
    clearTimeout(timer)
    return res.ok ? res : null
  } catch {
    return null
  }
}

type DailyRow = { date: string; close: number }

/** Primary source: Stooq's free daily-history CSV (Date,Open,High,Low,Close,Volume). */
async function fetchFromStooq(ticker: string): Promise<DailyRow[] | null> {
  const symbol = `${ticker.toLowerCase()}.us`
  const url = `https://stooq.com/q/d/l/?s=${symbol}&i=d`
  const res = await fetchWithTimeout(url, BROWSER_HEADERS)
  if (!res) return null

  const text = await res.text()
  if (!text || text.startsWith('N/D') || /exceeded/i.test(text) || /<html/i.test(text)) return null

  const lines = text.trim().split('\n')
  if (lines.length < 3) return null

  const rows = lines
    .slice(1)
    .map((line) => {
      const cols = line.split(',')
      return { date: cols[0], close: parseFloat(cols[4]) }
    })
    .filter((r) => r.date && Number.isFinite(r.close))

  return rows.length > 0 ? rows : null
}

/** Fallback source: Yahoo Finance's public chart endpoint. Used when Stooq is
 *  unreachable or blocked (both are unofficial, keyless feeds — having two
 *  independent providers makes the "live" data meaningfully more reliable). */
async function fetchFromYahoo(ticker: string): Promise<DailyRow[] | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1y&interval=1d`
  const res = await fetchWithTimeout(url, BROWSER_HEADERS)
  if (!res) return null

  try {
    const json = await res.json()
    const result = json?.chart?.result?.[0]
    const timestamps: number[] | undefined = result?.timestamp
    const closes: (number | null)[] | undefined = result?.indicators?.quote?.[0]?.close
    if (!timestamps || !closes) return null

    const rows = timestamps
      .map((ts, i) => {
        const close = closes[i]
        if (close === null || close === undefined) return null
        const date = new Date(ts * 1000).toISOString().slice(0, 10)
        return { date, close }
      })
      .filter((r): r is DailyRow => r !== null)

    return rows.length > 0 ? rows : null
  } catch {
    return null
  }
}

async function fetchDailyHistory(ticker: string): Promise<DailyRow[] | null> {
  return (await fetchFromStooq(ticker)) ?? (await fetchFromYahoo(ticker))
}

function closeNTradingDaysAgo(rows: DailyRow[], n: number): number | null {
  const idx = rows.length - 1 - n
  return idx >= 0 ? rows[idx].close : null
}

function pctChange(current: number, base: number | null): number | null {
  if (base === null || base === 0) return null
  return ((current - base) / base) * 100
}

async function fetchLiveQuote(ticker: string): Promise<LiveQuote> {
  const rows = await fetchDailyHistory(ticker)
  if (!rows) return deadQuote()

  const last = rows[rows.length - 1]
  const prev = rows.length > 1 ? rows[rows.length - 2] : null
  const yearWindow = rows.slice(-252)
  const high52 = yearWindow.reduce((max, r) => Math.max(max, r.close), 0)

  return {
    price: last.close,
    return1D: prev ? pctChange(last.close, prev.close) : null,
    return1M: pctChange(last.close, closeNTradingDaysAgo(rows, 21)),
    return3M: pctChange(last.close, closeNTradingDaysAgo(rows, 63)),
    return1Y: pctChange(last.close, closeNTradingDaysAgo(rows, 252)),
    fromHigh: high52 > 0 ? pctChange(last.close, high52) : null,
    asOf: last.date,
    live: true,
  }
}

async function getQuote(ticker: string): Promise<LiveQuote> {
  const cached = quoteCache.get(ticker)
  if (cached && cached.expires > Date.now()) return cached.data

  const data = await fetchLiveQuote(ticker)
  quoteCache.set(ticker, { data, expires: Date.now() + QUOTE_TTL_MS })
  return data
}

async function getQuotes(tickers: string[]): Promise<Record<string, LiveQuote>> {
  const result: Record<string, LiveQuote> = {}
  for (let i = 0; i < tickers.length; i += BATCH_SIZE) {
    const batch = tickers.slice(i, i + BATCH_SIZE)
    const settled = await Promise.all(batch.map((t) => getQuote(t)))
    batch.forEach((t, j) => (result[t] = settled[j]))
  }
  return result
}

function mergeCompany(company: Company, quote: LiveQuote | undefined): LiveCompany {
  if (!quote || !quote.live) {
    return { ...company, price: null, asOf: null, isLive: false }
  }
  return {
    ...company,
    return1M: quote.return1M ?? company.return1M,
    return3M: quote.return3M ?? company.return3M,
    return1Y: quote.return1Y ?? company.return1Y,
    fromHigh: quote.fromHigh ?? company.fromHigh,
    price: quote.price,
    asOf: quote.asOf,
    isLive: true,
  }
}

/** Merge live quotes onto a set of companies. Falls back to the company's last-known
 *  static figures whenever the live feed can't be reached (rate limit, offline, etc). */
export async function withLiveQuotes(companies: Company[]): Promise<LiveCompany[]> {
  const quotes = await getQuotes(companies.map((c) => c.ticker))
  return companies.map((c) => mergeCompany(c, quotes[c.ticker]))
}

export interface SectorPerformance {
  oneMonth: number
  threeMonth: number
  oneYear: number
  ytd: number
  isLive: boolean
}

/** Equal-weighted sector return, computed live when quotes are available; YTD stays
 *  on the periodic baseline since it anchors to a fixed Jan 1 reference price we don't fetch. */
export function sectorPerformanceFrom(
  liveCompanies: LiveCompany[],
  baseline: { ytd: number; oneYear: number; threeMonth: number }
): SectorPerformance {
  const live = liveCompanies.filter((c) => c.isLive)
  const anyLive = live.length > 0
  const avg = (pick: (c: LiveCompany) => number) => {
    const pool = anyLive ? live : liveCompanies
    return pool.reduce((sum, c) => sum + pick(c), 0) / pool.length
  }

  return {
    oneMonth: avg((c) => c.return1M),
    threeMonth: anyLive ? avg((c) => c.return3M) : baseline.threeMonth,
    oneYear: anyLive ? avg((c) => c.return1Y) : baseline.oneYear,
    ytd: baseline.ytd,
    isLive: anyLive,
  }
}
