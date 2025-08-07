/**
 * TypeScript Types for GetMostPurchasedProductsQuery
 *
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Input variables for GetMostPurchasedProductsQuery
 */
export interface GetMostPurchasedProductsQueryVariables {
  company_id: string
  customer_id: string
  bd: string // begin date (ISO format: YYYY-MM-DD)
  ed: string // end date (ISO format: YYYY-MM-DD)
}

/**
 * Stock relationship for goods transaction with full product details
 */
export interface GoodsTransactionStockRel {
  stock_id: string
  stock_name: string | null
  stock_price: number | null
  stock_unit: string | null
  stock_group: string | null
  stock_image_link: string | null
}

/**
 * Aggregate sum for amount credit
 */
export interface AmountCreditSum {
  amount_credit: number | null
}

/**
 * Aggregate for goods transaction relation
 */
export interface GoodsTransactionRelAggregate {
  sum: AmountCreditSum
}

/**
 * Goods transaction aggregate container
 */
export interface GoodsTransactionAggregate {
  aggregate: GoodsTransactionRelAggregate
}

/**
 * Individual goods transaction item
 */
export interface GoodsTransaction {
  stock_id: string
  goods_transactions_stock_rel: GoodsTransactionStockRel | null
  goods_transaction_goods_transaction_rel_aggregate: GoodsTransactionAggregate | null
}

/**
 * Count aggregate for goods transactions
 */
export interface GoodsTransactionsCountAggregate {
  count: number
}

/**
 * Goods transactions aggregate container
 */
export interface GoodsTransactionsAggregate {
  aggregate: GoodsTransactionsCountAggregate
}

/**
 * Complete response structure from GetMostPurchasedProductsQuery
 */
export interface GetMostPurchasedProductsQueryResponse {
  goods_transactions: GoodsTransaction[]
  goods_transactions_aggregate: GoodsTransactionsAggregate
}

/**
 * Type guard to check if data is GetMostPurchasedProductsQueryResponse
 */
export function isGetMostPurchasedProductsQueryResponse(
  data: unknown
): data is GetMostPurchasedProductsQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'goods_transactions' in data &&
    'goods_transactions_aggregate' in data &&
    Array.isArray(
      (data as GetMostPurchasedProductsQueryResponse).goods_transactions
    )
  )
}
