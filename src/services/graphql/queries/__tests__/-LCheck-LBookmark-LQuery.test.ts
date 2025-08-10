/**
 * Unit tests for CheckBookmarkQuery schema and types
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas, types
 */

import { describe, it, expect } from '@jest/globals'
import { ZodError } from 'zod'
import {
  CheckBookmarkQueryVariablesSchema,
  BookmarkItemSchema,
  CheckBookmarkQueryResponseSchema,
  validateCheckBookmarkResponse,
  safeValidateCheckBookmarkResponse,
} from '../CheckBookmarkQuery.schema'
import {
  isCheckBookmarkQueryResponse,
  type CheckBookmarkQueryVariables,
  type BookmarkItem,
  type CheckBookmarkQueryResponse,
} from '../CheckBookmarkQuery.types'

describe('CheckBookmarkQuery', () => {
  describe('Schema Validation', () => {
    describe('CheckBookmarkQueryVariablesSchema', () => {
      it('should validate valid variables', () => {
        const validVariables: CheckBookmarkQueryVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        const result = CheckBookmarkQueryVariablesSchema.parse(validVariables)
        expect(result).toEqual(validVariables)
      })

      it('should reject missing fields', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          // missing stock_id
        }
        expect(() =>
          CheckBookmarkQueryVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })

      it('should reject invalid types', () => {
        const invalidVariables = {
          company_id: 123, // should be string
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        expect(() =>
          CheckBookmarkQueryVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })
    })

    describe('BookmarkItemSchema', () => {
      it('should validate valid bookmark item', () => {
        const validItem: BookmarkItem = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        const result = BookmarkItemSchema.parse(validItem)
        expect(result).toEqual(validItem)
      })

      it('should reject bookmark with missing fields', () => {
        const invalidItem = {
          company_id: 'comp_123',
          // missing customer_id and stock_id
        }
        expect(() => BookmarkItemSchema.parse(invalidItem)).toThrow(ZodError)
      })

      it('should reject bookmark with null values', () => {
        const invalidItem = {
          company_id: 'comp_123',
          customer_id: null,
          stock_id: 'stock_789',
        }
        expect(() => BookmarkItemSchema.parse(invalidItem)).toThrow(ZodError)
      })
    })

    describe('CheckBookmarkQueryResponseSchema', () => {
      it('should validate valid response', () => {
        const validResponse: CheckBookmarkQueryResponse = {
          customer_bookmarks: [
            {
              company_id: 'comp_123',
              customer_id: 'cust_456',
              stock_id: 'stock_789',
            },
            {
              company_id: 'comp_456',
              customer_id: 'cust_789',
              stock_id: 'stock_012',
            },
          ],
        }
        const result = CheckBookmarkQueryResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate empty bookmarks array', () => {
        const validResponse: CheckBookmarkQueryResponse = {
          customer_bookmarks: [],
        }
        const result = CheckBookmarkQueryResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should reject response without customer_bookmarks', () => {
        const invalidResponse = {}
        expect(() =>
          CheckBookmarkQueryResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject response with invalid bookmark items', () => {
        const invalidResponse = {
          customer_bookmarks: [
            {
              company_id: 'comp_123',
              // missing other fields
            },
          ],
        }
        expect(() =>
          CheckBookmarkQueryResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject non-array customer_bookmarks', () => {
        const invalidResponse = {
          customer_bookmarks: 'not an array',
        }
        expect(() =>
          CheckBookmarkQueryResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })
    })

    describe('validateCheckBookmarkResponse', () => {
      it('should parse valid response', () => {
        const validResponse = {
          customer_bookmarks: [
            {
              company_id: 'comp_123',
              customer_id: 'cust_456',
              stock_id: 'stock_789',
            },
          ],
        }
        const result = validateCheckBookmarkResponse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should throw on invalid response', () => {
        const invalidResponse = {
          customer_bookmarks: 'invalid',
        }
        expect(() => validateCheckBookmarkResponse(invalidResponse)).toThrow(
          ZodError
        )
      })

      it('should throw on null response', () => {
        expect(() => validateCheckBookmarkResponse(null)).toThrow(ZodError)
      })

      it('should throw on undefined response', () => {
        expect(() => validateCheckBookmarkResponse(undefined)).toThrow(ZodError)
      })
    })

    describe('safeValidateCheckBookmarkResponse', () => {
      it('should return success for valid response', () => {
        const validResponse = {
          customer_bookmarks: [
            {
              company_id: 'comp_123',
              customer_id: 'cust_456',
              stock_id: 'stock_789',
            },
          ],
        }
        const result = safeValidateCheckBookmarkResponse(validResponse)
        expect(result.success).toBe(true)
        if (result.success) {
          expect(result.data).toEqual(validResponse)
        }
      })

      it('should return error for invalid response', () => {
        const invalidResponse = {
          customer_bookmarks: 'invalid',
        }
        const result = safeValidateCheckBookmarkResponse(invalidResponse)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error).toBeInstanceOf(ZodError)
        }
      })

      it('should return error for null', () => {
        const result = safeValidateCheckBookmarkResponse(null)
        expect(result.success).toBe(false)
      })

      it('should return error for undefined', () => {
        const result = safeValidateCheckBookmarkResponse(undefined)
        expect(result.success).toBe(false)
      })

      it('should return error for missing fields', () => {
        const invalidResponse = {}
        const result = safeValidateCheckBookmarkResponse(invalidResponse)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Type Guards', () => {
    describe('isCheckBookmarkQueryResponse', () => {
      it('should return true for valid response', () => {
        const validResponse = {
          customer_bookmarks: [
            {
              company_id: 'comp_123',
              customer_id: 'cust_456',
              stock_id: 'stock_789',
            },
          ],
        }
        expect(isCheckBookmarkQueryResponse(validResponse)).toBe(true)
      })

      it('should return true for empty bookmarks array', () => {
        const validResponse = {
          customer_bookmarks: [],
        }
        expect(isCheckBookmarkQueryResponse(validResponse)).toBe(true)
      })

      it('should return false for null', () => {
        expect(isCheckBookmarkQueryResponse(null)).toBe(false)
      })

      it('should return false for undefined', () => {
        expect(isCheckBookmarkQueryResponse(undefined)).toBe(false)
      })

      it('should return false for string', () => {
        expect(isCheckBookmarkQueryResponse('string')).toBe(false)
      })

      it('should return false for number', () => {
        expect(isCheckBookmarkQueryResponse(123)).toBe(false)
      })

      it('should return false for missing customer_bookmarks', () => {
        const invalidResponse = {}
        expect(isCheckBookmarkQueryResponse(invalidResponse)).toBe(false)
      })

      it('should return false for non-array customer_bookmarks', () => {
        const invalidResponse = {
          customer_bookmarks: 'not an array',
        }
        expect(isCheckBookmarkQueryResponse(invalidResponse)).toBe(false)
      })

      it('should return false for object with null customer_bookmarks', () => {
        const invalidResponse = {
          customer_bookmarks: null,
        }
        expect(isCheckBookmarkQueryResponse(invalidResponse)).toBe(false)
      })

      it('should return true for object with customer_bookmarks array', () => {
        const validResponse = {
          customer_bookmarks: [{}], // Type guard only checks structure
        }
        expect(isCheckBookmarkQueryResponse(validResponse)).toBe(true)
      })
    })
  })

  describe('Type Exports', () => {
    it('should export CheckBookmarkQueryVariables interface', () => {
      const variables: CheckBookmarkQueryVariables = {
        company_id: 'comp_123',
        customer_id: 'cust_456',
        stock_id: 'stock_789',
      }
      expect(variables).toBeDefined()
    })

    it('should export BookmarkItem interface', () => {
      const item: BookmarkItem = {
        company_id: 'comp_123',
        customer_id: 'cust_456',
        stock_id: 'stock_789',
      }
      expect(item).toBeDefined()
    })

    it('should export CheckBookmarkQueryResponse interface', () => {
      const response: CheckBookmarkQueryResponse = {
        customer_bookmarks: [],
      }
      expect(response).toBeDefined()
    })
  })
})
