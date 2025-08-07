/**
 * TypeScript Types for GetCategoriesQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetCategoriesQuery
 */
export interface GetCategoriesQueryVariables {
  company_id: string
}

/**
 * Single category item from the query response
 */
export interface CategoryItem {
  stock_groups: string
  our_company: string
  image_url: string | null
  alt_text: string | null
}

/**
 * Complete response structure from GetCategoriesQuery
 */
export interface GetCategoriesQueryResponse {
  _type_stock_groups: CategoryItem[]
}

/**
 * Type guard to check if data is GetCategoriesQueryResponse
 */
export function isGetCategoriesQueryResponse(
  data: unknown
): data is GetCategoriesQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    '_type_stock_groups' in data &&
    Array.isArray((data as GetCategoriesQueryResponse)._type_stock_groups)
  )
}
