/**
 * Zod Schema for GetCustomerBookmarksQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetCustomerBookmarksQueryResponse } from './GetCustomerBookmarksQuery.types'

/**
 * Schema for input variables
 */
export const GetCustomerBookmarksQueryVariablesSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
})

/**
 * Schema for stock info with full product details
 */
export const CustomerBookmarkStockSchema = z.object({
  stock_id: z.string(),
  stock_name: z.string().nullable(),
  stock_price: z.number().nullable(),
  stock_unit: z.string().nullable(),
  stock_group: z.string().nullable(),
  stock_image_link: z.string().nullable(),
})

/**
 * Schema for customer bookmark item
 */
export const CustomerBookmarkItemSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  stock_id: z.string(),
  stock: CustomerBookmarkStockSchema.nullable(),
})

/**
 * Schema for complete query response
 */
export const GetCustomerBookmarksQueryResponseSchema = z.object({
  customer_bookmarks: z.array(CustomerBookmarkItemSchema),
}) satisfies z.ZodType<GetCustomerBookmarksQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetCustomerBookmarksResponse(
  data: unknown
): GetCustomerBookmarksQueryResponse {
  return GetCustomerBookmarksQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetCustomerBookmarksResponse(data: unknown) {
  return GetCustomerBookmarksQueryResponseSchema.safeParse(data)
}
