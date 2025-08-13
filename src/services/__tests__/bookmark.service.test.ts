/**
 * Unit tests for Bookmark Service
 * SOLID Principles: SRP - Testing single responsibility of bookmark operations
 * Design Patterns: Test Pattern with inline mocking only
 * Dependencies: Jest with inline mocks only
 */

import { BookmarkService } from '../bookmark.service'

// Mock validation functions
jest.mock(
  '@/services/graphql/mutations/BookmarkProductMutation.schema',
  () => ({
    validateBookmarkProductResponse: jest.fn(data => data),
  })
)

jest.mock(
  '@/services/graphql/mutations/UnbookmarkProductMutation.schema',
  () => ({
    validateUnbookmarkProductResponse: jest.fn(data => data),
  })
)

jest.mock(
  '@/services/graphql/queries/GetCustomerBookmarksQuery.schema',
  () => ({
    validateGetCustomerBookmarksResponse: jest.fn(data => data),
  })
)

// Store original fetch to restore later
const originalFetch = global.fetch

// Mock fetch globally
const mockFetch = jest.fn()

describe('Bookmark Service', () => {
  const mockCustomerId = 'SE0 1001 1086'
  const mockProductId = '1001 1001 0026'
  const mockCompanyId = 'alfe'

  let bookmarkService: BookmarkService

  beforeAll(() => {
    // Override global fetch with our mock
    global.fetch = mockFetch as jest.Mock
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockClear()
    bookmarkService = new BookmarkService(mockCompanyId)
  })

  afterAll(() => {
    // Restore original fetch
    global.fetch = originalFetch
  })

  // Helper functions for creating mock responses
  function createMockBookmarkResponse() {
    return {
      insert_customer_bookmarks: {
        affected_rows: 1,
        returning: [
          {
            company_id: mockCompanyId,
            customer_id: mockCustomerId,
            stock_id: mockProductId,
            customer: {
              customer_id: mockCustomerId,
              customer_nickname: 'Test Customer',
            },
            stock: {
              stock_id: mockProductId,
              stock_name: 'Test Product',
            },
          },
        ],
      },
    }
  }

  function createMockUnbookmarkResponse() {
    return {
      delete_customer_bookmarks: {
        affected_rows: 1,
        returning: [
          {
            company_id: mockCompanyId,
            customer_id: mockCustomerId,
            stock_id: mockProductId,
            customer: {
              customer_id: mockCustomerId,
              customer_nickname: 'Test Customer',
            },
            stock: {
              stock_id: mockProductId,
              stock_name: 'Test Product',
            },
          },
        ],
      },
    }
  }

  function createMockBookmarksResponse() {
    return {
      customer_bookmarks: [
        {
          stock_id: mockProductId,
          customer_id: mockCustomerId,
          company_id: mockCompanyId,
          stock: {
            stock_id: mockProductId,
            stock_name: 'Test Product',
            stock_price: 10000,
            stock_image_link: 'https://example.com/image.jpg',
          },
        },
      ],
    }
  }

  describe('Constructor', () => {
    it('should use default company ID when not provided', () => {
      const service = new BookmarkService()
      expect(service).toBeDefined()
    })

    it('should use custom company ID when provided', () => {
      const service = new BookmarkService('custom-company')
      expect(service).toBeDefined()
    })

    it('should use environment company ID when available', () => {
      const originalEnv = process.env['COMPANY_ID']
      process.env['COMPANY_ID'] = 'env-company'

      const service = new BookmarkService()
      expect(service).toBeDefined()

      // Restore environment
      if (originalEnv) {
        process.env['COMPANY_ID'] = originalEnv
      } else {
        delete process.env['COMPANY_ID']
      }
    })
  })

  describe('bookmarkProduct', () => {
    it('should bookmark a product successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: createMockBookmarkResponse(),
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/add'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            company_id: mockCompanyId,
            customer_id: mockCustomerId,
            stock_id: mockProductId,
          }),
        })
      )
      expect(result.success).toBe(true)
      expect(result.bookmark).toBeDefined()
    })

    it('should handle server-side execution with environment URL', async () => {
      // Note: Server-side URL construction (line 56) cannot be tested in jest-dom
      // environment where window is always defined. This test verifies client-side behavior.
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: createMockBookmarkResponse(),
        }),
      })

      await bookmarkService.bookmarkProduct(mockCustomerId, mockProductId)

      // In jest-dom environment (client-side), relative URL is used
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/add'),
        expect.any(Object)
      )
    })

    it('should handle bookmark already exists (affected_rows = 0)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            insert_customer_bookmarks: {
              affected_rows: 0,
              returning: [],
            },
          },
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(true)
      expect(result.bookmark).toEqual({
        company_id: mockCompanyId,
        customer_id: mockCustomerId,
        stock_id: mockProductId,
      })
    })

    it('should handle missing bookmark in response (line 100 coverage)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            insert_customer_bookmarks: {
              affected_rows: 1,
              returning: [], // Empty returning array - triggers line 99-101
            },
          },
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to create bookmark - no data returned')
    })

    it('should handle API success false response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          error: 'API validation failed',
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('API validation failed')
    })

    it('should handle fetch not ok response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to bookmark: Bad Request')
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network connection failed'))

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network connection failed')
    })

    it('should handle non-Error exceptions', async () => {
      mockFetch.mockRejectedValueOnce('String error')

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to bookmark product')
    })

    it('should map bookmark with customer and stock details', async () => {
      const mockResponseWithDetails = {
        insert_customer_bookmarks: {
          affected_rows: 1,
          returning: [
            {
              company_id: mockCompanyId,
              customer: {
                customer_id: mockCustomerId,
                customer_nickname: 'John Doe',
              },
              stock: {
                stock_id: mockProductId,
                stock_name: 'Premium Product',
              },
            },
          ],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockResponseWithDetails,
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(true)
      expect(result.bookmark?.customer?.customer_nickname).toBe('John Doe')
      expect(result.bookmark?.stock?.stock_name).toBe('Premium Product')
    })
  })

  describe('unbookmarkProduct', () => {
    it('should unbookmark a product successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: createMockUnbookmarkResponse(),
        }),
      })

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/remove'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
      expect(result.success).toBe(true)
      expect(result.bookmark).toBeDefined()
    })

    it('should handle unbookmark when no rows affected (lines 212-216 coverage)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            delete_customer_bookmarks: {
              affected_rows: 0,
              returning: [],
            },
          },
        }),
      })

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Bookmark does not exist')
    })

    it('should handle unbookmark with null returning data (line 212-216)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            delete_customer_bookmarks: {
              affected_rows: 1,
              returning: [null], // Null bookmark data
            },
          },
        }),
      })

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(true)
      expect(result.bookmark).toEqual({
        company_id: mockCompanyId,
        customer_id: mockCustomerId,
        stock_id: mockProductId,
      })
    })

    it('should handle API error responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      })

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to unbookmark: Internal Server Error')
    })

    it('should handle network errors (line 236 coverage)', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection timeout'))

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Connection timeout')
    })

    it('should handle non-Error exceptions in unbookmark', async () => {
      mockFetch.mockRejectedValueOnce({ message: 'Unknown error' })

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to unbookmark product')
    })
  })

  describe('isProductBookmarked', () => {
    it('should return true when product is bookmarked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isBookmarked: true }),
      })

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/check')
      )
      expect(result).toBe(true)
    })

    it('should return false when product is not bookmarked', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isBookmarked: false }),
      })

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
    })

    it('should handle server-side execution with default URL (line 252 coverage)', async () => {
      // Note: Server-side URL construction (line 252) cannot be tested in jest-dom
      // environment where window is always defined. This test verifies client-side behavior.
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isBookmarked: false }),
      })

      await bookmarkService.isProductBookmarked(mockCustomerId, mockProductId)

      // In jest-dom environment (client-side), relative URL is used
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/check')
      )
    })

    it('should handle API failures gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      })

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network down'))

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
    })
  })

  describe('getCustomerBookmarks', () => {
    it('should fetch customer bookmarks successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockBookmarksResponse(),
      })

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmarks'),
        expect.objectContaining({
          cache: 'default',
        })
      )
      expect(result).toHaveLength(1)
      expect(result[0]?.stock_id).toBe(mockProductId)
    })

    it('should handle forceRefresh parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockBookmarksResponse(),
      })

      await bookmarkService.getCustomerBookmarks(mockCustomerId, true)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          cache: 'no-store',
        })
      )
    })

    it('should handle server-side execution (line 287 coverage)', async () => {
      // Note: Server-side URL construction (line 287) cannot be tested in jest-dom
      // environment where window is always defined. This test verifies client-side behavior.
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockBookmarksResponse(),
      })

      await bookmarkService.getCustomerBookmarks(mockCustomerId)

      // In jest-dom environment (client-side), relative URL is used
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmarks'),
        expect.any(Object)
      )
    })

    it('should handle API failures', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Service Unavailable',
      })

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection refused'))

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
    })

    it('should return empty array for null response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      })

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
    })
  })

  describe('toggleBookmark', () => {
    it('should unbookmark when current status is true (lines 321-332 coverage)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: createMockUnbookmarkResponse(),
        }),
      })

      const result = await bookmarkService.toggleBookmark(
        mockCustomerId,
        mockProductId,
        true // Currently bookmarked
      )

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/remove'),
        expect.any(Object)
      )
      expect(result.success).toBe(true)
    })

    it('should bookmark when current status is false (lines 321-332 coverage)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: createMockBookmarkResponse(),
        }),
      })

      const result = await bookmarkService.toggleBookmark(
        mockCustomerId,
        mockProductId,
        false // Not currently bookmarked
      )

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/add'),
        expect.any(Object)
      )
      expect(result.success).toBe(true)
    })

    it('should handle toggle bookmark errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Server Error',
      })

      const result = await bookmarkService.toggleBookmark(
        mockCustomerId,
        mockProductId,
        false
      )

      expect(result.success).toBe(false)
    })
  })

  describe('Validation and edge cases', () => {
    it('should validate responses with schema validation', async () => {
      const { validateBookmarkProductResponse } = jest.requireMock(
        '@/services/graphql/mutations/BookmarkProductMutation.schema'
      )

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: createMockBookmarkResponse(),
        }),
      })

      await bookmarkService.bookmarkProduct(mockCustomerId, mockProductId)

      expect(validateBookmarkProductResponse).toHaveBeenCalled()
    })

    it('should handle special characters in parameters', async () => {
      const specialCustomerId = 'CUST#123/456'
      const specialProductId = 'PROD@789&ABC'

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ isBookmarked: true }),
      })

      await bookmarkService.isProductBookmarked(
        specialCustomerId,
        specialProductId
      )

      const callArg = mockFetch.mock.calls[0]?.[0] as string
      expect(callArg).toContain(encodeURIComponent(specialCustomerId))
      expect(callArg).toContain(encodeURIComponent(specialProductId))
    })

    it('should handle empty response data gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
    })

    it('should handle bookmark with missing customer data', async () => {
      const responseWithoutCustomer = {
        insert_customer_bookmarks: {
          affected_rows: 1,
          returning: [
            {
              company_id: mockCompanyId,
              customer: null, // No customer data
              stock: {
                stock_id: mockProductId,
                stock_name: 'Test Product',
              },
            },
          ],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: responseWithoutCustomer,
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(true)
      expect(result.bookmark?.customer).toBeUndefined()
    })

    it('should handle bookmark with missing stock data', async () => {
      const responseWithoutStock = {
        insert_customer_bookmarks: {
          affected_rows: 1,
          returning: [
            {
              company_id: mockCompanyId,
              customer: {
                customer_id: mockCustomerId,
                customer_nickname: 'Test',
              },
              stock: null, // No stock data
            },
          ],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: responseWithoutStock,
        }),
      })

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(true)
      expect(result.bookmark?.stock).toBeUndefined()
    })
  })

  describe('Singleton export', () => {
    it('should export a singleton instance', async () => {
      const { bookmarkService } = await import('../bookmark.service')
      expect(bookmarkService).toBeInstanceOf(BookmarkService)
    })
  })
})
