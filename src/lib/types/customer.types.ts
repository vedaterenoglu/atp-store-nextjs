/**
 * Customer Types - SSOT for customer-related type definitions
 * SOLID Principles: SRP - Single responsibility for customer types
 * Design Patterns: Type definitions following DRY principle
 * Dependencies: None (pure types)
 */

/**
 * Customer account information from backend
 */
export interface CustomerAccount {
  customer_id: string
  customer_title?: string
  customer_nickname?: string
}

/**
 * API response for customer titles
 */
export interface CustomerTitlesResponse {
  customers: CustomerAccount[]
}

/**
 * Customer switch request
 */
export interface CustomerSwitchRequest {
  customerId: string
}

/**
 * Customer switch response
 */
export interface CustomerSwitchResponse {
  success: boolean
  customerId?: string
  error?: string
}

/**
 * Active customer context
 */
export interface ActiveCustomerContext {
  customerId: string | null
  customerTitle: string | null
  isImpersonating: boolean
}

/**
 * API response for all customers (admin only)
 */
export interface AllCustomersResponse {
  customers: CustomerAccount[]
}