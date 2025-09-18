/**
 * Authentication Types - Shared type definitions for auth system
 * SOLID Principles: ISP - Specific interfaces for auth concepts
 * Design Patterns: Type Safety Pattern
 * Dependencies: None (pure types)
 */

/**
 * User role types supported by the system
 */
export type UserRole = 'customer' | 'admin' | 'superadmin' | null

/**
 * Authenticated user data structure
 * Provides consistent shape across client and server
 */
export interface AuthUser {
  id: string
  role: UserRole
  customerId: string | null // camelCase in our code (customerid in Clerk)
  email: string
  name: string | null
}

/**
 * Authentication state
 * Represents current auth status and user data
 */
export interface AuthState {
  isLoaded: boolean
  isSignedIn: boolean
  user: AuthUser | null
}

/**
 * Authentication check result with detailed reason
 */
export interface AuthCheckResult {
  success: boolean
  reason?: 'not-signed-in' | 'wrong-role' | 'no-customer-id' | 'loading'
  message?: string
}

/**
 * Options for authentication requirements
 */
export interface AuthRequireOptions {
  redirectTo?: string
  showToast?: boolean
  toastMessage?: string
}
