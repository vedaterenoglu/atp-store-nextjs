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

// Mock Clerk hooks and components
const mockUseAuth = jest.fn()
const mockUseUser = jest.fn()
const mockSignInButton = jest.fn()
const mockUserButton = jest.fn()

jest.mock('@clerk/nextjs', () => ({
  SignInButton: jest.fn(({ children, mode }) => {
    mockSignInButton({ mode })
    return <div data-testid="sign-in-button">{children}</div>
  }),
  UserButton: jest.fn(({ afterSignOutUrl }) => {
    mockUserButton({ afterSignOutUrl })
    return <div data-testid="user-button">User Button</div>
  }),
  useAuth: () => mockUseAuth(),
  useUser: () => mockUseUser(),
}))

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
    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    })
    mockUseUser.mockReturnValue({
      user: null,
    })
  })

  describe('Navbar Component', () => {
    it('should render with correct structure', () => {
      const { container } = render(<Navbar />)

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveClass('border-b', '-mx-4')

      const innerContainer = nav?.firstChild as HTMLElement
      expect(innerContainer).toHaveClass('px-6', 'sm:px-8', 'py-4')

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
      expect(logo).toHaveClass('h-10', 'w-10', 'object-contain')
      expect(logo).toHaveAttribute('data-priority', 'true')
    })

    it('should render brand link with correct href and text', () => {
      render(<Navbar />)

      const brandLink = screen.getByTestId('next-link')
      expect(brandLink).toHaveAttribute('href', '/')
      expect(brandLink).toHaveClass(
        'flex',
        'items-center',
        'gap-3',
        'text-foreground',
        'transition-colors',
        'hover:text-primary'
      )
      expect(brandLink).toHaveTextContent('ATP Store')
    })

    it('should render brand text with correct styles', () => {
      render(<Navbar />)

      const brandText = screen.getByText('ATP Store')
      expect(brandText).toHaveClass('text-xl', 'font-bold')
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

      // Check container structure
      const actionsContainer = languageToggle.parentElement
      expect(actionsContainer).toHaveClass('flex', 'items-center', 'gap-4')
      expect(actionsContainer?.children).toHaveLength(3) // language, theme, auth
    })
  })

  describe('NavbarAuth - Loading State', () => {
    it('should show skeleton when auth is loading', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: false,
        isSignedIn: false,
      })

      render(<Navbar />)

      const skeleton = screen.getByTestId('language-toggle').parentElement
        ?.lastChild as HTMLElement
      expect(skeleton).toHaveClass(
        'h-8',
        'w-8',
        'rounded-full',
        'bg-muted',
        'animate-pulse'
      )
    })
  })

  describe('NavbarAuth - Signed Out State', () => {
    it('should show sign in button when not signed in', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
      })

      render(<Navbar />)

      const signInButton = screen.getByTestId('sign-in-button')
      expect(signInButton).toBeInTheDocument()

      const button = screen.getByTestId('button')
      expect(button).toHaveTextContent('Sign In')
      expect(button).toHaveAttribute('data-variant', 'default')
      expect(button).toHaveAttribute('data-size', 'sm')
    })

    it('should pass correct props to SignInButton', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
      })

      render(<Navbar />)

      expect(mockSignInButton).toHaveBeenCalledWith({ mode: 'modal' })
    })
  })

  describe('NavbarAuth - Signed In State', () => {
    it('should show user button when signed in', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: {} },
      })

      render(<Navbar />)

      const userButton = screen.getByTestId('user-button')
      expect(userButton).toBeInTheDocument()
      expect(mockUserButton).toHaveBeenCalledWith({ afterSignOutUrl: '/' })
    })

    it('should not show admin button for regular users', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: { role: 'user' } },
      })

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    })

    it('should show admin button for admin users', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: { role: 'admin' } },
      })

      render(<Navbar />)

      const adminLink = screen.getByText('Admin')
      expect(adminLink).toBeInTheDocument()

      const adminButton = adminLink.closest('[data-testid="button"]')
      expect(adminButton).toHaveAttribute('data-variant', 'ghost')
      expect(adminButton).toHaveAttribute('data-size', 'sm')

      const linkWrapper = adminLink.closest('[data-testid="next-link"]')
      expect(linkWrapper).toHaveAttribute('href', '/admin')
    })

    it('should handle user with null publicMetadata', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: null },
      })

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
      expect(screen.getByTestId('user-button')).toBeInTheDocument()
    })

    it('should handle user with empty publicMetadata', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: {} },
      })

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
      expect(screen.getByTestId('user-button')).toBeInTheDocument()
    })

    it('should render user button container with correct styles', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: { role: 'admin' } },
      })

      render(<Navbar />)

      const userButton = screen.getByTestId('user-button')
      const container = userButton.parentElement
      expect(container).toHaveClass('flex', 'items-center', 'gap-2')
    })
  })

  describe('Edge Cases', () => {
    it('should handle null user object', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: null,
      })

      render(<Navbar />)

      // Should still render user button even with null user
      expect(screen.getByTestId('user-button')).toBeInTheDocument()
    })

    it('should handle undefined publicMetadata properties', () => {
      mockUseAuth.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
      })
      mockUseUser.mockReturnValue({
        user: { id: '1', publicMetadata: { role: undefined } },
      })

      render(<Navbar />)

      expect(screen.queryByText('Admin')).not.toBeInTheDocument()
      expect(screen.getByTestId('user-button')).toBeInTheDocument()
    })

    it('should handle different role values', () => {
      const roles = ['editor', 'moderator', 'guest', '']

      roles.forEach(role => {
        mockUseAuth.mockReturnValue({
          isLoaded: true,
          isSignedIn: true,
        })
        mockUseUser.mockReturnValue({
          user: { id: '1', publicMetadata: { role } },
        })

        const { rerender } = render(<Navbar />)

        expect(screen.queryByText('Admin')).not.toBeInTheDocument()
        expect(screen.getByTestId('user-button')).toBeInTheDocument()

        rerender(<></>)
      })
    })
  })
})
