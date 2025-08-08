/**
 * Product transformation utilities
 *
 * SOLID Principles: SRP - Single responsibility for product transformations
 * Design Patterns: Transformer Pattern
 * Dependencies: Types from manual GraphQL workflow
 */

import type { StockItem } from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'

/**
 * Frontend product model
 */
export interface Product {
  id: string
  name: string
  price: number
  unit: string
  categoryId: string
  stock: number
  imageUrl: string
}

export type ProductsArray = Product[]

/**
 * Transform and validate products from backend 'stock' format to frontend 'product' format
 */
export function validateAndTransformProducts(
  stockItems: StockItem[]
): ProductsArray {
  return stockItems.map(item => ({
    id: item.stock_id,
    name: item.stock_name || 'Unknown Product',
    price: item.stock_price || 0,
    unit: item.stock_unit || 'EA',
    categoryId: item.stock_group || 'uncategorized',
    stock: 0, // Stock information not available from GraphQL
    imageUrl: item.stock_image_link || '/placeholder-product.png',
  }))
}
