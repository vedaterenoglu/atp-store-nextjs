/**
 * Type definitions and validation schemas for product data
 *
 * Defines: Frontend product model and transformation functions
 * Validates: Product data structure and field constraints
 * Transforms: Backend 'stock' terminology to frontend 'product' terminology
 *
 * Used in: products.service.ts for data transformation and validation
 */

import { z } from 'zod'
import type { GetProductsListWithPriceQueryQuery } from '@/lib/generated/graphql'

/**
 * Schema for individual stock item from GetProductsListWithPriceQuery
 */
export const StockItemSchema = z.object({
  stock_group: z.string(),
  stock_id: z.string(),
  stock_name: z.string(),
  stock_unit: z.string(),
  stock_price: z.number(),
})

/**
 * Schema for GetProductsListWithPriceQuery response - validated to match generated type
 */
export const GetProductsListWithPriceQueryResponseSchema = z.object({
  stock: z.array(StockItemSchema),
}) satisfies z.ZodType<GetProductsListWithPriceQueryQuery>

// Infer TypeScript types from Zod schemas
export type StockItem = z.infer<typeof StockItemSchema>
export type GetProductsListWithPriceQueryResponse = z.infer<
  typeof GetProductsListWithPriceQueryResponseSchema
>

/**
 * Product Schema
 * Maps backend 'stock' fields to frontend 'product' naming convention
 */
export const ProductSchema = z.object({
  id: z.string().min(1), // maps from stock_id
  name: z.string().min(1), // maps from stock_name
  price: z.number().min(0), // maps from stock_price
  unit: z.string().min(1), // maps from stock_unit
  categoryId: z.string().min(1), // maps from stock_group
  imageUrl: z.string().url().optional(), // not in backend, will need default
})

export type Product = z.infer<typeof ProductSchema>

/**
 * Products array schema
 */
export const ProductsArraySchema = z.array(ProductSchema)

export type ProductsArray = z.infer<typeof ProductsArraySchema>

/**
 * Transform function to map backend stock data to frontend product model
 */
export function transformStockToProduct(stock: StockItem): Product {
  return {
    id: stock.stock_id,
    name: stock.stock_name,
    price: stock.stock_price,
    unit: stock.stock_unit,
    categoryId: stock.stock_group,
    // TODO: Add imageUrl when backend provides it
    imageUrl: undefined,
  }
}

/**
 * Validate and transform products array from backend
 */
export function validateAndTransformProducts(
  stockData: StockItem[]
): ProductsArray {
  const products = stockData.map(transformStockToProduct)
  return ProductsArraySchema.parse(products)
}
