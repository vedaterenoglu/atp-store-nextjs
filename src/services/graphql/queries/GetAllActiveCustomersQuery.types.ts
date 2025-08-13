/**
 * TypeScript Types for GetAllActiveCustomersQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetAllActiveCustomersQuery
 */
export interface GetAllActiveCustomersQueryVariables {
  company_id: string
}

/**
 * Single customer item from the query response
 */
export interface ActiveCustomerItem {
  customer_id: string
  customer_title: string
}

/**
 * Complete response structure from GetAllActiveCustomersQuery
 */
export interface GetAllActiveCustomersQueryResponse {
  customers: ActiveCustomerItem[]
}

/**
 * Type guard to check if data is GetAllActiveCustomersQueryResponse
 */
export function isGetAllActiveCustomersQueryResponse(
  data: unknown
): data is GetAllActiveCustomersQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'customers' in data &&
    Array.isArray((data as GetAllActiveCustomersQueryResponse).customers)
  )
}
