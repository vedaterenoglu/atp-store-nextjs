/**
 * Zod validation schemas for GetCampaignProductsWithPrices GraphQL query
 * SOLID Principles: SRP - Single responsibility for query validation
 * Design Patterns: Validation Pattern, Type Safety Pattern
 * Dependencies: zod
 */

import { z } from 'zod'
import type {
  GetCampaignProductsWithPricesQueryResponse,
  GetCampaignProductsWithPricesQueryVariables,
  CampaignStock,
} from './GetCampaignProductsWithPrices.types'

/**
 * Schema for query variables
 */
export const GetCampaignProductsWithPricesQueryVariablesSchema = z.object({
  company_id: z.string(),
}) satisfies z.ZodType<GetCampaignProductsWithPricesQueryVariables>

/**
 * Schema for campaign stock item
 */
export const CampaignStockSchema = z.object({
  is_campaign_active: z.boolean().nullable(),
  stock_id: z.string(),
  stock_name: z.string(),
  stock_group: z.string(),
  stock_image_link: z.string().nullable(),
  stock_unit: z.string(),
  stock_price: z.number(),
  campaign_price: z.number().nullable(),
}) satisfies z.ZodType<CampaignStock>

/**
 * Schema for complete query response
 */
export const GetCampaignProductsWithPricesQueryResponseSchema = z.object({
  stock: z.array(CampaignStockSchema),
}) satisfies z.ZodType<GetCampaignProductsWithPricesQueryResponse>

/**
 * Type guard to validate query response
 */
export function validateGetCampaignProductsWithPricesResponse(
  data: unknown
): GetCampaignProductsWithPricesQueryResponse {
  return GetCampaignProductsWithPricesQueryResponseSchema.parse(data)
}

/**
 * Type guard to validate query variables
 */
export function validateGetCampaignProductsWithPricesVariables(
  variables: unknown
): GetCampaignProductsWithPricesQueryVariables {
  return GetCampaignProductsWithPricesQueryVariablesSchema.parse(variables)
}
