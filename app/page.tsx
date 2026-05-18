import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { companies, companiesBySector, sectorConfig } from '@/data/companies'
import { insights } from '@/data/insights'
import { episodes } from '@/data/podcasts'
import SectorIndexCard from '@/components/SectorIndexCard'
import InsightCard from '@/components/InsightCard'
import PodcastCard from '@/components/PodcastCard'
import TickerBar from '@/components/TickerBar'

export default function HomePage() {
  const sectors = Object.values(sectorConfig)
  const featuredInsights = insights.filter((i) => i.featured).slice(0, 3)
  const latestInsights = insights.slice(0, 4)
  const featuredEpisodes = episodes.filter((e) => e.featured).slice(0, 2)

  return (
    <>
      <TickerBar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
          style={{ maskImage: 'radial-gradient(ellipse at center top, black 30%, transparent 80%)' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/60 to-bg-base pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-accent opacity-60" />
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Infrastructure Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-txt-primary leading-tight mb-6">
              The Public Market Index for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-ai to-space">
                Critical Infrastructure
              </span>
            </h1>

            <p className="text-lg text-txt-secondary leading-relaxed mb-8 max-w-2xl">
              Track the companies building America's energy grid, defense systems, AI compute layer,
              space economy, and cyber defenses — with interactive comps tables, sector performance
              indexes, original research, and conversations with founders and operators.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/indexes"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 hover:border-accent/50 transition-all"
              >
                Explore Indexes
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/insights"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-bg-surface border border-border text-txt-secondary text-sm font-medium hover:bg-bg-elevated hover:text-txt-primary hover:border-border-bright transition-all"
              >
                Read Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-border bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-border">
            {[
              { label: 'Tracked Companies', value: companies.length.toString() },
              { label: 'Sectors Covered', value: '5' },
              { label: 'Insights Published', value: insights.length.toString() },
              { label: 'Podcast Episodes', value: episodes.length.toString() },
            ].map(({ label, value }) => (
              <div key={label} className="pl-6 first:pl-0">
                <div className="text-xl font-display font-bold text-txt-primary tabular-nums">{value}</div>
                <div className="text-xs font-mono text-txt-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sector Indexes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-2">
              Public Markets
            </p>
            <h2 className="font-display font-bold text-2xl text-txt-primary">
              Sector Indexes
            </h2>
          </div>
          <Link
            href="/indexes"
            className="flex items-center gap-1.5 text-sm text-txt-secondary hover:text-txt-primary transition-colors"
          >
            All indexes
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sectors.map((sector) => (
            <SectorIndexCard
              key={sector.id}
              sector={sector}
              companyCount={companiesBySector(sector.id).length}
            />
          ))}
        </div>
      </section>

      {/* Insights + Podcast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Insights */}
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-1">
                  Research
                </p>
                <h2 className="font-display font-bold text-xl text-txt-primary">Latest Insights</h2>
              </div>
              <Link
                href="/insights"
                className="flex items-center gap-1.5 text-sm text-txt-secondary hover:text-txt-primary transition-colors"
              >
                All insights
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>

          {/* Podcast */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-1">
                  Audio
                </p>
                <h2 className="font-display font-bold text-xl text-txt-primary">Podcast</h2>
              </div>
              <Link
                href="/podcast"
                className="flex items-center gap-1.5 text-sm text-txt-secondary hover:text-txt-primary transition-colors"
              >
                All episodes
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {featuredEpisodes.map((ep) => (
                <PodcastCard key={ep.id} episode={ep} featured />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
