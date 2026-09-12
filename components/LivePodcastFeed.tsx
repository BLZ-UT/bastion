import { Mic2, ExternalLink } from 'lucide-react'
import { getLivePodcastEpisodes } from '@/lib/podcastFeed'
import { fmtDuration, timeAgo } from '@/lib/utils'
import Rivets from '@/components/Rivets'

interface Props {
  query: string
  title: string
  limit?: number
}

/** Server component — pulls live podcast episodes so this section keeps surfacing
 *  new founder/investor conversations instead of only the curated back-catalog. */
export default async function LivePodcastFeed({ query, title, limit = 5 }: Props) {
  const episodes = await getLivePodcastEpisodes(query, limit)

  if (episodes.length === 0) return null

  return (
    <div className="border border-border bg-bg-surface panel-bevel relative overflow-hidden">
      <Rivets />
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
        <Mic2 className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-txt-primary">
          {title}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-up">
          <span className="live-dot" />
          Live feed
        </span>
      </div>
      <ul className="divide-y divide-border/60">
        {episodes.map((ep, i) => (
          <li key={`${ep.link}-${i}`}>
            <a
              href={ep.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-start gap-3 px-5 py-3 hover:bg-bg-elevated transition-colors"
            >
              <span className="text-xs font-mono text-txt-dim mt-0.5 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm text-txt-secondary group-hover:text-txt-primary transition-colors leading-snug">
                  {ep.title}
                </span>
                <span className="flex items-center gap-2 mt-1 text-[11px] font-mono text-txt-dim">
                  <span>{ep.podcastName}</span>
                  {fmtDuration(ep.durationMs) && <span>· {fmtDuration(ep.durationMs)}</span>}
                  {ep.releaseDate && <span>· {timeAgo(ep.releaseDate)}</span>}
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
