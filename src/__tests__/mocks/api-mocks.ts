/**
 * API Mock Factories - Mock data factories for API routes
 * SOLID Principles: SRP - Single responsibility for mock data generation
 * Design Patterns: Factory Pattern, Builder Pattern
 * Dependencies: Types from services
 */

import type { Category } from '@/types/category'
import type { CampaignProduct } from '@/types/campaign'
import type { MostPurchasedProduct } from '@/services/most-purchased.service'
import type { CartItem } from '@/types/cart'

// Product type definition for API mocks
interface Product {
  stockId: string
  stockName: string
  stockPrice: number
  stockUnit: string
  stockGroup: string
  stockImageLink: string
}

// Bookmark type definition
interface Bookmark {
  id: string
  customerId: string
  productId: string
  createdAt: string
  product?: Product
}

// ProductPrice type definition
interface ProductPrice {
  unitPrice: number
  priceSource: string
}

/**
 * Create mock category
 */
export function createMockCategory(overrides?: Partial<Category>): Category {
  return {
    id: '1000 - Test Category',
    name: '1000 - Test Category',
    companyId: 'alfe',
    imageUrl: 'https://example.com/category.jpg',
    altText: 'category image',
    ...overrides,
  }
}

/**
 * Create multiple mock categories
 */
export function createMockCategories(count = 5): Category[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCategory({
      id: `${1000 + i * 100} - Category ${i + 1}`,
      name: `${1000 + i * 100} - Category ${i + 1}`,
    })
  )
}

/**
 * Create mock product
 */
export function createMockProduct(overrides?: Partial<Product>): Product {
  return {
    stockId: '0000 1001 0001',
    stockName: 'Test Product',
    stockPrice: 99.99,
    stockUnit: 'pcs',
    stockGroup: '1000 - Test Category',
    stockImageLink: 'https://example.com/product.jpg',
    ...overrides,
  }
}

/**
 * Create multiple mock products
 */
export function createMockProducts(count = 10): Product[] {
  return Array.from({ length: count }, (_, i) =>
    createMockProduct({
      stockId: `0000 100${i} 000${i}`,
      stockName: `Product ${i + 1}`,
      stockPrice: (i + 1) * 10.99,
    })
  )
}

/**
 * Create mock campaign product
 */
export function createMockCampaignProduct(
  overrides?: Partial<CampaignProduct>
): CampaignProduct {
  return {
    stock_id: '0000 2001 0001',
    stock_name: 'Campaign Product',
    stock_group: '2000 - Campaign Category',
    stock_image_link: 'https://example.com/campaign.jpg',
    stock_unit: 'pcs',
    stock_price: 79.99,
    campaign_price: 59.99,
    discount_percentage: 25,
    ...overrides,
  }
}

/**
 * Create multiple mock campaign products
 */
export function createMockCampaignProducts(count = 5): CampaignProduct[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCampaignProduct({
      stock_id: `0000 200${i} 000${i}`,
      stock_name: `Campaign Product ${i + 1}`,
      stock_price: (i + 1) * 20,
      campaign_price: (i + 1) * 15,
    })
  )
}

/**
 * Create mock most purchased product
 */
export function createMockMostPurchasedProduct(
  overrides?: Partial<MostPurchasedProduct>
): MostPurchasedProduct {
  return {
    stockId: '0000 3001 0001',
    name: 'Popular Product',
    price: 49.99,
    unit: 'pcs',
    categoryId: '3000 - Popular Category',
    consumedUnits: 100,
    rank: 1,
    imageUrl: 'https://example.com/popular.jpg',
    ...overrides,
  }
}

/**
 * Create multiple mock most purchased products
 */
export function createMockMostPurchasedProducts(
  count = 3
): MostPurchasedProduct[] {
  return Array.from({ length: count }, (_, i) =>
    createMockMostPurchasedProduct({
      stockId: `0000 300${i} 000${i}`,
      name: `Popular Product ${i + 1}`,
      consumedUnits: (count - i) * 50,
      rank: i + 1,
    })
  )
}

/**
 * Create mock bookmark
 */
export function createMockBookmark(overrides?: Partial<Bookmark>): Bookmark {
  const base: Bookmark = {
    id: 'bookmark-1',
    customerId: 'SE0 1001 1086',
    productId: '0000 4001 0001',
    createdAt: new Date().toISOString(),
    product: createMockProduct({
      stockId: '0000 4001 0001',
      stockName: 'Bookmarked Product',
    }),
  }
  return { ...base, ...overrides }
}

/**
 * Create multiple mock bookmarks
 */
export function createMockBookmarks(count = 5): Bookmark[] {
  return Array.from({ length: count }, (_, i) => {
    const product = createMockProduct({
      stockId: `0000 400${i} 000${i}`,
      stockName: `Bookmarked Product ${i + 1}`,
    })
    return {
      id: `bookmark-${i + 1}`,
      customerId: 'SE0 1001 1086',
      productId: `0000 400${i} 000${i}`,
      createdAt: new Date().toISOString(),
      product,
    }
  })
}

/**
 * Create mock product price
 */
export function createMockProductPrice(
  overrides?: Partial<ProductPrice>
): ProductPrice {
  return {
    unitPrice: 89.99,
    priceSource: 'standard',
    ...overrides,
  }
}

/**
 * Create mock cart item
 */
export function createMockCartItem(overrides?: Partial<CartItem>): CartItem {
  const base: CartItem = {
    id: 'cart-item-1',
    productId: '0000 5001 0001',
    productName: 'Test Product',
    productImage: 'https://example.com/product.jpg',
    productGroup: '1000 - Test Category',
    quantity: 2,
    unitPrice: 49.99,
    totalPrice: 99.98,
    vatRate: 0.25,
    vatAmount: 19.996,
    priceSource: 'default',
    stockUnit: 'pcs',
    maxQuantity: 100,
    isAvailable: true,
    addedAt: new Date(),
    updatedAt: new Date(),
  }
  return { ...base, ...overrides }
}

/**
 * Create multiple mock cart items
 */
export function createMockCartItems(count = 3): CartItem[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCartItem({
      id: `cart-item-${i + 1}`,
      productId: `0000 500${i} 000${i}`,
      quantity: i + 1,
    })
  )
}

/**
 * Mock API responses for all routes
 */
export const mockApiResponses = {
  categories: createMockCategories(),
  products: createMockProducts(),
  campaign: createMockCampaignProducts(),
  mostPurchased: {
    goods_transactions: createMockMostPurchasedProducts().map(p => ({
      stock_id: p.stockId,
      goods_transactions_stock_rel: {
        stock_name: p.name,
        stock_price: p.price,
        stock_unit: p.unit,
        stock_group: p.categoryId,
        stock_image_link: p.imageUrl,
      },
      goods_transaction_goods_transaction_rel_aggregate: {
        aggregate: {
          sum: {
            amount_credit: -p.consumedUnits,
          },
        },
      },
    })),
  },
  bookmarks: createMockBookmarks(),
  price: createMockProductPrice(),
  cart: {
    items: createMockCartItems(),
    totalItems: 3,
    totalPrice: 149.94,
  },
}
