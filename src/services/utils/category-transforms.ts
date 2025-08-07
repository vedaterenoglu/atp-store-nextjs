/**
 * Category transformation utilities
 *
 * SOLID Principles: SRP - Single responsibility for category transformations
 * Design Patterns: Transformer Pattern
 * Dependencies: Types from manual GraphQL workflow
 */

import type { CategoryItem } from '@/services/graphql/queries/GetCategoriesQuery.types'

/**
 * Frontend category model
 */
export interface Category {
  id: string
  name: string
  companyId: string
  imageUrl: string
  altText: string
}

export type CategoriesArray = Category[]

/**
 * Transform and validate categories from backend format to frontend format
 */
export function validateAndTransformCategories(
  stockGroups: CategoryItem[]
): CategoriesArray {
  return stockGroups.map(group => ({
    id: group.stock_groups,
    name: group.stock_groups
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l: string) => l.toUpperCase()),
    companyId: group.our_company,
    imageUrl: group.image_url || '/placeholder-category.jpg',
    altText: group.alt_text || `${group.stock_groups} category`,
  }))
}
