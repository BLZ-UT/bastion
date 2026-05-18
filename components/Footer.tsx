import Link from 'next/link'
import { Zap } from 'lucide-react'
import { sectorConfig } from '@/data/companies'

export default function Footer() {
  const sectors = Object.values(sectorConfig)

  return (
    <footer className="border-t border-border bg-bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded border border-accent/40 bg-accent/10 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="font-display font-bold text-base tracking-widest text-txt-primary">
                BASTION
              </span>
            </Link>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Public market intelligence for critical infrastructure sectors.
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
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: sector.color }}
                    />
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
                  <Link
                    href={href}
                    className="text-sm text-txt-secondary hover:text-txt-primary transition-colors"
                  >
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
              Data is for informational purposes only. Not investment advice. Market data may be
              delayed. All figures approximate.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-muted font-mono">
            © {new Date().getFullYear()} BASTION. Infrastructure Intelligence.
          </p>
          <p className="text-xs text-txt-dim font-mono">
            Data as of May 2025 · For informational use only
          </p>
        </div>
      </div>
    </footer>
  )
}
