/**
 * Unit tests for BookmarkProductMutation schema and types
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas, types
 */

import { describe, it, expect } from '@jest/globals'
import { ZodError } from 'zod'
import {
  BookmarkProductMutationVariablesSchema,
  BookmarkCustomerSchema,
  BookmarkStockSchema,
  BookmarkReturningSchema,
  BookmarkProductMutationResponseSchema,
  validateBookmarkProductResponse,
  safeValidateBookmarkProductResponse,
} from './BookmarkProductMutation.schema'
import {
  isBookmarkProductMutationResponse,
  type BookmarkProductMutationVariables,
  type BookmarkCustomer,
  type BookmarkStock,
  type BookmarkReturning,
  type BookmarkProductMutationResponse,
} from './BookmarkProductMutation.types'

describe('BookmarkProductMutation', () => {
  describe('Schema Validation', () => {
    describe('BookmarkProductMutationVariablesSchema', () => {
      it('should validate valid variables', () => {
        const validVariables: BookmarkProductMutationVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        const result =
          BookmarkProductMutationVariablesSchema.parse(validVariables)
        expect(result).toEqual(validVariables)
      })

      it('should reject missing fields', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          // missing stock_id
        }
        expect(() =>
          BookmarkProductMutationVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })

      it('should reject invalid types', () => {
        const invalidVariables = {
          company_id: 123, // should be string
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        expect(() =>
          BookmarkProductMutationVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })

      it('should reject null values', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: null,
          stock_id: 'stock_789',
        }
        expect(() =>
          BookmarkProductMutationVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })
    })

    describe('BookmarkCustomerSchema', () => {
      it('should validate valid customer with nickname', () => {
        const validCustomer: BookmarkCustomer = {
          customer_id: 'cust_123',
          customer_nickname: 'JohnDoe',
        }
        const result = BookmarkCustomerSchema.parse(validCustomer)
        expect(result).toEqual(validCustomer)
      })

      it('should validate customer with null nickname', () => {
        const validCustomer: BookmarkCustomer = {
          customer_id: 'cust_123',
          customer_nickname: null,
        }
        const result = BookmarkCustomerSchema.parse(validCustomer)
        expect(result).toEqual(validCustomer)
      })

      it('should reject missing customer_id', () => {
        const invalidCustomer = {
          customer_nickname: 'JohnDoe',
        }
        expect(() => BookmarkCustomerSchema.parse(invalidCustomer)).toThrow(
          ZodError
        )
      })

      it('should reject invalid customer_id type', () => {
        const invalidCustomer = {
          customer_id: 123,
          customer_nickname: 'JohnDoe',
        }
        expect(() => BookmarkCustomerSchema.parse(invalidCustomer)).toThrow(
          ZodError
        )
      })
    })

    describe('BookmarkStockSchema', () => {
      it('should validate valid stock with name', () => {
        const validStock: BookmarkStock = {
          stock_id: 'stock_123',
          stock_name: 'Product Name',
        }
        const result = BookmarkStockSchema.parse(validStock)
        expect(result).toEqual(validStock)
      })

      it('should validate stock with null name', () => {
        const validStock: BookmarkStock = {
          stock_id: 'stock_123',
          stock_name: null,
        }
        const result = BookmarkStockSchema.parse(validStock)
        expect(result).toEqual(validStock)
      })

      it('should reject missing stock_id', () => {
        const invalidStock = {
          stock_name: 'Product Name',
        }
        expect(() => BookmarkStockSchema.parse(invalidStock)).toThrow(ZodError)
      })

      it('should reject invalid stock_id type', () => {
        const invalidStock = {
          stock_id: 123,
          stock_name: 'Product Name',
        }
        expect(() => BookmarkStockSchema.parse(invalidStock)).toThrow(ZodError)
      })
    })

    describe('BookmarkReturningSchema', () => {
      it('should validate complete returning object', () => {
        const validReturning: BookmarkReturning = {
          company_id: 'comp_123',
          customer: {
            customer_id: 'cust_123',
            customer_nickname: 'JohnDoe',
          },
          stock: {
            stock_id: 'stock_123',
            stock_name: 'Product Name',
          },
        }
        const result = BookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should validate with null customer', () => {
        const validReturning: BookmarkReturning = {
          company_id: 'comp_123',
          customer: null,
          stock: {
            stock_id: 'stock_123',
            stock_name: 'Product Name',
          },
        }
        const result = BookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should validate with null stock', () => {
        const validReturning: BookmarkReturning = {
          company_id: 'comp_123',
          customer: {
            customer_id: 'cust_123',
            customer_nickname: 'JohnDoe',
          },
          stock: null,
        }
        const result = BookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should validate with both null', () => {
        const validReturning: BookmarkReturning = {
          company_id: 'comp_123',
          customer: null,
          stock: null,
        }
        const result = BookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should reject missing company_id', () => {
        const invalidReturning = {
          customer: null,
          stock: null,
        }
        expect(() => BookmarkReturningSchema.parse(invalidReturning)).toThrow(
          ZodError
        )
      })
    })

    describe('BookmarkProductMutationResponseSchema', () => {
      it('should validate successful mutation response', () => {
        const validResponse: BookmarkProductMutationResponse = {
          insert_customer_bookmarks: {
            returning: [
              {
                company_id: 'comp_123',
                customer: {
                  customer_id: 'cust_123',
                  customer_nickname: 'JohnDoe',
                },
                stock: {
                  stock_id: 'stock_123',
                  stock_name: 'Product Name',
                },
              },
            ],
            affected_rows: 1,
          },
        }
        const result =
          BookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate response with null insert_customer_bookmarks', () => {
        const validResponse: BookmarkProductMutationResponse = {
          insert_customer_bookmarks: null,
        }
        const result =
          BookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate empty returning array', () => {
        const validResponse: BookmarkProductMutationResponse = {
          insert_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        const result =
          BookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate multiple returned bookmarks', () => {
        const validResponse: BookmarkProductMutationResponse = {
          insert_customer_bookmarks: {
            returning: [
              {
                company_id: 'comp_123',
                customer: null,
                stock: null,
              },
              {
                company_id: 'comp_456',
                customer: null,
                stock: null,
              },
            ],
            affected_rows: 2,
          },
        }
        const result =
          BookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should reject missing insert_customer_bookmarks field', () => {
        const invalidResponse = {}
        expect(() =>
          BookmarkProductMutationResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject invalid affected_rows type', () => {
        const invalidResponse = {
          insert_customer_bookmarks: {
            returning: [],
            affected_rows: '1', // should be number
          },
        }
        expect(() =>
          BookmarkProductMutationResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject non-array returning field', () => {
        const invalidResponse = {
          insert_customer_bookmarks: {
            returning: 'not an array',
            affected_rows: 1,
          },
        }
        expect(() =>
          BookmarkProductMutationResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })
    })

    describe('validateBookmarkProductResponse', () => {
      it('should parse valid response', () => {
        const validResponse = {
          insert_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        const result = validateBookmarkProductResponse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should throw on invalid response', () => {
        const invalidResponse = {
          insert_customer_bookmarks: 'invalid',
        }
        expect(() => validateBookmarkProductResponse(invalidResponse)).toThrow(
          ZodError
        )
      })

      it('should throw on null response', () => {
        expect(() => validateBookmarkProductResponse(null)).toThrow(ZodError)
      })

      it('should throw on undefined response', () => {
        expect(() => validateBookmarkProductResponse(undefined)).toThrow(
          ZodError
        )
      })
    })

    describe('safeValidateBookmarkProductResponse', () => {
      it('should return success for valid response', () => {
        const validResponse = {
          insert_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        const result = safeValidateBookmarkProductResponse(validResponse)
        expect(result.success).toBe(true)
        if (result.success) {
          expect(result.data).toEqual(validResponse)
        }
      })

      it('should return error for invalid response', () => {
        const invalidResponse = {
          insert_customer_bookmarks: 'invalid',
        }
        const result = safeValidateBookmarkProductResponse(invalidResponse)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error).toBeInstanceOf(ZodError)
        }
      })

      it('should return error for null', () => {
        const result = safeValidateBookmarkProductResponse(null)
        expect(result.success).toBe(false)
      })

      it('should return error for undefined', () => {
        const result = safeValidateBookmarkProductResponse(undefined)
        expect(result.success).toBe(false)
      })

      it('should return error for missing fields', () => {
        const invalidResponse = {}
        const result = safeValidateBookmarkProductResponse(invalidResponse)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Type Guards', () => {
    describe('isBookmarkProductMutationResponse', () => {
      it('should return true for valid response', () => {
        const validResponse = {
          insert_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        expect(isBookmarkProductMutationResponse(validResponse)).toBe(true)
      })

      it('should return true for response with null insert_customer_bookmarks', () => {
        const validResponse = {
          insert_customer_bookmarks: null,
        }
        expect(isBookmarkProductMutationResponse(validResponse)).toBe(true)
      })

      it('should return false for null', () => {
        expect(isBookmarkProductMutationResponse(null)).toBe(false)
      })

      it('should return false for undefined', () => {
        expect(isBookmarkProductMutationResponse(undefined)).toBe(false)
      })

      it('should return false for string', () => {
        expect(isBookmarkProductMutationResponse('string')).toBe(false)
      })

      it('should return false for number', () => {
        expect(isBookmarkProductMutationResponse(123)).toBe(false)
      })

      it('should return false for empty object', () => {
        expect(isBookmarkProductMutationResponse({})).toBe(false)
      })

      it('should return false for object with wrong field', () => {
        const invalidResponse = {
          wrong_field: 'value',
        }
        expect(isBookmarkProductMutationResponse(invalidResponse)).toBe(false)
      })

      it('should return true for object with insert_customer_bookmarks field', () => {
        const validResponse = {
          insert_customer_bookmarks: {},
        }
        expect(isBookmarkProductMutationResponse(validResponse)).toBe(true)
      })
    })
  })

  describe('Type Exports', () => {
    it('should export BookmarkProductMutationVariables interface', () => {
      const variables: BookmarkProductMutationVariables = {
        company_id: 'comp_123',
        customer_id: 'cust_456',
        stock_id: 'stock_789',
      }
      expect(variables).toBeDefined()
    })

    it('should export BookmarkCustomer interface', () => {
      const customer: BookmarkCustomer = {
        customer_id: 'cust_123',
        customer_nickname: null,
      }
      expect(customer).toBeDefined()
    })

    it('should export BookmarkStock interface', () => {
      const stock: BookmarkStock = {
        stock_id: 'stock_123',
        stock_name: null,
      }
      expect(stock).toBeDefined()
    })

    it('should export BookmarkReturning interface', () => {
      const returning: BookmarkReturning = {
        company_id: 'comp_123',
        customer: null,
        stock: null,
      }
      expect(returning).toBeDefined()
    })

    it('should export BookmarkProductMutationResponse interface', () => {
      const response: BookmarkProductMutationResponse = {
        insert_customer_bookmarks: null,
      }
      expect(response).toBeDefined()
    })
  })
})
