/**
 * Sign Out Handler Component
 * SOLID Principles: SRP - Single responsibility for sign out cleanup
 * Design Patterns: Observer Pattern (listening to auth changes)
 * Dependencies: Clerk, Zustand stores
 *
 * Handles cleanup for both customer and admin users on sign out
 */

'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/stores/cart.store'
import { useBookmarkStore } from '@/lib/stores/bookmark-store'
import { CustomerService } from '@/services/customer.service'

const customerService = CustomerService.getInstance()

export function SignOutHandler() {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const wasSignedIn = useRef<boolean | null>(null)
  const previousRole = useRef<string | null>(null)
  const resetCart = useCartStore(state => state.resetCart)
  const clearBookmarks = useBookmarkStore(state => state.clearBookmarks)

  const performSignOutCleanup = useCallback(
    async (role: string | null) => {
      try {
        // 1. Reset Zustand stores
        resetCart()
        clearBookmarks()

        // 2. Clear customer service state
        customerService.clearCache()

        // 3. Call API to delete HTTP-only cookie
        await fetch('/api/auth/signout', {
          method: 'POST',
          credentials: 'include',
        })

        // 4. For admin users, also clear customer selection
        if (role === 'admin') {
          await fetch('/api/customer/clear', {
            method: 'POST',
            credentials: 'include',
          })
        }

        // 5. Redirect to home with refresh
        if (window.location.pathname !== '/') {
          window.location.href = '/'
        } else {
          // Already on home, just refresh
          window.location.reload()
        }
      } catch (error) {
        console.error('Sign out cleanup error:', error)
        // Still redirect even if cleanup fails
        window.location.href = '/'
      }
    },
    [resetCart, clearBookmarks]
  )

  useEffect(() => {
    // Wait for auth to load
    if (!isLoaded) return

    // Track user role
    const currentRole = user?.publicMetadata?.['role'] as string | undefined

    // Track initial state
    if (wasSignedIn.current === null) {
      wasSignedIn.current = isSignedIn
      previousRole.current = currentRole || null
      return
    }

    // Detect sign out (was signed in, now not signed in)
    if (wasSignedIn.current === true && isSignedIn === false) {
      // Perform cleanup based on previous role
      performSignOutCleanup(previousRole.current)
    }

    // Update tracking state
    wasSignedIn.current = isSignedIn
    previousRole.current = currentRole || null
  }, [isSignedIn, isLoaded, user, performSignOutCleanup])

  return null // This component doesn't render anything
}
