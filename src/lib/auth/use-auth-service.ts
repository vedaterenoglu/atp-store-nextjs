/**
 * Authentication Service Hook - Client-side auth operations
 * SOLID Principles: SRP - Single responsibility for client auth
 * Design Patterns: Hook Pattern, Facade Pattern
 * Dependencies: Clerk client SDK, auth service, auth types
 */

'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from '@/lib/utils/toast'
import { extractRole, extractCustomerId } from './auth-utils'
import type {
  AuthUser,
  AuthState,
  UserRole,
  AuthRequireOptions,
} from './auth-types'

/**
 * Client-side authentication hook
 * Provides consistent auth state and operations
 */
export function useAuthService() {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  /**
   * Get current auth state
   * Mirrors server-side logic for consistency
   */
  const getAuthState = useCallback((): AuthState => {
    if (!isLoaded) {
      return { isLoaded: false, isSignedIn: false, user: null }
    }

    if (!isSignedIn || !user) {
      return { isLoaded: true, isSignedIn: false, user: null }
    }

    // Use same extraction logic as server
    // Map Clerk's sessionClaims to our expected format
    const sessionClaimsMetadata = sessionClaims
      ? {
          metadata: {
            role: (sessionClaims as Record<string, unknown>)['role'] as
              | string
              | undefined,
            customerid: (sessionClaims as Record<string, unknown>)[
              'customerid'
            ] as string | undefined,
          },
        }
      : null

    const authUser: AuthUser = {
      id: user.id,
      role: extractRole(
        sessionClaimsMetadata,
        user.publicMetadata,
        user.unsafeMetadata
      ),
      customerId: extractCustomerId(sessionClaimsMetadata, user.publicMetadata),
      email: user.primaryEmailAddress?.emailAddress || '',
      name: user.fullName || null,
    }

    return { isLoaded: true, isSignedIn: true, user: authUser }
  }, [isLoaded, isSignedIn, sessionClaims, user])

  /**
   * Require authentication with optional role
   * Redirects to sign-in if not authenticated
   */
  const requireAuth = useCallback(
    (requiredRole?: UserRole, options: AuthRequireOptions = {}): boolean => {
      const state = getAuthState()

      // Still loading
      if (!state.isLoaded) {
        return false
      }

      // Not signed in - redirect to sign-in page
      if (!state.isSignedIn) {
        if (options.showToast) {
          toast.error(options.toastMessage || 'Please sign in to continue')
        }

        const returnUrl = encodeURIComponent(window.location.pathname)
        router.push(`/sign-in?redirect_url=${returnUrl}`)
        return false
      }

      // Check role requirement
      if (requiredRole && state.user?.role !== requiredRole) {
        if (options.showToast) {
          toast.error(options.toastMessage || 'Insufficient permissions')
        }

        if (options.redirectTo) {
          router.push(options.redirectTo)
        }
        return false
      }

      return true
    },
    [getAuthState, router]
  )

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback(
    (role: UserRole): boolean => {
      const state = getAuthState()
      return state.user?.role === role
    },
    [getAuthState]
  )

  /**
   * Check if user has a customer ID
   */
  const hasCustomerId = useCallback((): boolean => {
    const state = getAuthState()
    return !!state.user?.customerId
  }, [getAuthState])

  /**
   * Check if user is a customer with valid customer ID
   */
  const isValidCustomer = useCallback((): boolean => {
    const state = getAuthState()
    return state.user?.role === 'customer' && !!state.user?.customerId
  }, [getAuthState])

  /**
   * Require customer role with customer ID
   * Shows appropriate error messages
   */
  const requireCustomer = useCallback(
    (onSuccess: () => void, options: AuthRequireOptions = {}): boolean => {
      const state = getAuthState()

      if (!state.isLoaded) return false

      if (!state.isSignedIn) {
        if (options.showToast !== false) {
          toast.error('Please sign in to continue')
        }
        const returnUrl = encodeURIComponent(window.location.pathname)
        router.push(`/sign-in?redirect_url=${returnUrl}`)
        return false
      }

      if (state.user?.role !== 'customer') {
        if (options.showToast !== false) {
          toast.error('Customer account required')
        }
        if (options.redirectTo) {
          router.push(options.redirectTo)
        }
        return false
      }

      if (!state.user?.customerId) {
        if (options.showToast !== false) {
          toast.error('Customer profile incomplete')
        }
        router.push('/profile/complete')
        return false
      }

      onSuccess()
      return true
    },
    [getAuthState, router]
  )

  const authState = getAuthState()

  return {
    // State
    ...authState,

    // Methods
    requireAuth,
    requireCustomer,
    hasRole,
    hasCustomerId,
    isValidCustomer,

    // Convenience getters
    isCustomer: authState.user?.role === 'customer',
    isAdmin: authState.user?.role === 'admin',
    isSuperAdmin: authState.user?.role === 'superadmin',
  }
}
