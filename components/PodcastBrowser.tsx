'use client'

import { useMemo, useState } from 'react'
import { LiveEpisode } from '@/lib/podcastFeed'
import LivePodcastCard from '@/components/LivePodcastCard'
import { cn } from '@/lib/utils'

interface SectorGroup {
  id: string
  label: string
  color: string
  episodes: LiveEpisode[]
}

interface Props {
  featured: LiveEpisode[]
  sectorGroups: SectorGroup[]
  allEpisodes: LiveEpisode[]
}

export default function PodcastBrowser({ featured, sectorGroups, allEpisodes }: Props) {
  const [activeSector, setActiveSector] = useState<string | null>(null)

  const activeGroup = useMemo(
    () => sectorGroups.find((g) => g.id === activeSector) ?? null,
    [sectorGroups, activeSector]
  )

  return (
    <div>
      {/* Sector filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          onClick={() => setActiveSector(null)}
          className={cn(
            'px-3 py-1.5 rounded-full border text-xs font-mono transition-colors',
            activeSector === null
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-border text-txt-muted hover:border-border-bright hover:text-txt-secondary'
          )}
        >
          All
        </button>
        {sectorGroups.map((sector) => (
          <button
            key={sector.id}
            type="button"
            onClick={() => setActiveSector(sector.id)}
            className={cn(
              'px-3 py-1.5 rounded-full border text-xs font-mono transition-colors',
              activeSector === sector.id
                ? 'text-accent'
                : 'border-border text-txt-muted hover:border-border-bright hover:text-txt-secondary'
            )}
            style={
              activeSector === sector.id
                ? { borderColor: `${sector.color}66`, backgroundColor: `${sector.color}1a`, color: sector.color }
                : undefined
            }
          >
            {sector.label}
          </button>
        ))}
      </div>

      {activeGroup ? (
        /* Single-sector view */
        <div className="mb-14">
          <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
            {activeGroup.label} Episodes
          </h2>
          {activeGroup.episodes.length > 0 ? (
            <div className="space-y-3">
              {activeGroup.episodes.map((ep, i) => (
                <LivePodcastCard
                  key={`${ep.link}-${i}`}
                  episode={ep}
                  sectorLabel={activeGroup.label}
                  sectorColor={activeGroup.color}
                  featured
                />
              ))}
            </div>
          ) : (
            <div className="border border-border bg-bg-surface p-8 text-center panel-bevel">
              <p className="text-sm text-txt-muted">
                No live {activeGroup.label} episodes right now. Check back shortly.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Featured episodes */}
          {featured.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
                Featured Episodes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {featured.map((ep, i) => (
                  <LivePodcastCard key={`${ep.link}-${i}`} episode={ep} featured />
                ))}
              </div>
            </div>
          )}

          {/* All episodes */}
          {allEpisodes.length > 0 ? (
            <div className="mb-14">
              <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
                All Episodes
              </h2>
              <div className="space-y-3">
                {allEpisodes.map((ep, i) => {
                  const match = sectorGroups.find((s) => s.episodes.some((e) => e.link === ep.link))
                  return (
                    <LivePodcastCard
                      key={`${ep.link}-${i}`}
                      episode={ep}
                      sectorLabel={match?.label}
                      sectorColor={match?.color}
                      featured
                    />
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="mb-14 border border-border bg-bg-surface p-8 text-center panel-bevel">
              <p className="text-sm text-txt-muted">
                The live podcast feed is temporarily unavailable. Check back shortly.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
