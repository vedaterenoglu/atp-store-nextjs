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
      const onToggle = jest.fn(
        (): Promise<void> => new Promise(resolve => setTimeout(resolve, 100))
      )

      render(
        <BookmarkButton
          {...defaultProps}
          onToggle={onToggle}
          showLoading={true}
        />
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Button should be disabled while pending
      expect(button).toBeDisabled()
      expect(button).toHaveClass('opacity-50', 'cursor-wait')

      await waitFor(
        () => {
          expect(button).not.toBeDisabled()
        },
        { timeout: 200 }
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
      const onToggle = jest.fn()
      render(
        <BookmarkButton
          {...defaultProps}
          onToggle={onToggle}
          showLoading={false}
        />
      )

      const button = screen.getByRole('button')

      // Rapid clicks
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      await waitFor(() => {
        expect(onToggle).toHaveBeenCalledTimes(3)
      })
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
