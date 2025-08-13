/**
 * Secure Auth Hook
 * SOLID Principles: SRP - Single responsibility for fetching secure auth context
 * Design Patterns: Hook Pattern, Facade Pattern
 * Dependencies: SWR for data fetching, API route
 *
 * SECURITY: Fetches auth context from server-side API.
 * Cannot be manipulated from browser console.
 */

'use client'

import useSWR from 'swr'
import type { SecureAuthContext } from '@/app/api/auth/context/route'

// Fetcher for SWR
const fetcher = async (url: string): Promise<SecureAuthContext> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch auth context')
  }
  return response.json()
}

// Default context for loading/error states
const defaultContext: SecureAuthContext = {
  isAuthenticated: false,
  userId: null,
  role: null,
  customerIds: [],
  activeCustomerId: null,
  canAddToCart: false,
  canBookmark: false,
  canAccessAdmin: false,
  canAccessCustomerFeatures: false,
}

/**
 * Secure authentication hook that fetches context from server
 *
 * SECURITY FEATURES:
 * - Auth context comes from server-side API (cannot be manipulated)
 * - Automatic revalidation on focus/reconnect
 * - SWR caching for performance
 * - Real-time updates when customer changes
 *
 * @returns Secure auth context and loading state
 */
export function useSecureAuth() {
  const { data, error, mutate, isLoading } = useSWR<SecureAuthContext>(
    '/api/auth/context',
    fetcher,
    {
      // Revalidate on window focus
      revalidateOnFocus: true,
      // Revalidate on network reconnect
      revalidateOnReconnect: true,
      // Check every 10 seconds for updates (reduced from 30)
      refreshInterval: 10000,
      // Don't keep previous data - always use fresh
      keepPreviousData: false,
      // Fallback data while loading
      fallbackData: defaultContext,
      // Dedupe interval reduced to get fresher data
      dedupingInterval: 1000,
    }
  )

  // Refresh auth context (call after customer selection)
  const refreshAuth = async () => {
    await mutate()
  }

  return {
    // Auth state (secure, from server)
    auth: data || defaultContext,

    // Loading state
    isLoading,

    // Error state
    error,

    // Refresh function (for customer selection)
    refreshAuth,

    // Convenience getters
    isAuthenticated: data?.isAuthenticated || false,
    canAddToCart: data?.canAddToCart || false,
    canBookmark: data?.canBookmark || false,
    canAccessAdmin: data?.canAccessAdmin || false,
    canAccessCustomerFeatures: data?.canAccessCustomerFeatures || false,
  }
}

/**
 * Hook for components that need to check specific permissions
 *
 * @example
 * const { canAddToCart, canBookmark } = usePermissions()
 *
 * <Button disabled={!canAddToCart}>Add to Cart</Button>
 */
export function usePermissions() {
  const { auth } = useSecureAuth()

  return {
    canAddToCart: auth.canAddToCart,
    canBookmark: auth.canBookmark,
    canAccessAdmin: auth.canAccessAdmin,
    canAccessCustomerFeatures: auth.canAccessCustomerFeatures,
    hasRole: (role: 'admin' | 'customer') => auth.role === role,
    hasActiveCustomer: auth.activeCustomerId !== null,
  }
}
