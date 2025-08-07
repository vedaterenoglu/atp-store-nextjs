/**
 * TypeScript Types for UnbookmarkProductMutation
 *
 * SOLID Principles: SRP - Single responsibility for mutation type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for UnbookmarkProductMutation
 */
export interface UnbookmarkProductMutationVariables {
  company_id: string
  customer_id: string
  stock_id: string
}

/**
 * Customer info in unbookmark response
 */
export interface UnbookmarkCustomer {
  customer_id: string
  customer_nickname: string | null
}

/**
 * Stock info in unbookmark response
 */
export interface UnbookmarkStock {
  stock_id: string
  stock_name: string | null
}

/**
 * Returned unbookmark item
 */
export interface UnbookmarkReturning {
  company_id: string
  customer: UnbookmarkCustomer | null
  stock: UnbookmarkStock | null
}

/**
 * Complete response structure from UnbookmarkProductMutation
 */
export interface UnbookmarkProductMutationResponse {
  delete_customer_bookmarks: {
    returning: UnbookmarkReturning[]
    affected_rows: number
  } | null
}

/**
 * Type guard to check if data is UnbookmarkProductMutationResponse
 */
export function isUnbookmarkProductMutationResponse(
  data: unknown
): data is UnbookmarkProductMutationResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'delete_customer_bookmarks' in data
  )
}
