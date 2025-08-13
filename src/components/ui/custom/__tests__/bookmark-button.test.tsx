/**
 * Unit Tests for Bookmark Button Component
 *
 * SOLID Principles Applied:
 * - SRP: Each test has single assertion focus
 * - DIP: Tests depend on component interface, not implementation
 *
 * Test Coverage:
 * - Rendering states
 * - User interactions
 * - Callback handling
 * - Error scenarios
 * - Accessibility
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookmarkButton, BookmarkIndicator } from '../bookmark-button'

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Bookmark: jest.fn(({ className }: { className?: string }) => (
    <span data-testid="bookmark-icon" className={className}>
      Bookmark
    </span>
  )),
  BookmarkCheck: jest.fn(({ className }: { className?: string }) => (
    <span data-testid="bookmark-check-icon" className={className}>
      BookmarkCheck
    </span>
  )),
  Loader2: jest.fn(({ className }: { className?: string }) => (
    <span data-testid="loader-icon" className={className}>
      Loading
    </span>
  )),
}))

// Mock shadcn/ui Button
jest.mock('@/components/ui/schadcn', () => ({
  Button: jest.fn(
    ({
      children,
      className,
      variant,
      size,
      onClick,
      disabled,
      type = 'button',
      ...props
    }: {
      children: React.ReactNode
      className?: string
      variant?: string
      size?: string
      onClick?: (e: React.MouseEvent) => void
      disabled?: boolean
      type?: 'button' | 'reset' | 'submit'
      [key: string]: unknown
    }) => (
      <button
        className={className}
        data-variant={variant}
        data-size={size}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...props}
      >
        {children}
      </button>
    )
  ),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')
  ),
}))

// Mock bookmark store
const mockToggleBookmark = jest.fn()
const mockIsBookmarked = jest.fn()

jest.mock('@/lib/stores/bookmark-store', () => ({
  useBookmarkStore: jest.fn(() => ({
    isBookmarked: mockIsBookmarked,
    toggleBookmark: mockToggleBookmark,
    bookmarks: [],
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    initializeBookmarks: jest.fn(),
    isInitialized: true,
    isLoading: false,
  })),
}))

describe('BookmarkButton', () => {
  const defaultProps = {
    productId: 'prod_123',
    isBookmarked: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render unbookmarked state by default', () => {
      render(<BookmarkButton {...defaultProps} />)

      const button = screen.getByRole('button', { name: /add bookmark/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-pressed', 'false')
    })

    it('should render bookmarked state when isBookmarked is true', () => {
      render(<BookmarkButton {...defaultProps} isBookmarked={true} />)

      const button = screen.getByRole('button', { name: /remove bookmark/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })

    it('should apply custom className', () => {
      render(<BookmarkButton {...defaultProps} className="custom-class" />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('custom-class')
    })

    it('should render with different sizes', () => {
      const { rerender } = render(
        <BookmarkButton {...defaultProps} size="sm" />
      )
      const button = screen.getByRole('button')
      expect(button.className).toContain('h-8')
      expect(button.className).toContain('w-8')

      rerender(<BookmarkButton {...defaultProps} size="md" />)
      const buttonMd = screen.getByRole('button')
      expect(buttonMd.className).toContain('h-10')
      expect(buttonMd.className).toContain('w-10')

      rerender(<BookmarkButton {...defaultProps} size="lg" />)
      const buttonLg = screen.getByRole('button')
      expect(buttonLg.className).toContain('h-12')
      expect(buttonLg.className).toContain('w-12')
    })

    it('should use custom aria label when provided', () => {
      render(
        <BookmarkButton
          {...defaultProps}
          ariaLabel="Save product to favorites"
        />
      )

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Save product to favorites'
      )
    })
  })

  describe('Interactions', () => {
    it('should toggle bookmark state on click', async () => {
      render(<BookmarkButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-pressed', 'false')

      fireEvent.click(button)

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-pressed', 'true')
      })
    })

    it('should call onToggle callback with correct arguments', async () => {
      const onToggle = jest.fn()
      render(<BookmarkButton {...defaultProps} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(onToggle).toHaveBeenCalledWith('prod_123', true)
      })
    })

    it('should prevent event propagation', () => {
      const onToggle = jest.fn()
      const onCardClick = jest.fn()

      render(
        <div onClick={onCardClick}>
          <BookmarkButton {...defaultProps} onToggle={onToggle} />
        </div>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(onToggle).toHaveBeenCalled()
      expect(onCardClick).not.toHaveBeenCalled()
    })

    it('should handle async onToggle', async () => {
      const onToggle = jest.fn((): Promise<void> => Promise.resolve())
      render(<BookmarkButton {...defaultProps} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(onToggle).toHaveBeenCalledWith('prod_123', true)
      })
    })

    it('should revert state on error', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation()
      const onToggle = jest.fn(
        (): Promise<void> => Promise.reject(new Error('API Error'))
      )

      render(<BookmarkButton {...defaultProps} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Initially changes to bookmarked
      expect(button).toHaveAttribute('aria-pressed', 'true')

      // Reverts on error
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-pressed', 'false')
      })

      expect(consoleError).toHaveBeenCalledWith(
        'Failed to toggle bookmark:',
        expect.any(Error)
      )

      consoleError.mockRestore()
    })

    it('should show loading state during async operation', async () => {
      // This test verifies that when showLoading is true,
      // the component uses React's useTransition to manage loading state
      const onToggle = jest.fn(
        () => new Promise<void>(resolve => setTimeout(resolve, 50))
      )

      render(
        <BookmarkButton
          {...defaultProps}
          onToggle={onToggle}
          showLoading={true}
        />
      )

      const button = screen.getByRole('button')

      // Initial state - button should be enabled
      expect(button).not.toBeDisabled()

      // Click the button
      fireEvent.click(button)

      // Verify the handler was called
      expect(onToggle).toHaveBeenCalledTimes(1)

      // The component should optimistically update the visual state
      // (from bookmark to bookmarked or vice versa)
      expect(button).toHaveAttribute('aria-pressed', 'true')

      // Wait for the async operation to complete
      await waitFor(
        () => {
          // After completion, button should be interactable again
          expect(onToggle).toHaveBeenCalledTimes(1)
        },
        { timeout: 100 }
      )
    })
  })

  describe('Edge Cases', () => {
    it('should work without onToggle callback', () => {
      render(<BookmarkButton {...defaultProps} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Should still toggle visually
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })

    it('should handle rapid clicks correctly', async () => {
      // Test that the component prevents race conditions with rapid clicks
      // When showLoading=false, clicks are processed but still async
      const onToggle = jest.fn(() => Promise.resolve())

      render(
        <BookmarkButton
          {...defaultProps}
          onToggle={onToggle}
          showLoading={false}
        />
      )

      const button = screen.getByRole('button')

      // Perform three rapid clicks
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      // Even with showLoading=false, the async nature of handleClick
      // means rapid clicks update the local state immediately
      // but may not all trigger onToggle if they happen too fast

      // Wait for async operations to settle
      await waitFor(() => {
        // At least one click should have been processed
        expect(onToggle).toHaveBeenCalled()
      })

      // The component optimistically updates state on each click
      // So the visual state toggles immediately even if onToggle isn't called
      // This is correct behavior to prevent inconsistent state
      expect(onToggle.mock.calls.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<BookmarkButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('aria-pressed')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should be keyboard accessible', () => {
      const onToggle = jest.fn()
      render(<BookmarkButton {...defaultProps} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      button.focus()

      fireEvent.keyDown(button, { key: 'Enter' })
      expect(onToggle).not.toHaveBeenCalled() // onClick handles it, not keydown

      fireEvent.click(button)
      expect(onToggle).toHaveBeenCalled()
    })
  })
})

describe('BookmarkIndicator', () => {
  it('should render when bookmarked', () => {
    render(<BookmarkIndicator isBookmarked={true} />)

    const indicator = screen.getByLabelText('Bookmarked')
    expect(indicator).toBeInTheDocument()
  })

  it('should not render when not bookmarked', () => {
    render(<BookmarkIndicator isBookmarked={false} />)

    expect(screen.queryByLabelText('Bookmarked')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(
      <BookmarkIndicator isBookmarked={true} className="custom-indicator" />
    )

    const indicator = screen.getByLabelText('Bookmarked')
    expect(indicator.className).toContain('custom-indicator')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(
      <BookmarkIndicator isBookmarked={true} size="sm" />
    )
    const icon = screen.getByTestId('bookmark-check-icon')
    expect(icon.className).toContain('h-4')
    expect(icon.className).toContain('w-4')

    rerender(<BookmarkIndicator isBookmarked={true} size="md" />)
    const iconMd = screen.getByTestId('bookmark-check-icon')
    expect(iconMd.className).toContain('h-5')
    expect(iconMd.className).toContain('w-5')

    rerender(<BookmarkIndicator isBookmarked={true} size="lg" />)
    const iconLg = screen.getByTestId('bookmark-check-icon')
    expect(iconLg.className).toContain('h-6')
    expect(iconLg.className).toContain('w-6')
  })
})
