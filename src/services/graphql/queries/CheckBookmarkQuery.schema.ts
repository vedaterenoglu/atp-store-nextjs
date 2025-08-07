/**
 * Zod Schema for CheckBookmarkQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { CheckBookmarkQueryResponse } from './CheckBookmarkQuery.types'

/**
 * Schema for input variables
 */
export const CheckBookmarkQueryVariablesSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  stock_id: z.string(),
})

/**
 * Schema for bookmark item
 */
export const BookmarkItemSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  stock_id: z.string(),
})

/**
 * Schema for complete query response
 */
export const CheckBookmarkQueryResponseSchema = z.object({
  customer_bookmarks: z.array(BookmarkItemSchema),
}) satisfies z.ZodType<CheckBookmarkQueryResponse>

/**
 * Parse and validate response data
 */
export function validateCheckBookmarkResponse(
  data: unknown
): CheckBookmarkQueryResponse {
  return CheckBookmarkQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateCheckBookmarkResponse(data: unknown) {
  return CheckBookmarkQueryResponseSchema.safeParse(data)
}
