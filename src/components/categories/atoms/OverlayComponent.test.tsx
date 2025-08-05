/**
 * OverlayComponent Test Suite
 * SOLID Principles: Single Responsibility - Test overlay component functionality
 * Design Patterns: Test Pattern - Unit tests with RTL
 * Dependencies: Jest, React Testing Library
 */

import { render, screen } from '@testing-library/react'
import { OverlayComponent } from './OverlayComponent'

// Mock the cn utility
jest.mock('@/components/ui/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('OverlayComponent', () => {
  const defaultProps = {
    title: 'Test Category',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component rendering', () => {
    it('should render with required props', () => {
      render(<OverlayComponent {...defaultProps} />)

      // Check title is rendered
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(defaultProps.title)
      expect(heading).toHaveClass('text-sm', 'font-medium', 'text-white')
    })

    it('should render select text on mobile', () => {
      render(<OverlayComponent {...defaultProps} />)

      // Check for select text
      const selectText = screen.getByText('Select')
      expect(selectText).toBeInTheDocument()
      expect(selectText).toHaveClass(
        'text-xs',
        'text-green-400',
        'font-semibold',
        'mt-1',
        'md:hidden'
      )
    })

    it('should apply default classes', () => {
      const { container } = render(<OverlayComponent {...defaultProps} />)

      const overlay = container.firstChild
      expect(overlay).toHaveClass(
        'absolute',
        'bottom-3',
        'left-3',
        'right-3',
        'rounded-lg',
        'bg-black/70',
        'backdrop-blur-sm',
        'transition-opacity',
        'duration-300'
      )
    })

    it('should apply custom className', () => {
      const customClass = 'custom-overlay-class'
      const { container } = render(
        <OverlayComponent {...defaultProps} className={customClass} />
      )

      const overlay = container.firstChild
      expect(overlay).toHaveClass(customClass)
    })
  })

  describe('Visibility state', () => {
    it('should be visible by default', () => {
      const { container } = render(<OverlayComponent {...defaultProps} />)

      const overlay = container.firstChild
      expect(overlay).toHaveClass('opacity-100')
      expect(overlay).not.toHaveClass('opacity-0')
    })

    it('should be visible when isVisible is true', () => {
      const { container } = render(
        <OverlayComponent {...defaultProps} isVisible={true} />
      )

      const overlay = container.firstChild
      expect(overlay).toHaveClass('opacity-100')
      expect(overlay).not.toHaveClass('opacity-0')
    })

    it('should be hidden when isVisible is false', () => {
      const { container } = render(
        <OverlayComponent {...defaultProps} isVisible={false} />
      )

      const overlay = container.firstChild
      expect(overlay).toHaveClass('opacity-0')
      expect(overlay).not.toHaveClass('opacity-100')
    })
  })

  describe('Content structure', () => {
    it('should have correct content wrapper structure', () => {
      render(<OverlayComponent {...defaultProps} />)

      // Check content wrapper
      const contentWrapper = screen.getByRole('heading', {
        level: 3,
      }).parentElement
      expect(contentWrapper).toHaveClass('px-3', 'py-2')
    })

    it('should render different title texts', () => {
      const titles = [
        'Category 1',
        'Very Long Category Name That Might Wrap',
        'Short',
        'Special Characters: & % $ #',
        'Unicode: 🍕 🍔 🌮',
      ]

      titles.forEach(title => {
        const { rerender } = render(<OverlayComponent title={title} />)

        const heading = screen.getByRole('heading', { level: 3 })
        expect(heading).toHaveTextContent(title)

        // Clean up for next iteration
        rerender(<></>)
      })
    })
  })

  describe('Edge cases', () => {
    it('should handle empty title', () => {
      render(<OverlayComponent title="" />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(200)
      render(<OverlayComponent title={longTitle} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent(longTitle)
    })

    it('should handle title with special HTML characters', () => {
      const specialTitle = '<script>alert("test")</script>'
      render(<OverlayComponent title={specialTitle} />)

      const heading = screen.getByRole('heading', { level: 3 })
      // React should escape the HTML
      expect(heading).toHaveTextContent(specialTitle)
      expect(heading.innerHTML).not.toContain('<script>')
    })
  })

  describe('Responsive behavior', () => {
    it('should have mobile-only select text', () => {
      render(<OverlayComponent {...defaultProps} />)

      const selectText = screen.getByText('Select')
      // md:hidden class means it's only visible on mobile
      expect(selectText).toHaveClass('md:hidden')
    })
  })

  describe('Prop combinations', () => {
    it('should handle all props together', () => {
      const { container } = render(
        <OverlayComponent
          title="Full Props Test"
          isVisible={false}
          className="test-class-1 test-class-2"
        />
      )

      const overlay = container.firstChild
      const heading = screen.getByRole('heading', { level: 3 })

      // Check all props are applied
      expect(heading).toHaveTextContent('Full Props Test')
      expect(overlay).toHaveClass('opacity-0', 'test-class-1', 'test-class-2')
    })

    it('should maintain default props when not specified', () => {
      const { container } = render(<OverlayComponent title="Defaults Test" />)

      const overlay = container.firstChild
      // isVisible defaults to true
      expect(overlay).toHaveClass('opacity-100')
    })
  })
})
