import Link from 'next/link'
import { sectorConfig } from '@/data/companies'
import Logo from '@/components/Logo'

export default function Footer() {
  const sectors = Object.values(sectorConfig)

  return (
    <footer className="border-t border-border bg-bg-surface mt-24">
      <div className="hazard-stripe" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-accent/50 bg-bg-elevated flex items-center justify-center">
                <Logo className="w-4 h-4 text-accent" />
              </div>
              <span className="font-display font-bold text-base tracking-[0.1em] text-txt-primary">
                infra<span className="text-accent">A</span>nalysis
              </span>
            </Link>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Live public market intelligence for critical infrastructure sectors.
            </p>
          </div>

          {/* Indexes */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-txt-muted tracking-widest uppercase mb-3">
              Indexes
            </h4>
            <ul className="space-y-2">
              {sectors.map((sector) => (
                <li key={sector.id}>
                  <Link
                    href={sector.path}
                    className="text-sm text-txt-secondary hover:text-txt-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: sector.color }} />
                    {sector.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-txt-muted tracking-widest uppercase mb-3">
              Content
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/insights', label: 'Insights' },
                { href: '/podcast', label: 'Podcast' },
                { href: '/indexes', label: 'All Indexes' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-txt-secondary hover:text-txt-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-txt-muted tracking-widest uppercase mb-3">
              Disclaimer
            </h4>
            <p className="text-xs text-txt-muted leading-relaxed">
              Price and return data are fetched live from public market feeds and may be delayed
              or briefly unavailable. Fundamentals reflect the most recent public filings. Not
              investment advice.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-muted font-mono">
            © {new Date().getFullYear()} infraAnalysis. Infrastructure Intelligence.
          </p>
          <p className="text-xs text-txt-dim font-mono">
            Live market data · For informational use only
          </p>
        </div>
      </div>
    </footer>
  )
}
