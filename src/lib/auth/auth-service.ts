/**
 * Authentication Service - Single Source of Truth for all auth operations
 * SOLID Principles: SRP - Single responsibility for auth, OCP - Extensible for new auth methods
 * Design Patterns: Singleton Pattern, SSOT Pattern
 * Dependencies: Clerk server SDK, auth types
 */

import type { AuthUser, UserRole, AuthState } from './auth-types'
import { extractRole, extractCustomerId } from './auth-utils'

/**
 * Centralized Authentication Service (Singleton)
 * Provides consistent auth data extraction and validation
 */
export class AuthService {
  private static instance: AuthService

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * Get authentication state for server-side usage
   * @returns Complete auth state with user data
   */
  async getServerAuthState(): Promise<AuthState> {
    const { auth, currentUser } = await import('@clerk/nextjs/server')
    const authData = await auth()
    const user = await currentUser()

    // Not authenticated
    if (!authData.userId || !user) {
      return {
        isLoaded: true,
        isSignedIn: false,
        user: null,
      }
    }

    // Extract user data with SSOT logic
    // Map Clerk's sessionClaims to our expected format
    const sessionClaimsMetadata = authData.sessionClaims
      ? {
          metadata: {
            role: (authData.sessionClaims as Record<string, unknown>)[
              'role'
            ] as string | undefined,
            customerid: (authData.sessionClaims as Record<string, unknown>)[
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

    return {
      isLoaded: true,
      isSignedIn: true,
      user: authUser,
    }
  }

  /**
   * Check if current user has a specific role (server-side)
   */
  async hasRole(requiredRole: UserRole): Promise<boolean> {
    const state = await this.getServerAuthState()
    return state.isSignedIn && state.user?.role === requiredRole
  }

  /**
   * Require authentication and role (server-side)
   * @throws Error if requirements not met
   */
  async requireAuth(requiredRole?: UserRole): Promise<AuthUser> {
    const state = await this.getServerAuthState()

    if (!state.isSignedIn || !state.user) {
      throw new Error('Authentication required')
    }

    if (requiredRole && state.user.role !== requiredRole) {
      throw new Error(`Role '${requiredRole}' required`)
    }

    return state.user
  }

  /**
   * Require customer with valid customer ID (server-side)
   * @throws Error if not a customer or missing customer ID
   */
  async requireCustomer(): Promise<AuthUser> {
    const state = await this.getServerAuthState()

    if (!state.isSignedIn || !state.user) {
      throw new Error('Authentication required')
    }

    if (state.user.role !== 'customer') {
      throw new Error('Customer role required')
    }

    if (!state.user.customerId) {
      throw new Error('Customer ID not configured')
    }

    return state.user
  }

  /**
   * Require admin role (server-side)
   * @throws Error if not an admin
   */
  async requireAdmin(): Promise<AuthUser> {
    return this.requireAuth('admin')
  }
}

// Export singleton instance
export const authService = AuthService.getInstance()
