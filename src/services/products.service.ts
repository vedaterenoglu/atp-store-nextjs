/**
 * Product data fetching and filtering service
 *
 * Responsibilities:
 * - Fetches product data from Hasura GraphQL API using Apollo Client
 * - Transforms backend 'stock' terminology to frontend 'products'
 * - Provides product filtering by category and search term
 *
 * Architecture:
 * - SOLID Principles: SRP (focused on product data operations)
 * - Patterns: Repository (data access abstraction), Service Layer
 *
 * Dependencies: Apollo Client, products schema, manual types
 */

import { validateGetProductsListWithPriceResponse } from '@/services/graphql/queries/GetProductsListWithPriceQuery.schema'
import type { GetProductsListWithPriceQueryResponse } from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'
import {
  validateAndTransformProducts,
  type ProductsArray,
} from './utils/product-transforms'
import { env } from '@/lib/config/env'

/**
 * Fetches all products from the backend using API route facade
 * Maps backend 'stock' data to frontend 'products' model
 */
export async function getProducts(): Promise<ProductsArray> {
  try {
    const companyId = process.env['COMPANY_ID'] || env.COMPANY_ID || 'alfe'

    // Construct absolute URL for Server Components
    const baseUrl =
      typeof window === 'undefined'
        ? process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3081'
        : ''

    // Use new API route facade
    const response = await fetch(
      `${baseUrl}/api/products?company_id=${companyId}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    const data: GetProductsListWithPriceQueryResponse = await response.json()

    if (!data?.stock) {
      console.error('No products data returned from API')
      return []
    }

    // Validate the response structure with Zod
    const validatedResponse = validateGetProductsListWithPriceResponse(data)

    // Transform and return the validated data
    return validateAndTransformProducts(validatedResponse.stock)
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

/**
 * Fetches products by category
 * @param categoryId - The category ID (stock_group) to filter by
 */
export async function getProductsByCategory(
  categoryId: string
): Promise<ProductsArray> {
  // TODO: Implement when GetProductsWithPriceListByCategryQuery is needed
  // For now, we can filter client-side
  const allProducts = await getProducts()
  return allProducts.filter(product => product.categoryId === categoryId)
}

/**
 * Search products by name
 * @param searchTerm - The search term to filter products
 */
export async function searchProducts(
  searchTerm: string
): Promise<ProductsArray> {
  // Client-side search for now
  const allProducts = await getProducts()
  const lowerSearchTerm = searchTerm.toLowerCase()

  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowerSearchTerm)
  )
}
