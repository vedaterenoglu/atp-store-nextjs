/**
 * Campaign Service - Fetches campaign products from GraphQL
 * SOLID Principles: SRP - Manages campaign data fetching
 * Design Patterns: Service Pattern, Repository Pattern
 * Dependencies: Apollo Client, GraphQL
 * Note: This service should only be used on the server-side
 */

import 'server-only' // Ensure this only runs on server
import apolloClient from '@/lib/apollo/client'
import type { CampaignProduct } from '@/types/campaign'
import GetCampaignProductsWithPricesDocument from '@/services/graphql/queries/GetCampaignProductsWithPrices.graphql'

interface GetCampaignProductsResponse {
  stock: Array<{
    stock_id: string
    stock_name: string
    stock_group: string
    stock_image_link: string | null
    stock_unit: string
    stock_price: number
    campaign_price: number | null
    is_campaign_active?: boolean
  }>
}

/**
 * Fetches active campaign products for a company
 * @param companyId - The company ID to fetch products for
 * @returns Array of campaign products
 */
export async function getCampaignProducts(
  companyId: string
): Promise<CampaignProduct[]> {
  try {
    const { data } = await apolloClient.query<GetCampaignProductsResponse>({
      query: GetCampaignProductsWithPricesDocument,
      variables: { company_id: companyId },
      fetchPolicy: 'network-only', // Always fetch fresh data
    })

    // Return empty array if no campaign products
    if (!data?.stock || data.stock.length === 0) {
      return []
    }

    // Transform to CampaignProduct type
    return data.stock.map(product => ({
      stock_id: product.stock_id,
      stock_name: product.stock_name,
      stock_group: product.stock_group,
      stock_image_link: product.stock_image_link || '/placeholder-product.jpg',
      stock_unit: product.stock_unit,
      stock_price: product.stock_price,
      campaign_price: product.campaign_price!,
      discount_percentage: Math.round(
        ((product.stock_price - product.campaign_price!) /
          product.stock_price) *
          100
      ),
    }))
  } catch (error) {
    console.error('Error fetching campaign products:', error)
    return []
  }
}

/**
 * Checks if there are any active campaign products
 * @param companyId - The company ID to check
 * @returns Boolean indicating if campaigns exist
 */
export async function hasCampaignProducts(companyId: string): Promise<boolean> {
  const products = await getCampaignProducts(companyId)
  return products.length > 0
}
