import { companies } from '@/data/companies'
import { withLiveQuotes } from '@/lib/marketData'
import { cn, fmtPct, perfColor } from '@/lib/utils'

export default async function TickerBar() {
  const live = await withLiveQuotes(companies)
  const tickers = [...live, ...live] // duplicate for seamless loop

  return (
    <div className="border-b border-border bg-bg-surface py-2 overflow-hidden marquee-container">
      <div className="flex animate-marquee gap-8 whitespace-nowrap">
        {tickers.map((c, i) => (
          <span key={`${c.id}-${i}`} className="flex items-center gap-2 text-xs font-mono">
            {c.isLive && <span className="live-dot" />}
            <span className="text-txt-muted">{c.ticker}</span>
            {c.price !== null && (
              <span className="text-txt-secondary">${c.price.toFixed(2)}</span>
            )}
            <span className={cn('font-semibold', perfColor(c.return1Y))}>
              {fmtPct(c.return1Y, true)}
            </span>
            <span className="text-txt-dim">1Y</span>
            <span className="text-border-bright mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
