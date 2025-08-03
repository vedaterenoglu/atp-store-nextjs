/**
 * Categories Service using urql + manual types + Zod
 * SOLID Principles: Single Responsibility - Handle category-related API calls
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity for UI
 * Dependencies: urql client adapter, Zod schemas, GraphQL query file
 */

import { executeGraphQLOperation } from '@/lib/graphql/client'
import {
  GetCategoriesQueryResponseSchema,
  type GetCategoriesQueryResponse,
  type StockGroup,
} from '@/lib/graphql/schemas/categories'

// GraphQL query as string
const GET_CATEGORIES_QUERY = `
  query GetCategoriesQuery {
    _type_stock_groups(
      order_by: { stock_groups: asc }
      where: { our_company: { _eq: "alfe" }, willBeListed: { _eq: true } }
    ) {
      stock_groups
      our_company
    }
  }
`

/**
 * Fetch categories using urql with manual types and Zod validation
 * Combines compile-time types with runtime validation
 */
export async function getCategories(): Promise<StockGroup[]> {
  try {
    // Use urql client adapter with manual type
    const response =
      await executeGraphQLOperation<GetCategoriesQueryResponse>(
        GET_CATEGORIES_QUERY
      )

    // Validate the response structure with Zod
    const validatedResponse = GetCategoriesQueryResponseSchema.parse(response)

    // Return the validated data
    return validatedResponse._type_stock_groups
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      console.error('Response validation failed:', error)
      throw new Error('Invalid response format from server')
    }

    // Re-throw other errors (network, GraphQL, etc.)
    throw error
  }
}

/**
 * Get categories with client-side caching
 * Useful for components that need frequent access to categories
 */
let categoriesCache: StockGroup[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getCategoriesWithCache(): Promise<StockGroup[]> {
  const now = Date.now()

  // Return cached data if still fresh
  if (categoriesCache && now - cacheTimestamp < CACHE_DURATION) {
    return categoriesCache
  }

  // Fetch fresh data
  const data = await getCategories()

  // Update cache
  categoriesCache = data
  cacheTimestamp = now

  return data
}

/**
 * Clear the categories cache
 * Useful after mutations that might affect categories
 */
export function clearCategoriesCache(): void {
  categoriesCache = null
  cacheTimestamp = 0
}

/**
 * Get a specific category by stock group name
 */
export async function getCategoryByStockGroup(
  stockGroup: string
): Promise<StockGroup | undefined> {
  const categories = await getCategories()
  return categories.find(cat => cat.stock_groups === stockGroup)
}

/**
 * Get categories grouped by a custom criteria
 * Example of extending the base functionality
 */
export async function getCategoriesGrouped(): Promise<
  Record<string, StockGroup[]>
> {
  const categories = await getCategories()

  // Group by first digit/letter of stock_groups
  return categories.reduce(
    (acc, category) => {
      const firstChar = category.stock_groups.charAt(0)
      if (!acc[firstChar]) {
        acc[firstChar] = []
      }
      acc[firstChar].push(category)
      return acc
    },
    {} as Record<string, StockGroup[]>
  )
}
