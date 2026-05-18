import { insights } from '@/data/insights'
import { sectorConfig } from '@/data/companies'
import InsightCard from '@/components/InsightCard'

export const metadata = { title: 'Insights — BASTION' }

export default function InsightsPage() {
  const featured = insights.filter((i) => i.featured)
  const rest = insights.filter((i) => !i.featured)
  const sectors = Object.values(sectorConfig)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-accent opacity-60" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Research
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary mb-3">
          Insights
        </h1>
        <p className="text-base text-txt-secondary max-w-2xl leading-relaxed">
          Original research and analysis on the companies, technologies, and forces shaping
          critical infrastructure.
        </p>
      </div>

      {/* Sector filter pills (visual only) */}
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

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((insight) => (
              <InsightCard key={insight.id} insight={insight} featured />
            ))}
          </div>
        </div>
      )}

      {/* All insights */}
      <div>
        <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
          All Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  )
}
