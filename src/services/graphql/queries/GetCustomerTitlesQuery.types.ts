/**
 * TypeScript Types for GetCustomerTitlesQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetCustomerTitlesQuery
 */
export interface GetCustomerTitlesQueryVariables {
  company_id: string
  customerids?: string[]
}

/**
 * Single customer title item from the query response
 */
export interface CustomerTitleItem {
  customer_id: string
  customer_title: string
}

/**
 * Complete response structure from GetCustomerTitlesQuery
 */
export interface GetCustomerTitlesQueryResponse {
  customers: CustomerTitleItem[]
}

/**
 * Type guard to check if data is GetCustomerTitlesQueryResponse
 */
export function isGetCustomerTitlesQueryResponse(
  data: unknown
): data is GetCustomerTitlesQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'customers' in data &&
    Array.isArray((data as GetCustomerTitlesQueryResponse).customers)
  )
}