/**
 * Product data fetching and filtering service
 * 
 * Responsibilities:
 * - Fetches product data from Hasura GraphQL API
 * - Transforms backend 'stock' terminology to frontend 'products'
 * - Provides product filtering by category and search term
 * 
 * Architecture:
 * - SOLID Principles: SRP (focused on product data operations)
 * - Patterns: Repository (data access abstraction), Adapter (GraphQL client wrapper)
 * 
 * Dependencies: GraphQL adapter, products schema, generated GraphQL types
 */

import { graphQLClientAdapter } from '@/lib/graphql/adapter'
import {
  validateAndTransformProducts,
  type ProductsArray,
} from '@/lib/graphql/schemas/products'
import {
  GetProductsListWithPriceQueryDocument,
  type GetProductsListWithPriceQueryQuery,
} from '@/lib/generated/graphql'
import { env } from '@/lib/config/env'

/**
 * Fetches all products from the backend
 * Maps backend 'stock' data to frontend 'products' model
 */
export async function getProducts(): Promise<ProductsArray> {
  try {
    const result =
      await graphQLClientAdapter.request<GetProductsListWithPriceQueryQuery>({
        document: GetProductsListWithPriceQueryDocument,
        variables: {
          company_id: env.COMPANY_ID || 'alfe',
        },
      })

    if (!result.data?.stock) {
      console.error('No products data returned from GraphQL')
      return []
    }

    // Transform and validate the data
    return validateAndTransformProducts(result.data.stock)
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
