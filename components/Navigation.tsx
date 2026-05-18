'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sectorConfig } from '@/data/companies'

const sectors = Object.values(sectorConfig)

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [indexesOpen, setIndexesOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-base/90 backdrop-blur-md">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded border border-accent/40 bg-accent/10 flex items-center justify-center group-hover:border-accent/70 group-hover:bg-accent/20 transition-all">
              <Zap className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-display font-bold text-base tracking-widest text-txt-primary">
              BASTION
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Indexes dropdown */}
            <div className="relative" onMouseLeave={() => setIndexesOpen(false)}>
              <button
                onMouseEnter={() => setIndexesOpen(true)}
                onClick={() => setIndexesOpen(!indexesOpen)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors',
                  isActive('/indexes')
                    ? 'text-txt-primary bg-bg-surface'
                    : 'text-txt-secondary hover:text-txt-primary hover:bg-bg-surface'
                )}
              >
                Indexes
                <ChevronDown
                  className={cn('w-3.5 h-3.5 transition-transform', indexesOpen && 'rotate-180')}
                />
              </button>

              {indexesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 rounded-lg border border-border bg-bg-surface shadow-xl shadow-black/50 overflow-hidden">
                  <div className="p-2">
                    <Link
                      href="/indexes"
                      onClick={() => setIndexesOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded text-sm text-txt-secondary hover:text-txt-primary hover:bg-bg-elevated transition-colors"
                    >
                      All Indexes Overview
                    </Link>
                    <div className="my-1.5 border-t border-border" />
                    {sectors.map((sector) => (
                      <Link
                        key={sector.id}
                        href={sector.path}
                        onClick={() => setIndexesOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-bg-elevated transition-colors group"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="text-txt-secondary group-hover:text-txt-primary transition-colors">
                          {sector.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/insights"
              className={cn(
                'px-3 py-1.5 rounded text-sm font-medium transition-colors',
                isActive('/insights')
                  ? 'text-txt-primary bg-bg-surface'
                  : 'text-txt-secondary hover:text-txt-primary hover:bg-bg-surface'
              )}
            >
              Insights
            </Link>

            <Link
              href="/podcast"
              className={cn(
                'px-3 py-1.5 rounded text-sm font-medium transition-colors',
                isActive('/podcast')
                  ? 'text-txt-primary bg-bg-surface'
                  : 'text-txt-secondary hover:text-txt-primary hover:bg-bg-surface'
              )}
            >
              Podcast
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded text-txt-secondary hover:text-txt-primary hover:bg-bg-surface transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg-surface">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/indexes"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded text-sm text-txt-secondary hover:text-txt-primary hover:bg-bg-elevated transition-colors"
            >
              All Indexes
            </Link>
            {sectors.map((sector) => (
              <Link
                key={sector.id}
                href={sector.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm text-txt-muted hover:text-txt-primary hover:bg-bg-elevated transition-colors"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: sector.color }}
                />
                {sector.label}
              </Link>
            ))}
            <div className="border-t border-border my-1.5" />
            <Link
              href="/insights"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded text-sm text-txt-secondary hover:text-txt-primary hover:bg-bg-elevated transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/podcast"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded text-sm text-txt-secondary hover:text-txt-primary hover:bg-bg-elevated transition-colors"
            >
              Podcast
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
