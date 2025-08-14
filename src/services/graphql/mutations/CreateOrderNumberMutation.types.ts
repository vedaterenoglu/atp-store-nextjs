/**
 * CreateOrderNumberMutation Types
 * SOLID Principles: SRP - Single responsibility for order number mutation types
 * Design Patterns: Type Definition Pattern
 * Dependencies: None
 */

// Variables for the mutation
export interface CreateOrderNumberMutationVariables {
  company_nickname: string
}

// Order number data returned
export interface OrderNumberData {
  order_number: number
  letter_code: string
}

// Response structure
export interface CreateOrderNumberMutationResponse {
  update_companies: {
    returning: OrderNumberData[]
  }
}

// Formatted order number for use in application
export interface FormattedOrderNumber {
  fullNumber: string // e.g., "AL 130130"
  orderNumber: number
  letterCode: string
}