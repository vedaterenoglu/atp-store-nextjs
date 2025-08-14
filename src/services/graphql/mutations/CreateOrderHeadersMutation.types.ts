/**
 * CreateOrderHeadersMutation Types
 * SOLID Principles: SRP - Single responsibility for order creation mutation types
 * Design Patterns: Type Definition Pattern
 * Dependencies: None
 */

// Order line (goods transaction) input
export interface GoodsTransactionInput {
  goods_transaction_id: string // UUID
  transaction_type: string
  stock_id: string
  line_info: string
  amount_credit: number
  order_amount: number
  dispatch_amount: number
  unit_price: number
  vat_percent: number
  vat_credit: number
  invoice_price: number
  line_price_total_credit: number
  vat_credit_exchange: number
  invoice_price_exchange: number
  line_price_total_credit_exchange: number
}

// Order header input
export interface OrderHeaderInput {
  company_id: string
  order_number: string
  order_date: string // yyyy-mm-dd format
  order_source: string
  order_type: string // 'Inland' | 'Inside EU' | 'Outside EU'
  order_exchange_unit: string
  order_exchange_rate: number
  order_language: string // 'se' | 'en'
  customer_id: string
  dispatch_address_id: string
  invoice_address_id: string
  order_lock: boolean
  order_heders_goods_transactions_rel: {
    data: GoodsTransactionInput[]
  }
}

// Variables for the mutation
export interface CreateOrderHeadersMutationVariables {
  input: OrderHeaderInput[]
}

// Address type returned from mutation
export interface AddressResponse {
  address_nickname: string
  line_1: string
  line_2: string | null
  city: string
}

// Response structure
export interface CreateOrderHeadersMutationResponse {
  insert_order_headers: {
    affected_rows: number
    returning: Array<{
      order_number: string
      order_date: string
      _dispatch_address: AddressResponse
      _invoice_address: AddressResponse
      customer: {
        customer_title: string
      }
    }>
  }
}

// Order type helper
export type OrderType = 'Inland' | 'Inside EU' | 'Outside EU'
export type OrderLanguage = 'se' | 'en'
