/**
 * Centralized Authorization Service
 * SOLID Principles: SRP - Single responsibility for authorization logic
 * Design Patterns: Service Pattern, Factory Pattern
 * Dependencies: Clerk auth, Customer service
 */

import type { User } from '@clerk/nextjs/server'

export type AuthError = 
  | 'NOT_SIGNED_IN'
  | 'INVALID_ROLE' 
  | 'NO_CUSTOMER_SELECTED'
  | 'ADMIN_ONLY'

export interface AuthCheckResult {
  success: boolean
  error?: AuthError
  message?: string
}

export interface AuthContext {
  isSignedIn: boolean
  role: 'customer' | 'admin' | null
  hasActiveCustomer: boolean
  customerId?: string | undefined
}

/**
 * Centralized authorization service for all auth checks
 * Provides consistent validation logic across the application
 */
export class AuthorizationService {
  /**
   * Check if user can access customer features
   * Requirements: signed-in, role (customer OR admin), active customer
   */
  static canAccessCustomerFeatures(context: AuthContext): AuthCheckResult {
    // Check 1: User must be signed in
    if (!context.isSignedIn) {
      return {
        success: false,
        error: 'NOT_SIGNED_IN',
        message: 'Please sign in to continue'
      }
    }

    // Check 2: User must have customer or admin role
    if (context.role !== 'customer' && context.role !== 'admin') {
      return {
        success: false,
        error: 'INVALID_ROLE',
        message: 'Customer or admin account required'
      }
    }

    // Check 3: Must have active customer selected
    if (!context.hasActiveCustomer) {
      return {
        success: false,
        error: 'NO_CUSTOMER_SELECTED',
        message: 'Please select a customer account'
      }
    }

    return { success: true }
  }

  /**
   * Check if user can access admin dashboard
   * Requirements: signed-in, admin role only
   */
  static canAccessAdminDashboard(context: AuthContext): AuthCheckResult {
    // Check 1: User must be signed in
    if (!context.isSignedIn) {
      return {
        success: false,
        error: 'NOT_SIGNED_IN',
        message: 'Please sign in to continue'
      }
    }

    // Check 2: User must have admin role
    if (context.role !== 'admin') {
      return {
        success: false,
        error: 'ADMIN_ONLY',
        message: 'Admin access required'
      }
    }

    // Admin dashboard doesn't require customer selection
    return { success: true }
  }

  /**
   * Extract role from user metadata
   */
  static extractRole(user: User | null): 'customer' | 'admin' | null {
    if (!user) return null
    
    const role = user.publicMetadata?.['role'] as string | undefined
    if (role === 'admin') return 'admin'
    if (role === 'customer') return 'customer'
    
    return null
  }

  /**
   * Get appropriate toast message for auth error
   */
  static getErrorMessage(error: AuthError): string {
    switch (error) {
      case 'NOT_SIGNED_IN':
        return 'Please sign in to continue'
      case 'INVALID_ROLE':
        return 'You need a customer or admin account to access this feature'
      case 'NO_CUSTOMER_SELECTED':
        return 'Please select a customer account from the dropdown'
      case 'ADMIN_ONLY':
        return 'This area is restricted to administrators only'
      default:
        return 'Access denied'
    }
  }

  /**
   * Get redirect URL for auth error
   */
  static getRedirectUrl(error: AuthError, currentPath?: string): string {
    switch (error) {
      case 'NOT_SIGNED_IN':
        return `/sign-in${currentPath ? `?redirect_url=${encodeURIComponent(currentPath)}` : ''}`
      case 'INVALID_ROLE':
      case 'NO_CUSTOMER_SELECTED':
        return '/'
      case 'ADMIN_ONLY':
        return '/'
      default:
        return '/'
    }
  }
}