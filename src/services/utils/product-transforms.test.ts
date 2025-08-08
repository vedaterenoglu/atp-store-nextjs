/**
 * Unit tests for product transformation utilities
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, product-transforms
 */

import { describe, it, expect } from '@jest/globals'
import {
  validateAndTransformProducts,
  type Product,
  type ProductsArray,
} from './product-transforms'
import type { StockItem } from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'

describe('product-transforms', () => {
  describe('validateAndTransformProducts', () => {
    it('should transform valid stock items correctly', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_001',
          stock_name: 'Laptop Computer',
          stock_price: 999.99,
          stock_unit: 'piece',
          stock_group: 'ELECTRONICS',
          stock_image_link: 'https://example.com/laptop.jpg',
        },
        {
          stock_id: 'PROD_002',
          stock_name: 'Office Chair',
          stock_price: 299.5,
          stock_unit: 'unit',
          stock_group: 'FURNITURE',
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: 'PROD_001',
        name: 'Laptop Computer',
        price: 999.99,
        unit: 'piece',
        categoryId: 'ELECTRONICS',
        stock: 0,
        imageUrl: 'https://example.com/laptop.jpg',
      })
      expect(result[1]).toEqual({
        id: 'PROD_002',
        name: 'Office Chair',
        price: 299.5,
        unit: 'unit',
        categoryId: 'FURNITURE',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle stock items with null stock_name', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_003',
          stock_name: null,
          stock_price: 49.99,
          stock_unit: 'box',
          stock_group: 'SUPPLIES',
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_003',
        name: 'Unknown Product',
        price: 49.99,
        unit: 'box',
        categoryId: 'SUPPLIES',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle stock items with null stock_price', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_004',
          stock_name: 'Test Product',
          stock_price: null,
          stock_unit: 'kg',
          stock_group: 'FOOD',
          stock_image_link: 'https://example.com/test.jpg',
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_004',
        name: 'Test Product',
        price: 0,
        unit: 'kg',
        categoryId: 'FOOD',
        stock: 0,
        imageUrl: 'https://example.com/test.jpg',
      })
    })

    it('should handle stock items with null stock_unit', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_005',
          stock_name: 'Another Product',
          stock_price: 25.0,
          stock_unit: null,
          stock_group: 'GENERAL',
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_005',
        name: 'Another Product',
        price: 25.0,
        unit: 'EA',
        categoryId: 'GENERAL',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle stock items with null stock_group', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_006',
          stock_name: 'Uncategorized Product',
          stock_price: 15.75,
          stock_unit: 'pack',
          stock_group: null,
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_006',
        name: 'Uncategorized Product',
        price: 15.75,
        unit: 'pack',
        categoryId: 'uncategorized',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle stock items with all null optional fields', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_007',
          stock_name: null,
          stock_price: null,
          stock_unit: null,
          stock_group: null,
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_007',
        name: 'Unknown Product',
        price: 0,
        unit: 'EA',
        categoryId: 'uncategorized',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle empty stock items array', () => {
      // Arrange
      const mockStockItems: StockItem[] = []

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle stock items with zero price', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_008',
          stock_name: 'Free Sample',
          stock_price: 0,
          stock_unit: 'sample',
          stock_group: 'SAMPLES',
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_008',
        name: 'Free Sample',
        price: 0,
        unit: 'sample',
        categoryId: 'SAMPLES',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle stock items with negative price', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_009',
          stock_name: 'Discount Product',
          stock_price: -10.5,
          stock_unit: 'item',
          stock_group: 'DISCOUNTS',
          stock_image_link: 'https://example.com/discount.jpg',
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'PROD_009',
        name: 'Discount Product',
        price: -10.5,
        unit: 'item',
        categoryId: 'DISCOUNTS',
        stock: 0,
        imageUrl: 'https://example.com/discount.jpg',
      })
    })

    it('should handle stock items with empty string values', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: '',
          stock_name: '',
          stock_price: 100,
          stock_unit: '',
          stock_group: '',
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: '',
        name: 'Unknown Product',
        price: 100,
        unit: 'EA',
        categoryId: 'uncategorized',
        stock: 0,
        imageUrl: '/placeholder-product.png',
      })
    })

    it('should handle multiple stock items with various data states', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_010',
          stock_name: 'Product A',
          stock_price: 50.0,
          stock_unit: 'box',
          stock_group: 'CAT_A',
          stock_image_link: null,
        },
        {
          stock_id: 'PROD_011',
          stock_name: null,
          stock_price: null,
          stock_unit: null,
          stock_group: null,
          stock_image_link: null,
        },
        {
          stock_id: 'PROD_012',
          stock_name: '',
          stock_price: 0,
          stock_unit: '',
          stock_group: '',
          stock_image_link: '',
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(3)
      expect(result[0]!.name).toBe('Product A')
      expect(result[1]!.name).toBe('Unknown Product')
      expect(result[2]!.name).toBe('Unknown Product')
      expect(result[0]!.price).toBe(50.0)
      expect(result[1]!.price).toBe(0)
      expect(result[2]!.price).toBe(0)
      expect(result[0]!.unit).toBe('box')
      expect(result[1]!.unit).toBe('EA')
      expect(result[2]!.unit).toBe('EA')
      expect(result[0]!.categoryId).toBe('CAT_A')
      expect(result[1]!.categoryId).toBe('uncategorized')
      expect(result[2]!.categoryId).toBe('uncategorized')
    })

    it('should return correct type ProductsArray', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'TEST_ID',
          stock_name: 'Test Product',
          stock_price: 99.99,
          stock_unit: 'test_unit',
          stock_group: 'TEST_GROUP',
          stock_image_link: null,
        },
      ]

      // Act
      const result: ProductsArray = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(1)
      const product: Product = result[0]!
      expect(product.id).toBe('TEST_ID')
      expect(product.name).toBe('Test Product')
      expect(product.price).toBe(99.99)
      expect(product.unit).toBe('test_unit')
      expect(product.categoryId).toBe('TEST_GROUP')
      expect(product.stock).toBe(0)
      expect(product.imageUrl).toBe('/placeholder-product.png')
    })

    it('should handle stock items with very long strings', () => {
      // Arrange
      const longString = 'A'.repeat(1000)
      const mockStockItems: StockItem[] = [
        {
          stock_id: longString,
          stock_name: longString,
          stock_price: 999999.99,
          stock_unit: longString,
          stock_group: longString,
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]!.id).toBe(longString)
      expect(result[0]!.name).toBe(longString)
      expect(result[0]!.price).toBe(999999.99)
      expect(result[0]!.unit).toBe(longString)
      expect(result[0]!.categoryId).toBe(longString)
      expect(result[0]!.stock).toBe(0)
      expect(result[0]!.imageUrl).toBe('/placeholder-product.png')
    })

    it('should include imageUrl with placeholder when not provided', () => {
      // Arrange
      const mockStockItems: StockItem[] = [
        {
          stock_id: 'PROD_IMG',
          stock_name: 'Product with no image',
          stock_price: 75.0,
          stock_unit: 'piece',
          stock_group: 'CATEGORY',
          stock_image_link: null,
        },
      ]

      // Act
      const result = validateAndTransformProducts(mockStockItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]!).toHaveProperty('imageUrl')
      expect(result[0]!.imageUrl).toBe('/placeholder-product.png')
      expect(Object.keys(result[0]!)).toEqual([
        'id',
        'name',
        'price',
        'unit',
        'categoryId',
        'stock',
        'imageUrl',
      ])
    })
  })
})
