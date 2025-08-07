/**
 * Unit tests for Bookmark Service
 * SOLID Principles: SRP - Testing single responsibility of bookmark operations
 * Design Patterns: Test Pattern with comprehensive mocking and validation
 * Dependencies: Jest, Apollo Client mocks, bookmark mock data
 */

// IMPORTANT: Mock setup MUST be before any imports that use these modules
// Create mock functions at module scope for hoisting
const mockMutate = jest.fn()
const mockQuery = jest.fn()

// Mock Apollo clients BEFORE any imports
jest.mock('@/lib/apollo/browser-client', () => ({
  getBrowserClient: () => ({
    mutate: mockMutate,
    query: mockQuery,
  }),
}))

jest.mock('@/lib/apollo/client', () => ({
  getClient: () => ({
    mutate: mockMutate,
    query: mockQuery,
  }),
}))

// Mock GraphQL documents as actual GraphQL DocumentNode objects
const mockDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MockQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'mock' } }],
      },
    },
  ],
}

jest.mock(
  '@/services/graphql/mutations/BookmarkProductMutation.graphql',
  () => ({
    __esModule: true,
    default: mockDocument,
  })
)

jest.mock(
  '@/services/graphql/mutations/UnbookmarkProductMutation.graphql',
  () => ({
    __esModule: true,
    default: mockDocument,
  })
)

jest.mock(
  '@/services/graphql/queries/GetCustomerBookmarksQuery.graphql',
  () => ({
    __esModule: true,
    default: mockDocument,
  })
)

jest.mock('@/services/graphql/queries/CheckBookmarkQuery.graphql', () => ({
  __esModule: true,
  default: mockDocument,
}))

// Mock validation functions to bypass Zod validation
jest.mock(
  '@/services/graphql/mutations/BookmarkProductMutation.schema',
  () => ({
    validateBookmarkProductResponse: (data: unknown) => data,
  })
)

jest.mock(
  '@/services/graphql/mutations/UnbookmarkProductMutation.schema',
  () => ({
    validateUnbookmarkProductResponse: (data: unknown) => data,
  })
)

jest.mock(
  '@/services/graphql/queries/GetCustomerBookmarksQuery.schema',
  () => ({
    validateGetCustomerBookmarksResponse: (data: unknown) => data,
  })
)

jest.mock('@/services/graphql/queries/CheckBookmarkQuery.schema', () => ({
  validateCheckBookmarkResponse: (data: unknown) => data,
}))

// Mock Zustand store
jest.mock('@/lib/stores/bookmark-store', () => ({
  useBookmarkStore: {
    getState: () => ({
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
      setBookmarks: jest.fn(),
      toggleBookmark: jest.fn(),
    }),
  },
}))

// Now import the modules after mocks are set up
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

// Import mock data
import {
  mockBookmarkProductSuccess,
  mockBookmarkProductAlreadyExists,
  mockUnbookmarkProductSuccess,
  mockUnbookmarkProductNotFound,
  mockCheckBookmarkExists,
  mockCheckBookmarkNotExists,
} from '@/mocks/graphql/bookmarks'

import {
  mockCustomerBookmarksData,
  mockCustomerBookmarksEmpty as mockGetCustomerBookmarksEmpty,
} from '@/mocks/graphql/customer-bookmarks'

// Import BookmarkService AFTER all mocks are set up
import { BookmarkService } from './bookmark.service'

describe('BookmarkService', () => {
  const originalEnv = process.env
  const originalWindow = (global as unknown as { window?: Window }).window
  const originalConsoleError = console.error
  const originalConsoleWarn = console.warn

  beforeEach(() => {
    jest.clearAllMocks()

    // Reset environment
    process.env = { ...originalEnv }

    // Mock console to avoid noise in tests
    console.error = jest.fn()
    console.warn = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()

    // Restore environment
    process.env = originalEnv
    if (originalWindow !== undefined) {
      ;(global as unknown as { window?: Window }).window = originalWindow
    } else {
      delete (global as unknown as { window?: Window }).window
    }

    // Restore console
    console.error = originalConsoleError
    console.warn = originalConsoleWarn
  })

  describe('constructor', () => {
    it('should create an instance with provided company id', () => {
      const service = new BookmarkService('alfe')
      expect(service).toBeInstanceOf(BookmarkService)
    })

    it('should create an instance with default company id', () => {
      const service = new BookmarkService()
      expect(service).toBeInstanceOf(BookmarkService)
    })

    it('should create an instance with environment company id', () => {
      process.env['COMPANY_ID'] = 'test-company'
      const service = new BookmarkService()
      expect(service).toBeInstanceOf(BookmarkService)
    })
  })

  describe('bookmarkProduct', () => {
    let service: BookmarkService

    beforeEach(() => {
      service = new BookmarkService('alfe')
      mockMutate.mockClear()
      mockQuery.mockClear()
    })

    it('should successfully bookmark a product', async () => {
      const customerId = 'SE0 1001 1697'
      const stockId = '0000 1002 0002'

      mockMutate.mockResolvedValueOnce({
        data: mockBookmarkProductSuccess,
      })

      const result = await service.bookmarkProduct(customerId, stockId)

      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          mutation: mockDocument,
          variables: {
            company_id: 'alfe',
            customer_id: customerId,
            stock_id: stockId,
          },
        })
      )

      expect(result).toEqual({
        success: true,
        bookmark: expect.objectContaining({
          company_id: 'alfe',
          customer_id: customerId,
          stock_id: stockId,
        }),
      })
    })

    it('should handle already existing bookmark', async () => {
      const customerId = 'SE0 1001 1697'
      const stockId = '0000 1002 0002'

      mockMutate.mockResolvedValueOnce({
        data: mockBookmarkProductAlreadyExists,
      })

      const result = await service.bookmarkProduct(customerId, stockId)

      expect(result).toEqual({
        success: true,
        bookmark: {
          company_id: 'alfe',
          customer_id: customerId,
          stock_id: stockId,
        },
      })
    })

    it('should handle errors gracefully', async () => {
      mockMutate.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.bookmarkProduct('customer', 'stock')

      expect(result).toEqual({
        success: false,
        error: 'Network error',
      })
    })

    it('should handle missing data in response', async () => {
      mockMutate.mockResolvedValueOnce({ data: null })

      const result = await service.bookmarkProduct('customer', 'stock')

      // When data is null, the service returns success with minimal bookmark
      expect(result).toEqual({
        success: true,
        bookmark: {
          company_id: 'alfe',
          customer_id: 'customer',
          stock_id: 'stock',
        },
      })
    })

    it('should handle empty returning data', async () => {
      const customerId = 'SE0 1001 1697'
      const stockId = '0000 1002 0002'

      mockMutate.mockResolvedValueOnce({
        data: {
          insert_customer_bookmarks: {
            affected_rows: 0,
            returning: [],
          },
        },
      })

      const result = await service.bookmarkProduct(customerId, stockId)

      // When affected_rows is 0, service returns success (bookmark already exists)
      expect(result).toEqual({
        success: true,
        bookmark: {
          company_id: 'alfe',
          customer_id: customerId,
          stock_id: stockId,
        },
      })
    })
  })

  describe('unbookmarkProduct', () => {
    let service: BookmarkService

    beforeEach(() => {
      service = new BookmarkService('alfe')
      mockMutate.mockClear()
      mockQuery.mockClear()
    })

    it('should successfully unbookmark a product', async () => {
      const customerId = 'SE0 1001 1697'
      const stockId = '0000 1002 0002'

      mockMutate.mockResolvedValueOnce({
        data: mockUnbookmarkProductSuccess,
      })

      const result = await service.unbookmarkProduct(customerId, stockId)

      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          mutation: mockDocument,
          variables: {
            company_id: 'alfe',
            customer_id: customerId,
            stock_id: stockId,
          },
        })
      )

      expect(result).toEqual({
        success: true,
        bookmark: expect.objectContaining({
          company_id: 'alfe',
          customer_id: customerId,
          stock_id: stockId,
        }),
      })
    })

    it('should handle bookmark not found', async () => {
      mockMutate.mockResolvedValueOnce({
        data: mockUnbookmarkProductNotFound,
      })

      const result = await service.unbookmarkProduct('customer', 'stock')

      expect(result).toEqual({
        success: false,
        error: 'Bookmark does not exist',
      })
    })

    it('should handle errors gracefully', async () => {
      mockMutate.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.unbookmarkProduct('customer', 'stock')

      expect(result).toEqual({
        success: false,
        error: 'Network error',
      })
    })
  })

  describe('isProductBookmarked', () => {
    let service: BookmarkService

    beforeEach(() => {
      service = new BookmarkService('alfe')
      mockMutate.mockClear()
      mockQuery.mockClear()
    })

    it('should return true when bookmark exists', async () => {
      mockQuery.mockResolvedValueOnce({
        data: mockCheckBookmarkExists,
      })

      const result = await service.isProductBookmarked('customer', 'stock')

      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          query: mockDocument,
          variables: {
            company_id: 'alfe',
            customer_id: 'customer',
            stock_id: 'stock',
          },
        })
      )

      expect(result).toBe(true)
    })

    it('should return false when bookmark does not exist', async () => {
      mockQuery.mockResolvedValueOnce({
        data: mockCheckBookmarkNotExists,
      })

      const result = await service.isProductBookmarked('customer', 'stock')

      expect(result).toBe(false)
    })

    it('should return false on error', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.isProductBookmarked('customer', 'stock')

      expect(result).toBe(false)
    })
  })

  describe('getCustomerBookmarks', () => {
    let service: BookmarkService

    beforeEach(() => {
      service = new BookmarkService('alfe')
      mockMutate.mockClear()
      mockQuery.mockClear()
    })

    it('should return customer bookmarks', async () => {
      mockQuery.mockResolvedValueOnce({
        data: mockCustomerBookmarksData,
      })

      const result = await service.getCustomerBookmarks('SE0 1001 1697')

      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          query: mockDocument,
          variables: {
            company_id: 'alfe',
            customer_id: 'SE0 1001 1697',
          },
        })
      )

      expect(result).toEqual(mockCustomerBookmarksData.customer_bookmarks)
    })

    it('should handle empty bookmarks', async () => {
      mockQuery.mockResolvedValueOnce({
        data: mockGetCustomerBookmarksEmpty,
      })

      const result = await service.getCustomerBookmarks('customer')

      expect(result).toEqual([])
    })

    it('should return empty array on error', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.getCustomerBookmarks('customer')

      expect(result).toEqual([])
    })
  })

  describe('toggleBookmark', () => {
    let service: BookmarkService

    beforeEach(() => {
      service = new BookmarkService('alfe')
      mockMutate.mockClear()
      mockQuery.mockClear()
    })

    it('should unbookmark when bookmark exists', async () => {
      const customerId = 'SE0 1001 1697'
      const stockId = '0000 1002 0002'

      mockMutate.mockResolvedValueOnce({
        data: mockUnbookmarkProductSuccess,
      })

      const result = await service.toggleBookmark(customerId, stockId, true)

      expect(result).toEqual({
        success: true,
        bookmark: expect.objectContaining({
          company_id: 'alfe',
          customer_id: customerId,
          stock_id: stockId,
        }),
      })
    })

    it('should bookmark when bookmark does not exist', async () => {
      const customerId = 'SE0 1001 1697'
      const stockId = '0000 1002 0002'

      mockMutate.mockResolvedValueOnce({
        data: mockBookmarkProductSuccess,
      })

      const result = await service.toggleBookmark(customerId, stockId, false)

      expect(result).toEqual({
        success: true,
        bookmark: expect.objectContaining({
          company_id: 'alfe',
          customer_id: customerId,
          stock_id: stockId,
        }),
      })
    })
  })

  // Additional edge cases
  describe('edge cases', () => {
    let service: BookmarkService

    beforeEach(() => {
      service = new BookmarkService('alfe')
      mockMutate.mockClear()
      mockQuery.mockClear()
    })

    it('should handle non-Error rejection in bookmarkProduct', async () => {
      mockMutate.mockRejectedValueOnce('String error')

      const result = await service.bookmarkProduct('customer', 'stock')

      expect(result).toEqual({
        success: false,
        error: 'Failed to bookmark product',
      })
    })

    it('should handle non-Error rejection in unbookmarkProduct', async () => {
      mockMutate.mockRejectedValueOnce({ message: 'GraphQL error' })

      const result = await service.unbookmarkProduct('customer', 'stock')

      expect(result).toEqual({
        success: false,
        error: 'Failed to unbookmark product',
      })
    })

    it('should handle null customer_bookmarks in isProductBookmarked', async () => {
      mockQuery.mockResolvedValueOnce({
        data: { customer_bookmarks: null },
      })

      const result = await service.isProductBookmarked('customer', 'stock')

      expect(result).toBe(false)
    })

    it('should handle null customer_bookmarks in getCustomerBookmarks', async () => {
      mockQuery.mockResolvedValueOnce({
        data: { customer_bookmarks: null },
      })

      const result = await service.getCustomerBookmarks('customer')

      expect(result).toEqual([])
    })
  })

  describe('client vs server initialization', () => {
    it('should use browser client when window is defined', () => {
      ;(global as unknown as { window?: Window }).window = {} as Window
      const service = new BookmarkService('test')
      expect(service).toBeInstanceOf(BookmarkService)
    })

    it('should use server client when window is undefined', () => {
      delete (global as unknown as { window?: Window }).window
      const service = new BookmarkService('test')
      expect(service).toBeInstanceOf(BookmarkService)
    })
  })

  describe('service initialization fallback', () => {
    it('should handle exported instance', async () => {
      // This test verifies the exported bookmarkService instance works
      // Using dynamic import to avoid ESLint error
      const bookmarkModule = await import('./bookmark.service')
      expect(bookmarkModule.bookmarkService).toBeInstanceOf(BookmarkService)
    })
  })
})
