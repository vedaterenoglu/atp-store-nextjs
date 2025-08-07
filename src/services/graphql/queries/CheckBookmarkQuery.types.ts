/**
 * TypeScript Types for CheckBookmarkQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for CheckBookmarkQuery
 */
export interface CheckBookmarkQueryVariables {
  company_id: string
  customer_id: string
  stock_id: string
}

/**
 * Bookmark item from the query response
 */
export interface BookmarkItem {
  company_id: string
  customer_id: string
  stock_id: string
}

/**
 * Complete response structure from CheckBookmarkQuery
 */
export interface CheckBookmarkQueryResponse {
  customer_bookmarks: BookmarkItem[]
}

/**
 * Type guard to check if data is CheckBookmarkQueryResponse
 */
export function isCheckBookmarkQueryResponse(
  data: unknown
): data is CheckBookmarkQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'customer_bookmarks' in data &&
    Array.isArray((data as CheckBookmarkQueryResponse).customer_bookmarks)
  )
}
