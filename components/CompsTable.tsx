'use client'

import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ExternalLink } from 'lucide-react'
import { Company } from '@/data/companies'
import { cn, fmtB, fmtMultiple, fmtPct, perfColor, marginColor } from '@/lib/utils'

interface Props {
  data: Company[]
  sectorColor: string
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (sorted === 'asc') return <ChevronUp className="w-3 h-3 text-accent" />
  if (sorted === 'desc') return <ChevronDown className="w-3 h-3 text-accent" />
  return <ChevronsUpDown className="w-3 h-3 text-txt-dim opacity-0 group-hover:opacity-100 transition-opacity" />
}

function Cell({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn('font-mono text-xs tabular-nums', className)}>{value}</span>
  )
}

export default function CompsTable({ data, sectorColor }: Props) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'marketCap', desc: true }])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      {
        id: 'company',
        header: 'Company',
        accessorFn: (row) => row.name,
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex flex-col min-w-[160px]">
            <span className="text-sm font-medium text-txt-primary leading-tight">
              {row.original.name}
            </span>
            <span className="text-xs font-mono text-txt-secondary mt-0.5">
              {row.original.ticker}
            </span>
          </div>
        ),
      },
      {
        id: 'marketCap',
        header: 'Mkt Cap',
        accessorFn: (row) => row.marketCap,
        sortingFn: 'basic',
        cell: ({ row }) => <Cell value={fmtB(row.original.marketCap)} className="text-txt-primary" />,
      },
      {
        id: 'ev',
        header: 'EV',
        accessorFn: (row) => row.ev,
        sortingFn: 'basic',
        cell: ({ row }) => <Cell value={fmtB(row.original.ev)} className="text-txt-secondary" />,
      },
      {
        id: 'revenue',
        header: 'LTM Rev',
        accessorFn: (row) => row.revenue,
        sortingFn: 'basic',
        cell: ({ row }) => (
          <Cell
            value={row.original.revenue === 0 ? 'Pre-rev' : fmtB(row.original.revenue)}
            className="text-txt-secondary"
          />
        ),
      },
      {
        id: 'revenueGrowth',
        header: 'Rev Gr.',
        accessorFn: (row) => row.revenueGrowth,
        sortingFn: 'basic',
        cell: ({ row }) => {
          const g = row.original.revenueGrowth
          if (g === 0 && row.original.revenue === 0) return <Cell value="—" className="text-txt-muted" />
          return (
            <Cell
              value={fmtPct(g, true)}
              className={cn(
                g >= 30 ? 'text-up' : g >= 10 ? 'text-energy' : g < 0 ? 'text-down' : 'text-txt-secondary'
              )}
            />
          )
        },
      },
      {
        id: 'grossMargin',
        header: 'Gross Mgn',
        accessorFn: (row) => row.grossMargin,
        sortingFn: 'basic',
        cell: ({ row }) => {
          const gm = row.original.grossMargin
          if (gm === 0) return <Cell value="—" className="text-txt-muted" />
          return <Cell value={fmtPct(gm)} className={marginColor(gm, 50, 20)} />
        },
      },
      {
        id: 'ebitdaMargin',
        header: 'EBITDA Mgn',
        accessorFn: (row) => row.ebitdaMargin,
        sortingFn: 'basic',
        cell: ({ row }) => {
          const em = row.original.ebitdaMargin
          return (
            <Cell
              value={fmtPct(em)}
              className={em >= 20 ? 'text-up' : em >= 0 ? 'text-energy' : 'text-down'}
            />
          )
        },
      },
      {
        id: 'evRevenue',
        header: 'EV/Rev',
        accessorFn: (row) => row.evRevenue,
        sortingFn: 'basic',
        cell: ({ row }) => {
          const v = row.original.evRevenue
          if (v === 0) return <Cell value="—" className="text-txt-muted" />
          return <Cell value={fmtMultiple(v)} className="text-txt-primary" />
        },
      },
      {
        id: 'evEbitda',
        header: 'EV/EBITDA',
        accessorFn: (row) => row.evEbitda ?? -999,
        sortingFn: 'basic',
        cell: ({ row }) => <Cell value={fmtMultiple(row.original.evEbitda)} className="text-txt-secondary" />,
      },
      {
        id: 'return1M',
        header: '1M',
        accessorFn: (row) => row.return1M,
        sortingFn: 'basic',
        cell: ({ row }) => (
          <Cell value={fmtPct(row.original.return1M, true)} className={perfColor(row.original.return1M)} />
        ),
      },
      {
        id: 'return3M',
        header: '3M',
        accessorFn: (row) => row.return3M,
        sortingFn: 'basic',
        cell: ({ row }) => (
          <Cell value={fmtPct(row.original.return3M, true)} className={perfColor(row.original.return3M)} />
        ),
      },
      {
        id: 'return1Y',
        header: '1Y',
        accessorFn: (row) => row.return1Y,
        sortingFn: 'basic',
        cell: ({ row }) => (
          <Cell value={fmtPct(row.original.return1Y, true)} className={perfColor(row.original.return1Y)} />
        ),
      },
      {
        id: 'fromHigh',
        header: '52W High',
        accessorFn: (row) => row.fromHigh,
        sortingFn: 'basic',
        cell: ({ row }) => (
          <Cell value={fmtPct(row.original.fromHigh, true)} className={perfColor(row.original.fromHigh)} />
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-txt-muted" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Filter companies..."
            className="w-full pl-9 pr-3 py-2 rounded border border-border bg-bg-surface text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-border-bright focus:ring-1 focus:ring-border-bright transition-colors"
          />
        </div>
        <span className="text-xs font-mono text-txt-muted ml-auto">
          {table.getFilteredRowModel().rows.length} companies
        </span>
      </div>

      {/* Table */}
      <div className="table-scroll rounded-lg border border-border overflow-hidden">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-border bg-bg-surface">
              {table.getFlatHeaders().map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'px-4 py-3 text-left',
                    header.column.getCanSort() && 'cursor-pointer select-none group'
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-medium text-txt-muted tracking-wider uppercase whitespace-nowrap">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                    {header.column.getCanSort() && (
                      <SortIcon sorted={header.column.getIsSorted()} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={cn(
                  'border-b border-border/50 transition-colors hover:bg-bg-surface group',
                  i % 2 === 0 ? 'bg-bg-base' : 'bg-bg-surface/30'
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.getFilteredRowModel().rows.length === 0 && (
          <div className="flex items-center justify-center py-12 text-txt-muted text-sm">
            No companies match your filter.
          </div>
        )}
      </div>

      {/* Column legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {[
          { label: 'Mkt Cap / EV', note: '$B' },
          { label: 'LTM Rev', note: 'last twelve months revenue, $B' },
          { label: 'Rev Gr.', note: 'year-over-year' },
          { label: 'EV/Rev · EV/EBITDA', note: 'valuation multiples on LTM' },
          { label: '1M · 3M · 1Y', note: 'total return periods' },
          { label: '52W High', note: '% below 52-week high' },
        ].map(({ label, note }) => (
          <span key={label} className="text-xs text-txt-dim font-mono">
            <span className="text-txt-muted">{label}</span> — {note}
          </span>
        ))}
      </div>
    </div>
  )
}
