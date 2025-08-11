/**
 * Zod Schema for GetAllActiveCustomersQuery
 *
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetAllActiveCustomersQueryResponse } from './GetAllActiveCustomersQuery.types'

/**
 * Schema for input variables
 */
export const GetAllActiveCustomersQueryVariablesSchema = z.object({
  company_id: z.string(),
})

/**
 * Schema for single customer item
 */
export const ActiveCustomerItemSchema = z.object({
  customer_id: z.string(),
  customer_title: z.string(),
})

/**
 * Schema for complete query response
 */
export const GetAllActiveCustomersQueryResponseSchema = z.object({
  customers: z.array(ActiveCustomerItemSchema),
}) satisfies z.ZodType<GetAllActiveCustomersQueryResponse>

/**
 * Parse and validate response data
 */
export function validateGetAllActiveCustomersResponse(
  data: unknown
): GetAllActiveCustomersQueryResponse {
  return GetAllActiveCustomersQueryResponseSchema.parse(data)
}

/**
 * Safe parse with error handling
 */
export function safeValidateGetAllActiveCustomersResponse(data: unknown) {
  return GetAllActiveCustomersQueryResponseSchema.safeParse(data)
}