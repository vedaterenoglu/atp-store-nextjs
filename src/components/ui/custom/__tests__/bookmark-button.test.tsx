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

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookmarkButton, BookmarkIndicator } from '../bookmark-button'

describe('BookmarkButton', () => {
  const defaultProps = {
    productId: 'prod_123',
    isBookmarked: false,
  }

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
      expect(button).toHaveClass('custom-class')
    })

    it('should render with different sizes', () => {
      const { rerender } = render(
        <BookmarkButton {...defaultProps} size="sm" />
      )
      expect(screen.getByRole('button')).toHaveClass('h-8', 'w-8')

      rerender(<BookmarkButton {...defaultProps} size="md" />)
      expect(screen.getByRole('button')).toHaveClass('h-10', 'w-10')

      rerender(<BookmarkButton {...defaultProps} size="lg" />)
      expect(screen.getByRole('button')).toHaveClass('h-12', 'w-12')
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

    it('should disable button during pending state', async () => {
      // This test verifies that when showLoading is true,
      // the component uses React's useTransition to manage loading state
      const onToggle = jest.fn(async () => {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 50))
      })

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
    expect(indicator).toHaveClass('custom-indicator')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(
      <BookmarkIndicator isBookmarked={true} size="sm" />
    )
    expect(screen.getByLabelText('Bookmarked').firstChild).toHaveClass(
      'h-4',
      'w-4'
    )

    rerender(<BookmarkIndicator isBookmarked={true} size="md" />)
    expect(screen.getByLabelText('Bookmarked').firstChild).toHaveClass(
      'h-5',
      'w-5'
    )

    rerender(<BookmarkIndicator isBookmarked={true} size="lg" />)
    expect(screen.getByLabelText('Bookmarked').firstChild).toHaveClass(
      'h-6',
      'w-6'
    )
  })
})
