/**
 * TypeScript Types for BookmarkProductMutation
 *
 * SOLID Principles: SRP - Single responsibility for mutation type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for BookmarkProductMutation
 */
export interface BookmarkProductMutationVariables {
  company_id: string
  customer_id: string
  stock_id: string
}

/**
 * Customer info in bookmark response
 */
export interface BookmarkCustomer {
  customer_id: string
  customer_nickname: string | null
}

/**
 * Stock info in bookmark response
 */
export interface BookmarkStock {
  stock_id: string
  stock_name: string | null
}

/**
 * Returned bookmark item
 */
export interface BookmarkReturning {
  company_id: string
  customer: BookmarkCustomer | null
  stock: BookmarkStock | null
}

/**
 * Complete response structure from BookmarkProductMutation
 */
export interface BookmarkProductMutationResponse {
  insert_customer_bookmarks: {
    returning: BookmarkReturning[]
    affected_rows: number
  } | null
}

/**
 * Type guard to check if data is BookmarkProductMutationResponse
 */
export function isBookmarkProductMutationResponse(
  data: unknown
): data is BookmarkProductMutationResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'insert_customer_bookmarks' in data
  )
}
