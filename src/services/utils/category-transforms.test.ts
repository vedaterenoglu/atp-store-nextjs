/**
 * Unit tests for category transformation utilities
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, category-transforms
 */

import { describe, it, expect } from '@jest/globals'
import {
  validateAndTransformCategories,
  type Category,
  type CategoriesArray,
} from './category-transforms'
import type { CategoryItem } from '@/services/graphql/queries/GetCategoriesQuery.types'

describe('category-transforms', () => {
  describe('validateAndTransformCategories', () => {
    it('should transform valid category items correctly', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'ELECTRONICS_AND_GADGETS',
          our_company: 'company_1',
          image_url: 'https://example.com/electronics.jpg',
          alt_text: 'Electronics category image',
        },
        {
          stock_groups: 'HOME_APPLIANCES',
          our_company: 'company_2',
          image_url: 'https://example.com/home.jpg',
          alt_text: 'Home appliances image',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: 'ELECTRONICS_AND_GADGETS',
        name: 'Electronics And Gadgets',
        companyId: 'company_1',
        imageUrl: 'https://example.com/electronics.jpg',
        altText: 'Electronics category image',
      })
      expect(result[1]).toEqual({
        id: 'HOME_APPLIANCES',
        name: 'Home Appliances',
        companyId: 'company_2',
        imageUrl: 'https://example.com/home.jpg',
        altText: 'Home appliances image',
      })
    })

    it('should handle categories with null image_url', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'FURNITURE',
          our_company: 'company_1',
          image_url: null,
          alt_text: 'Furniture category',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'FURNITURE',
        name: 'Furniture',
        companyId: 'company_1',
        imageUrl: '/placeholder-category.jpg',
        altText: 'Furniture category',
      })
    })

    it('should handle categories with null alt_text', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'BOOKS_MEDIA',
          our_company: 'company_1',
          image_url: 'https://example.com/books.jpg',
          alt_text: null,
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'BOOKS_MEDIA',
        name: 'Books Media',
        companyId: 'company_1',
        imageUrl: 'https://example.com/books.jpg',
        altText: 'BOOKS_MEDIA category',
      })
    })

    it('should handle categories with both null image_url and alt_text', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'SPORTS_EQUIPMENT',
          our_company: 'company_1',
          image_url: null,
          alt_text: null,
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'SPORTS_EQUIPMENT',
        name: 'Sports Equipment',
        companyId: 'company_1',
        imageUrl: '/placeholder-category.jpg',
        altText: 'SPORTS_EQUIPMENT category',
      })
    })

    it('should handle empty category items array', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = []

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle categories with special characters in stock_groups', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'FOOD_&_BEVERAGES',
          our_company: 'company_1',
          image_url: 'https://example.com/food.jpg',
          alt_text: 'Food and beverages',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'FOOD_&_BEVERAGES',
        name: 'Food & Beverages',
        companyId: 'company_1',
        imageUrl: 'https://example.com/food.jpg',
        altText: 'Food and beverages',
      })
    })

    it('should handle categories with lowercase letters in stock_groups', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'new_arrivals',
          our_company: 'company_1',
          image_url: 'https://example.com/new.jpg',
          alt_text: 'New arrivals section',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'new_arrivals',
        name: 'New Arrivals',
        companyId: 'company_1',
        imageUrl: 'https://example.com/new.jpg',
        altText: 'New arrivals section',
      })
    })

    it('should handle categories with mixed case in stock_groups', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'MiXeD_CaSe_CaTeGoRy',
          our_company: 'company_1',
          image_url: 'https://example.com/mixed.jpg',
          alt_text: 'Mixed case category',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'MiXeD_CaSe_CaTeGoRy',
        name: 'Mixed Case Category',
        companyId: 'company_1',
        imageUrl: 'https://example.com/mixed.jpg',
        altText: 'Mixed case category',
      })
    })

    it('should handle categories with empty string values', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: '',
          our_company: '',
          image_url: '',
          alt_text: '',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: '',
        name: '',
        companyId: '',
        imageUrl: '/placeholder-category.jpg',
        altText: ' category',
      })
    })

    it('should handle multiple categories with various data states', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'CATEGORY_ONE',
          our_company: 'company_1',
          image_url: 'https://example.com/one.jpg',
          alt_text: 'Category one',
        },
        {
          stock_groups: 'CATEGORY_TWO',
          our_company: 'company_2',
          image_url: null,
          alt_text: null,
        },
        {
          stock_groups: 'category_three',
          our_company: 'company_3',
          image_url: '',
          alt_text: 'Category three',
        },
      ]

      // Act
      const result = validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(result).toHaveLength(3)
      expect(result[0]!.imageUrl).toBe('https://example.com/one.jpg')
      expect(result[1]!.imageUrl).toBe('/placeholder-category.jpg')
      expect(result[2]!.imageUrl).toBe('/placeholder-category.jpg')
      expect(result[1]!.altText).toBe('CATEGORY_TWO category')
    })

    it('should return correct type CategoriesArray', () => {
      // Arrange
      const mockCategoryItems: CategoryItem[] = [
        {
          stock_groups: 'TEST',
          our_company: 'test_company',
          image_url: 'test.jpg',
          alt_text: 'Test',
        },
      ]

      // Act
      const result: CategoriesArray =
        validateAndTransformCategories(mockCategoryItems)

      // Assert
      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(1)
      const category: Category = result[0]!
      expect(category.id).toBe('TEST')
      expect(category.name).toBe('Test')
      expect(category.companyId).toBe('test_company')
      expect(category.imageUrl).toBe('test.jpg')
      expect(category.altText).toBe('Test')
    })
  })
})
