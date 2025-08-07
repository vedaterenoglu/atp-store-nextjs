/**
 * Zod Schema for GetMostPurchasedProductsQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetMostPurchasedProductsQueryResponse } from './GetMostPurchasedProductsQuery.types'

/**
 * Schema for input variables
 */
export const GetMostPurchasedProductsQueryVariablesSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  bd: z.string(), // begin date
  ed: z.string(), // end date
})

/**
 * Schema for stock relationship with full product details
 */
export const GoodsTransactionStockRelSchema = z.object({
  stock_id: z.string(),
  stock_name: z.string().nullable(),
  stock_price: z.number().nullable(),
  stock_unit: z.string().nullable(),
  stock_group: z.string().nullable(),
  stock_image_link: z.string().nullable(),
})

/**
 * Schema for amount credit sum
 */
export const AmountCreditSumSchema = z.object({
  amount_credit: z.number().nullable(),
})

/**
 * Schema for goods transaction relation aggregate
 */
export const GoodsTransactionRelAggregateSchema = z.object({
  sum: AmountCreditSumSchema,
})

/**
 * Schema for goods transaction aggregate container
 */
export const GoodsTransactionAggregateSchema = z.object({
  aggregate: GoodsTransactionRelAggregateSchema,
})

/**
 * Schema for individual goods transaction
 */
export const GoodsTransactionSchema = z.object({
  stock_id: z.string(),
  goods_transactions_stock_rel: GoodsTransactionStockRelSchema.nullable(),
  goods_transaction_goods_transaction_rel_aggregate:
    GoodsTransactionAggregateSchema.nullable(),
})

/**
 * Schema for count aggregate
 */
export const GoodsTransactionsCountAggregateSchema = z.object({
  count: z.number(),
})

/**
 * Schema for goods transactions aggregate
 */
export const GoodsTransactionsAggregateSchema = z.object({
  aggregate: GoodsTransactionsCountAggregateSchema,
})

/**
 * Schema for complete query response
 */
export const GetMostPurchasedProductsQueryResponseSchema = z.object({
  goods_transactions: z.array(GoodsTransactionSchema),
  goods_transactions_aggregate: GoodsTransactionsAggregateSchema,
}) satisfies z.ZodType<GetMostPurchasedProductsQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetMostPurchasedProductsResponse(
  data: unknown
): GetMostPurchasedProductsQueryResponse {
  return GetMostPurchasedProductsQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetMostPurchasedProductsResponse(data: unknown) {
  return GetMostPurchasedProductsQueryResponseSchema.safeParse(data)
}
