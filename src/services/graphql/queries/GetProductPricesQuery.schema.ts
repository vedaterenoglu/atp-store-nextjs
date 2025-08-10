/**
 * Zod Schema for GetProductPricesQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetProductPricesQueryResponse } from './GetProductPricesQuery.types'

/**
 * Schema for input variables
 */
export const GetProductPricesQueryVariablesSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  stock_id: z.string(),
})

/**
 * Schema for stock price information
 */
export const StockPriceItemSchema = z.object({
  stock_price: z.number().nullable(),
  stock_price_a: z.number().nullable(),
  stock_price_b: z.number().nullable(),
  stock_price_c: z.number().nullable(),
  stock_price_d: z.number().nullable(),
  stock_price_s: z.number().nullable(),
  stock_price_hra: z.number().nullable(),
  stock_price_hrb: z.number().nullable(),
  stock_price_hrc: z.number().nullable(),
  stock_price_hrd: z.number().nullable(),
  stock_price_z: z.number().nullable(),
  campaign_price: z.number().nullable(),
  is_campaign_active: z.boolean().nullable(),
  stock_moms: z.number().nullable(),
})

/**
 * Schema for customer price list
 */
export const CustomerPriceListItemSchema = z.object({
  customers_price: z.number().nullable(),
})

/**
 * Schema for customer information
 */
export const CustomerItemSchema = z.object({
  customer_price_class: z.string().nullable(),
})

/**
 * Schema for complete query response
 */
export const GetProductPricesQueryResponseSchema = z.object({
  stock: z.array(StockPriceItemSchema),
  customer_price_list: z.array(CustomerPriceListItemSchema),
  customers: z.array(CustomerItemSchema),
}) satisfies z.ZodType<GetProductPricesQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetProductPricesResponse(
  data: unknown
): GetProductPricesQueryResponse {
  return GetProductPricesQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetProductPricesResponse(data: unknown) {
  return GetProductPricesQueryResponseSchema.safeParse(data)
}
