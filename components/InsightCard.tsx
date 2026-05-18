import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Insight } from '@/data/insights'
import { sectorConfig } from '@/data/companies'
import { cn } from '@/lib/utils'

interface Props {
  insight: Insight
  featured?: boolean
}

export default function InsightCard({ insight, featured }: Props) {
  const sector = insight.sector !== 'cross-sector' ? sectorConfig[insight.sector] : null

  return (
    <Link
      href={`/insights/${insight.id}`}
      className={cn(
        'group block rounded-lg border border-border bg-bg-surface hover:bg-bg-elevated hover:border-border-bright transition-all duration-200',
        featured ? 'p-6' : 'p-5'
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        {sector && (
          <span
            className="text-xs font-mono font-semibold px-2 py-0.5 rounded-sm"
            style={{ color: sector.color, backgroundColor: `${sector.color}1a` }}
          >
            {sector.label}
          </span>
        )}
        {insight.sector === 'cross-sector' && (
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-sm text-accent bg-accent/10">
            Cross-Sector
          </span>
        )}
        <div className="flex items-center gap-1 ml-auto text-txt-muted">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-mono">{insight.readTime}</span>
        </div>
      </div>

      <h3
        className={cn(
          'font-display font-semibold text-txt-primary group-hover:text-white transition-colors leading-snug',
          featured ? 'text-lg mb-3' : 'text-base mb-2'
        )}
      >
        {insight.title}
      </h3>

      <p className="text-sm text-txt-secondary leading-relaxed line-clamp-3 mb-4">
        {insight.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-txt-muted">{insight.date}</span>
        <span className="flex items-center gap-1 text-xs font-mono text-txt-muted group-hover:text-accent transition-colors">
          Read
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
