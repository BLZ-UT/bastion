export interface NewsItem {
  title: string
  link: string
  source: string | null
  pubDate: string | null
}

const FEED_TTL_MS = 5 * 60_000
const FETCH_TIMEOUT_MS = 4_500

const feedCache = new Map<string, { data: NewsItem[]; expires: number }>()

function decodeEntities(str: string): string {
  return str
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function parseRssItems(xml: string, limit: number): NewsItem[] {
  const items: NewsItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match: RegExpExecArray | null

  while (items.length < limit && (match = itemRegex.exec(xml))) {
    const block = match[1]
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
    const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]

    if (title && link) {
      items.push({
        title: decodeEntities(title),
        link: decodeEntities(link),
        source: source ? decodeEntities(source) : null,
        pubDate: pubDate ? pubDate.trim() : null,
      })
    }
  }

  return items
}

/** Live headlines via Google News RSS — no API key required. Used to keep the
 *  editorial Insights section company with something that's actually refreshing. */
export async function getSectorNews(query: string, limit = 5): Promise<NewsItem[]> {
  const cached = feedCache.get(query)
  if (cached && cached.expires > Date.now()) return cached.data

  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' })
    clearTimeout(timer)

    if (!res.ok) return cached?.data ?? []

    const xml = await res.text()
    const items = parseRssItems(xml, limit)
    feedCache.set(query, { data: items, expires: Date.now() + FEED_TTL_MS })
    return items
  } catch {
    return cached?.data ?? []
  }
}
