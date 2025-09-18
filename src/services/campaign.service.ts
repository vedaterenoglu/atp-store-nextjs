/**
 * Campaign Service - Fetches campaign products from GraphQL
 * SOLID Principles: SRP - Manages campaign data fetching
 * Design Patterns: Service Pattern, Repository Pattern
 * Dependencies: GraphQL Client (API Route Proxy)
 * Note: This service should only be used on the server-side
 */

import type { CampaignProduct } from '@/types/campaign'
import { validateGetCampaignProductsWithPricesResponse } from '@/services/graphql/queries/GetCampaignProductsWithPrices.schema'
import type { GetCampaignProductsWithPricesQueryResponse } from '@/services/graphql/queries/GetCampaignProductsWithPrices.types'

/**
 * Fetches active campaign products for a company
 * @param companyId - The company ID to fetch products for
 * @returns Array of campaign products
 */
export async function getCampaignProducts(
  companyId: string
): Promise<CampaignProduct[]> {
  try {
    // Construct absolute URL for Server Components
    const baseUrl =
      typeof window === 'undefined'
        ? process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3081'
        : ''

    // Use new API route facade with no-cache policy
    const response = await fetch(
      `${baseUrl}/api/campaign-products?company_id=${companyId}`,
      {
        cache: 'no-store', // Disable caching to always get fresh data
        next: {
          revalidate: 0, // Ensure no caching in Next.js
        },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch campaign products:', response.statusText)
      return []
    }

    const data: GetCampaignProductsWithPricesQueryResponse =
      await response.json()

    if (!data) {
      return []
    }

    // Validate response with Zod
    const validatedResponse =
      validateGetCampaignProductsWithPricesResponse(data)

    // Return empty array if no campaign products
    if (!validatedResponse.stock || validatedResponse.stock.length === 0) {
      return []
    }

    // Transform to CampaignProduct type
    return validatedResponse.stock.map(product => ({
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
