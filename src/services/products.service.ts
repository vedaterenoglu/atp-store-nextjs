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

import { serverGraphQLFetch } from '@/lib/graphql/server-fetch'
import {
  validateAndTransformProducts,
  type ProductsArray,
} from '@/lib/graphql/schemas/products'
import { env } from '@/lib/config/env'

// Define the query response type
interface GetProductsListWithPriceQueryResponse {
  stock: Array<{
    stock_id: string
    stock_name: string
    stock_price: number
    stock_unit: string
    stock_group: string
  }>
}

/**
 * Fetches all products from the backend
 * Maps backend 'stock' data to frontend 'products' model
 */
export async function getProducts(): Promise<ProductsArray> {
  try {
    // GraphQL query as a string
    const query = `
      query GetProductsListWithPriceQuery($company_id: String!) {
        stock(
          where: {
            company_id: { _eq: $company_id }
            stock_is_active: { _eq: true }
            _rel_type_stock_group: { willBeListed: { _eq: true } }
          }
          order_by: { stock_group: asc }
        ) {
          stock_group
          stock_id
          stock_name
          stock_unit
          stock_price
        }
      }
    `

    const { data, error } =
      await serverGraphQLFetch<GetProductsListWithPriceQueryResponse>({
        document: query,
        variables: {
          company_id: env.COMPANY_ID || 'alfe',
        },
      })

    if (error) {
      console.error('GraphQL error:', error)
      throw error
    }

    if (!data?.stock) {
      console.error('No products data returned from GraphQL')
      return []
    }

    // Transform and validate the data
    return validateAndTransformProducts(data.stock)
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
