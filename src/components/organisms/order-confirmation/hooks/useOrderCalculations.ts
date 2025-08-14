/**
 * Order Calculations Hook
 * SOLID Principles: SRP - Single responsibility for order calculations
 * Design Patterns: Custom Hook Pattern
 * Dependencies: React hooks, order types
 */

'use client'

import { useMemo } from 'react'
import type { OrderLineInput } from '@/services/order.service'
import type {
  OrderLineWithCalculations,
  UseOrderCalculationsReturn,
} from '../types/order-confirmation.types'

/**
 * Custom hook for order calculations
 * @param orderLines - Array of order lines to calculate
 * @returns Calculated order lines and utility functions
 */
export function useOrderCalculations(
  orderLines: OrderLineInput[]
): UseOrderCalculationsReturn {
  /**
   * Calculate VAT amount for a given price and percentage
   * @param amount - Base amount
   * @param vatPercent - VAT percentage
   * @returns Calculated VAT amount
   */
  const calculateVAT = useMemo(
    () =>
      (amount: number, vatPercent: number): number => {
        if (!amount || !vatPercent) return 0
        return Math.round((amount * vatPercent) / 100)
      },
    []
  )

  /**
   * Calculate line total including VAT
   * @param unitPrice - Unit price
   * @param quantity - Quantity
   * @param vatPercent - VAT percentage
   * @returns Line total with VAT
   */
  const calculateLineTotal = useMemo(
    () =>
      (unitPrice: number, quantity: number, vatPercent: number): number => {
        const subtotal = unitPrice * quantity
        const vatAmount = calculateVAT(subtotal, vatPercent)
        return subtotal + vatAmount
      },
    [calculateVAT]
  )

  /**
   * Calculate all line items with VAT and totals
   */
  const orderLinesWithCalculations = useMemo<
    OrderLineWithCalculations[]
  >(() => {
    if (!orderLines || orderLines.length === 0) {
      return []
    }

    return orderLines.map(line => {
      const lineSubtotal = line.unitPrice * line.quantity
      const vatAmount = calculateVAT(lineSubtotal, line.vatPercent)
      const lineTotal = lineSubtotal + vatAmount

      return {
        ...line,
        vatAmount,
        lineTotal,
      }
    })
  }, [orderLines, calculateVAT])

  /**
   * Calculate order totals
   */
  const totals = useMemo(() => {
    if (
      !orderLinesWithCalculations ||
      orderLinesWithCalculations.length === 0
    ) {
      return {
        subtotal: 0,
        vatTotal: 0,
        grandTotal: 0,
      }
    }

    const subtotal = orderLinesWithCalculations.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0
    )

    const vatTotal = orderLinesWithCalculations.reduce(
      (sum, line) => sum + line.vatAmount,
      0
    )

    const grandTotal = orderLinesWithCalculations.reduce(
      (sum, line) => sum + line.lineTotal,
      0
    )

    return {
      subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimals
      vatTotal: Math.round(vatTotal * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
    }
  }, [orderLinesWithCalculations])

  return {
    orderLinesWithCalculations,
    calculateVAT,
    calculateLineTotal,
    totals,
  }
}

/**
 * Calculate total quantity from order lines
 * @param orderLines - Array of order lines
 * @returns Total quantity
 */
export function calculateTotalQuantity(orderLines: OrderLineInput[]): number {
  if (!orderLines || orderLines.length === 0) {
    return 0
  }

  return orderLines.reduce((sum, line) => sum + line.quantity, 0)
}

/**
 * Calculate average VAT percentage
 * @param orderLines - Array of order lines
 * @returns Average VAT percentage
 */
export function calculateAverageVAT(orderLines: OrderLineInput[]): number {
  if (!orderLines || orderLines.length === 0) {
    return 0
  }

  const totalVATPercent = orderLines.reduce(
    (sum, line) => sum + line.vatPercent,
    0
  )

  return Math.round((totalVATPercent / orderLines.length) * 100) / 100
}

/**
 * Group order lines by VAT percentage
 * @param orderLines - Array of order lines
 * @returns Grouped order lines
 */
export function groupByVATPercent(
  orderLines: OrderLineWithCalculations[]
): Record<number, OrderLineWithCalculations[]> {
  if (!orderLines || orderLines.length === 0) {
    return {}
  }

  return orderLines.reduce(
    (groups, line) => {
      const vatPercent = line.vatPercent
      if (!groups[vatPercent]) {
        groups[vatPercent] = []
      }
      groups[vatPercent].push(line)
      return groups
    },
    {} as Record<number, OrderLineWithCalculations[]>
  )
}

/**
 * Calculate VAT breakdown by percentage
 * @param orderLines - Array of order lines with calculations
 * @returns VAT breakdown
 */
export function calculateVATBreakdown(
  orderLines: OrderLineWithCalculations[]
): Array<{ vatPercent: number; amount: number; total: number }> {
  const grouped = groupByVATPercent(orderLines)

  return Object.entries(grouped).map(([vatPercent, lines]) => {
    const amount = lines.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0
    )
    const vatAmount = lines.reduce((sum, line) => sum + line.vatAmount, 0)

    return {
      vatPercent: Number(vatPercent),
      amount: Math.round(amount * 100) / 100,
      total: Math.round(vatAmount * 100) / 100,
    }
  })
}

/**
 * Validate order calculations
 * @param orderLines - Array of order lines with calculations
 * @returns Whether calculations are valid
 */
export function validateCalculations(
  orderLines: OrderLineWithCalculations[]
): boolean {
  if (!orderLines || orderLines.length === 0) {
    return true // Empty is valid
  }

  return orderLines.every(line => {
    const expectedSubtotal = line.unitPrice * line.quantity
    const expectedVAT = Math.round((expectedSubtotal * line.vatPercent) / 100)
    const expectedTotal = expectedSubtotal + expectedVAT

    return (
      line.vatAmount === expectedVAT &&
      line.lineTotal === expectedTotal &&
      line.unitPrice >= 0 &&
      line.quantity > 0 &&
      line.vatPercent >= 0
    )
  })
}

/**
 * Format calculations for display
 * @param totals - Calculated totals
 * @returns Formatted totals object
 */
export function formatCalculationsForDisplay(totals: {
  subtotal: number
  vatTotal: number
  grandTotal: number
}): {
  subtotal: string
  vatTotal: string
  grandTotal: string
} {
  return {
    subtotal: totals.subtotal.toFixed(2),
    vatTotal: totals.vatTotal.toFixed(2),
    grandTotal: totals.grandTotal.toFixed(2),
  }
}
