/**
 * @file dashboard.types.ts
 * @role TypeScript type definitions for customer dashboard data
 * @patterns Single Source of Truth, Type Safety
 * @solid SRP - Single responsibility for dashboard type definitions
 * @tests N/A - Type definitions file
 */

// Waiting Orders Types
export interface OrderLineItem {
  amount_credit: number
  line_info: string
}

export interface WaitingOrder {
  order_date: string
  order_number: string
  order_source: string
  order_heders_goods_transactions_rel: OrderLineItem[]
}

export interface WaitingOrdersResponse {
  order_headers: WaitingOrder[]
}

// Uninvoiced Deliveries Types
export interface DeliveryLineItem {
  amount_credit: number
  line_info: string
}

export interface UninvoicedDelivery {
  dispatch_date: string
  dispatch_number: string
  _goods_transactions: DeliveryLineItem[]
}

export interface UninvoicedDeliveriesResponse {
  dispatch_headers: UninvoicedDelivery[]
}

// Unpaid Invoices Types
export interface InvoiceAggregate {
  aggregate: {
    sum: {
      line_price_total_credit_exchange: number | null
      vat_credit_exchange: number | null
    }
  }
}

export interface PaymentAggregate {
  aggregate: {
    sum: {
      payment_credit_in_exchange: number | null
    }
  }
}

export interface UnpaidInvoice {
  invoice_date: string
  invoice_due_date: string
  invoice_number: string
  is_invoice_paid: string
  is_invoice_reminded: boolean
  is_sent_in_the_bailiffs: boolean
  is_fee_addable: boolean
  paper_invoice_fee: number
  paper_invoice_fee_vat: number
  _invoice_lines_aggregate: InvoiceAggregate
  invoice_exchange_unit: string
  invoice_payments_aggregate: PaymentAggregate
}

export interface UnpaidInvoicesResponse {
  document_transactions: UnpaidInvoice[]
}

// Dashboard View Types
export type DashboardView =
  | 'waiting-orders'
  | 'uninvoiced-deliveries'
  | 'unpaid-invoices'

export interface DashboardViewConfig {
  id: DashboardView
  label: string
  icon: string
  description: string
}

// Calculated Invoice Type
export interface CalculatedInvoice extends UnpaidInvoice {
  totalAmount: number
  remainingAmount: number
  isOverdue: boolean
  daysOverdue: number
}
