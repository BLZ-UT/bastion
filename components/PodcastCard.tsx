import { Clock, Mic } from 'lucide-react'
import { Episode } from '@/data/podcasts'
import { sectorConfig } from '@/data/companies'
import { cn } from '@/lib/utils'

interface Props {
  episode: Episode
  featured?: boolean
}

export default function PodcastCard({ episode, featured }: Props) {
  const sector = episode.sector !== 'cross-sector' ? sectorConfig[episode.sector] : null

  return (
    <div
      className={cn(
        'group border border-border bg-bg-surface hover:bg-bg-elevated hover:border-border-bright transition-all duration-200 panel-bevel',
        featured ? 'p-6' : 'p-5'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Show-notes indicator — these curated episodes are written summaries, not
            recorded audio, so this is deliberately not a play button. */}
        <div className="flex-shrink-0 w-12 h-12 border border-border-bright bg-bg-elevated flex items-center justify-center">
          <Mic className="w-4 h-4 text-txt-muted" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-txt-dim">EP {episode.episodeNumber}</span>
            {sector && (
              <span
                className="text-xs font-mono font-semibold px-1.5 py-0.5 border-l-2"
                style={{ color: sector.color, backgroundColor: `${sector.color}1a`, borderColor: sector.color }}
              >
                {sector.label}
              </span>
            )}
            {episode.sector === 'cross-sector' && (
              <span className="text-xs font-mono font-semibold px-1.5 py-0.5 border-l-2 border-accent text-accent bg-accent/10">
                Cross-Sector
              </span>
            )}
            <div className="flex items-center gap-1 ml-auto text-txt-muted">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-mono">{episode.duration}</span>
            </div>
          </div>

          <h3
            className={cn(
              'font-display font-semibold text-txt-primary group-hover:text-white transition-colors leading-snug mb-1',
              featured ? 'text-base' : 'text-sm'
            )}
          >
            {episode.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <Mic className="w-3 h-3 text-txt-muted flex-shrink-0" />
            <span className="text-xs text-txt-muted">
              {episode.guest}
              <span className="text-txt-dim"> · {episode.guestTitle}</span>
            </span>
          </div>

          {featured && (
            <p className="text-sm text-txt-secondary leading-relaxed line-clamp-2 mb-3">
              {episode.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-txt-dim">{episode.date}</span>
            <div className="flex flex-wrap gap-1">
              {episode.topics.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono text-txt-dim bg-bg-base border border-border px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
