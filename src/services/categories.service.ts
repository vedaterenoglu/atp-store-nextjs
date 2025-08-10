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

import { validateGetCategoriesResponse } from '@/services/graphql/queries/GetCategoriesQuery.schema'
import type { GetCategoriesQueryResponse } from '@/services/graphql/queries/GetCategoriesQuery.types'
import {
  validateAndTransformCategories,
  type CategoriesArray,
  type Category,
} from './utils/category-transforms'
import { env } from '@/lib/config/env'

/**
 * Fetch categories using API route facade
 * Returns frontend-friendly Category objects
 */
export async function getCategories(
  companyId?: string
): Promise<CategoriesArray> {
  try {
    const company =
      companyId || process.env['COMPANY_ID'] || env.COMPANY_ID || 'alfe'

    // Construct absolute URL for Server Components
    const baseUrl =
      typeof window === 'undefined'
        ? process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3081'
        : ''

    // Use new API route facade
    const response = await fetch(
      `${baseUrl}/api/categories?company_id=${company}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    const data: GetCategoriesQueryResponse = await response.json()

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
