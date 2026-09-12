import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { type sectorConfig } from '@/data/companies'
import { type SectorPerformance } from '@/lib/marketData'
import { cn, fmtPct, perfColor } from '@/lib/utils'

type SectorCfg = (typeof sectorConfig)[keyof typeof sectorConfig]

interface Props {
  sector: SectorCfg
  companyCount: number
  performance: SectorPerformance
}

export default function SectorIndexCard({ sector, companyCount, performance }: Props) {
  return (
    <Link
      href={sector.path}
      className="group block border bg-bg-surface hover:bg-bg-elevated transition-all duration-200 p-5 relative overflow-hidden panel-bevel"
      style={{ borderColor: `${sector.color}33` }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${sector.color}10 0%, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2" style={{ backgroundColor: sector.color }} />
            <span
              className="text-xs font-mono font-semibold tracking-widest uppercase"
              style={{ color: sector.color }}
            >
              Index
            </span>
          </div>
          <h3 className="font-display font-bold text-lg tracking-wide text-txt-primary uppercase">
            {sector.label}
          </h3>
        </div>
        <ArrowRight className="w-4 h-4 text-txt-muted group-hover:text-txt-secondary group-hover:translate-x-0.5 transition-all" />
      </div>

      {/* Performance */}
      <div className="mb-4 relative">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-2xl font-display font-bold tabular-nums',
              performance.ytd >= 0 ? 'text-up' : 'text-down'
            )}
          >
            {performance.ytd >= 0 ? '+' : ''}
            {fmtPct(performance.ytd)}
          </span>
          <span className="text-xs font-mono text-txt-muted">YTD</span>
          {performance.isLive && <span className="live-dot ml-1" />}
        </div>
        <div className="flex gap-4 mt-1.5">
          <span className="text-xs font-mono text-txt-muted">
            3M{' '}
            <span className={cn('font-semibold', perfColor(performance.threeMonth))}>
              {fmtPct(performance.threeMonth, true)}
            </span>
          </span>
          <span className="text-xs font-mono text-txt-muted">
            1Y{' '}
            <span className={cn('font-semibold', perfColor(performance.oneYear))}>
              {fmtPct(performance.oneYear, true)}
            </span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between relative">
        <span className="text-xs font-mono text-txt-muted">{companyCount} companies</span>
        <div className="flex items-center gap-1 text-xs font-mono font-medium" style={{ color: sector.color }}>
          <TrendingUp className="w-3 h-3" />
          View Index
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-60" style={{ backgroundColor: sector.color }} />
    </Link>
  )
}
