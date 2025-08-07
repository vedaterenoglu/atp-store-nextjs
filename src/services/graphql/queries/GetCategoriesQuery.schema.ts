/**
 * Zod Schema for GetCategoriesQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetCategoriesQueryResponse } from './GetCategoriesQuery.types'

/**
 * Schema for input variables
 */
export const GetCategoriesQueryVariablesSchema = z.object({
  company_id: z.string(),
})

/**
 * Schema for single category item
 */
export const CategoryItemSchema = z.object({
  stock_groups: z.string(),
  our_company: z.string(),
  image_url: z.string().nullable(),
  alt_text: z.string().nullable(),
})

/**
 * Schema for complete query response
 */
export const GetCategoriesQueryResponseSchema = z.object({
  _type_stock_groups: z.array(CategoryItemSchema),
}) satisfies z.ZodType<GetCategoriesQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetCategoriesResponse(
  data: unknown
): GetCategoriesQueryResponse {
  return GetCategoriesQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetCategoriesResponse(data: unknown) {
  return GetCategoriesQueryResponseSchema.safeParse(data)
}
