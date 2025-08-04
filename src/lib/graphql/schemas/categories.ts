/**
 * GraphQL Schema Definitions for Categories
 * SOLID Principles: Single Responsibility - Only category schema definitions
 * Design Patterns: Schema Definition Pattern with Zod
 * Dependencies: zod
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
