/**
 * Unit Tests for Role-Based Authentication Hook
 *
 * Tests cover:
 * - Role checking functionality
 * - Auth state handling
 * - Error scenarios
 * - Toast notifications
 * - Navigation behavior
 *
 * SOLID Principles: Test isolation, single assertions per test
 * Mocking: Clerk hooks, Next.js router, i18n, toast notifications
 */

import { renderHook } from '@testing-library/react'
import { useRoleAuth } from '../role-auth'
import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { toast } from '@/lib/utils/toast'

// Create a shared mock push function that all router instances will use
const mockRouterPush = jest.fn()

// Mock dependencies
// Mock Clerk hooks
jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(),
  useUser: jest.fn(),
  useClerk: jest.fn(),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  SignIn: () => null,
  SignUp: () => null,
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        requireSignIn: 'To continue you must sign in',
        insufficientPermissions:
          'Insufficient permissions. Please contact support.',
      }
      return translations[key] || key
    },
  }),
}))
jest.mock('@/lib/utils/toast')

// Override the next/navigation mock for this test
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Import required types for proper mocking

// Helper to create mock return values
const createMockAuth = (
  overrides: Record<string, unknown> = {}
): ReturnType<typeof useAuth> =>
  ({
    isLoaded: true,
    isSignedIn: false,
    userId: null,
    sessionId: null,
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(),
    signOut: jest.fn(),
    getToken: jest.fn(),
    ...overrides,
  }) as unknown as ReturnType<typeof useAuth>

const createMockUser = (
  overrides: Record<string, unknown> = {}
): ReturnType<typeof useUser> =>
  ({
    isLoaded: true,
    isSignedIn: false,
    user: null,
    ...overrides,
  }) as unknown as ReturnType<typeof useUser>

const createMockClerk = (
  overrides: Record<string, unknown> = {}
): ReturnType<typeof useClerk> =>
  ({
    openSignIn: jest.fn(),
    ...overrides,
  }) as unknown as ReturnType<typeof useClerk>

// Type the mocks
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockUseClerk = useClerk as jest.MockedFunction<typeof useClerk>
const mockToast = toast as jest.Mocked<typeof toast>

describe('useRoleAuth', () => {
  const mockOpenSignIn = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockRouterPush.mockClear()

    mockUseClerk.mockReturnValue(
      createMockClerk({
        openSignIn: mockOpenSignIn,
      })
    )
  })

  describe('getUserRole', () => {
    it('should return null when user is not signed in', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: false,
          sessionClaims: null,
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: null,
        })
      )

      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.getUserRole()).toBeNull()
    })

    it('should prioritize sessionClaims role over publicMetadata', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: {
            metadata: { role: 'customer' },
          },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: {
            publicMetadata: { role: 'admin' },
            unsafeMetadata: { role: 'staff' },
          },
        })
      )

      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.getUserRole()).toBe('customer')
    })

    it('should fallback to publicMetadata when sessionClaims has no role', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: {},
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: {
            publicMetadata: { role: 'admin' },
            unsafeMetadata: { role: 'staff' },
          },
        })
      )

      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.getUserRole()).toBe('admin')
    })

    it('should fallback to unsafeMetadata as last resort', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: {},
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: {
            publicMetadata: {},
            unsafeMetadata: { role: 'staff' },
          },
        })
      )

      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.getUserRole()).toBe('staff')
    })
  })

  describe('checkAuth', () => {
    it('should return loading state when not loaded', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: false,
          isSignedIn: false,
          sessionClaims: null,
        })
      )

      const { result } = renderHook(() => useRoleAuth())
      const authResult = result.current.checkAuth()

      expect(authResult).toEqual({
        success: false,
        reason: 'loading',
      })
    })

    it('should return not-signed-in when user is not authenticated', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: false,
          sessionClaims: null,
        })
      )

      const { result } = renderHook(() => useRoleAuth())
      const authResult = result.current.checkAuth()

      expect(authResult).toEqual({
        success: false,
        reason: 'not-signed-in',
        message: 'Please sign in to continue',
      })
    })

    it('should return success when signed in and no role required', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: { metadata: { role: 'customer' } },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )

      const { result } = renderHook(() => useRoleAuth())
      const authResult = result.current.checkAuth()

      expect(authResult).toEqual({ success: true })
    })

    it('should return wrong-role when user has different role', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: { metadata: { role: 'admin' } },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )

      const { result } = renderHook(() => useRoleAuth())
      const authResult = result.current.checkAuth('customer')

      expect(authResult).toEqual({
        success: false,
        reason: 'wrong-role',
        message: 'Insufficient permissions',
      })
    })

    it('should return success when user has required role', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: { metadata: { role: 'customer' } },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )

      const { result } = renderHook(() => useRoleAuth())
      const authResult = result.current.checkAuth('customer')

      expect(authResult).toEqual({ success: true })
    })
  })

  describe('requireAuth', () => {
    it('should show toast and open sign-in when not authenticated', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: false,
          sessionClaims: null,
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: null,
        })
      )

      const onSuccess = jest.fn()
      const { result } = renderHook(() => useRoleAuth())

      const success = result.current.requireAuth('customer', onSuccess)

      expect(success).toBe(false)
      expect(onSuccess).not.toHaveBeenCalled()
      expect(mockToast.error).toHaveBeenCalledWith(
        'Please sign in to continue',
        { position: 'bottom-left' }
      )
      expect(mockOpenSignIn).toHaveBeenCalledWith({
        redirectUrl: expect.any(String),
      })
    })

    it('should show toast for wrong role and redirect if specified', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: { metadata: { role: 'admin' } },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )

      const onSuccess = jest.fn()
      const { result } = renderHook(() => useRoleAuth())

      const success = result.current.requireAuth('customer', onSuccess, {
        redirectTo: '/home',
      })

      expect(success).toBe(false)
      expect(onSuccess).not.toHaveBeenCalled()
      expect(mockToast.error).toHaveBeenCalledWith('Insufficient permissions', {
        position: 'bottom-left',
      })
      expect(mockRouterPush).toHaveBeenCalledWith('/home')
    })

    it('should not show toast when showToast is false', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: false,
          sessionClaims: null,
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: null,
        })
      )

      const onSuccess = jest.fn()
      const { result } = renderHook(() => useRoleAuth())

      result.current.requireAuth('customer', onSuccess, { showToast: false })

      expect(mockToast.error).not.toHaveBeenCalled()
    })

    it('should execute callback when auth passes', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: { metadata: { role: 'customer' } },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )

      const onSuccess = jest.fn()
      const { result } = renderHook(() => useRoleAuth())

      const success = result.current.requireAuth('customer', onSuccess)

      expect(success).toBe(true)
      expect(onSuccess).toHaveBeenCalledTimes(1)
      expect(mockToast.error).not.toHaveBeenCalled()
      expect(mockOpenSignIn).not.toHaveBeenCalled()
    })
  })

  describe('hasRole and hasAnyRole', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: { metadata: { role: 'customer' } },
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )
    })

    it('should return true when user has the specified role', () => {
      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.hasRole('customer')).toBe(true)
      expect(result.current.hasRole('admin')).toBe(false)
    })

    it('should return true when user has any of the specified roles', () => {
      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.hasAnyRole(['customer', 'admin'])).toBe(true)
      expect(result.current.hasAnyRole(['admin', 'staff'])).toBe(false)
    })

    it('should return false when user has no role', () => {
      mockUseAuth.mockReturnValue(
        createMockAuth({
          isLoaded: true,
          isSignedIn: true,
          sessionClaims: {},
        })
      )

      mockUseUser.mockReturnValue(
        createMockUser({
          user: { id: '123' },
        })
      )

      const { result } = renderHook(() => useRoleAuth())

      expect(result.current.hasRole('customer')).toBe(false)
      expect(result.current.hasAnyRole(['customer', 'admin'])).toBe(false)
    })
  })
})
