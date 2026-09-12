import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SectorId, companiesBySector, sectorConfig } from '@/data/companies'
import { sectorChartData, sectorSummary } from '@/data/chartData'
import { withLiveQuotes, sectorPerformanceFrom } from '@/lib/marketData'
import CompsTable from '@/components/CompsTable'
import SectorChart from '@/components/SectorChart'
import MarketPulse from '@/components/MarketPulse'
import LivePodcastFeed from '@/components/LivePodcastFeed'
import Rivets from '@/components/Rivets'
import LiveBadge from '@/components/LiveBadge'
import { cn, fmtPct } from '@/lib/utils'

interface Props {
  sectorId: SectorId
}

export default async function SectorPage({ sectorId }: Props) {
  const sector = sectorConfig[sectorId]
  const staticData = companiesBySector(sectorId)
  const chartData = sectorChartData[sectorId]
  const baseline = sectorSummary[sectorId]

  const data = await withLiveQuotes(staticData)
  const performance = sectorPerformanceFrom(data, baseline)

  const periods: { label: string; value: number }[] = [
    { label: '1 Month', value: performance.oneMonth },
    { label: '3 Month', value: performance.threeMonth },
    { label: '1 Year', value: performance.oneYear },
    { label: 'YTD', value: performance.ytd },
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
          <div className="h-px w-8" style={{ backgroundColor: sector.color }} />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase" style={{ color: sector.color }}>
            Infrastructure Index
          </span>
          <LiveBadge live={performance.isLive} />
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary uppercase tracking-wide mb-3">
          {sector.label}
        </h1>
        <p className="text-base text-txt-secondary max-w-2xl leading-relaxed">{sector.description}</p>
      </div>

      {/* Performance summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {periods.map(({ label, value }) => (
          <div key={label} className="border bg-bg-surface p-4 panel-bevel" style={{ borderColor: `${sector.color}30` }}>
            <div className="text-xs font-mono text-txt-muted mb-1">{label}</div>
            <div className={cn('text-xl font-display font-bold tabular-nums', value >= 0 ? 'text-up' : 'text-down')}>
              {value >= 0 ? '+' : ''}
              {fmtPct(value)}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-10">
        <SectorChart data={chartData} color={sector.color} label={sector.label} />
      </div>

      {/* Comps table */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-1">Public Companies</p>
            <h2 className="font-display font-bold text-xl text-txt-primary uppercase tracking-wide">
              {sector.label} Comps
            </h2>
          </div>
          <span className="text-xs font-mono text-txt-muted">{data.length} companies</span>
        </div>
        <CompsTable data={data} sectorColor={sector.color} />
      </div>

      {/* Live market pulse + podcast feed for this sector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div>
          <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">Live Coverage</p>
          <MarketPulse query={`${sector.label} infrastructure stocks`} title={`${sector.label} Market Pulse`} />
        </div>
        <div>
          <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">Founders &amp; Investors</p>
          <LivePodcastFeed
            query={`${sector.label} infrastructure founder investor podcast`}
            title={`${sector.label} Episodes`}
            limit={4}
          />
        </div>
      </div>

      {/* Methodology note */}
      <div className="p-4 border border-border bg-bg-surface relative panel-bevel">
        <Rivets />
        <p className="text-xs font-mono text-txt-muted leading-relaxed">
          <span className="text-txt-secondary font-semibold">Methodology: </span>
          Index performance is an equal-weighted basket of tracked companies, indexed to 100 at
          January 2024. Price and return figures refresh from live public market data roughly every
          minute; when the feed is unreachable, the last-known figures are shown instead. Fundamentals
          (revenue, margins, valuation multiples) reflect the most recent public filings. Not investment
          advice.
        </p>
      </div>
    </div>
  )
}
