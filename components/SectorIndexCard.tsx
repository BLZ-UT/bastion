import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { type sectorConfig } from '@/data/companies'
import { sectorSummary } from '@/data/chartData'
import { cn, fmtPct, perfColor } from '@/lib/utils'

type SectorCfg = (typeof sectorConfig)[keyof typeof sectorConfig]

interface Props {
  sector: SectorCfg
  companyCount: number
}

export default function SectorIndexCard({ sector, companyCount }: Props) {
  const summary = sectorSummary[sector.id]

  return (
    <Link
      href={sector.path}
      className="group block rounded-lg border bg-bg-surface hover:bg-bg-elevated transition-all duration-200 p-5 relative overflow-hidden"
      style={{ borderColor: `${sector.color}22` }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${sector.color}08 0%, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div>
          <div
            className="text-xs font-mono font-semibold tracking-widest uppercase mb-1"
            style={{ color: sector.color }}
          >
            INDEX
          </div>
          <h3 className="font-display font-bold text-lg text-txt-primary">{sector.label}</h3>
        </div>
        <ArrowRight
          className="w-4 h-4 text-txt-muted group-hover:text-txt-secondary group-hover:translate-x-0.5 transition-all"
        />
      </div>

      {/* YTD performance */}
      <div className="mb-4 relative">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-2xl font-display font-bold tabular-nums',
              summary.ytd >= 0 ? 'text-up' : 'text-down'
            )}
          >
            {summary.ytd >= 0 ? '+' : ''}{fmtPct(summary.ytd)}
          </span>
          <span className="text-xs font-mono text-txt-muted">YTD</span>
        </div>
        <div className="flex gap-4 mt-1.5">
          <span className="text-xs font-mono text-txt-muted">
            3M{' '}
            <span className={cn('font-semibold', perfColor(summary.threeMonth))}>
              {fmtPct(summary.threeMonth, true)}
            </span>
          </span>
          <span className="text-xs font-mono text-txt-muted">
            1Y{' '}
            <span className={cn('font-semibold', perfColor(summary.oneYear))}>
              {fmtPct(summary.oneYear, true)}
            </span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between relative">
        <span className="text-xs font-mono text-txt-muted">{companyCount} companies</span>
        <div
          className="flex items-center gap-1 text-xs font-mono font-medium"
          style={{ color: sector.color }}
        >
          <TrendingUp className="w-3 h-3" />
          View Index
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-40"
        style={{ backgroundColor: sector.color }}
      />
    </Link>
  )
}
