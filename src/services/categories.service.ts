/**
 * Category data fetching service with Apollo Client
 *
 * Responsibilities:
 * - Fetches category data from Hasura GraphQL API using Apollo
 * - Validates responses using Zod schemas
 * - Transforms backend data to frontend-friendly format
 * - Provides client-side caching with TTL
 *
 * Architecture:
 * - SOLID Principles: SRP (focused on category data operations)
 * - Patterns: Repository (data access abstraction), Cache-aside (manual cache management)
 *
 * Dependencies: Apollo Client, Zod validation, categories schema
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

import GetCategoriesQueryDocument from '@/services/graphql/queries/GetCategoriesQuery.graphql'
import { validateGetCategoriesResponse } from '@/services/graphql/queries/GetCategoriesQuery.schema'
import type {
  GetCategoriesQueryResponse,
  GetCategoriesQueryVariables,
} from '@/services/graphql/queries/GetCategoriesQuery.types'
import {
  validateAndTransformCategories,
  type CategoriesArray,
  type Category,
} from './utils/category-transforms'
import { env } from '@/lib/config/env'

/**
 * Fetch categories using Apollo Client with manual types and Zod validation
 * Returns frontend-friendly Category objects
 */
export async function getCategories(
  companyId?: string
): Promise<CategoriesArray> {
  try {
    // Use Apollo Client with manual type assertion
    const client = getClient()
    const { data } = await client.query<
      GetCategoriesQueryResponse,
      GetCategoriesQueryVariables
    >({
      query: GetCategoriesQueryDocument,
      variables: {
        company_id:
          companyId || process.env['COMPANY_ID'] || env.COMPANY_ID || 'alfe',
      },
    })

    // Validate the response structure with Zod (this also type-checks at runtime)
    const validatedResponse = validateGetCategoriesResponse(data)

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
