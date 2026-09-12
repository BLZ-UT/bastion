'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { DataPoint } from '@/data/chartData'
import { cn } from '@/lib/utils'

interface Props {
  data: DataPoint[]
  color: string
  label: string
}

function CustomTooltip({
  active,
  payload,
  label,
  color,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  color: string
}) {
  if (!active || !payload?.length) return null
  const val = payload[0].value
  const change = val - 100
  return (
    <div className="bg-bg-elevated border border-border px-3 py-2 shadow-xl">
      <p className="text-xs font-mono text-txt-muted mb-1">{label}</p>
      <p className="text-sm font-mono font-semibold" style={{ color }}>
        {val.toFixed(1)}
      </p>
      <p
        className={cn('text-xs font-mono', change >= 0 ? 'text-up' : 'text-down')}
      >
        {change >= 0 ? '+' : ''}
        {change.toFixed(1)}% since Jan&apos;24
      </p>
    </div>
  )
}

export default function SectorChart({ data, color, label }: Props) {
  const current = data[data.length - 1].value
  const change = current - 100

  return (
    <div className="border border-border bg-bg-surface p-6 panel-bevel">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-mono text-txt-muted uppercase tracking-widest mb-1">
            {label} Index
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-bold text-txt-primary tabular-nums">
              {current.toFixed(1)}
            </span>
            <span
              className={cn(
                'text-sm font-mono font-semibold',
                change >= 0 ? 'text-up' : 'text-down'
              )}
            >
              {change >= 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-txt-muted font-mono mt-1">Indexed to 100 · Jan 2024</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(82,67,49,0.5)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6b5f4e', fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)' }}
            axisLine={{ stroke: '#332c22' }}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fill: '#6b5f4e', fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<CustomTooltip color={color} />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${label})`}
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: '#16130f', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
