import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { insights } from '@/data/insights'
import { sectorConfig } from '@/data/companies'
import InsightCard from '@/components/InsightCard'
import Rivets from '@/components/Rivets'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return insights.map((insight) => ({ id: insight.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const insight = insights.find((i) => i.id === id)
  if (!insight) return { title: 'Insight — infraAnalysis' }
  return { title: `${insight.title} — infraAnalysis` }
}

export default async function InsightDetailPage({ params }: Props) {
  const { id } = await params
  const insight = insights.find((i) => i.id === id)
  if (!insight) notFound()

  const sector = insight.sector !== 'cross-sector' ? sectorConfig[insight.sector] : null
  const related = insights.filter((i) => i.id !== insight.id && i.sector === insight.sector).slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-mono text-txt-muted mb-8">
        <Link href="/" className="hover:text-txt-secondary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/insights" className="hover:text-txt-secondary transition-colors">Insights</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-txt-secondary truncate max-w-[16rem]">{insight.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {sector ? (
            <span
              className="text-xs font-mono font-semibold px-2 py-0.5 border-l-2"
              style={{ color: sector.color, backgroundColor: `${sector.color}1a`, borderColor: sector.color }}
            >
              {sector.label}
            </span>
          ) : (
            <span className="text-xs font-mono font-semibold px-2 py-0.5 border-l-2 border-accent text-accent bg-accent/10">
              Cross-Sector
            </span>
          )}
          <div className="flex items-center gap-1 text-txt-muted">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-mono">{insight.readTime}</span>
          </div>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary leading-tight mb-4">
          {insight.title}
        </h1>

        <div className="flex items-center gap-3 text-xs font-mono text-txt-muted">
          <span>{insight.author}</span>
          <span>·</span>
          <span>{insight.date}</span>
        </div>
      </div>

      {/* Body */}
      <div className="border border-border bg-bg-surface p-6 sm:p-8 relative panel-bevel mb-8">
        <Rivets />
        <p className="text-lg text-txt-primary leading-relaxed">{insight.excerpt}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-14">
        {insight.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-txt-secondary bg-bg-surface border border-border px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-4">
            More From {sector ? sector.label : 'Cross-Sector'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {related.map((r) => (
              <InsightCard key={r.id} insight={r} />
            ))}
          </div>
        </div>
      )}

      <Link
        href="/insights"
        className="inline-flex items-center gap-1.5 text-sm text-txt-secondary hover:text-txt-primary transition-colors"
      >
        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        All insights
      </Link>
    </div>
  )
}
