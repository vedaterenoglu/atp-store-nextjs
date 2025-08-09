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
import { render, screen } from '@/__tests__/utils/test-utils'
import { Navbar } from './navbar'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'tooltips.navbar.home': 'Go to home page',
        'tooltips.navbar.dashboard': 'Customer dashboard',
        'tooltips.navbar.theme': 'Change theme',
        'tooltips.navbar.language': 'Change language',
        'tooltips.navbar.signIn': 'Sign in to your account',
        'tooltips.navbar.userMenu': 'User menu',
        'tooltips.navbar.admin': 'Admin panel',
      }
      return translations[key] || key
    },
  }),
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
}))

// Mock Next.js components
jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ children, href, className }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  )),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, width, height, className, priority }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority}
      data-testid="next-image"
    />
  )),
}))

// Import the mocked Clerk hooks
import { useAuth, useUser, SignInButton, UserButton } from '@clerk/nextjs'

// Type the mocks
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
const mockSignInButton = SignInButton as jest.MockedFunction<
  typeof SignInButton
>
const mockUserButton = UserButton as jest.MockedFunction<typeof UserButton>

// Mock interfaces based on Clerk's expected structure
interface MockAuthReturn {
  isLoaded: boolean
  isSignedIn?: boolean | undefined
  userId?: string | null
  sessionId?: string | null
  sessionClaims?: Record<string, unknown> | null
  actor?: unknown
  orgId?: string | null
  orgRole?: string | null
  orgSlug?: string | null
  has?: jest.MockedFunction<() => boolean>
  signOut?: jest.MockedFunction<() => Promise<void>>
  getToken?: jest.MockedFunction<() => Promise<string | null>>
}

interface MockUserReturn {
  isLoaded: boolean
  isSignedIn: boolean
  user: MockUser | null
}

interface MockUser {
  id: string
  publicMetadata?: Record<string, unknown> | null
  [key: string]: unknown
}

// Helper to create proper mock auth return values
const createMockAuthReturn = (
  overrides: Partial<MockAuthReturn> = {}
): MockAuthReturn => ({
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
})

// Helper to create proper mock user return values
const createMockUserReturn = (
  overrides: Partial<MockUserReturn> = {}
): MockUserReturn => ({
  isLoaded: true,
  isSignedIn: false,
  user: null,
  ...overrides,
})

// Helper to create mock user resource
const createMockUser = (overrides: Partial<MockUser> = {}): MockUser => ({
  id: '1',
  publicMetadata: {},
  ...overrides,
})

// Type assertion helper to avoid any usage
const asClerkAuthReturn = (mock: MockAuthReturn): ReturnType<typeof useAuth> =>
  mock as unknown as ReturnType<typeof useAuth>

const asClerkUserReturn = (mock: MockUserReturn): ReturnType<typeof useUser> =>
  mock as unknown as ReturnType<typeof useUser>

// Mock custom components
jest.mock('@/components/ui/schadcn/button', () => ({
  Button: jest.fn(({ children, variant, size, ...props }) => (
    <button
      data-variant={variant}
      data-size={size}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  )),
}))

jest.mock('@/components/ui/custom/theme-toggle', () => ({
  ThemeToggle: jest.fn(() => (
    <div data-testid="theme-toggle">Theme Toggle</div>
  )),
}))

jest.mock('@/components/ui/custom/language-toggle', () => ({
  LanguageToggle: jest.fn(() => (
    <div data-testid="language-toggle">Language Toggle</div>
  )),
}))

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock values
    mockUseAuth.mockReturnValue(asClerkAuthReturn(createMockAuthReturn()))
    mockUseUser.mockReturnValue(asClerkUserReturn(createMockUserReturn()))
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

      // Check actions section
      expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
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
    it('should render all action items in correct order', () => {
      render(<Navbar />)

      const languageToggle = screen.getByTestId('language-toggle')
      const themeToggle = screen.getByTestId('theme-toggle')

      // Check they exist
      expect(languageToggle).toBeInTheDocument()
      expect(themeToggle).toBeInTheDocument()

      // The toggles are now in a desktop-only container
      // languageToggle -> div (tooltip wrapper) -> div (desktop container) -> div (actions container)
      const desktopContainer = languageToggle.parentElement?.parentElement
      expect(desktopContainer).toHaveClass(
        'hidden',
        'sm:flex',
        'items-center',
        'gap-4'
      )
      // Desktop container has: CustomerDashboardButton (may be null), LanguageToggleWithTooltip, ThemeToggleWithTooltip, NavbarAuth
      // Since CustomerDashboardButton may not render, we check for at least 3
      expect(desktopContainer?.children.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('NavbarAuth - Loading State', () => {
    it('should show skeleton when auth is loading', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isLoaded: false,
            isSignedIn: undefined,
          })
        )
      )

      render(<Navbar />)

      // The skeleton is rendered by NavbarAuthSkeleton when auth is loading
      // Look for an element with the skeleton classes
      const skeleton = document.querySelector(
        '.h-8.w-8.rounded-full.bg-muted.animate-pulse'
      )
      expect(skeleton).toBeInTheDocument()
    })
  })

  describe('NavbarAuth - Signed Out State', () => {
    it('should show sign in button when not signed in', () => {
      mockUseAuth.mockReturnValue(asClerkAuthReturn(createMockAuthReturn()))

      render(<Navbar />)

      // Auth is rendered twice (desktop and mobile), so we get all instances
      const signInButtons = screen.getAllByTestId('sign-in-button')
      expect(signInButtons).toHaveLength(2) // One for desktop, one for mobile

      const buttons = screen.getAllByTestId('button')
      // Filter to get only Sign In buttons
      const signInBtns = buttons.filter(btn => btn.textContent === 'Sign In')
      expect(signInBtns).toHaveLength(2)
      signInBtns.forEach(button => {
        expect(button).toHaveAttribute('data-variant', 'default')
        expect(button).toHaveAttribute('data-size', 'sm')
      })
    })

    it('should pass correct props to SignInButton', () => {
      mockUseAuth.mockReturnValue(asClerkAuthReturn(createMockAuthReturn()))

      render(<Navbar />)

      // Check that SignInButton was rendered with correct props
      const signInButtons = screen.getAllByTestId('sign-in-button')
      expect(signInButtons).toHaveLength(2) // Desktop and mobile
      expect(mockSignInButton).toHaveBeenCalledTimes(2)
    })
  })

  describe('NavbarAuth - Signed In State', () => {
    it('should show user button when signed in', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser(),
          })
        )
      )

      render(<Navbar />)

      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons).toHaveLength(2) // Desktop and mobile
      // Check that UserButton was rendered twice
      expect(mockUserButton).toHaveBeenCalledTimes(2)
    })

    it('should not show admin button for regular users', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser({ publicMetadata: { role: 'user' } }),
          })
        )
      )

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    })

    it('should show admin button for admin users', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser({ publicMetadata: { role: 'admin' } }),
          })
        )
      )

      render(<Navbar />)

      // Admin button appears twice (desktop and mobile)
      const adminLinks = screen.getAllByText('Admin')
      expect(adminLinks).toHaveLength(2)

      adminLinks.forEach(adminLink => {
        const adminButton = adminLink.closest('[data-testid="button"]')
        expect(adminButton).toHaveAttribute('data-variant', 'ghost')
        expect(adminButton).toHaveAttribute('data-size', 'sm')

        const linkWrapper = adminLink.closest('[data-testid="next-link"]')
        expect(linkWrapper).toHaveAttribute('href', '/admin')
      })
    })

    it('should handle user with null publicMetadata', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser({ publicMetadata: null }),
          })
        )
      )

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons).toHaveLength(2) // Desktop and mobile
    })

    it('should handle user with empty publicMetadata', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser({ publicMetadata: {} }),
          })
        )
      )

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons).toHaveLength(2) // Desktop and mobile
    })

    it('should render user button container with correct styles', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser({ publicMetadata: { role: 'admin' } }),
          })
        )
      )

      render(<Navbar />)

      const userButtons = screen.getAllByTestId('user-button')
      // Check both desktop and mobile instances
      userButtons.forEach(userButton => {
        // UserButton is now wrapped: userButton -> div (tooltip wrapper) -> div (container with flex)
        const container = userButton.parentElement?.parentElement
        expect(container).toHaveClass('flex', 'items-center', 'gap-2')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null user object', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: null,
          })
        )
      )

      render(<Navbar />)

      // Should still render user button even with null user
      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons).toHaveLength(2) // Desktop and mobile
    })

    it('should handle undefined publicMetadata properties', () => {
      mockUseAuth.mockReturnValue(
        asClerkAuthReturn(
          createMockAuthReturn({
            isSignedIn: true,
            userId: '1',
            sessionId: 'session-1',
          })
        )
      )
      mockUseUser.mockReturnValue(
        asClerkUserReturn(
          createMockUserReturn({
            isSignedIn: true,
            user: createMockUser({ publicMetadata: { role: undefined } }),
          })
        )
      )

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
      const userButtons = screen.getAllByTestId('user-button')
      expect(userButtons).toHaveLength(2) // Desktop and mobile
    })

    it('should handle different role values', () => {
      const roles = ['editor', 'moderator', 'guest', '']

      roles.forEach(role => {
        mockUseAuth.mockReturnValue(
          asClerkAuthReturn(
            createMockAuthReturn({
              isSignedIn: true,
              userId: '1',
              sessionId: 'session-1',
            })
          )
        )
        mockUseUser.mockReturnValue(
          asClerkUserReturn(
            createMockUserReturn({
              isSignedIn: true,
              user: createMockUser({ publicMetadata: { role } }),
            })
          )
        )

        const { rerender } = render(<Navbar />)

        expect(screen.queryByText('Admin')).not.toBeInTheDocument()
        const userButtons = screen.getAllByTestId('user-button')
        expect(userButtons).toHaveLength(2) // Desktop and mobile

        rerender(<></>)
      })
    })
  })
})
