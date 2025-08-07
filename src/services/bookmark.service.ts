/**
 * Bookmark Service - Business logic for bookmark operations
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for bookmark business logic
 * - OCP: Open for extension with new bookmark features
 * - DIP: Depends on GraphQL client abstraction
 *
 * Design Patterns:
 * - Service Layer Pattern: Encapsulates business logic
 * - Repository Pattern: Abstracts data access
 * - Error Handling Pattern: Consistent error management
 *
 * Dependencies: Apollo Client, bookmark types, Zod validation
 */

// Dynamic import for client selection based on environment
import type { ApolloClient } from '@apollo/client'

let getClient: () => ApolloClient<object>

if (typeof window !== 'undefined') {
  // Browser environment - use browser client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getBrowserClient } = require('@/lib/apollo/browser-client')
  getClient = getBrowserClient
} else {
  // Server environment - use server client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getClient: getServerClient } = require('@/lib/apollo/client')
  getClient = getServerClient
}

// Import GraphQL documents
import BookmarkProductMutationDocument from '@/services/graphql/mutations/BookmarkProductMutation.graphql'
import UnbookmarkProductMutationDocument from '@/services/graphql/mutations/UnbookmarkProductMutation.graphql'
import GetCustomerBookmarksQueryDocument from '@/services/graphql/queries/GetCustomerBookmarksQuery.graphql'
import CheckBookmarkQueryDocument from '@/services/graphql/queries/CheckBookmarkQuery.graphql'

// Import types
import type {
  BookmarkProductMutationResponse,
  BookmarkProductMutationVariables,
} from '@/services/graphql/mutations/BookmarkProductMutation.types'
import type {
  UnbookmarkProductMutationResponse,
  UnbookmarkProductMutationVariables,
} from '@/services/graphql/mutations/UnbookmarkProductMutation.types'
import type {
  GetCustomerBookmarksQueryResponse,
  GetCustomerBookmarksQueryVariables,
} from '@/services/graphql/queries/GetCustomerBookmarksQuery.types'
import type {
  CheckBookmarkQueryResponse,
  CheckBookmarkQueryVariables,
} from '@/services/graphql/queries/CheckBookmarkQuery.types'

// Import validation schemas
import { validateBookmarkProductResponse } from '@/services/graphql/mutations/BookmarkProductMutation.schema'
import { validateUnbookmarkProductResponse } from '@/services/graphql/mutations/UnbookmarkProductMutation.schema'
import { validateGetCustomerBookmarksResponse } from '@/services/graphql/queries/GetCustomerBookmarksQuery.schema'
import { validateCheckBookmarkResponse } from '@/services/graphql/queries/CheckBookmarkQuery.schema'

// Import legacy types for compatibility
import type {
  BookmarkResponse,
  UnbookmarkResponse,
  CustomerBookmark,
} from '@/lib/types/bookmark.types'
import type { CustomerBookmarkItem } from '@/services/graphql/queries/GetCustomerBookmarksQuery.types'

/**
 * Bookmark service for managing product bookmarks
 */
export class BookmarkService {
  private companyId: string

  constructor(companyId: string = process.env['COMPANY_ID'] || 'alfe') {
    this.companyId = companyId
  }

  /**
   * Add a product to customer bookmarks
   */
  async bookmarkProduct(
    customerId: string,
    stockId: string
  ): Promise<BookmarkResponse> {
    try {
      const client = getClient()
      const { data } = await client.mutate<
        BookmarkProductMutationResponse,
        BookmarkProductMutationVariables
      >({
        mutation: BookmarkProductMutationDocument,
        variables: {
          company_id: this.companyId,
          customer_id: customerId,
          stock_id: stockId,
        },
        refetchQueries: [
          {
            query: GetCustomerBookmarksQueryDocument,
            variables: {
              company_id: this.companyId,
              customer_id: customerId,
            },
          },
        ],
        awaitRefetchQueries: false,
      })

      // Validate response with Zod
      const validatedData = validateBookmarkProductResponse(data)

      const affectedRows =
        validatedData?.insert_customer_bookmarks?.affected_rows || 0
      const bookmark = validatedData?.insert_customer_bookmarks?.returning?.[0]

      if (affectedRows === 0) {
        console.warn('⚠️ Bookmark already exists - no new bookmark created')
        // Return success since bookmark exists (desired state achieved)
        return {
          success: true,
          bookmark: {
            company_id: this.companyId,
            customer_id: customerId,
            stock_id: stockId,
          },
        }
      }

      if (!bookmark) {
        console.error('❌ No bookmark in response - full data:', validatedData)
        throw new Error('Failed to create bookmark - no data returned')
      }

      // Map to legacy format
      const mappedBookmark: CustomerBookmark = {
        company_id: bookmark.company_id,
        customer_id: customerId,
        stock_id: stockId,
        ...(bookmark.customer && {
          customer: {
            customer_id: bookmark.customer.customer_id,
            customer_nickname: bookmark.customer.customer_nickname || '',
          },
        }),
        ...(bookmark.stock && {
          stock: {
            stock_id: bookmark.stock.stock_id,
            stock_name: bookmark.stock.stock_name || '',
          },
        }),
      }

      return {
        success: true,
        bookmark: mappedBookmark,
      }
    } catch (error) {
      console.error('❌ ===== BOOKMARK ERROR =====')
      console.error('❌ Error type:', error?.constructor?.name)
      console.error(
        '❌ Error message:',
        error instanceof Error ? error.message : error
      )
      console.error('❌ Full error:', error)

      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to bookmark product',
      }
    }
  }

  /**
   * Remove a product from customer bookmarks
   */
  async unbookmarkProduct(
    customerId: string,
    stockId: string
  ): Promise<UnbookmarkResponse> {
    try {
      const client = getClient()
      const { data } = await client.mutate<
        UnbookmarkProductMutationResponse,
        UnbookmarkProductMutationVariables
      >({
        mutation: UnbookmarkProductMutationDocument,
        variables: {
          company_id: this.companyId,
          customer_id: customerId,
          stock_id: stockId,
        },
        refetchQueries: [
          {
            query: GetCustomerBookmarksQueryDocument,
            variables: {
              company_id: this.companyId,
              customer_id: customerId,
            },
          },
        ],
        awaitRefetchQueries: false,
      })

      // Validate response with Zod
      const validatedData = validateUnbookmarkProductResponse(data)

      const affectedRows =
        validatedData?.delete_customer_bookmarks?.affected_rows || 0
      const bookmark = validatedData?.delete_customer_bookmarks?.returning?.[0]

      if (affectedRows === 0) {
        console.error('❌ No bookmarks were deleted - bookmark does not exist')
        return {
          success: false,
          error: 'Bookmark does not exist',
        }
      }

      // Map to legacy format
      const mappedBookmark: CustomerBookmark = bookmark
        ? {
            company_id: bookmark.company_id,
            customer_id: customerId,
            stock_id: stockId,
            ...(bookmark.customer && {
              customer: {
                customer_id: bookmark.customer.customer_id,
                customer_nickname: bookmark.customer.customer_nickname || '',
              },
            }),
            ...(bookmark.stock && {
              stock: {
                stock_id: bookmark.stock.stock_id,
                stock_name: bookmark.stock.stock_name || '',
              },
            }),
          }
        : {
            company_id: this.companyId,
            customer_id: customerId,
            stock_id: stockId,
          }

      return {
        success: true,
        bookmark: mappedBookmark,
      }
    } catch (error) {
      console.error('❌ ===== UNBOOKMARK ERROR =====')
      console.error('❌ Error type:', error?.constructor?.name)
      console.error(
        '❌ Error message:',
        error instanceof Error ? error.message : error
      )
      console.error('❌ Full error:', error)

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to unbookmark product',
      }
    }
  }

  /**
   * Check if a product is bookmarked by a customer
   */
  async isProductBookmarked(
    customerId: string,
    stockId: string
  ): Promise<boolean> {
    try {
      const client = getClient()
      const { data } = await client.query<
        CheckBookmarkQueryResponse,
        CheckBookmarkQueryVariables
      >({
        query: CheckBookmarkQueryDocument,
        variables: {
          company_id: this.companyId,
          customer_id: customerId,
          stock_id: stockId,
        },
      })

      // Validate response with Zod
      const validatedData = validateCheckBookmarkResponse(data)

      return (validatedData?.customer_bookmarks?.length ?? 0) > 0
    } catch (error) {
      console.error('Check bookmark error:', error)
      return false
    }
  }

  /**
   * Get all bookmarks for a customer with full stock details
   */
  async getCustomerBookmarks(
    customerId: string,
    forceRefresh = false
  ): Promise<CustomerBookmarkItem[]> {
    try {
      const client = getClient()
      const { data } = await client.query<
        GetCustomerBookmarksQueryResponse,
        GetCustomerBookmarksQueryVariables
      >({
        query: GetCustomerBookmarksQueryDocument,
        variables: {
          company_id: this.companyId,
          customer_id: customerId,
        },
        fetchPolicy: forceRefresh ? 'network-only' : 'cache-first',
      })

      // Validate response with Zod
      const validatedData = validateGetCustomerBookmarksResponse(data)

      // Return bookmarks with full stock details
      return validatedData?.customer_bookmarks || []
    } catch (error) {
      console.error('Get customer bookmarks error:', error)
      return []
    }
  }

  /**
   * Toggle bookmark status for a product
   */
  async toggleBookmark(
    customerId: string,
    stockId: string,
    currentStatus: boolean
  ): Promise<BookmarkResponse | UnbookmarkResponse> {
    if (currentStatus) {
      // Product is bookmarked, unbookmark it
      return this.unbookmarkProduct(customerId, stockId)
    } else {
      // Product is not bookmarked, bookmark it
      return this.bookmarkProduct(customerId, stockId)
    }
  }
}

// Export singleton instance
export const bookmarkService = new BookmarkService()
