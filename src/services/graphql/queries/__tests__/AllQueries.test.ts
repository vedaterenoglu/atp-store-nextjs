/**
 * Combined unit tests for remaining GraphQL query schemas and types
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas, types
 */

import { describe, it, expect } from '@jest/globals'
import { ZodError } from 'zod'
import {
  mockGetCategoriesResponse,
  mockGetCustomerBookmarksResponse,
  mockGetProductPricesResponse,
  mockGetProductsListResponse,
  emptyResponses,
} from '@/__tests__/mocks/graphql-responses'

// GetCategoriesQuery imports
import {
  GetCategoriesQueryResponseSchema,
  validateGetCategoriesResponse,
  safeValidateGetCategoriesResponse,
} from '../GetCategoriesQuery.schema'
import { isGetCategoriesQueryResponse } from '../GetCategoriesQuery.types'

// GetCustomerBookmarksQuery imports
import {
  GetCustomerBookmarksQueryVariablesSchema,
  GetCustomerBookmarksQueryResponseSchema,
  validateGetCustomerBookmarksResponse,
  safeValidateGetCustomerBookmarksResponse,
} from '../GetCustomerBookmarksQuery.schema'
import { isGetCustomerBookmarksQueryResponse } from '../GetCustomerBookmarksQuery.types'

// GetProductPricesQuery imports
import {
  GetProductPricesQueryVariablesSchema,
  GetProductPricesQueryResponseSchema,
  validateGetProductPricesResponse,
  safeValidateGetProductPricesResponse,
} from '../GetProductPricesQuery.schema'
import { isGetProductPricesQueryResponse } from '../GetProductPricesQuery.types'

// GetProductsListWithPriceQuery imports
import {
  GetProductsListWithPriceQueryResponseSchema,
  validateGetProductsListWithPriceResponse,
  safeValidateGetProductsListWithPriceResponse,
} from '../GetProductsListWithPriceQuery.schema'
import { isGetProductsListWithPriceQueryResponse } from '../GetProductsListWithPriceQuery.types'

describe('GetCategoriesQuery', () => {
  describe('Schema Validation', () => {
    it('should validate valid response', () => {
      const validResponse = mockGetCategoriesResponse()
      const result = GetCategoriesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null fields', () => {
      const validResponse = mockGetCategoriesResponse({
        _type_stock_groups: [
          {
            stock_groups: 'FURNITURE',
            our_company: 'company_1',
            image_url: null,
            alt_text: null,
          },
        ],
      })
      const result = GetCategoriesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty array', () => {
      const validResponse = emptyResponses.categories()
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
      const validResponse = emptyResponses.categories()
      const result = validateGetCategoriesResponse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('validateGetCategoriesResponse should throw on invalid data', () => {
      expect(() => validateGetCategoriesResponse(null)).toThrow(ZodError)
      expect(() => validateGetCategoriesResponse(undefined)).toThrow(ZodError)
      expect(() => validateGetCategoriesResponse({})).toThrow(ZodError)
    })

    it('safeValidateGetCategoriesResponse should return success', () => {
      const validResponse = emptyResponses.categories()
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
      const validResponse = emptyResponses.categories()
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
      const response = mockGetCategoriesResponse()
      expect(response).toBeDefined()
      expect(response._type_stock_groups).toBeDefined()
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
      const validResponse = mockGetCustomerBookmarksResponse()
      const result =
        GetCustomerBookmarksQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null stock fields', () => {
      const validResponse = mockGetCustomerBookmarksResponse({
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
      })
      const result =
        GetCustomerBookmarksQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty bookmarks', () => {
      const validResponse = emptyResponses.bookmarks()
      const result =
        GetCustomerBookmarksQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetCustomerBookmarksResponse should parse valid data', () => {
      const validResponse = emptyResponses.bookmarks()
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
      const validResult = safeValidateGetCustomerBookmarksResponse(
        emptyResponses.bookmarks()
      )
      expect(validResult.success).toBe(true)

      const invalidResult = safeValidateGetCustomerBookmarksResponse(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should identify valid responses', () => {
      expect(
        isGetCustomerBookmarksQueryResponse(emptyResponses.bookmarks())
      ).toBe(true)
      expect(
        isGetCustomerBookmarksQueryResponse(mockGetCustomerBookmarksResponse())
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
      const response = mockGetCustomerBookmarksResponse()
      expect(response).toBeDefined()
      expect(response.customer_bookmarks).toBeDefined()
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
      const validResponse = mockGetProductPricesResponse()
      const result = GetProductPricesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null fields', () => {
      const validResponse = mockGetProductPricesResponse({
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
            stock_moms: 25,
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
      })
      const result = GetProductPricesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty arrays', () => {
      const validResponse = mockGetProductPricesResponse({
        stock: [],
        customer_price_list: [],
        customers: [],
      })
      const result = GetProductPricesQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetProductPricesResponse should parse valid data', () => {
      const validResponse = mockGetProductPricesResponse({
        stock: [],
        customer_price_list: [],
        customers: [],
      })
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
      const validResult = safeValidateGetProductPricesResponse(
        mockGetProductPricesResponse({
          stock: [],
          customer_price_list: [],
          customers: [],
        })
      )
      expect(validResult.success).toBe(true)

      const invalidResult = safeValidateGetProductPricesResponse(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should identify valid responses with all arrays', () => {
      expect(
        isGetProductPricesQueryResponse(
          mockGetProductPricesResponse({
            stock: [],
            customer_price_list: [],
            customers: [],
          })
        )
      ).toBe(true)
      expect(
        isGetProductPricesQueryResponse(mockGetProductPricesResponse())
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
      const response = mockGetProductPricesResponse()
      expect(response).toBeDefined()
      expect(response.stock).toBeDefined()
      expect(response.customer_price_list).toBeDefined()
      expect(response.customers).toBeDefined()
    })
  })
})

describe('GetProductsListWithPriceQuery', () => {
  describe('Schema Validation', () => {
    it('should validate valid response', () => {
      const validResponse = mockGetProductsListResponse()
      const result =
        GetProductsListWithPriceQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate response with null fields', () => {
      const validResponse = mockGetProductsListResponse({
        stock: [
          {
            stock_id: 'stock_123',
            stock_name: null,
            stock_price: null,
            stock_unit: null,
            stock_group: null,
            stock_image_link: null,
          },
        ],
      })
      const result =
        GetProductsListWithPriceQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })

    it('should validate empty stock array', () => {
      const validResponse = emptyResponses.products()
      const result =
        GetProductsListWithPriceQueryResponseSchema.parse(validResponse)
      expect(result).toEqual(validResponse)
    })
  })

  describe('Validation Functions', () => {
    it('validateGetProductsListWithPriceResponse should parse valid', () => {
      const validResponse = emptyResponses.products()
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
      const validResult = safeValidateGetProductsListWithPriceResponse(
        emptyResponses.products()
      )
      expect(validResult.success).toBe(true)

      const invalidResult = safeValidateGetProductsListWithPriceResponse(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Type Guard', () => {
    it('should identify valid responses', () => {
      expect(
        isGetProductsListWithPriceQueryResponse(emptyResponses.products())
      ).toBe(true)
      expect(
        isGetProductsListWithPriceQueryResponse(mockGetProductsListResponse())
      ).toBe(true)
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
      const response = mockGetProductsListResponse()
      expect(response).toBeDefined()
      expect(response.stock).toBeDefined()
    })
  })
})
