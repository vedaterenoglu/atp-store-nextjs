/**
 * Zod Schema for GetCustomerTitlesQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetCustomerTitlesQueryResponse } from './GetCustomerTitlesQuery.types'

/**
 * Schema for input variables
 */
export const GetCustomerTitlesQueryVariablesSchema = z.object({
  company_id: z.string(),
  customerids: z.array(z.string()).optional(),
})

/**
 * Schema for single customer title item
 */
export const CustomerTitleItemSchema = z.object({
  customer_id: z.string(),
  customer_title: z.string(),
})

/**
 * Schema for complete query response
 */
export const GetCustomerTitlesQueryResponseSchema = z.object({
  customers: z.array(CustomerTitleItemSchema),
}) satisfies z.ZodType<GetCustomerTitlesQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetCustomerTitlesResponse(
  data: unknown
): GetCustomerTitlesQueryResponse {
  return GetCustomerTitlesQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetCustomerTitlesResponse(data: unknown) {
  return GetCustomerTitlesQueryResponseSchema.safeParse(data)
}