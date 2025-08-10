/**
 * TypeScript types for GetCampaignProductsWithPrices GraphQL query
 * SOLID Principles: SRP - Single responsibility for query type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

/**
 * Variables for GetCampaignProductsWithPrices query
 */
export interface GetCampaignProductsWithPricesQueryVariables {
  company_id: string
}

/**
 * Stock item with campaign pricing information
 */
export interface CampaignStock {
  is_campaign_active: boolean | null
  stock_id: string
  stock_name: string
  stock_group: string
  stock_image_link: string | null
  stock_unit: string
  stock_price: number
  campaign_price: number | null
}

/**
 * Response structure for GetCampaignProductsWithPrices query
 */
export interface GetCampaignProductsWithPricesQueryResponse {
  stock: CampaignStock[]
}
