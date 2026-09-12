import { sectorConfig } from '@/data/companies'
import { getLivePodcastEpisodes, LiveEpisode } from '@/lib/podcastFeed'
import PodcastBrowser from '@/components/PodcastBrowser'
import SubscribeButton from '@/components/SubscribeButton'
import { Mic } from 'lucide-react'
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

  const sectorGroups = sectors.map((sector, i) => ({
    id: sector.id,
    label: sector.label,
    color: sector.color,
    episodes: bySector[i],
  }))
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
          <SubscribeButton source="podcast" />
        </div>
      </div>

      <PodcastBrowser featured={featured} sectorGroups={sectorGroups} allEpisodes={allEpisodes} />

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
