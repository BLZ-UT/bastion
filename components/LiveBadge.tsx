import { cn } from '@/lib/utils'

interface Props {
  live: boolean
  asOf?: string | null
  className?: string
}

export default function LiveBadge({ live, asOf, className }: Props) {
  if (!live) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-txt-muted',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-txt-dim" />
        Last known
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-up',
        className
      )}
    >
      <span className="live-dot" />
      Live{asOf ? ` · ${asOf}` : ''}
    </span>
  )
}
