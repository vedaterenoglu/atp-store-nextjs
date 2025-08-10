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
import { renderWithProviders, screen } from '@/__tests__/utils'
import { Navbar } from '../navbar'
import {
  mockAuthSignedOut,
  mockUserSignedOut,
  mockAuthSignedIn,
  mockUserSignedIn,
  mockAuthAdmin,
  mockUserAdmin,
} from '@/__tests__/mocks/clerk-mocks'
import { useRoleAuth } from '@/lib/auth/role-auth'
import {
  mockRoleAuthCustomer,
  mockRoleAuthAdmin,
} from '@/__tests__/mocks/auth-mocks'

// Mock useRoleAuth with centralized mock
jest.mock('@/lib/auth/role-auth', () => ({
  useRoleAuth: jest.fn(() =>
    require('@/__tests__/mocks/auth-mocks').mockRoleAuthSignedOut()
  ),
}))

// Mock cart store with centralized mock
jest.mock('@/lib/stores/cart.store', () => ({
  useCartCount: () => 0,
}))

// Mock safe translation with centralized mock
jest.mock('@/hooks/use-safe-translation', () => ({
  useSafeTranslation: () =>
    require('@/__tests__/mocks/i18n-mocks').createSafeTranslationMock(),
}))

// Mock CartBadge component
jest.mock('@/components/cart/atoms/CartBadge', () => ({
  CartBadge: function CartBadge({ count }: { count: number }) {
    return count > 0 ? <span data-testid="cart-badge">{count}</span> : null
  },
}))

// Mock react-i18next (for components that might still use it directly)
jest.mock('react-i18next', () => ({
  useTranslation: () =>
    require('@/__tests__/mocks/i18n-mocks').createUseTranslationMock(),
}))

// Mock Tooltip components
jest.mock('@/components/ui/schadcn', () => ({
  ...jest.requireActual('@/components/ui/schadcn'),
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  TooltipContent: () => null,
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  Button: function Button({
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
  },
}))

// Mock Next.js components
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({
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
  },
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({
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
  },
}))

// Clerk is mocked globally in jest.setup.ts - NO DUPLICATE MOCKS
// Import Clerk functions to override their return values in specific tests
import { useAuth, useUser } from '@clerk/nextjs'
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockUseRoleAuth = useRoleAuth as jest.MockedFunction<typeof useRoleAuth>

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock custom components
jest.mock('@/components/ui/custom/theme-toggle', () => ({
  ThemeToggle: function ThemeToggle() {
    return <div data-testid="theme-toggle">Theme Toggle</div>
  },
}))

jest.mock('@/components/ui/custom/language-toggle', () => ({
  LanguageToggle: function LanguageToggle() {
    return <div data-testid="language-toggle">Language Toggle</div>
  },
}))

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  LayoutDashboard: () => <span data-testid="dashboard-icon" />,
  ShoppingCart: () => <span data-testid="cart-icon" />,
  Menu: () => <span data-testid="menu-icon" />,
  X: () => <span data-testid="x-icon" />,
}))

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default to signed out state
    mockUseAuth.mockReturnValue(mockAuthSignedOut() as any)
    mockUseUser.mockReturnValue(mockUserSignedOut() as any)
  })

  describe('Navbar Component', () => {
    it('should render with correct structure', () => {
      const { container } = renderWithProviders(<Navbar />)

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
      renderWithProviders(<Navbar />)

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
      renderWithProviders(<Navbar />)

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
      renderWithProviders(<Navbar />)

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
      renderWithProviders(<Navbar />)

      const brandText = screen.getByText('ATP Store')
      expect(brandText).toHaveClass('text-lg', 'sm:text-xl', 'font-bold')
    })
  })

  describe('NavbarActions', () => {
    it('should render cart button always visible', () => {
      renderWithProviders(<Navbar />)

      const cartIcon = screen.getByTestId('cart-icon')
      expect(cartIcon).toBeInTheDocument()
    })

    it('should show sign-in button when user is not authenticated', () => {
      // Already mocked as signed out by default
      mockUseAuth.mockReturnValue(mockAuthSignedOut() as any)
      mockUseUser.mockReturnValue(mockUserSignedOut() as any)

      renderWithProviders(<Navbar />)

      // There are multiple sign-in buttons (desktop and mobile)
      const signInButtons = screen.getAllByTestId('sign-in-button')
      expect(signInButtons.length).toBe(2) // One for desktop, one for mobile
      expect(screen.queryByTestId('user-button')).not.toBeInTheDocument()
    })

    it('should show dashboard link when signed in as customer', () => {
      // Mock signed-in customer
      mockUseAuth.mockReturnValue(mockAuthSignedIn() as any)
      mockUseUser.mockReturnValue(mockUserSignedIn() as any)
      mockUseRoleAuth.mockReturnValue(mockRoleAuthCustomer() as any)

      renderWithProviders(<Navbar />)

      const dashboardIcons = screen.getAllByTestId('dashboard-icon')
      expect(dashboardIcons.length).toBeGreaterThan(0)
    })

    it('should show user button when authenticated', () => {
      // Mock as signed in
      mockUseAuth.mockReturnValue(mockAuthSignedIn() as any)
      mockUseUser.mockReturnValue(mockUserSignedIn() as any)

      renderWithProviders(<Navbar />)

      // Should show user button (twice - desktop and mobile), not sign-in button
      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument()
      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons.length).toBe(2) // One for desktop, one for mobile
    })

    it('should not show user button when not authenticated', () => {
      // Already mocked as signed out by default
      mockUseAuth.mockReturnValue(mockAuthSignedOut() as any)
      mockUseUser.mockReturnValue(mockUserSignedOut() as any)

      renderWithProviders(<Navbar />)

      expect(screen.queryByTestId('user-button')).not.toBeInTheDocument()
      // There are multiple sign-in buttons (desktop and mobile)
      const signInButtons = screen.getAllByTestId('sign-in-button')
      expect(signInButtons.length).toBe(2)
    })

    it('should show correct links for admin users', () => {
      mockUseAuth.mockReturnValue(mockAuthAdmin() as any)
      mockUseUser.mockReturnValue(mockUserAdmin() as any)
      mockUseRoleAuth.mockReturnValue(mockRoleAuthAdmin() as any)

      renderWithProviders(<Navbar />)

      const allLinks = screen.getAllByTestId('next-link')

      // Find admin dashboard link
      const adminLink = allLinks.find(link =>
        link.getAttribute('href')?.includes('/admin')
      )
      expect(adminLink).toBeInTheDocument()
    })

    it('should show correct links for authenticated customer', () => {
      mockUseAuth.mockReturnValue(mockAuthSignedIn() as any)
      mockUseUser.mockReturnValue(mockUserSignedIn() as any)
      mockUseRoleAuth.mockReturnValue(mockRoleAuthCustomer() as any)

      renderWithProviders(<Navbar />)

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
      mockUseAuth.mockReturnValue(mockAuthSignedIn() as any)
      mockUseUser.mockReturnValue(mockUserSignedIn() as any)

      renderWithProviders(<Navbar />)

      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons.length).toBe(2) // Desktop and mobile
      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument()
    })

    it('should render all UI toggles regardless of auth state', () => {
      mockUseAuth.mockReturnValue(mockAuthSignedOut() as any)
      mockUseUser.mockReturnValue(mockUserSignedOut() as any)

      renderWithProviders(<Navbar />)

      expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('should render hamburger menu on mobile', () => {
      renderWithProviders(<Navbar />)

      const menuIcon = screen.getByTestId('menu-icon')
      expect(menuIcon).toBeInTheDocument()
    })
  })

  describe('Responsive behavior', () => {
    it('should apply correct responsive classes to navbar', () => {
      const { container } = renderWithProviders(<Navbar />)

      const nav = container.querySelector('nav')
      const innerContainer = nav?.firstChild as HTMLElement

      expect(innerContainer).toHaveClass('px-4', 'sm:px-8', 'py-3', 'sm:py-4')
    })

    it('should apply responsive text sizes to brand', () => {
      renderWithProviders(<Navbar />)

      const brandText = screen.getByText('ATP Store')
      expect(brandText).toHaveClass('text-lg', 'sm:text-xl')
    })

    it('should apply responsive sizes to logo', () => {
      renderWithProviders(<Navbar />)

      const logo = screen.getByTestId('next-image')
      expect(logo).toHaveClass('h-8', 'w-8', 'sm:h-10', 'sm:w-10')
    })

    it('should apply responsive gap to brand link', () => {
      renderWithProviders(<Navbar />)

      const brandLink = screen.getByTestId('next-link')
      expect(brandLink).toHaveClass('gap-2', 'sm:gap-3')
    })
  })

  describe('Loading states', () => {
    it('should handle auth loading state gracefully', () => {
      mockUseAuth.mockReturnValue({
        ...mockAuthSignedOut(),
        isLoaded: false,
      })
      mockUseUser.mockReturnValue({
        ...mockUserSignedOut(),
        isLoaded: false,
      })

      renderWithProviders(<Navbar />)

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
