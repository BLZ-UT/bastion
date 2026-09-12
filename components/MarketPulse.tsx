import { Radio, ExternalLink } from 'lucide-react'
import { getSectorNews } from '@/lib/newsFeed'
import { timeAgo } from '@/lib/utils'
import Rivets from '@/components/Rivets'

interface Props {
  query: string
  title?: string
  limit?: number
}

/** Server component — fetches live headlines at request time so this panel is
 *  never stuck on stale copy the way the static build used to be. */
export default async function MarketPulse({ query, title = 'Market Pulse', limit = 5 }: Props) {
  const items = await getSectorNews(query, limit)

  if (items.length === 0) return null

  return (
    <div className="border border-border bg-bg-surface panel-bevel relative overflow-hidden">
      <Rivets />
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
        <Radio className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-txt-primary">
          {title}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-up">
          <span className="live-dot" />
          Live feed
        </span>
      </div>
      <ul className="divide-y divide-border/60">
        {items.map((item, i) => (
          <li key={`${item.link}-${i}`}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-start gap-3 px-5 py-3 hover:bg-bg-elevated transition-colors"
            >
              <span className="text-xs font-mono text-txt-dim mt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm text-txt-secondary group-hover:text-txt-primary transition-colors leading-snug">
                  {item.title}
                </span>
                <span className="flex items-center gap-2 mt-1 text-[11px] font-mono text-txt-dim">
                  {item.source && <span>{item.source}</span>}
                  {item.pubDate && <span>· {timeAgo(item.pubDate)}</span>}
                </span>
              </span>
              <ExternalLink className="w-3 h-3 text-txt-dim group-hover:text-accent flex-shrink-0 mt-1 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
