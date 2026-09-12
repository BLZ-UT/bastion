import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { companiesBySector, sectorConfig } from '@/data/companies'
import { sectorSummary } from '@/data/chartData'
import { withLiveQuotes, sectorPerformanceFrom } from '@/lib/marketData'
import SectorIndexCard from '@/components/SectorIndexCard'
import { cn, fmtPct } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Indexes — INFRAANALYSIS' }

export default async function IndexesPage() {
  const sectors = Object.values(sectorConfig)

  const performances = await Promise.all(
    sectors.map(async (sector) => {
      const live = await withLiveQuotes(companiesBySector(sector.id))
      return sectorPerformanceFrom(live, sectorSummary[sector.id])
    })
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-accent opacity-60" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Public Markets
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary uppercase tracking-wide mb-3">
          Infrastructure Indexes
        </h1>
        <p className="text-base text-txt-secondary max-w-2xl leading-relaxed">
          Five sector indexes tracking public companies at the frontier of critical infrastructure.
          Equal-weighted baskets, refreshed live from public market data.
        </p>
      </div>

      {/* Sector cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {sectors.map((sector, i) => (
          <SectorIndexCard
            key={sector.id}
            sector={sector}
            companyCount={companiesBySector(sector.id).length}
            performance={performances[i]}
          />
        ))}
      </div>

      {/* Combined performance table */}
      <div>
        <h2 className="font-display font-bold text-xl text-txt-primary uppercase tracking-wide mb-5">
          Index Performance Comparison
        </h2>
        <div className="border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-surface">
                {['Sector', '1M', '3M', '1Y', 'YTD', 'Companies'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-mono font-medium text-txt-muted tracking-wider uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectors.map((sector, i) => {
                const perf = performances[i]

                return (
                  <tr
                    key={sector.id}
                    className={cn(
                      'border-b border-border/50 hover:bg-bg-surface transition-colors',
                      i % 2 === 0 ? 'bg-bg-base' : 'bg-bg-surface/30'
                    )}
                  >
                    <td className="px-5 py-4">
                      <Link href={sector.path} className="flex items-center gap-2.5 group">
                        <span
                          className="w-2.5 h-2.5 flex-shrink-0"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="font-medium text-sm text-txt-primary group-hover:text-white transition-colors">
                          {sector.label}
                        </span>
                        <ArrowRight className="w-3 h-3 text-txt-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </td>
                    {[perf.oneMonth, perf.threeMonth, perf.oneYear, perf.ytd].map((v, j) => (
                      <td key={j} className="px-5 py-4">
                        <span className={cn('text-sm font-mono tabular-nums font-semibold', v >= 0 ? 'text-up' : 'text-down')}>
                          {v >= 0 ? '+' : ''}
                          {fmtPct(v)}
                        </span>
                      </td>
                    ))}
                    <td className="px-5 py-4 text-sm font-mono text-txt-muted tabular-nums">
                      {companiesBySector(sector.id).length}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs font-mono text-txt-dim">
          Equal-weighted basket performance. 1M/3M/1Y refresh from live prices when available; YTD is
          anchored to the Jan 2024 baseline. Approximate. Not investment advice.
        </p>
      </div>
    </div>
  )
}
