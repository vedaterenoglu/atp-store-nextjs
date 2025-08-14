/**
 * Unit tests for Navbar Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on navbar behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navbar } from '../navbar'

// Mock interfaces
interface MockAuthReturn {
  isLoaded: boolean
  isSignedIn: boolean
  userId: string | null
  sessionId: string | null
  sessionClaims: null
  actor: null
  orgId: string | null
  orgRole: string | null
  orgSlug: string | null
  has: jest.Mock
  signOut: jest.Mock
  getToken: jest.Mock
}

interface MockUserReturn {
  isLoaded: boolean
  isSignedIn: boolean
  user: {
    id: string
    firstName: string | null
    lastName: string | null
    username: string | null
    imageUrl: string
    publicMetadata: Record<string, unknown>
  } | null
}

// Helper functions for mock data
function mockAuthSignedOut(): MockAuthReturn {
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
    signOut: jest.fn(),
    getToken: jest.fn(),
  }
}

function mockUserSignedOut(): MockUserReturn {
  return {
    isLoaded: true,
    isSignedIn: false,
    user: null,
  }
}

function mockAuthSignedIn(): MockAuthReturn {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: 'user_test123',
    sessionId: 'sess_test123',
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => false),
    signOut: jest.fn(),
    getToken: jest.fn(),
  }
}

function mockUserSignedIn(): MockUserReturn {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'user_test123',
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      imageUrl: 'https://example.com/avatar.jpg',
      publicMetadata: { role: 'customer' },
    },
  }
}

function mockAuthAdmin(): MockAuthReturn {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: 'user_admin123',
    sessionId: 'sess_admin123',
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => true),
    signOut: jest.fn(),
    getToken: jest.fn(),
  }
}

function mockUserAdmin(): MockUserReturn {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'user_admin123',
      firstName: 'Admin',
      lastName: 'User',
      username: 'adminuser',
      imageUrl: 'https://example.com/admin-avatar.jpg',
      publicMetadata: { role: 'admin' },
    },
  }
}

function mockRoleAuthCustomer() {
  return {
    isSignedIn: true,
    isLoaded: true,
    hasRole: jest.fn((role: string | null) => role === 'customer'),
    requireAuth: jest.fn(),
    checkAuth: jest.fn(),
    hasAnyRole: jest.fn(() => true),
    userRole: 'customer' as const,
    getUserRole: jest.fn(() => 'customer' as const),
  }
}

function mockRoleAuthAdmin() {
  return {
    isSignedIn: true,
    isLoaded: true,
    hasRole: jest.fn((role: string | null) => role === 'admin'),
    requireAuth: jest.fn(),
    checkAuth: jest.fn(),
    hasAnyRole: jest.fn(() => true),
    userRole: 'admin' as const,
    getUserRole: jest.fn(() => 'admin' as const),
  }
}

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(),
  useUser: jest.fn(),
  SignInButton: jest.fn(
    ({ children, mode }: { children: React.ReactNode; mode?: string }) => (
      <div data-testid="sign-in-button" data-mode={mode}>
        {children}
      </div>
    )
  ),
  UserButton: jest.fn(() => <div data-testid="user-button" />),
}))

// Mock useRoleAuth
jest.mock('@/lib/auth/role-auth', () => ({
  useRoleAuth: jest.fn(),
}))

// Mock cart store
jest.mock('@/lib/stores/cart.store', () => ({
  useCartCount: jest.fn(() => 0),
}))

// Mock safe translation
jest.mock('@/hooks/use-safe-translation', () => ({
  useSafeTranslation: jest.fn(() => ({
    t: jest.fn((key: string) => key),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
    ready: true,
  })),
}))

// Mock CartBadge component
jest.mock('@/components/cart/atoms/CartBadge', () => ({
  CartBadge: jest.fn(({ count }: { count: number }) =>
    count > 0 ? <span data-testid="cart-badge">{count}</span> : null
  ),
}))

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: jest.fn((key: string) => key),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
    ready: true,
  })),
}))

// Mock Tooltip components
jest.mock('@/components/ui/schadcn', () => ({
  Tooltip: jest.fn(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )),
  TooltipTrigger: jest.fn(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )),
  TooltipContent: jest.fn(() => null),
  TooltipProvider: jest.fn(({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  )),
  Button: jest.fn(function Button({
    children,
    variant,
    size,
    ...props
  }: {
    children: React.ReactNode
    variant?: string
    size?: string
    [key: string]: unknown
  }) {
    return (
      <button
        data-variant={variant}
        data-size={size}
        data-testid="button"
        {...props}
      >
        {children}
      </button>
    )
  }),
}))

// Mock Next.js components
jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(function Link({
    children,
    href,
    className,
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) {
    return (
      <a href={href} className={className} data-testid="next-link">
        {children}
      </a>
    )
  }),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(function Image({
    src,
    alt,
    width,
    height,
    className,
    priority,
  }: {
    src: string
    alt: string
    width: number
    height: number
    className?: string
    priority?: boolean
  }) {
    return React.createElement('img', {
      src,
      alt,
      width,
      height,
      className,
      'data-priority': priority,
      'data-testid': 'next-image',
    })
  }),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

// Mock @/components/ui/custom to avoid importing BookmarkButton which imports Clerk server code
jest.mock('@/components/ui/custom', () => ({
  ThemeToggle: jest.fn(() => (
    <div data-testid="theme-toggle">Theme Toggle</div>
  )),
  LanguageToggle: jest.fn(() => (
    <div data-testid="language-toggle">Language Toggle</div>
  )),
  BookmarkButton: jest.fn(() => null),
}))

// Mock CustomerSwitcher to prevent async operations
jest.mock('@/components/customer/organisms/CustomerSwitcher', () => ({
  CustomerSwitcher: jest.fn(() => null),
}))

// Mock ImpersonationBanner to prevent async operations
jest.mock('@/components/customer/molecules/ImpersonationBanner', () => ({
  ImpersonationBanner: jest.fn(() => null),
}))

// Mock useAuthGuard hook with proper authContext structure
jest.mock('@/hooks/use-auth-guard', () => ({
  useAuthGuard: jest.fn(() => ({
    authContext: {
      isSignedIn: false,
      role: null as 'customer' | 'admin' | null,
      hasActiveCustomer: false,
      customerId: null,
    },
    activeCustomerId: null,
  })),
}))

// Mock toast to prevent async operations
jest.mock('@/lib/utils/toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}))

// Mock style utilities
jest.mock('@/lib/styles/utilities', () => ({
  getLayoutClasses: jest.fn(
    ({ component, part }: { component: string; part: string }) => {
      if (component === 'navbar') {
        if (part === 'container') return 'border-b -mx-4'
        if (part === 'inner') return 'px-4 sm:px-8 py-3 sm:py-4'
      }
      return ''
    }
  ),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')
  ),
}))

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  LayoutDashboard: jest.fn(() => <span data-testid="dashboard-icon" />),
  ShoppingCart: jest.fn(() => <span data-testid="cart-icon" />),
  Menu: jest.fn(() => <span data-testid="menu-icon" />),
  X: jest.fn(() => <span data-testid="x-icon" />),
  UserCog: jest.fn(() => <span data-testid="user-cog-icon" />),
}))

// Import mocked functions
import { useAuth, useUser } from '@clerk/nextjs'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { useAuthGuard } from '@/hooks/use-auth-guard'

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockUseRoleAuth = useRoleAuth as jest.MockedFunction<typeof useRoleAuth>
const mockUseAuthGuard = useAuthGuard as jest.MockedFunction<
  typeof useAuthGuard
>

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default to signed out state
    mockUseAuth.mockReturnValue(
      mockAuthSignedOut() as ReturnType<typeof useAuth>
    )
    mockUseUser.mockReturnValue(
      mockUserSignedOut() as ReturnType<typeof useUser>
    )
    mockUseRoleAuth.mockReturnValue({
      isSignedIn: false,
      isLoaded: true,
      userRole: null,
      hasRole: jest.fn(() => false),
      requireAuth: jest.fn(),
      checkAuth: jest.fn(),
      hasAnyRole: jest.fn(() => false),
      getUserRole: jest.fn(() => null),
    })
  })

  describe('Navbar Component', () => {
    it('should render with correct structure', () => {
      const { container } = render(<Navbar />)

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveClass('border-b', '-mx-4')

      const innerContainer = nav?.firstChild as HTMLElement
      expect(innerContainer).toHaveClass('px-4', 'sm:px-8', 'py-3', 'sm:py-4')

      const flexContainer = innerContainer?.firstChild as HTMLElement
      expect(flexContainer).toHaveClass(
        'flex',
        'items-center',
        'justify-between'
      )
    })

    it('should render brand and actions sections', () => {
      render(<Navbar />)

      // Check brand section
      const brandLink = screen.getByTestId('next-link')
      expect(brandLink).toBeInTheDocument()

      // Check actions section - should have cart button
      expect(screen.getByTestId('cart-icon')).toBeInTheDocument()
      // Theme and language toggles are in desktop section
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
    })
  })

  describe('NavbarBrand', () => {
    it('should render logo with correct props', () => {
      render(<Navbar />)

      const logo = screen.getByTestId('next-image')
      expect(logo).toHaveAttribute('src', '/logo.png')
      expect(logo).toHaveAttribute('alt', 'ATP Store Logo')
      expect(logo).toHaveAttribute('width', '40')
      expect(logo).toHaveAttribute('height', '40')
      expect(logo).toHaveClass(
        'h-8',
        'w-8',
        'sm:h-10',
        'sm:w-10',
        'object-contain'
      )
      expect(logo).toHaveAttribute('data-priority', 'true')
    })

    it('should render brand link with correct href and text', () => {
      render(<Navbar />)

      const brandLink = screen.getByTestId('next-link')
      expect(brandLink).toHaveAttribute('href', '/')
      expect(brandLink).toHaveClass(
        'flex',
        'items-center',
        'gap-2',
        'sm:gap-3',
        'text-foreground',
        'transition-colors',
        'hover:text-primary'
      )
      expect(brandLink).toHaveTextContent('ATP Store')
    })

    it('should render brand text with correct styles', () => {
      render(<Navbar />)

      const brandText = screen.getByText('ATP Store')
      expect(brandText).toHaveClass('text-lg', 'sm:text-xl', 'font-bold')
    })
  })

  describe('NavbarActions', () => {
    it('should render cart button always visible', () => {
      render(<Navbar />)

      const cartIcon = screen.getByTestId('cart-icon')
      expect(cartIcon).toBeInTheDocument()
    })

    it('should show sign-in button when user is not authenticated', () => {
      // Already mocked as signed out by default
      mockUseAuth.mockReturnValue(
        mockAuthSignedOut() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedOut() as ReturnType<typeof useUser>
      )

      render(<Navbar />)

      // There are multiple sign-in buttons (desktop and mobile)
      const signInButtons = screen.getAllByTestId('sign-in-button')
      expect(signInButtons.length).toBe(2) // One for desktop, one for mobile
      expect(screen.queryByTestId('user-button')).not.toBeInTheDocument()
    })

    it('should show dashboard link when signed in as customer', () => {
      // Mock signed-in customer
      mockUseAuth.mockReturnValue(
        mockAuthSignedIn() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedIn() as ReturnType<typeof useUser>
      )
      mockUseRoleAuth.mockReturnValue(mockRoleAuthCustomer())
      mockUseAuthGuard.mockReturnValue({
        authContext: {
          isSignedIn: true,
          role: 'customer',
          hasActiveCustomer: true,
          customerId: 'cust_test123',
        },
      } as ReturnType<typeof useAuthGuard>)

      render(<Navbar />)

      const dashboardIcons = screen.getAllByTestId('dashboard-icon')
      expect(dashboardIcons.length).toBeGreaterThan(0)
    })

    it('should show user button when authenticated', () => {
      // Mock as signed in
      mockUseAuth.mockReturnValue(
        mockAuthSignedIn() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedIn() as ReturnType<typeof useUser>
      )

      render(<Navbar />)

      // Should show user button (twice - desktop and mobile), not sign-in button
      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument()
      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons.length).toBe(2) // One for desktop, one for mobile
    })

    it('should not show user button when not authenticated', () => {
      // Already mocked as signed out by default
      mockUseAuth.mockReturnValue(
        mockAuthSignedOut() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedOut() as ReturnType<typeof useUser>
      )

      render(<Navbar />)

      expect(screen.queryByTestId('user-button')).not.toBeInTheDocument()
      // There are multiple sign-in buttons (desktop and mobile)
      const signInButtons = screen.getAllByTestId('sign-in-button')
      expect(signInButtons.length).toBe(2)
    })

    it('should show correct links for admin users', () => {
      mockUseAuth.mockReturnValue(mockAuthAdmin() as ReturnType<typeof useAuth>)
      mockUseUser.mockReturnValue(mockUserAdmin() as ReturnType<typeof useUser>)
      mockUseRoleAuth.mockReturnValue(mockRoleAuthAdmin())
      mockUseAuthGuard.mockReturnValue({
        authContext: {
          isSignedIn: true,
          role: 'admin',
          hasActiveCustomer: true,
          customerId: 'admin-customer',
        },
      } as ReturnType<typeof useAuthGuard>)

      render(<Navbar />)

      // For admin users, check that dashboard icons are present
      const dashboardIcons = screen.getAllByTestId('dashboard-icon')
      expect(dashboardIcons.length).toBeGreaterThan(0)

      // Admin functionality is present through dashboard access
    })

    it('should show correct links for authenticated customer', () => {
      mockUseAuth.mockReturnValue(
        mockAuthSignedIn() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedIn() as ReturnType<typeof useUser>
      )
      mockUseRoleAuth.mockReturnValue(mockRoleAuthCustomer())
      mockUseAuthGuard.mockReturnValue({
        authContext: {
          isSignedIn: true,
          role: 'customer',
          hasActiveCustomer: true,
          customerId: 'cust_test123',
        },
      } as ReturnType<typeof useAuthGuard>)

      render(<Navbar />)

      const dashboardIcons = screen.getAllByTestId('dashboard-icon')
      expect(dashboardIcons.length).toBeGreaterThan(0)

      // Should not have admin link
      const allLinks = screen.queryAllByTestId('next-link')
      const adminLink = allLinks.find(link =>
        link.getAttribute('href')?.includes('/admin')
      )
      expect(adminLink).toBeUndefined()
    })

    it('should show user button for authenticated users', () => {
      mockUseAuth.mockReturnValue(
        mockAuthSignedIn() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedIn() as ReturnType<typeof useUser>
      )

      render(<Navbar />)

      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons.length).toBe(2) // Desktop and mobile
      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument()
    })

    it('should render all UI toggles regardless of auth state', () => {
      mockUseAuth.mockReturnValue(
        mockAuthSignedOut() as ReturnType<typeof useAuth>
      )
      mockUseUser.mockReturnValue(
        mockUserSignedOut() as ReturnType<typeof useUser>
      )

      render(<Navbar />)

      expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('should render hamburger menu on mobile', () => {
      render(<Navbar />)

      const menuIcon = screen.getByTestId('menu-icon')
      expect(menuIcon).toBeInTheDocument()
    })
  })

  describe('Responsive behavior', () => {
    it('should apply correct responsive classes to navbar', () => {
      const { container } = render(<Navbar />)

      const nav = container.querySelector('nav')
      const innerContainer = nav?.firstChild as HTMLElement

      expect(innerContainer).toHaveClass('px-4', 'sm:px-8', 'py-3', 'sm:py-4')
    })

    it('should apply responsive text sizes to brand', () => {
      render(<Navbar />)

      const brandText = screen.getByText('ATP Store')
      expect(brandText).toHaveClass('text-lg', 'sm:text-xl')
    })

    it('should apply responsive sizes to logo', () => {
      render(<Navbar />)

      const logo = screen.getByTestId('next-image')
      expect(logo).toHaveClass('h-8', 'w-8', 'sm:h-10', 'sm:w-10')
    })

    it('should apply responsive gap to brand link', () => {
      render(<Navbar />)

      const brandLink = screen.getByTestId('next-link')
      expect(brandLink).toHaveClass('gap-2', 'sm:gap-3')
    })
  })

  describe('Loading states', () => {
    it('should handle auth loading state gracefully', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: false,
        isSignedIn: undefined,
        userId: undefined,
        sessionId: undefined,
        sessionClaims: undefined,
        actor: undefined,
        orgId: undefined,
        orgRole: undefined,
        orgSlug: undefined,
        has: undefined,
        signOut: jest.fn(),
        getToken: jest.fn(),
      } as unknown as ReturnType<typeof useAuth>)
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: undefined,
        user: undefined,
      } as unknown as ReturnType<typeof useUser>)

      render(<Navbar />)

      // UI toggles should still be present
      expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()

      // During loading, auth components should show skeleton (rendered as divs with animate-pulse)
      // Since we can't easily test for the skeleton, we just verify the navbar renders without error
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })
})
