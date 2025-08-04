/**
 * Type definitions and validation schemas for category data
 *
 * Defines: Backend GraphQL response types and frontend category models
 * Validates: Category data from Hasura GraphQL API
 * Transforms: Backend 'stock_groups' to frontend 'categories' terminology
 *
 * Used in: categories.service.ts for runtime validation and type safety
 */

import { z } from 'zod'

// Schema for individual stock group - matches GetCategoriesQuery exactly
export const StockGroupSchema = z.object({
  stock_groups: z.string(),
  our_company: z.string(),
  image_url: z.string(),
  alt_text: z.string(),
})

// Schema for GetCategoriesQuery response
export const GetCategoriesQueryResponseSchema = z.object({
  _type_stock_groups: z.array(StockGroupSchema),
})

// Infer TypeScript types from Zod schemas
export type StockGroup = z.infer<typeof StockGroupSchema>
export type GetCategoriesQueryResponse = z.infer<
  typeof GetCategoriesQueryResponseSchema
>

// Schema for the full GraphQL response wrapper
export const GraphQLCategoriesResponseSchema = z.object({
  data: GetCategoriesQueryResponseSchema,
  errors: z
    .array(
      z.object({
        message: z.string(),
        extensions: z.any().optional(),
      })
    )
    .optional(),
})

export type GraphQLCategoriesResponse = z.infer<
  typeof GraphQLCategoriesResponseSchema
>

/**
 * Frontend-friendly Category Schema
 * Maps backend 'stock_groups' fields to frontend 'category' naming convention
 */
export const CategorySchema = z.object({
  id: z.string().min(1), // maps from stock_groups
  name: z.string().min(1), // maps from stock_groups
  companyId: z.string().min(1), // maps from our_company
  imageUrl: z.string().url(), // maps from image_url
  altText: z.string(), // maps from alt_text
})

export type Category = z.infer<typeof CategorySchema>

/**
 * Categories array schema
 */
export const CategoriesArraySchema = z.array(CategorySchema)

export type CategoriesArray = z.infer<typeof CategoriesArraySchema>

/**
 * Transform function to map backend stock group data to frontend category model
 */
export function transformStockGroupToCategory(
  stockGroup: StockGroup
): Category {
  return {
    id: stockGroup.stock_groups,
    name: stockGroup.stock_groups,
    companyId: stockGroup.our_company,
    imageUrl: stockGroup.image_url,
    altText: stockGroup.alt_text,
  }
}

/**
 * Validate and transform categories array from backend
 */
export function validateAndTransformCategories(
  stockGroups: StockGroup[]
): CategoriesArray {
  const categories = stockGroups.map(transformStockGroupToCategory)
  return CategoriesArraySchema.parse(categories)
}
