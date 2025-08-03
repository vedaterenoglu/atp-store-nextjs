/**
 * GraphQL Schema Definitions for Products
 * SOLID Principles: Single Responsibility - Only product schema definitions
 * Design Patterns: Schema Definition Pattern with Zod
 * Dependencies: zod
 */

import { z } from 'zod'

// Schema for individual product
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock_quantity: z.number(),
  category_id: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Schema for product with category relation
export const ProductWithCategorySchema = ProductSchema.extend({
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
})

// Schema for GetProducts query response
export const GetProductsQueryResponseSchema = z.object({
  products: z.array(ProductSchema),
})

// Schema for GetProductById query response
export const GetProductByIdQueryResponseSchema = z.object({
  products_by_pk: ProductWithCategorySchema.nullable(),
})

// Schema for GetProductsByCategory query response
export const GetProductsByCategoryQueryResponseSchema = z.object({
  products: z.array(ProductSchema),
})

// Infer TypeScript types from Zod schemas
export type Product = z.infer<typeof ProductSchema>
export type ProductWithCategory = z.infer<typeof ProductWithCategorySchema>
export type GetProductsQueryResponse = z.infer<
  typeof GetProductsQueryResponseSchema
>
export type GetProductByIdQueryResponse = z.infer<
  typeof GetProductByIdQueryResponseSchema
>
export type GetProductsByCategoryQueryResponse = z.infer<
  typeof GetProductsByCategoryQueryResponseSchema
>

// Input schemas for mutations
export const CreateProductInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.number().positive(),
  stock_quantity: z.number().int().nonnegative(),
  category_id: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
})

export const UpdateProductInputSchema = CreateProductInputSchema.partial()

export type CreateProductInput = z.infer<typeof CreateProductInputSchema>
export type UpdateProductInput = z.infer<typeof UpdateProductInputSchema>