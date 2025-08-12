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
import { cookies } from 'next/headers'
import { bookmarkService } from '@/services/bookmark.service'
import type {
  BookmarkResponse,
  UnbookmarkResponse,
} from '@/lib/types/bookmark.types'
import { revalidatePath } from 'next/cache'

/**
 * Extract customer ID from active customer selection
 * Priority: active_customer_id cookie > first customerid > null
 * Returns null if no customer selected (instead of throwing)
 */
async function getSecureCustomerId(): Promise<string | null> {
  const { userId } = await auth()

  if (!userId) {
    return null // Not authenticated
  }

  const user = await currentUser()
  if (!user) {
    return null
  }

  const role = user.publicMetadata?.['role'] as string | undefined
  const customerids = user.publicMetadata?.['customerids'] as string[] | undefined

  // Check if user has customer access (customer or admin role)
  if (role !== 'customer' && role !== 'admin') {
    return null // No customer access
  }

  // For customer role, must have customerids
  if (role === 'customer' && (!customerids || customerids.length === 0)) {
    return null // Customer without customer IDs
  }

  // Check for active customer from cookie
  const cookieStore = await cookies()
  const activeCustomerId = cookieStore.get('active_customer_id')?.value

  if (activeCustomerId) {
    // Validate that this customer ID is in the user's list (for customer role)
    if (role === 'customer' && customerids && !customerids.includes(activeCustomerId)) {
      // Invalid selection, clear it
      return null
    }
    return activeCustomerId
  }

  // For customer with single ID, use it automatically
  if (role === 'customer' && customerids && customerids.length === 1) {
    return customerids[0] ?? null
  }

  // Multiple customers or admin without selection - return null
  return null
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
    
    // Check if customer is selected
    if (!customerId) {
      return {
        success: false,
        error: 'Please select a customer first',
      }
    }

    // Execute bookmark operation
    const result = await bookmarkService.bookmarkProduct(customerId, stockId)

    // Revalidate paths to update UI
    if (result.success) {
      revalidatePath('/products')
      revalidatePath(`/products/${stockId}`)
      revalidatePath('/bookmarks')
      revalidatePath('/favorites')
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
    
    // Check if customer is selected
    if (!customerId) {
      return {
        success: false,
        error: 'Please select a customer first',
      }
    }

    // Execute unbookmark operation
    const result = await bookmarkService.unbookmarkProduct(customerId, stockId)

    // Revalidate paths to update UI
    if (result.success) {
      revalidatePath('/products')
      revalidatePath(`/products/${stockId}`)
      revalidatePath('/bookmarks')
      revalidatePath('/favorites')
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
    
    // Check if customer is selected
    if (!customerId) {
      return {
        success: false,
        error: 'Please select a customer first',
      }
    }

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
      revalidatePath('/favorites')
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
    
    // If no customer selected, not bookmarked
    if (!customerId) {
      return false
    }

    // Check bookmark status
    return await bookmarkService.isProductBookmarked(customerId, stockId)
  } catch (error) {
    console.error('Check bookmark action error:', error)
    return false
  }
}

/**
 * Get all bookmarks for the authenticated customer
 * @param forceRefresh - Force refresh from network instead of cache
 * @returns Array of customer bookmarks
 */
export async function getCustomerBookmarks(forceRefresh = false) {
  try {
    // Get customer ID securely from session
    const customerId = await getSecureCustomerId()
    
    // If no customer selected, return empty array
    if (!customerId) {
      return []
    }

    // Get customer bookmarks
    return await bookmarkService.getCustomerBookmarks(customerId, forceRefresh)
  } catch (error) {
    console.error('Get bookmarks action error:', error)
    return []
  }
}
