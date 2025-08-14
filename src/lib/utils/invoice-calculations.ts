/**
 * @file invoice-calculations.ts
 * @role Utility functions for invoice amount calculations
 * @patterns Pure Functions, Single Responsibility
 * @solid SRP - Single responsibility for invoice calculations
 * @tests /src/lib/utils/__tests__/invoice-calculations.test.ts
 */

import type {
  UnpaidInvoice,
  CalculatedInvoice,
} from '@/lib/types/dashboard.types'

/**
 * Calculate total invoice amount including fees and VAT
 * All amounts are in smallest currency unit (öre/cents)
 */
export function calculateInvoiceTotal(invoice: UnpaidInvoice): number {
  const lineTotal =
    invoice._invoice_lines_aggregate?.aggregate?.sum
      ?.line_price_total_credit_exchange || 0
  const vatTotal =
    invoice._invoice_lines_aggregate?.aggregate?.sum?.vat_credit_exchange || 0

  let total = lineTotal + vatTotal

  // Add paper invoice fee if applicable
  if (invoice.is_fee_addable && invoice.paper_invoice_fee) {
    total += invoice.paper_invoice_fee + (invoice.paper_invoice_fee_vat || 0)
  }

  return total
}

/**
 * Calculate remaining amount to be paid
 * All amounts are in smallest currency unit (öre/cents)
 */
export function calculateRemainingAmount(invoice: UnpaidInvoice): number {
  const total = calculateInvoiceTotal(invoice)
  const paid =
    invoice.invoice_payments_aggregate?.aggregate?.sum
      ?.payment_credit_in_exchange || 0

  return Math.max(0, total - paid)
}

/**
 * Check if invoice is overdue
 */
export function isInvoiceOverdue(invoice: UnpaidInvoice): boolean {
  const dueDate = new Date(invoice.invoice_due_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)

  return today > dueDate
}

/**
 * Calculate days overdue (negative if not yet due)
 */
export function calculateDaysOverdue(invoice: UnpaidInvoice): number {
  const dueDate = new Date(invoice.invoice_due_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - dueDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

/**
 * Enrich invoice with calculated fields
 */
export function enrichInvoice(invoice: UnpaidInvoice): CalculatedInvoice {
  return {
    ...invoice,
    totalAmount: calculateInvoiceTotal(invoice),
    remainingAmount: calculateRemainingAmount(invoice),
    isOverdue: isInvoiceOverdue(invoice),
    daysOverdue: calculateDaysOverdue(invoice),
  }
}

/**
 * Format currency amount from smallest unit to display format with Swedish formatting
 * @param amount Amount in öre/cents
 * @param currency Currency code (default: kr.)
 * @returns Formatted currency string with Swedish number format
 */
export function formatCurrency(
  amount: number,
  currency: string = 'kr.'
): string {
  // Convert from öre to kronor
  const displayAmount = amount / 100

  // Use Swedish locale for formatting (space as thousands separator, comma as decimal)
  const formatted = new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(displayAmount)

  return `${formatted} ${currency}`
}

/**
 * Format date to Swedish locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

/**
 * Format date with relative time
 */
export function formatDateWithRelative(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  const formattedDate = formatDate(dateString)

  if (diffDays === 0) {
    return `${formattedDate} (today)`
  } else if (diffDays === 1) {
    return `${formattedDate} (yesterday)`
  } else if (diffDays === -1) {
    return `${formattedDate} (tomorrow)`
  } else if (diffDays > 0 && diffDays <= 7) {
    return `${formattedDate} (${diffDays} days ago)`
  } else if (diffDays < 0 && diffDays >= -7) {
    return `${formattedDate} (in ${Math.abs(diffDays)} days)`
  }

  return formattedDate
}
