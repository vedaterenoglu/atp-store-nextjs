/**
 * Enhanced Role-Based Authentication Hook
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for role-based auth checks
 * - OCP: Open for extension with new auth scenarios
 * - DIP: Depends on Clerk abstractions, not implementations
 *
 * Design Patterns:
 * - Strategy Pattern: Different handling based on auth state
 * - Result Pattern: Typed results for different auth scenarios
 * - Guard Pattern: Prevents unauthorized actions
 *
 * Dependencies: Clerk hooks, Next.js router, i18n, toast notifications
 */

'use client'

import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from '@/lib/utils/toast'

/**
 * Authentication check result with detailed reason
 */
export interface AuthCheckResult {
  success: boolean
  reason?: 'not-signed-in' | 'wrong-role' | 'loading'
  message?: string
}

/**
 * Options for auth requirement handling
 */
export interface RequireAuthOptions {
  showToast?: boolean
  redirectTo?: string
  toastPosition?: 'bottom-left' | 'top-right' | 'bottom-right' | 'top-left'
}

/**
 * User role type - extensible for future roles
 */
export type UserRole = 'customer' | 'admin' | 'superadmin' | null

/**
 * Hook for role-based authentication with typed results
 * Provides consistent auth checking across the application
 */
export function useRoleAuth() {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth()
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const router = useRouter()

  /**
   * Get user role with fallback chain
   * Priority: sessionClaims > publicMetadata > unsafeMetadata
   */
  const getUserRole = (): UserRole => {
    if (!user) return null

    // Try session claims first (most secure)
    const metadata = sessionClaims?.['metadata'] as
      | { role?: string }
      | undefined
    const sessionRole = metadata?.['role'] as UserRole

    // Fallback to publicMetadata
    const publicRole = user.publicMetadata?.['role'] as UserRole

    // Last resort: unsafeMetadata
    const unsafeRole = user.unsafeMetadata?.['role'] as UserRole

    return sessionRole || publicRole || unsafeRole || null
  }

  /**
   * Check authentication and role without side effects
   * @param requiredRole - Optional role requirement
   * @returns Detailed result of auth check
   */
  const checkAuth = (requiredRole?: UserRole): AuthCheckResult => {
    // Handle loading state
    if (!isLoaded) {
      return {
        success: false,
        reason: 'loading',
      }
    }

    // Check if signed in
    if (!isSignedIn) {
      return {
        success: false,
        reason: 'not-signed-in',
        message: 'Please sign in to continue',
      }
    }

    // Check role if required
    if (requiredRole) {
      const userRole = getUserRole()
      if (userRole !== requiredRole) {
        return {
          success: false,
          reason: 'wrong-role',
          message: 'Insufficient permissions',
        }
      }
    }

    return { success: true }
  }

  /**
   * Require authentication with side effects (toast, redirect)
   * @param requiredRole - Role required for the action
   * @param onSuccess - Callback to execute if auth passes
   * @param options - Options for handling auth failure
   * @returns Boolean indicating if auth check passed
   */
  const requireAuth = (
    requiredRole: UserRole,
    onSuccess: () => void,
    options: RequireAuthOptions = {}
  ): boolean => {
    const {
      showToast = true,
      redirectTo,
      toastPosition = 'top-right',
    } = options

    const result = checkAuth(requiredRole)

    // Handle auth failure
    if (!result.success) {
      if (result.reason === 'not-signed-in') {
        // Show toast if enabled
        if (showToast && result.message) {
          toast.error(result.message, { position: toastPosition })
        }

        // Open sign-in modal with redirect URL
        openSignIn({
          redirectUrl: redirectTo || window.location.href,
        })
      } else if (result.reason === 'wrong-role') {
        // Show insufficient permissions toast
        if (showToast && result.message) {
          toast.error(result.message, { position: toastPosition })
        }

        // Optionally redirect to fallback
        if (redirectTo) {
          router.push(redirectTo)
        }
      }
      // Loading state - do nothing

      return false
    }

    // Auth passed - execute callback
    onSuccess()
    return true
  }

  /**
   * Check if user has any of the specified roles
   * @param roles - Array of acceptable roles
   * @returns Boolean indicating if user has any role
   */
  const hasAnyRole = (roles: UserRole[]): boolean => {
    const userRole = getUserRole()
    return userRole !== null && roles.includes(userRole)
  }

  /**
   * Check if user has a specific role
   * @param role - Role to check
   * @returns Boolean indicating if user has the role
   */
  const hasRole = (role: UserRole): boolean => {
    return getUserRole() === role
  }

  return {
    // State
    isLoaded,
    isSignedIn,
    userRole: getUserRole(),

    // Methods
    checkAuth,
    requireAuth,
    hasRole,
    hasAnyRole,
    getUserRole,
  }
}
