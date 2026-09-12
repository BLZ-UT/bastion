import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmt(n: number, decimals = 1): string {
  return n.toFixed(decimals)
}

export function fmtB(n: number): string {
  if (n === 0) return '—'
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}T`
  if (Math.abs(n) >= 1) return `$${n.toFixed(1)}B`
  return `$${(n * 1000).toFixed(0)}M`
}

export function fmtMultiple(n: number | null): string {
  if (n === null || n === 0) return '—'
  if (n > 500) return `>${Math.round(n / 100) * 100}x`
  if (n > 100) return `${Math.round(n)}x`
  return `${n.toFixed(1)}x`
}

export function fmtPct(n: number, showSign = false): string {
  if (n === 0 && showSign) return '0.0%'
  const sign = showSign && n > 0 ? '+' : ''
  return `${sign}${n.toFixed(1)}%`
}

export function perfColor(n: number): string {
  if (n > 0) return 'text-up'
  if (n < 0) return 'text-down'
  return 'text-txt-secondary'
}

export function marginColor(n: number, good = 20, ok = 0): string {
  if (n >= good) return 'text-up'
  if (n >= ok) return 'text-energy'
  return 'text-down'
}

export function timeAgo(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''

  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
