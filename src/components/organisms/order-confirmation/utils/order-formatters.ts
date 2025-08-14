/**
 * Order Formatting Utilities
 * SOLID Principles: SRP - Single responsibility for formatting functions
 * Design Patterns: Utility Pattern
 * Dependencies: Types from order-confirmation.types
 */

import { formatPrice as formatPriceUtil } from '@/lib/utils/price'
import type { FormattedAddress } from '@/services/address.service'
import type { OrderLineWithCalculations } from '../types/order-confirmation.types'

// ============================================
// Price Formatting
// ============================================

/**
 * Formats a price amount with currency (converts from öre to kr)
 * @param amount - The amount to format in öre
 * @param currency - Currency symbol (default: kr)
 * @param includeDecimals - Whether to include decimals (not used, kept for compatibility)
 * @returns Formatted price string
 */
export function formatPrice(
  amount: number,
  currency = 'kr',
  _includeDecimals = true
): string {
  // Use the utility that properly converts öre to kr
  // The formatPriceUtil already adds currency, so we check if currency matches
  if (currency === 'kr') {
    return formatPriceUtil(amount, true) // true = show currency
  }
  // For non-kr currencies, format manually (unlikely case)
  const priceInKr = amount / 100
  const formatted = priceInKr.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${formatted} ${currency}`
}

/**
 * Formats a price for display in tables (converts from öre to kr)
 * @param amount - The amount to format in öre
 * @returns Formatted price without currency
 */
export function formatTablePrice(amount: number): string {
  // Use the utility that properly converts öre to kr, without currency symbol
  return formatPriceUtil(amount, false) // false = no currency symbol
}

/**
 * Formats VAT percentage for display
 * @param vatPercent - The VAT percentage
 * @returns Formatted VAT string
 */
export function formatVATPercent(vatPercent: number): string {
  return `${vatPercent}%`
}

// ============================================
// Address Formatting
// ============================================

/**
 * Formats an address for display
 * @param address - The address to format
 * @returns Formatted address string
 */
export function formatAddress(address: FormattedAddress): string {
  const { address_nickname, line_1, line_2, city, country } =
    address.fullAddress

  const parts = [address_nickname, line_1, line_2, city, country].filter(
    Boolean
  )

  return parts.join(', ')
}

/**
 * Formats an address for multi-line display
 * @param address - The address to format
 * @returns Array of address lines
 */
export function formatAddressLines(address: FormattedAddress): string[] {
  const { address_nickname, line_1, line_2, city, country } =
    address.fullAddress

  const lines: string[] = [address_nickname, line_1]

  if (line_2) {
    lines.push(line_2)
  }

  lines.push(city, country)

  return lines
}

/**
 * Formats an address for dropdown option
 * @param address - The address to format
 * @returns Formatted option string
 */
export function formatAddressOption(address: FormattedAddress): string {
  const { address_nickname, line_1, line_2, city } = address.fullAddress
  const line2Part = line_2 ? ` ${line_2}` : ''
  return `${address_nickname}: ${line_1}${line2Part} ${city}`
}

// ============================================
// Date Formatting
// ============================================

/**
 * Formats a date string for display
 * @param dateString - ISO date string
 * @param locale - Locale for formatting (default: sv-SE)
 * @returns Formatted date string
 */
export function formatOrderDate(dateString: string, locale = 'sv-SE'): string {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch {
    return dateString
  }
}

/**
 * Formats a date string for short display
 * @param dateString - ISO date string
 * @param locale - Locale for formatting (default: sv-SE)
 * @returns Short formatted date string
 */
export function formatOrderDateShort(
  dateString: string,
  locale = 'sv-SE'
): string {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)
  } catch {
    return dateString
  }
}

// ============================================
// Order Type Formatting
// ============================================

/**
 * Formats order type for display
 * @param orderType - The order type
 * @returns Formatted order type
 */
export function formatOrderType(orderType: string): string {
  const typeMap: Record<string, string> = {
    Inland: 'Domestic',
    'Inside EU': 'EU',
    'Outside EU': 'International',
  }

  return typeMap[orderType] || orderType
}

/**
 * Gets badge variant for order type
 * @param orderType - The order type
 * @returns Badge variant
 */
export function getOrderTypeBadgeVariant(
  orderType: string
): 'default' | 'secondary' | 'outline' {
  switch (orderType) {
    case 'Inland':
      return 'default'
    case 'Inside EU':
      return 'secondary'
    case 'Outside EU':
      return 'outline'
    default:
      return 'default'
  }
}

// ============================================
// Order Line Formatting
// ============================================

/**
 * Formats a product ID for display
 * @param productId - The product ID
 * @returns Formatted product ID
 */
export function formatProductId(productId: string): string {
  return productId.toUpperCase()
}

/**
 * Formats quantity with unit
 * @param quantity - The quantity
 * @param unit - The unit (default: pcs)
 * @returns Formatted quantity string
 */
export function formatQuantity(quantity: number, unit = 'pcs'): string {
  return `${quantity} ${unit}`
}

/**
 * Calculates and formats line subtotal (prices in öre)
 * @param unitPrice - Unit price in öre
 * @param quantity - Quantity
 * @returns Formatted subtotal
 */
export function formatLineSubtotal(
  unitPrice: number,
  quantity: number
): string {
  const subtotal = unitPrice * quantity
  return formatTablePrice(subtotal) // formatTablePrice now handles öre to kr conversion
}

// ============================================
// Summary Formatting
// ============================================

/**
 * Formats order statistics
 * @param totalItems - Total number of items
 * @param totalQuantity - Total quantity
 * @returns Formatted statistics object
 */
export function formatOrderStats(
  totalItems: number,
  totalQuantity: number
): {
  items: string
  quantity: string
} {
  return {
    items: `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`,
    quantity: `${totalQuantity} ${totalQuantity === 1 ? 'piece' : 'pieces'}`,
  }
}

/**
 * Formats exchange rate information
 * @param exchangeRate - The exchange rate
 * @param exchangeUnit - The exchange unit
 * @returns Formatted exchange info
 */
export function formatExchangeInfo(
  exchangeRate: number,
  exchangeUnit: string
): string {
  if (exchangeRate === 1) {
    return exchangeUnit
  }
  return `${exchangeUnit} (${exchangeRate})`
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Validates if a price is valid
 * @param price - The price to validate
 * @returns Whether the price is valid
 */
export function isValidPrice(price: number): boolean {
  return !isNaN(price) && isFinite(price) && price >= 0
}

/**
 * Validates if a quantity is valid
 * @param quantity - The quantity to validate
 * @returns Whether the quantity is valid
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0
}

// ============================================
// Export Helper
// ============================================

/**
 * Formats order data for CSV export (prices in öre)
 * @param orderLine - The order line to format
 * @returns CSV row string
 */
export function formatOrderLineForCSV(
  orderLine: OrderLineWithCalculations
): string {
  const fields = [
    orderLine.stockId,
    `"${orderLine.lineInfo}"`,
    orderLine.quantity,
    (orderLine.unitPrice / 100).toFixed(2), // Convert öre to kr
    orderLine.vatPercent,
    (orderLine.vatAmount / 100).toFixed(2), // Convert öre to kr
    (orderLine.lineTotal / 100).toFixed(2), // Convert öre to kr
  ]

  return fields.join(',')
}

/**
 * Gets CSV headers for order lines
 * @returns CSV header string
 */
export function getOrderLineCSVHeaders(): string {
  return 'Product ID,Product Name,Quantity,Unit Price,VAT %,VAT Amount,Total'
}
