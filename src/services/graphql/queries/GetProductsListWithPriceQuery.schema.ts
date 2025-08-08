/**
 * Zod Schema for GetProductsListWithPriceQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetProductsListWithPriceQueryResponse } from './GetProductsListWithPriceQuery.types'

/**
 * Schema for input variables
 */
export const GetProductsListWithPriceQueryVariablesSchema = z.object({
  company_id: z.string(),
})

/**
 * Schema for stock item
 */
export const StockItemSchema = z.object({
  stock_group: z.string().nullable(),
  stock_id: z.string(),
  stock_name: z.string().nullable(),
  stock_unit: z.string().nullable(),
  stock_price: z.number().nullable(),
  stock_image_link: z.string().nullable(),
})

/**
 * Schema for complete query response
 */
export const GetProductsListWithPriceQueryResponseSchema = z.object({
  stock: z.array(StockItemSchema),
}) satisfies z.ZodType<GetProductsListWithPriceQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetProductsListWithPriceResponse(
  data: unknown
): GetProductsListWithPriceQueryResponse {
  return GetProductsListWithPriceQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetProductsListWithPriceResponse(data: unknown) {
  return GetProductsListWithPriceQueryResponseSchema.safeParse(data)
}
