'use client'

import { useRef, useState } from 'react'
import { Clock, Mic, Play, Pause, ExternalLink } from 'lucide-react'
import { LiveEpisode } from '@/lib/podcastFeed'
import { cn, fmtDuration, timeAgo } from '@/lib/utils'

interface Props {
  episode: LiveEpisode
  sectorLabel?: string
  sectorColor?: string
  featured?: boolean
}

/** Same card layout the curated (non-playable) episodes used — kept because it
 *  read well — but wired to a real audio file, so the play button actually works. */
export default function LivePodcastCard({ episode, sectorLabel, sectorColor, featured }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => setIsPlaying(false))
    }
  }

  const canPlay = Boolean(episode.audioUrl)
  const duration = fmtDuration(episode.durationMs)

  return (
    <div
      className={cn(
        'group border border-border bg-bg-surface hover:bg-bg-elevated hover:border-border-bright transition-all duration-200 panel-bevel',
        featured ? 'p-6' : 'p-5'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Real play/pause control — this episode has an actual audio file. */}
        <button
          type="button"
          onClick={toggle}
          disabled={!canPlay}
          aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
          className={cn(
            'flex-shrink-0 w-12 h-12 border flex items-center justify-center transition-all',
            canPlay
              ? 'border-border-bright bg-bg-elevated hover:border-accent/60 hover:bg-accent/10 cursor-pointer'
              : 'border-border-bright bg-bg-elevated cursor-not-allowed opacity-60'
          )}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-accent" />
          ) : (
            <Play className="w-4 h-4 text-txt-secondary group-hover:text-accent transition-colors ml-0.5" />
          )}
        </button>
        {canPlay && (
          <audio
            ref={audioRef}
            src={episode.audioUrl ?? undefined}
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {sectorLabel && (
              <span
                className="text-xs font-mono font-semibold px-1.5 py-0.5 border-l-2"
                style={{ color: sectorColor, backgroundColor: `${sectorColor}1a`, borderColor: sectorColor }}
              >
                {sectorLabel}
              </span>
            )}
            {duration && (
              <div className="flex items-center gap-1 ml-auto text-txt-muted">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-mono">{duration}</span>
              </div>
            )}
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
            <span className="text-xs text-txt-muted">{episode.podcastName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-txt-dim">
              {episode.releaseDate ? timeAgo(episode.releaseDate) : ''}
            </span>
            <a
              href={episode.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1 text-xs font-mono text-txt-dim hover:text-accent transition-colors"
            >
              Episode page
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
