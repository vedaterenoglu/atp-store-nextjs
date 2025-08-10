/**
 * Centralized Clerk Mock Builders
 * SOLID Principles: SRP - Single responsibility for Clerk mocking
 * Design Patterns: Factory Pattern, Builder Pattern
 * Dependencies: Clerk types and interfaces
 *
 * Provides consistent Clerk auth mocks across all tests
 */

import type { ReactNode } from 'react'

// Auth state interfaces
interface MockAuthState {
  isLoaded: boolean
  isSignedIn: boolean
  userId: string | null
  sessionId: string | null
  sessionClaims: Record<string, unknown> | null
  actor: unknown
  orgId: string | null
  orgRole: string | null
  orgSlug: string | null
  has: jest.MockedFunction<() => boolean>
  signOut: jest.MockedFunction<() => Promise<void>>
  getToken: jest.MockedFunction<() => Promise<string | null>>
}

interface MockUserState {
  isLoaded: boolean
  isSignedIn: boolean
  user: MockUser | null
}

interface MockUser {
  id: string
  firstName?: string | null
  lastName?: string | null
  username?: string | null
  publicMetadata: Record<string, unknown>
  privateMetadata?: Record<string, unknown>
  unsafeMetadata?: Record<string, unknown>
}

/**
 * Create mock auth state for signed out user
 */
export function mockAuthSignedOut(): MockAuthState {
  return {
    isLoaded: true,
    isSignedIn: false,
    userId: null,
    sessionId: null,
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => false),
    signOut: jest.fn(async () => {}),
    getToken: jest.fn(async () => null),
  }
}

/**
 * Create mock auth state for signed in user
 */
export function mockAuthSignedIn(
  overrides?: Partial<MockAuthState>
): MockAuthState {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: 'user_123',
    sessionId: 'session_123',
    sessionClaims: {
      role: 'customer',
      customerId: 'SE0 1001 1086',
    },
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => true),
    signOut: jest.fn(async () => {}),
    getToken: jest.fn(async () => 'mock-token'),
    ...overrides,
  }
}

/**
 * Create mock auth state for admin user
 */
export function mockAuthAdmin(
  overrides?: Partial<MockAuthState>
): MockAuthState {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: 'admin_123',
    sessionId: 'session_admin_123',
    sessionClaims: {
      role: 'admin',
    },
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => true),
    signOut: jest.fn(async () => {}),
    getToken: jest.fn(async () => 'mock-admin-token'),
    ...overrides,
  }
}

/**
 * Create mock auth state for loading
 */
export function mockAuthLoading(): MockAuthState {
  return {
    isLoaded: false,
    isSignedIn: false,
    userId: null,
    sessionId: null,
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => false),
    signOut: jest.fn(async () => {}),
    getToken: jest.fn(async () => null),
  }
}

/**
 * Create mock user state for signed out
 */
export function mockUserSignedOut(): MockUserState {
  return {
    isLoaded: true,
    isSignedIn: false,
    user: null,
  }
}

/**
 * Create mock user state for signed in
 */
export function mockUserSignedIn(overrides?: Partial<MockUser>): MockUserState {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      publicMetadata: {
        role: 'customer',
        customerId: 'SE0 1001 1086',
      },
      ...overrides,
    },
  }
}

/**
 * Create mock user state for admin
 */
export function mockUserAdmin(overrides?: Partial<MockUser>): MockUserState {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'admin_123',
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      publicMetadata: {
        role: 'admin',
      },
      ...overrides,
    },
  }
}

/**
 * Create mock user state for loading
 */
export function mockUserLoading(): MockUserState {
  return {
    isLoaded: false,
    isSignedIn: false,
    user: null,
  }
}

/**
 * Mock SignInButton component
 */
export function mockSignInButton({ children }: { children?: ReactNode }) {
  return jest.fn(({ children: innerChildren }: { children?: ReactNode }) => {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'sign-in-button' },
      innerChildren || children
    )
  })
}

/**
 * Mock UserButton component
 */
export function mockUserButton() {
  return jest.fn(() => {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'user-button' },
      'User Button'
    )
  })
}

/**
 * Mock SignOutButton component
 */
export function mockSignOutButton({ children }: { children?: ReactNode } = {}) {
  return jest.fn(({ children: innerChildren }: { children?: ReactNode }) => {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'sign-out-button' },
      innerChildren || children
    )
  })
}

/**
 * Create complete Clerk mock object for jest.mock
 */
export function createClerkMock(
  authState?: MockAuthState,
  userState?: MockUserState
) {
  return {
    useAuth: jest.fn(() => authState || mockAuthSignedOut()),
    useUser: jest.fn(() => userState || mockUserSignedOut()),
    SignInButton: mockSignInButton({ children: 'Sign In' }),
    UserButton: mockUserButton(),
    SignOutButton: mockSignOutButton(),
    useClerk: jest.fn(() => ({
      openSignIn: jest.fn(),
      openSignUp: jest.fn(),
      signOut: jest.fn(),
    })),
  }
}

/**
 * Helper to setup Clerk mocks in tests
 * Call this BEFORE importing components that use Clerk
 */
export function setupClerkMocks(
  authState?: MockAuthState,
  userState?: MockUserState
) {
  const mocks = createClerkMock(authState, userState)

  // Return mocks for manual setup
  return mocks
}

/**
 * Complete module export for jest.mock('@clerk/nextjs')
 * This is the SINGLE SOURCE OF TRUTH for Clerk mocks
 */
export const clerkNextjsModule = {
  useAuth: jest.fn(() => mockAuthSignedOut()),
  useUser: jest.fn(() => mockUserSignedOut()),
  useClerk: jest.fn(() => ({
    openSignIn: jest.fn(),
    openSignUp: jest.fn(),
    signOut: jest.fn(),
  })),
  SignInButton: jest.fn(({ children }: { children?: ReactNode }) => {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'sign-in-button' },
      children
    )
  }),
  SignOutButton: jest.fn(({ children }: { children?: ReactNode }) => {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'sign-out-button' },
      children
    )
  }),
  UserButton: jest.fn(() => {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'user-button' },
      'User Button'
    )
  }),
  ClerkProvider: jest.fn(({ children }: { children: ReactNode }) => children),
  SignedIn: jest.fn(({ children }: { children: ReactNode }) => children),
  SignedOut: jest.fn(({ children }: { children: ReactNode }) => children),
  RedirectToSignIn: jest.fn(() => {
    const React = require('react')
    return React.createElement('div', null, 'Redirect to Sign In')
  }),
}

/**
 * Complete module export for jest.mock('@clerk/nextjs/server')
 * Server-side Clerk functions
 */
export const clerkServerModule = {
  auth: jest.fn(async () => ({
    userId: null,
    sessionId: null,
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => false),
    protect: jest.fn(),
    redirectToSignIn: jest.fn(),
  })),
  currentUser: jest.fn(async () => null),
  clerkClient: {
    users: {
      getUser: jest.fn(async () => null),
      getUserList: jest.fn(async () => ({ data: [] })),
    },
  },
}
