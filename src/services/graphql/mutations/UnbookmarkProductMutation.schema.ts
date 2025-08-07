/**
 * Zod Schema for UnbookmarkProductMutation
 *
 * SOLID Principles: SRP - Single responsibility for mutation validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { UnbookmarkProductMutationResponse } from './UnbookmarkProductMutation.types'

/**
 * Schema for input variables
 */
export const UnbookmarkProductMutationVariablesSchema = z.object({
  company_id: z.string(),
  customer_id: z.string(),
  stock_id: z.string(),
})

/**
 * Schema for customer info
 */
export const UnbookmarkCustomerSchema = z.object({
  customer_id: z.string(),
  customer_nickname: z.string().nullable(),
})

/**
 * Schema for stock info
 */
export const UnbookmarkStockSchema = z.object({
  stock_id: z.string(),
  stock_name: z.string().nullable(),
})

/**
 * Schema for returned unbookmark
 */
export const UnbookmarkReturningSchema = z.object({
  company_id: z.string(),
  customer: UnbookmarkCustomerSchema.nullable(),
  stock: UnbookmarkStockSchema.nullable(),
})

/**
 * Schema for complete mutation response
 */
export const UnbookmarkProductMutationResponseSchema = z.object({
  delete_customer_bookmarks: z
    .object({
      returning: z.array(UnbookmarkReturningSchema),
      affected_rows: z.number(),
    })
    .nullable(),
}) satisfies z.ZodType<UnbookmarkProductMutationResponse>

/**
 * Parse and validate response data
 */
export function validateUnbookmarkProductResponse(
  data: unknown
): UnbookmarkProductMutationResponse {
  return UnbookmarkProductMutationResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateUnbookmarkProductResponse(data: unknown) {
  return UnbookmarkProductMutationResponseSchema.safeParse(data)
}
