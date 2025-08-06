/**
 * Bookmark Server Actions - Secure server-side bookmark operations
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for bookmark server actions
 * - OCP: Open for extension with new bookmark operations
 * - DIP: Depends on service abstraction, not implementation
 *
 * Design Patterns:
 * - Server Action Pattern: Next.js server-side operations
 * - Security Pattern: Customer ID extraction from session
 * - Error Handling Pattern: Consistent error responses
 *
 * Dependencies: Clerk auth, bookmark service
 */

'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { bookmarkService } from '@/lib/services/bookmark.service'
import type {
  BookmarkResponse,
  UnbookmarkResponse,
} from '@/lib/types/bookmark.types'
import { revalidatePath } from 'next/cache'

/**
 * Extract customer ID from Clerk session securely
 * Priority: sessionClaims > publicMetadata > error
 */
async function getSecureCustomerId(): Promise<string> {
  const { userId, sessionClaims } = await auth()

  if (!userId) {
    throw new Error('Authentication required')
  }

  // Try session claims first (most secure) - using 'customerid' (lowercase)
  const metadata = sessionClaims?.['metadata'] as
    | Record<string, unknown>
    | undefined
  const sessionCustomerId = metadata?.['customerid'] as string | undefined

  if (sessionCustomerId) {
    return sessionCustomerId
  }

  // Fallback to user metadata
  const user = await currentUser()

  const publicCustomerId = user?.publicMetadata?.['customerid'] as
    | string
    | undefined

  if (publicCustomerId) {
    return publicCustomerId
  }

  // TEMPORARY: Use test customer ID for development
  // TODO: Remove this and ensure customer ID is set in Clerk
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️ Using TEST customer ID - Set customer ID in Clerk for production!'
    )
    return 'SE0 1001 1697' // Test customer ID from GraphQL examples
  }

  // No customer ID found
  throw new Error('Customer ID not found. Please contact support.')
}

/**
 * Bookmark a product for the authenticated customer
 * @param stockId - The product/stock ID to bookmark
 * @returns BookmarkResponse with success status
 */
export async function bookmarkProduct(
  stockId: string
): Promise<BookmarkResponse> {
  try {
    // Validate input
    if (!stockId || typeof stockId !== 'string') {
      return {
        success: false,
        error: 'Invalid product ID',
      }
    }

    // Get customer ID securely from session
    const customerId = await getSecureCustomerId()

    // Execute bookmark operation
    const result = await bookmarkService.bookmarkProduct(customerId, stockId)

    // Revalidate paths to update UI
    if (result.success) {
      revalidatePath('/products')
      revalidatePath(`/products/${stockId}`)
      revalidatePath('/bookmarks')
    }

    return result
  } catch (error) {
    console.error('❌ Bookmark product action error:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to bookmark product',
    }
  }
}

/**
 * Remove a product from customer bookmarks
 * @param stockId - The product/stock ID to unbookmark
 * @returns UnbookmarkResponse with success status
 */
export async function unbookmarkProduct(
  stockId: string
): Promise<UnbookmarkResponse> {
  try {
    // Validate input
    if (!stockId || typeof stockId !== 'string') {
      return {
        success: false,
        error: 'Invalid product ID',
      }
    }

    // Get customer ID securely from session
    const customerId = await getSecureCustomerId()

    // Execute unbookmark operation
    const result = await bookmarkService.unbookmarkProduct(customerId, stockId)

    // Revalidate paths to update UI
    if (result.success) {
      revalidatePath('/products')
      revalidatePath(`/products/${stockId}`)
      revalidatePath('/bookmarks')
    }

    return result
  } catch (error) {
    console.error('Unbookmark product action error:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to unbookmark product',
    }
  }
}

/**
 * Toggle bookmark status for a product
 * @param stockId - The product/stock ID
 * @param isCurrentlyBookmarked - Current bookmark status (from client state)
 * @returns Response with success status
 */
export async function toggleBookmark(
  stockId: string,
  isCurrentlyBookmarked: boolean
): Promise<BookmarkResponse | UnbookmarkResponse> {
  try {
    // Validate input
    if (!stockId || typeof stockId !== 'string') {
      return {
        success: false,
        error: 'Invalid product ID',
      }
    }

    // Get customer ID securely from session
    const customerId = await getSecureCustomerId()

    // Trust client state - it's managed by Zustand store which is the source of truth
    // The store is initialized from backend and maintains consistency

    // Execute toggle operation with verified state
    const result = await bookmarkService.toggleBookmark(
      customerId,
      stockId,
      isCurrentlyBookmarked
    )

    // Revalidate paths to update UI
    if (result.success) {
      revalidatePath('/products')
      revalidatePath(`/products/${stockId}`)
      revalidatePath('/bookmarks')
    }

    return result
  } catch (error) {
    console.error('❌ Toggle bookmark action error:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to toggle bookmark',
    }
  }
}

/**
 * Check if a product is bookmarked by the current customer
 * @param stockId - The product/stock ID to check
 * @returns Boolean indicating bookmark status
 */
export async function isProductBookmarked(stockId: string): Promise<boolean> {
  try {
    // Validate input
    if (!stockId || typeof stockId !== 'string') {
      return false
    }

    // Get customer ID securely from session
    const customerId = await getSecureCustomerId()

    // Check bookmark status
    return await bookmarkService.isProductBookmarked(customerId, stockId)
  } catch (error) {
    console.error('Check bookmark action error:', error)
    return false
  }
}

/**
 * Get all bookmarks for the authenticated customer
 * @returns Array of customer bookmarks
 */
export async function getCustomerBookmarks() {
  try {
    // Get customer ID securely from session
    const customerId = await getSecureCustomerId()

    // Get customer bookmarks
    return await bookmarkService.getCustomerBookmarks(customerId)
  } catch (error) {
    console.error('Get bookmarks action error:', error)
    return []
  }
}
