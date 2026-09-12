import { episodes } from '@/data/podcasts'
import { sectorConfig } from '@/data/companies'
import PodcastCard from '@/components/PodcastCard'
import LivePodcastFeed from '@/components/LivePodcastFeed'
import { Mic, Headphones } from 'lucide-react'
import Rivets from '@/components/Rivets'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Podcast — infraAnalysis' }

export default function PodcastPage() {
  const featured = episodes.filter((e) => e.featured)
  const sectors = Object.values(sectorConfig)

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
              Conversations with founders, operators, investors, and policymakers building and
              financing the infrastructure of tomorrow.
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
            {featured.map((ep) => (
              <PodcastCard key={ep.id} episode={ep} featured />
            ))}
          </div>
        </div>
      )}

      {/* All episodes */}
      <div className="mb-14">
        <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
          All Episodes
        </h2>
        <div className="space-y-3">
          {episodes.map((ep) => (
            <PodcastCard key={ep.id} episode={ep} featured />
          ))}
        </div>
      </div>

      {/* Live episode feed — new founder/investor conversations, pulled per sector */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-accent opacity-60" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">Live Feed</span>
        </div>
        <h2 className="font-display font-bold text-xl text-txt-primary uppercase tracking-wide mb-2">
          New From Founders &amp; Investors
        </h2>
        <p className="text-sm text-txt-secondary max-w-2xl leading-relaxed mb-6">
          Pulled live from public podcast search, grouped by sector, so this page keeps surfacing
          new founder- and investor-side conversations on critical infrastructure beyond our own
          curated episodes above.
        </p>

        <div className="mb-5">
          <LivePodcastFeed
            query="critical infrastructure founder investor podcast"
            title="Cross-Sector"
            limit={6}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sectors.map((sector) => (
            <LivePodcastFeed
              key={sector.id}
              query={`${sector.label} infrastructure founder investor podcast`}
              title={sector.label}
              limit={4}
            />
          ))}
        </div>
      </div>

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
