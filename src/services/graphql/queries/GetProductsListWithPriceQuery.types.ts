/**
 * TypeScript Types for GetProductsListWithPriceQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetProductsListWithPriceQuery
 */
export interface GetProductsListWithPriceQueryVariables {
  company_id: string
}

/**
 * Stock item from the query response
 */
export interface StockItem {
  stock_group: string | null
  stock_id: string
  stock_name: string | null
  stock_unit: string | null
  stock_price: number | null
  stock_image_link: string | null
}

/**
 * Complete response structure from GetProductsListWithPriceQuery
 */
export interface GetProductsListWithPriceQueryResponse {
  stock: StockItem[]
}

/**
 * Type guard to check if data is GetProductsListWithPriceQueryResponse
 */
export function isGetProductsListWithPriceQueryResponse(
  data: unknown
): data is GetProductsListWithPriceQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'stock' in data &&
    Array.isArray((data as GetProductsListWithPriceQueryResponse).stock)
  )
}
