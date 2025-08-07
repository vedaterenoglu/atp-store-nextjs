/**
 * Unit tests for BookmarksFilterButton Component
 * SOLID Principles: Single Responsibility - Testing bookmarks filter with auth
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, role auth mocks
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BookmarksFilterButton } from '../BookmarksFilterButton'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'bookmarks.button': 'Bookmarks',
      }
      return translations[key] || key
    },
  }),
}))

// Mock role auth hook
const mockRequireAuth = jest.fn()
jest.mock('@/lib/auth/role-auth', () => ({
  useRoleAuth: () => ({
    requireAuth: mockRequireAuth,
  }),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Bookmark: ({ className }: { className?: string }) => (
    <span data-testid="bookmark-icon" className={className}>
      Bookmark Icon
    </span>
  ),
}))

// Mock shadcn Button component
jest.mock('@/components/ui/schadcn', () => ({
  Button: ({
    children,
    onClick,
    variant,
    size,
    className,
    ...props
  }: {
    children: React.ReactNode
    onClick?: () => void
    variant?: string
    size?: string
    className?: string
  }) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  ),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(' '),
}))

describe('BookmarksFilterButton', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with inactive state', () => {
    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    // Check button is rendered
    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-variant', 'outline')
    expect(button).toHaveAttribute('data-size', 'lg')
    expect(button).toHaveClass('h-12 gap-2')

    // Check icon is rendered
    const icon = screen.getByTestId('bookmark-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-4 w-4')
    expect(icon).not.toHaveClass('fill-current')

    // Check text content
    expect(screen.getByText('Bookmarks')).toBeInTheDocument()
  })

  it('should render with active state', () => {
    render(<BookmarksFilterButton isActive={true} onClick={mockOnClick} />)

    // Check button variant changes
    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('data-variant', 'default')

    // Check icon has fill-current class
    const icon = screen.getByTestId('bookmark-icon')
    expect(icon).toHaveClass('h-4 w-4 fill-current')
  })

  it('should render with custom className', () => {
    render(
      <BookmarksFilterButton
        isActive={false}
        onClick={mockOnClick}
        className="custom-class"
      />
    )

    const button = screen.getByTestId('button')
    expect(button).toHaveClass('h-12 gap-2 custom-class')
  })

  it('should handle click with auth check', () => {
    mockRequireAuth.mockImplementation((_, callback) => {
      // Simulate successful auth
      callback()
    })

    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Verify requireAuth was called with correct parameters
    expect(mockRequireAuth).toHaveBeenCalledWith(
      'customer',
      expect.any(Function),
      { showToast: true }
    )

    // Verify onClick was called after auth check
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when auth fails', () => {
    mockRequireAuth.mockImplementation(() => {
      // Simulate failed auth - don't call callback
    })

    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Verify requireAuth was called
    expect(mockRequireAuth).toHaveBeenCalledWith(
      'customer',
      expect.any(Function),
      { showToast: true }
    )

    // Verify onClick was NOT called
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('should translate button text correctly', () => {
    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    expect(screen.getByText('Bookmarks')).toBeInTheDocument()
  })

  it('should toggle icon fill based on active state', () => {
    const { rerender } = render(
      <BookmarksFilterButton isActive={false} onClick={mockOnClick} />
    )

    let icon = screen.getByTestId('bookmark-icon')
    expect(icon).not.toHaveClass('fill-current')

    // Re-render with active state
    rerender(<BookmarksFilterButton isActive={true} onClick={mockOnClick} />)

    icon = screen.getByTestId('bookmark-icon')
    expect(icon).toHaveClass('fill-current')
  })
})
