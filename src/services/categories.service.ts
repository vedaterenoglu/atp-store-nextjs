/**
 * Category data fetching service with client-side caching
 * 
 * Responsibilities:
 * - Fetches category data from Hasura GraphQL API
 * - Validates responses using Zod schemas
 * - Transforms backend data to frontend-friendly format
 * - Provides client-side caching with TTL
 * 
 * Architecture:
 * - SOLID Principles: SRP (focused on category data operations)
 * - Patterns: Repository (data access abstraction), Cache-aside (manual cache management)
 * 
 * Dependencies: GraphQL client, Zod validation, categories schema
 */

import { executeGraphQLOperation } from '@/lib/graphql/client'
import {
  GetCategoriesQueryResponseSchema,
  type GetCategoriesQueryResponse,
  validateAndTransformCategories,
  type CategoriesArray,
  type Category,
} from '@/lib/graphql/schemas/categories'
import { env } from '@/lib/config/env'

// GraphQL query as string - matches GetCategoriesQuery.graphql exactly
const GET_CATEGORIES_QUERY = `
  query GetCategoriesQuery($company_id: String!) {
    _type_stock_groups(
      order_by: { stock_groups: asc }
      where: { our_company: { _eq: $company_id }, willBeListed: { _eq: true } }
    ) {
      stock_groups
      our_company
      image_url
      alt_text
    }
  }
`

/**
 * Fetch categories using urql with manual types and Zod validation
 * Returns frontend-friendly Category objects
 */
export async function getCategories(
  companyId?: string
): Promise<CategoriesArray> {
  try {
    // Use urql client adapter with manual type
    const response = await executeGraphQLOperation<GetCategoriesQueryResponse>(
      GET_CATEGORIES_QUERY,
      { company_id: companyId || env.COMPANY_ID || 'alfe' }
    )

    // Validate the response structure with Zod
    const validatedResponse = GetCategoriesQueryResponseSchema.parse(response)

    // Transform and return the validated data
    return validateAndTransformCategories(validatedResponse._type_stock_groups)
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
let categoriesCache: CategoriesArray | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getCategoriesWithCache(): Promise<CategoriesArray> {
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
 * Get a specific category by ID
 */
export async function getCategoryById(
  categoryId: string
): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find(cat => cat.id === categoryId)
}

/**
 * Get categories grouped by a custom criteria
 * Example of extending the base functionality
 */
export async function getCategoriesGrouped(): Promise<
  Record<string, Category[]>
> {
  const categories = await getCategories()

  // Group by first digit/letter of category name
  return categories.reduce(
    (acc, category) => {
      const firstChar = category.name.charAt(0)
      if (!acc[firstChar]) {
        acc[firstChar] = []
      }
      acc[firstChar].push(category)
      return acc
    },
    {} as Record<string, Category[]>
  )
}
