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

// Dynamic import for client selection based on environment
import type { ApolloClient } from '@apollo/client'

let getClient: () => ApolloClient<object>

if (typeof window !== 'undefined') {
  // Browser environment - use browser client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getBrowserClient } = require('@/lib/apollo/browser-client')
  getClient = getBrowserClient
} else {
  // Server environment - use server client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getClient: getServerClient } = require('@/lib/apollo/client')
  getClient = getServerClient
}

import GetProductsListWithPriceQueryDocument from '@/services/graphql/queries/GetProductsListWithPriceQuery.graphql'
import { validateGetProductsListWithPriceResponse } from '@/services/graphql/queries/GetProductsListWithPriceQuery.schema'
import type {
  GetProductsListWithPriceQueryResponse,
  GetProductsListWithPriceQueryVariables,
} from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'
import {
  validateAndTransformProducts,
  type ProductsArray,
} from './utils/product-transforms'
import { env } from '@/lib/config/env'

/**
 * Fetches all products from the backend
 * Maps backend 'stock' data to frontend 'products' model
 */
export async function getProducts(): Promise<ProductsArray> {
  try {
    const client = getClient()
    const { data } = await client.query<
      GetProductsListWithPriceQueryResponse,
      GetProductsListWithPriceQueryVariables
    >({
      query: GetProductsListWithPriceQueryDocument,
      variables: {
        company_id: process.env['COMPANY_ID'] || env.COMPANY_ID || 'alfe',
      },
    })

    if (!data?.stock) {
      console.error('No products data returned from GraphQL')
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
