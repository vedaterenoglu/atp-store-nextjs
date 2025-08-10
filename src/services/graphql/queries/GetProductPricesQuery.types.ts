/**
 * TypeScript Types for GetProductPricesQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetProductPricesQuery
 */
export interface GetProductPricesQueryVariables {
  company_id: string
  customer_id: string
  stock_id: string
}

/**
 * Stock price information from the query response
 */
export interface StockPriceItem {
  stock_price: number | null
  stock_price_a: number | null
  stock_price_b: number | null
  stock_price_c: number | null
  stock_price_d: number | null
  stock_price_s: number | null
  stock_price_hra: number | null
  stock_price_hrb: number | null
  stock_price_hrc: number | null
  stock_price_hrd: number | null
  stock_price_z: number | null
  campaign_price: number | null
  is_campaign_active: boolean | null
  stock_moms: number | null
}

/**
 * Customer price list item from the query response
 */
export interface CustomerPriceListItem {
  customers_price: number | null
}

/**
 * Customer information from the query response
 */
export interface CustomerItem {
  customer_price_class: string | null
}

/**
 * Complete response structure from GetProductPricesQuery
 */
export interface GetProductPricesQueryResponse {
  stock: StockPriceItem[]
  customer_price_list: CustomerPriceListItem[]
  customers: CustomerItem[]
}

/**
 * Type guard to check if data is GetProductPricesQueryResponse
 */
export function isGetProductPricesQueryResponse(
  data: unknown
): data is GetProductPricesQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'stock' in data &&
    'customer_price_list' in data &&
    'customers' in data &&
    Array.isArray((data as GetProductPricesQueryResponse).stock) &&
    Array.isArray(
      (data as GetProductPricesQueryResponse).customer_price_list
    ) &&
    Array.isArray((data as GetProductPricesQueryResponse).customers)
  )
}
