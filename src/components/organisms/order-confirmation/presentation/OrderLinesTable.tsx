/**
 * Order Lines Table Presentation Component
 * SOLID Principles: SRP - Single responsibility for order lines table display
 * Design Patterns: Table Component Pattern with TanStack Table, Responsive Design Pattern
 * Dependencies: React, TanStack Table, hooks, atoms, utilities
 */

'use client'

import { useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/custom/table'
import { useOrderCalculations } from '../hooks/useOrderCalculations'
import { PriceDisplay } from '../atoms/PriceDisplay'
import { formatVATPercent, formatQuantity } from '../utils/order-formatters'
import { useIsMobile } from '@/hooks/use-media-query'
import { OrderLinesMobileView } from './OrderLinesMobileView'
import type {
  OrderLinesTableProps,
  OrderLineWithCalculations,
} from '../types/order-confirmation.types'

const columnHelper = createColumnHelper<OrderLineWithCalculations>()

/**
 * Displays order lines in a TanStack Table or Mobile View based on screen size
 * @param props - Component props
 * @returns Rendered order lines table or mobile view
 */
export function OrderLinesTable({ orderLines }: OrderLinesTableProps) {
  // Check if mobile screen
  const isMobile = useIsMobile()

  // Calculate VAT and totals for each line
  const { orderLinesWithCalculations } = useOrderCalculations(orderLines)

  // Define table columns
  const columns = useMemo(
    () => [
      columnHelper.accessor('stockId', {
        header: 'Product ID',
        cell: info => (
          <span className="font-mono text-xs">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('lineInfo', {
        header: 'Product Name',
        cell: info => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor('quantity', {
        header: 'Quantity',
        cell: info => (
          <span className="text-center">{formatQuantity(info.getValue())}</span>
        ),
      }),
      columnHelper.accessor('unitPrice', {
        header: 'Unit Price',
        cell: info => <PriceDisplay amount={info.getValue()} size="sm" />,
      }),
      columnHelper.accessor('vatPercent', {
        header: 'VAT %',
        cell: info => (
          <span className="text-center">
            {formatVATPercent(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor('vatAmount', {
        header: 'VAT Amount',
        cell: info => <PriceDisplay amount={info.getValue()} size="sm" />,
      }),
      columnHelper.accessor('lineTotal', {
        header: 'Line Total',
        cell: info => (
          <PriceDisplay
            amount={info.getValue()}
            size="sm"
            className="font-medium"
          />
        ),
      }),
    ],
    []
  )

  // Initialize table
  const table = useReactTable({
    data: orderLinesWithCalculations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Render mobile view for mobile screens
  if (isMobile) {
    return <OrderLinesMobileView orderLines={orderLines} />
  }

  // Render desktop table view
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-xs">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No order lines found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
