/**
 * Unit tests for Bookmark Service
 * SOLID Principles: SRP - Testing single responsibility of bookmark operations
 * Design Patterns: Test Pattern with fetch mocking
 * Dependencies: Jest, Testing utilities
 */

import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { BookmarkService } from '../bookmark.service'
import {
  mockGetCustomerBookmarksResponse,
  mockBookmarkProductMutationResponse,
  mockUnbookmarkProductMutationResponse,
  emptyResponses,
} from '@/__tests__/mocks/graphql-responses'
import { FetchMockBuilder } from '@/__tests__/utils/fetch-mock'

describe('Bookmark Service', () => {
  const mockCustomerId = 'SE0 1001 1086'
  const mockProductId = '1001 1001 0026'
  const mockCompanyId = 'alfe'

  let bookmarkService: BookmarkService

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    bookmarkService = new BookmarkService(mockCompanyId)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getCustomerBookmarks', () => {
    it('should fetch customer bookmarks successfully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmarks', mockGetCustomerBookmarksResponse())
        .build()

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmarks'),
        expect.objectContaining({
          cache: 'default',
        })
      )
      expect(result).toHaveLength(2) // Default mock has 2 bookmarks
    })

    it('should return empty array when no bookmarks exist', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmarks', emptyResponses.bookmarks())
        .build()

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
    })

    it('should handle fetch errors gracefully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/bookmark', 'Internal Server Error', 500)
        .build()

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Get customer bookmarks error:',
        expect.any(Error)
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle invalid response data', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmarks', { invalid: 'data' })
        .build()

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result).toEqual([])
    })
  })

  describe('bookmarkProduct', () => {
    it('should bookmark a product successfully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/add', {
          success: true,
          data: mockBookmarkProductMutationResponse(),
        })
        .build()

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(global.fetch).toHaveBeenCalledWith(
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
      expect(result.bookmark?.stock_id).toBe(mockProductId)
    })

    it('should handle bookmark failures', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/bookmark/add', 'Bad Request', 400)
        .build()

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(console.error).toHaveBeenCalledWith(
        '❌ ===== BOOKMARK ERROR ====='
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle empty mutation response', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/add', {
          success: true,
          data: mockBookmarkProductMutationResponse({
            insert_customer_bookmarks: { affected_rows: 0, returning: [] },
          }),
        })
        .build()

      const result = await bookmarkService.bookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(true) // Returns success when bookmark already exists
      expect(result.bookmark).toBeDefined()
    })
  })

  describe('unbookmarkProduct', () => {
    it('should unbookmark a product successfully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/remove', {
          success: true,
          data: mockUnbookmarkProductMutationResponse(),
        })
        .build()

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/remove'),
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
      expect(result.bookmark?.stock_id).toBe(mockProductId)
    })

    it('should handle unbookmark failures', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/bookmark/add', 'Bad Request', 400)
        .build()

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(console.error).toHaveBeenCalledWith(
        '❌ ===== UNBOOKMARK ERROR ====='
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false)
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle empty mutation response', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/remove', {
          success: true,
          data: mockUnbookmarkProductMutationResponse({
            delete_customer_bookmarks: { affected_rows: 0, returning: [] },
          }),
        })
        .build()

      const result = await bookmarkService.unbookmarkProduct(
        mockCustomerId,
        mockProductId
      )

      expect(result.success).toBe(false) // Returns false when bookmark doesn't exist
      expect(result.error).toBe('Bookmark does not exist')
    })
  })

  describe('isProductBookmarked', () => {
    it('should return true when product is bookmarked', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/check', { isBookmarked: true })
        .build()

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/bookmark/check')
      )
      expect(result).toBe(true)
    })

    it('should return false when product is not bookmarked', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/check', { isBookmarked: false })
        .build()

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
    })

    it('should handle check failures', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/bookmark', 'Internal Server Error', 500)
        .build()

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
      expect(console.error).toHaveBeenCalledWith(
        'Check bookmark error:',
        expect.any(Error)
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle invalid response', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmarks', { invalid: 'data' })
        .build()

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        mockProductId
      )

      expect(result).toBe(false)
    })
  })

  describe('Edge cases', () => {
    it('should handle empty customer ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmarks', emptyResponses.bookmarks())
        .build()

      const result = await bookmarkService.getCustomerBookmarks('')

      expect(result).toEqual([])
    })

    it('should handle empty product ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/check', { isBookmarked: false })
        .build()

      const result = await bookmarkService.isProductBookmarked(
        mockCustomerId,
        ''
      )

      expect(result).toBe(false)
    })

    it('should handle special characters in IDs', async () => {
      const specialCustomerId = 'SE-1001/1086'
      const specialProductId = 'PROD#001'
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/check', { isBookmarked: true })
        .build()

      await bookmarkService.isProductBookmarked(
        specialCustomerId,
        specialProductId
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent(specialCustomerId))
      )
    })

    it('should handle concurrent bookmark operations', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/add', {
          success: true,
          data: mockBookmarkProductMutationResponse(),
        })
        .build()

      const promises = [
        bookmarkService.bookmarkProduct(mockCustomerId, 'PROD-001'),
        bookmarkService.bookmarkProduct(mockCustomerId, 'PROD-002'),
        bookmarkService.bookmarkProduct(mockCustomerId, 'PROD-003'),
      ]

      const results = await Promise.all(promises)

      expect(results).toHaveLength(3)
      expect(results.every(r => r.success)).toBe(true)
    })

    it('should use correct company ID from constructor', async () => {
      const customService = new BookmarkService('custom_company')
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/add', {
          success: true,
          data: mockBookmarkProductMutationResponse(),
        })
        .build()

      await customService.bookmarkProduct(mockCustomerId, mockProductId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('custom_company'),
        })
      )
    })

    it('should handle bookmarks with product details', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmarks', mockGetCustomerBookmarksResponse())
        .build()

      const result = await bookmarkService.getCustomerBookmarks(mockCustomerId)

      expect(result[0]?.stock_id).toBe('1001 1001 0026')
      expect(result[0]?.stock?.stock_name).toBeDefined()
      expect(result[0]?.stock?.stock_price).toBeDefined()
    })

    it('should handle multiple unbookmark operations', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/bookmark/remove', {
          success: true,
          data: mockUnbookmarkProductMutationResponse(),
        })
        .build()

      const productIds = ['PROD-001', 'PROD-002', 'PROD-003']
      const results = await Promise.all(
        productIds.map(id =>
          bookmarkService.unbookmarkProduct(mockCustomerId, id)
        )
      )

      expect(results).toHaveLength(3)
      expect(results.every(r => r.success)).toBe(true)
    })
  })
})
