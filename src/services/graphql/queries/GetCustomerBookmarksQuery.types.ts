/**
 * TypeScript Types for GetCustomerBookmarksQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetCustomerBookmarksQuery
 */
export interface GetCustomerBookmarksQueryVariables {
  company_id: string
  customer_id: string
}

/**
 * Stock info in bookmark with full product details
 */
export interface CustomerBookmarkStock {
  stock_id: string
  stock_name: string | null
  stock_price: number | null
  stock_unit: string | null
  stock_group: string | null
  stock_image_link: string | null
}

/**
 * Customer bookmark item from the query response
 */
export interface CustomerBookmarkItem {
  company_id: string
  customer_id: string
  stock_id: string
  stock: CustomerBookmarkStock | null
}

/**
 * Complete response structure from GetCustomerBookmarksQuery
 */
export interface GetCustomerBookmarksQueryResponse {
  customer_bookmarks: CustomerBookmarkItem[]
}

/**
 * Type guard to check if data is GetCustomerBookmarksQueryResponse
 */
export function isGetCustomerBookmarksQueryResponse(
  data: unknown
): data is GetCustomerBookmarksQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'customer_bookmarks' in data &&
    Array.isArray(
      (data as GetCustomerBookmarksQueryResponse).customer_bookmarks
    )
  )
}
