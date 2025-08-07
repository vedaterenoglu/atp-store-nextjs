/**
 * Zod Schema for BookmarkProductMutation
 *
 * SOLID Principles: SRP - Single responsibility for mutation validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { BookmarkProductMutationResponse } from './BookmarkProductMutation.types'

/**
 * Schema for input variables
 */
export const BookmarkProductMutationVariablesSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  stock_id: z.string(),
})

/**
 * Schema for customer info
 */
export const BookmarkCustomerSchema = z.object({
  customer_id: z.string(),
  customer_nickname: z.string().nullable(),
})

/**
 * Schema for stock info
 */
export const BookmarkStockSchema = z.object({
  stock_id: z.string(),
  stock_name: z.string().nullable(),
})

/**
 * Schema for returned bookmark
 */
export const BookmarkReturningSchema = z.object({
  company_id: z.string(),
  customer: BookmarkCustomerSchema.nullable(),
  stock: BookmarkStockSchema.nullable(),
})

/**
 * Schema for complete mutation response
 */
export const BookmarkProductMutationResponseSchema = z.object({
  insert_customer_bookmarks: z
    .object({
      returning: z.array(BookmarkReturningSchema),
      affected_rows: z.number(),
    })
    .nullable(),
}) satisfies z.ZodType<BookmarkProductMutationResponse>

/**
 * Parse and validate response data
 */
export function validateBookmarkProductResponse(
  data: unknown
): BookmarkProductMutationResponse {
  return BookmarkProductMutationResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateBookmarkProductResponse(data: unknown) {
  return BookmarkProductMutationResponseSchema.safeParse(data)
}
