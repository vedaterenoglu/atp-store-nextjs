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
 * Dependencies: GraphQL client, bookmark types
 */

import { executeGraphQLOperation } from '@/lib/graphql'
import type {
  BookmarkVariables,
  BookmarkMutationResponse,
  UnbookmarkMutationResponse,
  BookmarkResponse,
  UnbookmarkResponse,
  BookmarkStatusResponse,
} from '@/lib/types/bookmark.types'

// Import GraphQL documents
import BookmarkProductMutation from '@/services/graphql/mutations/BookmarkProductMutation.graphql'
import UnbookmarkProductMutation from '@/services/graphql/mutations/UnbookmarkProductMutation.graphql'
import GetCustomerBookmarksQuery from '@/services/graphql/queries/GetCustomerBookmarksQuery.graphql'
import CheckBookmarkQuery from '@/services/graphql/queries/CheckBookmarkQuery.graphql'

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
    // Bookmark (add) operation

    try {
      const variables: BookmarkVariables = {
        company_id: this.companyId,
        customer_id: customerId,
        stock_id: stockId,
      }

      // Execute GraphQL BOOKMARK mutation
      const data = await executeGraphQLOperation<
        BookmarkMutationResponse,
        BookmarkVariables
      >(BookmarkProductMutation, variables)

      // Process bookmark response

      const affectedRows = data?.insert_customer_bookmarks?.affected_rows || 0
      const bookmark = data?.insert_customer_bookmarks?.returning?.[0]
      // Extract bookmark object

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
        console.error('❌ No bookmark in response - full data:', data)
        throw new Error('Failed to create bookmark - no data returned')
      }

      // Bookmark created successfully

      return {
        success: true,
        bookmark,
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
    // Unbookmark (delete) operation

    try {
      const variables: BookmarkVariables = {
        company_id: this.companyId,
        customer_id: customerId,
        stock_id: stockId,
      }

      // Execute GraphQL UNBOOKMARK mutation
      const data = await executeGraphQLOperation<
        UnbookmarkMutationResponse,
        BookmarkVariables
      >(UnbookmarkProductMutation, variables)

      // Process unbookmark response

      const affectedRows = data?.delete_customer_bookmarks?.affected_rows || 0
      const bookmark = data?.delete_customer_bookmarks?.returning?.[0]
      // Extract deleted bookmark

      if (affectedRows === 0) {
        console.error('❌ No bookmarks were deleted - bookmark does not exist')
        return {
          success: false,
          error: 'Bookmark does not exist',
        }
      } else {
        // Bookmark deleted successfully
      }

      return {
        success: true,
        bookmark: bookmark || {
          company_id: this.companyId,
          customer_id: customerId,
          stock_id: stockId,
        },
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
      const variables = {
        company_id: this.companyId,
        customer_id: customerId,
        stock_id: stockId,
      }

      const data = await executeGraphQLOperation<
        BookmarkStatusResponse,
        typeof variables
      >(CheckBookmarkQuery, variables)

      return (data?.customer_bookmarks?.length ?? 0) > 0
    } catch (error) {
      console.error('Check bookmark error:', error)
      return false
    }
  }

  /**
   * Get all bookmarks for a customer
   */
  async getCustomerBookmarks(customerId: string) {
    try {
      const variables = {
        company_id: this.companyId,
        customer_id: customerId,
      }

      const data = await executeGraphQLOperation<
        BookmarkStatusResponse,
        typeof variables
      >(GetCustomerBookmarksQuery, variables)

      return data?.customer_bookmarks || []
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
    // Toggle bookmark based on current status

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
