/**
 * Centralized Auth Mocks
 * SOLID Principles: SRP - Single source of truth for auth mocks
 * Design Patterns: Factory Pattern for creating mock instances
 * Dependencies: None - pure mock functions
 */

import type { UserRole } from '@/lib/auth/auth-types'

/**
 * Mock return type for useRoleAuth hook
 */
export interface MockRoleAuthReturn {
  isLoaded: boolean
  isSignedIn: boolean
  userRole: UserRole | null
  checkAuth: jest.MockedFunction<
    (requiredRole?: UserRole) => {
      success: boolean
      reason?: string
      message?: string
    }
  >
  requireAuth: jest.MockedFunction<
    (requiredRole?: UserRole, redirectUrl?: string) => boolean
  >
  hasRole: jest.MockedFunction<(role: UserRole) => boolean>
  hasAnyRole: jest.MockedFunction<(roles: UserRole[]) => boolean>
  getUserRole: jest.MockedFunction<() => UserRole | null>
}

/**
 * Create mock for useRoleAuth hook - signed out state
 */
export function mockRoleAuthSignedOut(): MockRoleAuthReturn {
  return {
    isLoaded: true,
    isSignedIn: false,
    userRole: null,
    checkAuth: jest
      .fn()
      .mockReturnValue({ success: false, reason: 'not-signed-in' }),
    requireAuth: jest.fn().mockReturnValue(false),
    hasRole: jest.fn().mockReturnValue(false),
    hasAnyRole: jest.fn().mockReturnValue(false),
    getUserRole: jest.fn().mockReturnValue(null),
  }
}

/**
 * Create mock for useRoleAuth hook - signed in customer
 */
export function mockRoleAuthCustomer(): MockRoleAuthReturn {
  return {
    isLoaded: true,
    isSignedIn: true,
    userRole: 'customer',
    checkAuth: jest.fn().mockReturnValue({ success: true }),
    requireAuth: jest.fn().mockReturnValue(true),
    hasRole: jest.fn((role: UserRole) => role === 'customer'),
    hasAnyRole: jest.fn((roles: UserRole[]) => roles.includes('customer')),
    getUserRole: jest.fn().mockReturnValue('customer' as UserRole),
  }
}

/**
 * Create mock for useRoleAuth hook - signed in admin
 */
export function mockRoleAuthAdmin(): MockRoleAuthReturn {
  return {
    isLoaded: true,
    isSignedIn: true,
    userRole: 'admin',
    checkAuth: jest.fn().mockReturnValue({ success: true }),
    requireAuth: jest.fn().mockReturnValue(true),
    hasRole: jest.fn((role: UserRole) => role === 'admin'),
    hasAnyRole: jest.fn((roles: UserRole[]) => roles.includes('admin')),
    getUserRole: jest.fn().mockReturnValue('admin' as UserRole),
  }
}

/**
 * Create mock for useRoleAuth hook - loading state
 */
export function mockRoleAuthLoading(): MockRoleAuthReturn {
  return {
    isLoaded: false,
    isSignedIn: false,
    userRole: null,
    checkAuth: jest.fn().mockReturnValue({ success: false, reason: 'loading' }),
    requireAuth: jest.fn().mockReturnValue(false),
    hasRole: jest.fn().mockReturnValue(false),
    hasAnyRole: jest.fn().mockReturnValue(false),
    getUserRole: jest.fn().mockReturnValue(null),
  }
}

/**
 * Create custom mock for useRoleAuth hook
 */
export function createRoleAuthMock(
  overrides?: Partial<MockRoleAuthReturn>
): MockRoleAuthReturn {
  return {
    ...mockRoleAuthSignedOut(),
    ...overrides,
  }
}
