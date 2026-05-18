import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SectorId, companiesBySector, sectorConfig } from '@/data/companies'
import { sectorChartData, sectorSummary } from '@/data/chartData'
import CompsTable from '@/components/CompsTable'
import SectorChart from '@/components/SectorChart'
import { cn, fmtPct, perfColor } from '@/lib/utils'

interface Props {
  sectorId: SectorId
}

export default function SectorPage({ sectorId }: Props) {
  const sector = sectorConfig[sectorId]
  const data = companiesBySector(sectorId)
  const chartData = sectorChartData[sectorId]
  const summary = sectorSummary[sectorId]

  const periods: { label: string; value: number }[] = [
    { label: '1 Month', value: data.reduce((s, c) => s + c.return1M, 0) / data.length },
    { label: '3 Month', value: summary.threeMonth },
    { label: '1 Year', value: summary.oneYear },
    { label: 'YTD', value: summary.ytd },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-mono text-txt-muted mb-8">
        <Link href="/" className="hover:text-txt-secondary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/indexes" className="hover:text-txt-secondary transition-colors">Indexes</Link>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: sector.color }}>{sector.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="h-px w-8"
            style={{ backgroundColor: sector.color }}
          />
          <span
            className="text-xs font-mono font-semibold tracking-widest uppercase"
            style={{ color: sector.color }}
          >
            Infrastructure Index
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary mb-3">
          {sector.label}
        </h1>
        <p className="text-base text-txt-secondary max-w-2xl leading-relaxed">
          {sector.description}
        </p>
      </div>

      {/* Performance summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {periods.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border bg-bg-surface p-4"
            style={{ borderColor: `${sector.color}22` }}
          >
            <div className="text-xs font-mono text-txt-muted mb-1">{label}</div>
            <div
              className={cn(
                'text-xl font-display font-bold tabular-nums',
                value >= 0 ? 'text-up' : 'text-down'
              )}
            >
              {value >= 0 ? '+' : ''}{fmtPct(value)}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-10">
        <SectorChart data={chartData} color={sector.color} label={sector.label} />
      </div>

      {/* Comps table */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-1">
              Public Companies
            </p>
            <h2 className="font-display font-bold text-xl text-txt-primary">
              {sector.label} Comps
            </h2>
          </div>
          <span className="text-xs font-mono text-txt-muted">{data.length} companies</span>
        </div>
        <CompsTable data={data} sectorColor={sector.color} />
      </div>

      {/* Methodology note */}
      <div className="mt-8 p-4 rounded-lg border border-border bg-bg-surface">
        <p className="text-xs font-mono text-txt-muted leading-relaxed">
          <span className="text-txt-secondary font-semibold">Methodology: </span>
          Index performance represents an equal-weighted basket of tracked companies, indexed to 100
          at January 2024. Financial data is approximate LTM (last twelve months) based on most
          recent public filings. Market data as of May 2025. Not investment advice.
        </p>
      </div>
    </div>
  )
}
