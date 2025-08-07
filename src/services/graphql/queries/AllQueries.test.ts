/**
 * Combined unit tests for remaining GraphQL query schemas and types
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas, types
 */

import { describe, it, expect } from '@jest/globals'
import { ZodError } from 'zod'

// GetCategoriesQuery imports
import {
  GetCategoriesQueryResponseSchema,
  validateGetCategoriesResponse,
  safeValidateGetCategoriesResponse,
} from './GetCategoriesQuery.schema'
import {
  isGetCategoriesQueryResponse,
  type GetCategoriesQueryResponse,
  type CategoryItem,
} from './GetCategoriesQuery.types'

// GetCustomerBookmarksQuery imports
import {
  GetCustomerBookmarksQueryVariablesSchema,
  GetCustomerBookmarksQueryResponseSchema,
  validateGetCustomerBookmarksResponse,
  safeValidateGetCustomerBookmarksResponse,
} from './GetCustomerBookmarksQuery.schema'
import {
  isGetCustomerBookmarksQueryResponse,
  type GetCustomerBookmarksQueryResponse,
  type CustomerBookmarkItem,
} from './GetCustomerBookmarksQuery.types'

// GetProductPricesQuery imports
import {
  GetProductPricesQueryVariablesSchema,
  GetProductPricesQueryResponseSchema,
  validateGetProductPricesResponse,
  safeValidateGetProductPricesResponse,
} from './GetProductPricesQuery.schema'
import {
  isGetProductPricesQueryResponse,
  type GetProductPricesQueryResponse,
  type StockPriceItem,
  type CustomerPriceListItem,
  type CustomerItem,
} from './GetProductPricesQuery.types'

// GetProductsListWithPriceQuery imports
import {
  GetProductsListWithPriceQueryResponseSchema,
  validateGetProductsListWithPriceResponse,
  safeValidateGetProductsListWithPriceResponse,
} from './GetProductsListWithPriceQuery.schema'
import {
  isGetProductsListWithPriceQueryResponse,
  type GetProductsListWithPriceQueryResponse,
  type StockItem,
} from './GetProductsListWithPriceQuery.types'

describe('GetCategoriesQuery', () => {
  describe('Schema Validation', () => {
    it('should validate valid response', () => {
      const validResponse: GetCategoriesQueryResponse = {
        _type_stock_groups: [
          {
            stock_groups: 'ELECTRONICS',
            our_company: 'company_1',
            image_url: 'https://example.com/img.jpg',
            alt_text: 'Electronics',
          },
        ],
      }
      const result = GetCategoriesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null fields', () => {
      const validResponse: GetCategoriesQueryResponse = {
        _type_stock_groups: [
          {
            stock_groups: 'FURNITURE',
            our_company: 'company_1',
            image_url: null,
            alt_text: null,
          },
        ],
      }
      const result = GetCategoriesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty array', () => {
      const validResponse: GetCategoriesQueryResponse = {
        _type_stock_groups: [],
      }
      const result = GetCategoriesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should reject invalid response', () => {
      const invalidResponse = {
        _type_stock_groups: 'not an array',
      }
      expect(() =>
        GetCategoriesQueryResponseSchema.parse(invalidResponse)
      ).toThrow(ZodError)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetCategoriesResponse should parse valid data', () => {
      const validResponse = {
        _type_stock_groups: [],
      }
      const result = validateGetCategoriesResponse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('validateGetCategoriesResponse should throw on invalid data', () => {
      expect(() => validateGetCategoriesResponse(null)).toThrow(ZodError)
      expect(() => validateGetCategoriesResponse(undefined)).toThrow(ZodError)
      expect(() => validateGetCategoriesResponse({})).toThrow(ZodError)
    })

    it('safeValidateGetCategoriesResponse should return success', () => {
      const validResponse = { _type_stock_groups: [] }
      const result = safeValidateGetCategoriesResponse(validResponse)
      expect(result.success).toBe(true)
    })

    it('safeValidateGetCategoriesResponse should return error', () => {
      const result = safeValidateGetCategoriesResponse(null)
      expect(result.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should return true for valid response', () => {
      const validResponse = { _type_stock_groups: [] }
      expect(isGetCategoriesQueryResponse(validResponse)).toBe(true)
    })

    it('should return false for invalid response', () => {
      expect(isGetCategoriesQueryResponse(null)).toBe(false)
      expect(isGetCategoriesQueryResponse(undefined)).toBe(false)
      expect(isGetCategoriesQueryResponse('string')).toBe(false)
      expect(isGetCategoriesQueryResponse(123)).toBe(false)
      expect(isGetCategoriesQueryResponse({})).toBe(false)
      expect(
        isGetCategoriesQueryResponse({ _type_stock_groups: 'not array' })
      ).toBe(false)
    })
  })

  describe('Type Exports', () => {
    it('should export types', () => {
      const item: CategoryItem = {
        stock_groups: 'GROUP',
        our_company: 'company',
        image_url: null,
        alt_text: null,
      }
      const response: GetCategoriesQueryResponse = {
        _type_stock_groups: [item],
      }
      expect(response).toBeDefined()
    })
  })
})

describe('GetCustomerBookmarksQuery', () => {
  describe('Schema Validation', () => {
    it('should validate valid variables', () => {
      const validVariables = {
        company_id: 'comp_123',
        customer_id: 'cust_456',
      }
      const result =
        GetCustomerBookmarksQueryVariablesSchema.parse(validVariables)
      expect(result).toEqual(validVariables)
    })

    it('should validate valid response', () => {
      const validResponse: GetCustomerBookmarksQueryResponse = {
        customer_bookmarks: [
          {
            company_id: 'comp_123',
            customer_id: 'cust_456',
            stock_id: 'stock_789',
            stock: {
              stock_id: 'stock_789',
              stock_name: 'Product',
              stock_price: 99.99,
              stock_unit: 'pcs',
              stock_group: 'GROUP',
              stock_image_link: 'https://example.com/img.jpg',
            },
          },
        ],
      }
      const result =
        GetCustomerBookmarksQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null stock fields', () => {
      const validResponse: GetCustomerBookmarksQueryResponse = {
        customer_bookmarks: [
          {
            company_id: 'comp_123',
            customer_id: 'cust_456',
            stock_id: 'stock_789',
            stock: {
              stock_id: 'stock_789',
              stock_name: null,
              stock_price: null,
              stock_unit: null,
              stock_group: null,
              stock_image_link: null,
            },
          },
        ],
      }
      const result =
        GetCustomerBookmarksQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty bookmarks', () => {
      const validResponse: GetCustomerBookmarksQueryResponse = {
        customer_bookmarks: [],
      }
      const result =
        GetCustomerBookmarksQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetCustomerBookmarksResponse should parse valid data', () => {
      const validResponse = { customer_bookmarks: [] }
      const result = validateGetCustomerBookmarksResponse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('validateGetCustomerBookmarksResponse should throw on invalid', () => {
      expect(() => validateGetCustomerBookmarksResponse(null)).toThrow(ZodError)
      expect(() => validateGetCustomerBookmarksResponse(undefined)).toThrow(
        ZodError
      )
    })

    it('safeValidateGetCustomerBookmarksResponse should handle valid/invalid', () => {
      const validResult = safeValidateGetCustomerBookmarksResponse({
        customer_bookmarks: [],
      })
      expect(validResult.success).toBe(true)

      const invalidResult = safeValidateGetCustomerBookmarksResponse(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should identify valid responses', () => {
      expect(
        isGetCustomerBookmarksQueryResponse({ customer_bookmarks: [] })
      ).toBe(true)
      expect(
        isGetCustomerBookmarksQueryResponse({ customer_bookmarks: [{}] })
      ).toBe(true)
    })

    it('should reject invalid responses', () => {
      expect(isGetCustomerBookmarksQueryResponse(null)).toBe(false)
      expect(isGetCustomerBookmarksQueryResponse(undefined)).toBe(false)
      expect(isGetCustomerBookmarksQueryResponse('string')).toBe(false)
      expect(isGetCustomerBookmarksQueryResponse(123)).toBe(false)
      expect(isGetCustomerBookmarksQueryResponse({})).toBe(false)
      expect(
        isGetCustomerBookmarksQueryResponse({ customer_bookmarks: 'not array' })
      ).toBe(false)
    })
  })

  describe('Type Exports', () => {
    it('should export types', () => {
      const bookmark: CustomerBookmarkItem = {
        company_id: 'comp',
        customer_id: 'cust',
        stock_id: 'stock',
        stock: {
          stock_id: 'stock',
          stock_name: null,
          stock_price: null,
          stock_unit: null,
          stock_group: null,
          stock_image_link: null,
        },
      }
      const response: GetCustomerBookmarksQueryResponse = {
        customer_bookmarks: [bookmark],
      }
      expect(response).toBeDefined()
    })
  })
})

describe('GetProductPricesQuery', () => {
  describe('Schema Validation', () => {
    it('should validate valid variables', () => {
      const validVariables = {
        company_id: 'comp_123',
        customer_id: 'cust_456',
        stock_id: 'stock_789',
      }
      const result = GetProductPricesQueryVariablesSchema.parse(validVariables)
      expect(result).toEqual(validVariables)
    })

    it('should validate valid response', () => {
      const validResponse: GetProductPricesQueryResponse = {
        stock: [
          {
            stock_price: 99.99,
            stock_price_a: 95.0,
            stock_price_b: 90.0,
            stock_price_c: 85.0,
            stock_price_d: 80.0,
            stock_price_s: 100.0,
            stock_price_hra: 94.0,
            stock_price_hrb: 89.0,
            stock_price_hrc: 84.0,
            stock_price_hrd: 79.0,
            stock_price_z: 0,
            campaign_price: null,
            is_campaign_active: false,
          },
        ],
        customer_price_list: [
          {
            customers_price: 89.99,
          },
        ],
        customers: [
          {
            customer_price_class: 'WHOLESALE',
          },
        ],
      }
      const result = GetProductPricesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null fields', () => {
      const validResponse: GetProductPricesQueryResponse = {
        stock: [
          {
            stock_price: 50.0,
            stock_price_a: null,
            stock_price_b: null,
            stock_price_c: null,
            stock_price_d: null,
            stock_price_s: null,
            stock_price_hra: null,
            stock_price_hrb: null,
            stock_price_hrc: null,
            stock_price_hrd: null,
            stock_price_z: null,
            campaign_price: null,
            is_campaign_active: null,
          },
        ],
        customer_price_list: [
          {
            customers_price: null,
          },
        ],
        customers: [
          {
            customer_price_class: null,
          },
        ],
      }
      const result = GetProductPricesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty arrays', () => {
      const validResponse: GetProductPricesQueryResponse = {
        stock: [],
        customer_price_list: [],
        customers: [],
      }
      const result = GetProductPricesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetProductPricesResponse should parse valid data', () => {
      const validResponse = {
        stock: [],
        customer_price_list: [],
        customers: [],
      }
      const result = validateGetProductPricesResponse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('validateGetProductPricesResponse should throw on invalid', () => {
      expect(() => validateGetProductPricesResponse(null)).toThrow(ZodError)
      expect(() => validateGetProductPricesResponse(undefined)).toThrow(
        ZodError
      )
    })

    it('safeValidateGetProductPricesResponse should handle valid/invalid', () => {
      const validResult = safeValidateGetProductPricesResponse({
        stock: [],
        customer_price_list: [],
        customers: [],
      })
      expect(validResult.success).toBe(true)

      const invalidResult = safeValidateGetProductPricesResponse(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should identify valid responses with all arrays', () => {
      expect(
        isGetProductPricesQueryResponse({
          stock: [],
          customer_price_list: [],
          customers: [],
        })
      ).toBe(true)
      expect(
        isGetProductPricesQueryResponse({
          stock: [{}],
          customer_price_list: [{}],
          customers: [{}],
        })
      ).toBe(true)
    })

    it('should reject responses missing required fields', () => {
      expect(isGetProductPricesQueryResponse({ stock: [] })).toBe(false)
      expect(
        isGetProductPricesQueryResponse({
          stock: [],
          customer_price_list: [],
        })
      ).toBe(false)
      expect(
        isGetProductPricesQueryResponse({
          stock: [],
          customers: [],
        })
      ).toBe(false)
    })

    it('should reject responses with non-array fields', () => {
      expect(
        isGetProductPricesQueryResponse({
          stock: 'not array',
          customer_price_list: [],
          customers: [],
        })
      ).toBe(false)
      expect(
        isGetProductPricesQueryResponse({
          stock: [],
          customer_price_list: 'not array',
          customers: [],
        })
      ).toBe(false)
      expect(
        isGetProductPricesQueryResponse({
          stock: [],
          customer_price_list: [],
          customers: 'not array',
        })
      ).toBe(false)
    })

    it('should reject invalid responses', () => {
      expect(isGetProductPricesQueryResponse(null)).toBe(false)
      expect(isGetProductPricesQueryResponse(undefined)).toBe(false)
      expect(isGetProductPricesQueryResponse('string')).toBe(false)
      expect(isGetProductPricesQueryResponse(123)).toBe(false)
      expect(isGetProductPricesQueryResponse({})).toBe(false)
    })
  })

  describe('Type Exports', () => {
    it('should export types', () => {
      const stockPrice: StockPriceItem = {
        stock_price: 100,
        stock_price_a: null,
        stock_price_b: null,
        stock_price_c: null,
        stock_price_d: null,
        stock_price_s: null,
        stock_price_hra: null,
        stock_price_hrb: null,
        stock_price_hrc: null,
        stock_price_hrd: null,
        stock_price_z: null,
        campaign_price: null,
        is_campaign_active: null,
      }
      const customerPrice: CustomerPriceListItem = {
        customers_price: 95,
      }
      const customer: CustomerItem = {
        customer_price_class: 'VIP',
      }
      const response: GetProductPricesQueryResponse = {
        stock: [stockPrice],
        customer_price_list: [customerPrice],
        customers: [customer],
      }
      expect(response).toBeDefined()
    })
  })
})

describe('GetProductsListWithPriceQuery', () => {
  describe('Schema Validation', () => {
    it('should validate valid response', () => {
      const validResponse: GetProductsListWithPriceQueryResponse = {
        stock: [
          {
            stock_id: 'stock_123',
            stock_name: 'Product',
            stock_price: 99.99,
            stock_unit: 'pcs',
            stock_group: 'GROUP',
            available_stock: 10,
            stock_image_link: 'https://example.com/product.jpg',
          },
        ],
      }
      const result =
        GetProductsListWithPriceQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null fields', () => {
      const validResponse: GetProductsListWithPriceQueryResponse = {
        stock: [
          {
            stock_id: 'stock_123',
            stock_name: null,
            stock_price: null,
            stock_unit: null,
            stock_group: null,
            available_stock: null,
            stock_image_link: null,
          },
        ],
      }
      const result =
        GetProductsListWithPriceQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty stock array', () => {
      const validResponse: GetProductsListWithPriceQueryResponse = {
        stock: [],
      }
      const result =
        GetProductsListWithPriceQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetProductsListWithPriceResponse should parse valid', () => {
      const validResponse = { stock: [] }
      const result = validateGetProductsListWithPriceResponse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('validateGetProductsListWithPriceResponse should throw on invalid', () => {
      expect(() => validateGetProductsListWithPriceResponse(null)).toThrow(
        ZodError
      )
      expect(() => validateGetProductsListWithPriceResponse(undefined)).toThrow(
        ZodError
      )
    })

    it('safeValidateGetProductsListWithPriceResponse should handle both', () => {
      const validResult = safeValidateGetProductsListWithPriceResponse({
        stock: [],
      })
      expect(validResult.success).toBe(true)

      const invalidResult = safeValidateGetProductsListWithPriceResponse(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should identify valid responses', () => {
      expect(isGetProductsListWithPriceQueryResponse({ stock: [] })).toBe(true)
      expect(isGetProductsListWithPriceQueryResponse({ stock: [{}] })).toBe(
        true
      )
    })

    it('should reject invalid responses', () => {
      expect(isGetProductsListWithPriceQueryResponse(null)).toBe(false)
      expect(isGetProductsListWithPriceQueryResponse(undefined)).toBe(false)
      expect(isGetProductsListWithPriceQueryResponse('string')).toBe(false)
      expect(isGetProductsListWithPriceQueryResponse(123)).toBe(false)
      expect(isGetProductsListWithPriceQueryResponse({})).toBe(false)
      expect(
        isGetProductsListWithPriceQueryResponse({ stock: 'not array' })
      ).toBe(false)
    })
  })

  describe('Type Exports', () => {
    it('should export types', () => {
      const item: StockItem = {
        stock_id: 'id',
        stock_name: null,
        stock_price: null,
        stock_unit: null,
        stock_group: null,
        available_stock: null,
        stock_image_link: null,
      }
      const response: GetProductsListWithPriceQueryResponse = {
        stock: [item],
      }
      expect(response).toBeDefined()
    })
  })
})
