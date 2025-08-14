/**
 * Order Confirmation Types
 * SOLID Principles: SRP - Single responsibility for type definitions
 * Design Patterns: Type Definition Pattern
 * Dependencies: External type imports from services
 */

import type { FormattedAddress } from '@/services/address.service'
import type { OrderLineInput } from '@/services/order.service'
import type { BadgeProps } from '@/components/ui/schadcn/badge'

// ============================================
// Base Order Types
// ============================================

/**
 * Order data from the API response
 */
export interface OrderData {
  orderNumber: string
  orderDate: string
  customerTitle: string
  customerId: string
}

/**
 * Order metadata for display
 */
export interface OrderMetadata {
  orderType: string
  orderLanguage: string
  exchangeUnit: string
  exchangeRate: number
  totalItems: number
  totalQuantity: number
}

/**
 * Order summary with calculated totals
 */
export interface OrderSummary {
  subtotal: number
  vatTotal: number
  total: number
}

/**
 * Extended order line with calculated values
 */
export interface OrderLineWithCalculations extends OrderLineInput {
  vatAmount: number
  lineTotal: number
}

/**
 * Complete order confirmation data
 */
export interface OrderConfirmationData {
  orderData: OrderData
  dispatchAddress: FormattedAddress
  invoiceAddress: FormattedAddress
  orderLines: OrderLineInput[]
  orderSummary: OrderSummary
  orderMetadata: OrderMetadata
}

// ============================================
// Component Props Interfaces
// ============================================

/**
 * Main modal component props
 */
export interface OrderConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  orderData: OrderData
  dispatchAddress: FormattedAddress
  invoiceAddress: FormattedAddress
  orderLines: OrderLineInput[]
  orderSummary: OrderSummary
  orderMetadata: OrderMetadata
}

/**
 * Order header section props
 */
export interface OrderHeaderProps {
  orderData: OrderData
  dispatchAddress: FormattedAddress
  invoiceAddress: FormattedAddress
  orderType: string
}

/**
 * Order lines table props
 */
export interface OrderLinesTableProps {
  orderLines: OrderLineInput[]
}

/**
 * Order summary section props
 */
export interface OrderSummaryProps {
  orderSummary: OrderSummary
  orderMetadata: OrderMetadata
}

// ============================================
// Atom Component Props
// ============================================

/**
 * Address display component props
 */
export interface AddressDisplayProps {
  address: FormattedAddress
  label?: string
  icon?: React.ReactNode
  className?: string
}

/**
 * Order badge component props
 */
export interface OrderBadgeProps {
  type: string
  variant?: BadgeProps['variant']
  className?: string
}

/**
 * Price display component props
 */
export interface PriceDisplayProps {
  amount: number
  currency?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showCurrency?: boolean
}

// ============================================
// Translation Types
// ============================================

/**
 * Table translation keys
 */
export interface TableTranslations {
  productId: string
  productName: string
  quantity: string
  unitPrice: string
  vatPercent: string
  vatAmount: string
  lineTotal: string
}

/**
 * Summary translation keys
 */
export interface SummaryTranslations {
  subtotal: string
  vatTotal: string
  total: string
  totalItems: string
  totalQuantity: string
  exchangeUnit: string
}

/**
 * Order confirmation translation keys
 */
export interface OrderConfirmationTranslations {
  title: string
  description: string
  orderDetails: string
  orderNumber: string
  orderDate: string
  customer: string
  orderType: string
  dispatchAddress: string
  invoiceAddress: string
  orderLines: string
  orderSummary: string
  close: string
  table: TableTranslations
  summary: SummaryTranslations
}

// ============================================
// Hook Return Types
// ============================================

/**
 * Order calculations hook return type
 */
export interface UseOrderCalculationsReturn {
  orderLinesWithCalculations: OrderLineWithCalculations[]
  calculateVAT: (amount: number, vatPercent: number) => number
  calculateLineTotal: (
    unitPrice: number,
    quantity: number,
    vatPercent: number
  ) => number
  totals: {
    subtotal: number
    vatTotal: number
    grandTotal: number
  }
}

// ============================================
// Utility Function Types
// ============================================

/**
 * Address formatter function type
 */
export type AddressFormatter = (address: FormattedAddress) => string

/**
 * Price formatter function type
 */
export type PriceFormatter = (amount: number, currency?: string) => string

/**
 * Date formatter function type
 */
export type DateFormatter = (date: string, format?: string) => string

// ============================================
// Table Column Types
// ============================================

/**
 * Order line table column definition
 */
export interface OrderLineColumn {
  id: keyof OrderLineWithCalculations
  header: string
  accessor: (row: OrderLineWithCalculations) => string | number
  className?: string
  align?: 'left' | 'center' | 'right'
}
