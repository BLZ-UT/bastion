import { sectorConfig } from '@/data/companies'
import { getLivePodcastEpisodes, LiveEpisode } from '@/lib/podcastFeed'
import LivePodcastCard from '@/components/LivePodcastCard'
import { Mic, Headphones } from 'lucide-react'
import Rivets from '@/components/Rivets'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Podcast — infraAnalysis' }

function dedupe(episodes: LiveEpisode[]): LiveEpisode[] {
  const seen = new Set<string>()
  return episodes.filter((ep) => {
    if (seen.has(ep.link)) return false
    seen.add(ep.link)
    return true
  })
}

export default async function PodcastPage() {
  const sectors = Object.values(sectorConfig)

  const [featured, ...bySector] = await Promise.all([
    getLivePodcastEpisodes('critical infrastructure founder investor podcast', 4),
    ...sectors.map((sector) =>
      getLivePodcastEpisodes(`${sector.label} infrastructure founder investor podcast`, 4)
    ),
  ])

  const sectorEpisodes = sectors.map((sector, i) => ({ sector, episodes: bySector[i] }))
  const allEpisodes = dedupe([...featured, ...bySector.flat()]).slice(0, 12)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-accent opacity-60" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Audio
          </span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary uppercase tracking-wide mb-3">
              Podcast
            </h1>
            <p className="text-base text-txt-secondary max-w-2xl leading-relaxed">
              Real conversations with founders, operators, investors, and policymakers building and
              financing the infrastructure of tomorrow — pulled live from public podcast search and
              playable right here.
            </p>
          </div>
          {/* Subscribe button */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-border bg-bg-surface text-txt-secondary text-sm hover:border-border-bright hover:text-txt-primary transition-all cursor-pointer flex-shrink-0 mt-2">
            <Headphones className="w-4 h-4" />
            Subscribe
          </div>
        </div>
      </div>

      {/* Sector filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-mono cursor-pointer">
          All
        </span>
        {sectors.map((sector) => (
          <span
            key={sector.id}
            className="px-3 py-1.5 rounded-full border border-border text-txt-muted text-xs font-mono cursor-pointer hover:border-border-bright hover:text-txt-secondary transition-colors"
          >
            {sector.label}
          </span>
        ))}
      </div>

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
      {allEpisodes.length > 0 && (
        <div className="mb-14">
          <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
            All Episodes
          </h2>
          <div className="space-y-3">
            {allEpisodes.map((ep, i) => {
              const match = sectorEpisodes.find((s) => s.episodes.some((e) => e.link === ep.link))
              return (
                <LivePodcastCard
                  key={`${ep.link}-${i}`}
                  episode={ep}
                  sectorLabel={match?.sector.label}
                  sectorColor={match?.sector.color}
                  featured
                />
              )
            })}
          </div>
        </div>
      )}

      {allEpisodes.length === 0 && (
        <div className="mb-14 border border-border bg-bg-surface p-8 text-center panel-bevel">
          <p className="text-sm text-txt-muted">
            The live podcast feed is temporarily unavailable. Check back shortly.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 border border-border bg-bg-surface p-8 text-center relative panel-bevel">
        <Rivets />
        <Mic className="w-8 h-8 text-txt-muted mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-txt-primary uppercase tracking-wide mb-2">
          Know someone we should talk to?
        </h3>
        <p className="text-txt-secondary text-sm mb-6 max-w-md mx-auto">
          We're always looking for founders, operators, and thinkers working at the frontier of
          critical infrastructure. Reach out.
        </p>
        <a
          href="mailto:podcast@infraanalysis.io"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-bg-elevated text-txt-secondary text-sm hover:border-accent/50 hover:text-txt-primary transition-all"
        >
          Get in touch
        </a>
      </div>
    </div>
  )
}
