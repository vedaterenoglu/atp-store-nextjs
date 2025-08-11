/**
 * Unit tests for Footer Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on footer behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'

// Mock environment variables
const originalEnv = process.env
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_DEVELOPER_WEB_SITE: 'https://test.dev',
    NEXT_PUBLIC_DEVELOPER_EMAIL_ADDRESS: 'test@dev.com',
  }
})

afterEach(() => {
  process.env = originalEnv
})

// Mock react-i18next with inline mock
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string, options?: { year?: number }) => {
      if (key === 'footer.copyright') {
        const year =
          options?.year !== undefined
            ? options.year
            : new Date().getFullYear()
        return `© ${year} Alfe Tissue Paper AB. All rights reserved.`
      }
      if (key === 'footer.createdBy') {
        return 'Created by'
      }
      if (key === 'tooltips.footer.developerWebsite') {
        return 'Visit developer website'
      }
      if (key === 'tooltips.footer.developerEmail') {
        return 'Email developer'
      }
      return key
    },
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
    ready: true,
  })),
}))

// Mock stores
jest.mock('@/lib/stores', () => ({
  useThemeStore: jest.fn(() => ({
    theme: 'light',
    systemTheme: 'light',
    setTheme: jest.fn(),
    setSystemTheme: jest.fn(),
  })),
  useLanguageStore: jest.fn(() => ({
    language: 'en',
    isLoading: false,
    setLanguage: jest.fn(),
  })),
  useCartStore: jest.fn(() => ({
    items: [],
    addItem: jest.fn(),
    updateQuantity: jest.fn(),
    removeItem: jest.fn(),
  })),
  useBookmarkStore: jest.fn(() => ({
    bookmarks: [],
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    isBookmarked: jest.fn(() => false),
  })),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string
    alt: string
    width: number
    height: number
    className?: string
  }) {
    return React.createElement('img', {
      src,
      alt,
      width,
      height,
      className,
      'data-testid': 'next-image',
    })
  },
}))

// Mock Tooltip components
jest.mock('@/components/ui/schadcn', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  TooltipContent: () => null,
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Mail: () => <span data-testid="mail-icon" />,
}))

describe('Footer', () => {
  const mockYear = 2024
  const mockAuthor = 'Test Author'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default props', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)

    // Check copyright text with default year
    expect(
      screen.getByText(
        `© ${currentYear} Alfe Tissue Paper AB. All rights reserved.`
      )
    ).toBeInTheDocument()

    // Check default author
    expect(screen.getByText('GTBS Coding')).toBeInTheDocument()
  })

  it('should render with custom year and author', () => {
    render(<Footer year={mockYear} author={mockAuthor} />)

    // Check copyright text with custom year
    expect(
      screen.getByText(
        `© ${mockYear} Alfe Tissue Paper AB. All rights reserved.`
      )
    ).toBeInTheDocument()

    // Check custom author
    expect(screen.getByText(mockAuthor)).toBeInTheDocument()
  })

  it('should render footer container with correct classes', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('mt-auto', 'border-t', '-mx-4')
  })

  it('should render footer inner with correct classes', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    const inner = footer?.firstChild as HTMLElement
    expect(inner).toHaveClass('px-4', 'py-4', 'sm:py-6')
  })

  it('should render footer content with centered layout', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    const inner = footer?.firstChild as HTMLElement
    const content = inner?.firstChild as HTMLElement

    expect(content).toHaveClass('flex', 'flex-col', 'items-center', 'gap-2')
  })

  it('should render copyright section', () => {
    render(<Footer />)

    const copyrightText = screen.getByText(/© \d{4} Alfe Tissue Paper AB/)
    expect(copyrightText).toHaveClass(
      'text-center',
      'text-sm',
      'text-muted-foreground'
    )
  })

  it('should render created by link with correct href', () => {
    render(<Footer />)

    const createdByLink = screen
      .getByText('GTBS Coding')
      .closest('a') as HTMLAnchorElement

    expect(createdByLink).toHaveAttribute('href', 'https://test.dev')
    expect(createdByLink).toHaveAttribute('target', '_blank')
    expect(createdByLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should use environment variable for developer website', () => {
    render(<Footer />)

    const link = screen
      .getByText('GTBS Coding')
      .closest('a') as HTMLAnchorElement

    expect(link).toHaveAttribute('href', 'https://test.dev')
  })

  it('should have GTBS logo with correct props', () => {
    render(<Footer />)

    const logos = screen.getAllByTestId('next-image')
    const gtbsLogo = logos.find(
      img => img.getAttribute('src') === '/logo-gtbs.png'
    )

    expect(gtbsLogo).toHaveAttribute('src', '/logo-gtbs.png')
    expect(gtbsLogo).toHaveAttribute('alt', 'GTBS Coding Logo')
    expect(gtbsLogo).toHaveAttribute('width', '20')
    expect(gtbsLogo).toHaveAttribute('height', '20')
    expect(gtbsLogo).toHaveClass('h-5', 'w-5', 'object-contain')
  })

  it('should render created by text', () => {
    render(<Footer />)

    expect(screen.getByText('Created by')).toBeInTheDocument()
  })

  it('should apply correct text styles to created by section', () => {
    render(<Footer />)

    const createdBySection = screen.getByText('Created by').parentElement
    expect(createdBySection).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'text-sm',
      'text-muted-foreground'
    )
  })

  it('should apply hover effect to author link', () => {
    render(<Footer />)

    const link = screen
      .getByText('GTBS Coding')
      .closest('a') as HTMLAnchorElement

    expect(link).toHaveClass('hover:text-primary', 'transition-colors')
  })

  it('should handle missing environment variables gracefully', () => {
    process.env['NEXT_PUBLIC_DEVELOPER_WEB_SITE'] = ''
    render(<Footer />)

    const link = screen
      .getByText('GTBS Coding')
      .closest('a') as HTMLAnchorElement

    // Should fall back to default URL
    expect(link).toHaveAttribute('href', 'https://gtbscoding.com')
  })

  it('should render email link with mail icon', () => {
    render(<Footer />)

    const mailIcon = screen.getByTestId('mail-icon')
    expect(mailIcon).toBeInTheDocument()

    const emailLink = mailIcon.closest('a') as HTMLAnchorElement
    expect(emailLink).toHaveAttribute('href', 'mailto:test@dev.com')
    expect(emailLink).toHaveAttribute('aria-label', 'Email developer')
  })
})
