/**
 * PageTitle Component Test Suite
 * SOLID Principles: Single Responsibility - Test page title component
 * Design Patterns: Test Pattern - Unit tests with RTL
 * Dependencies: Jest, React Testing Library
 */

import { render, screen } from '@testing-library/react'
import { PageTitle } from './PageTitle'

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('PageTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component rendering', () => {
    it('should render with text children', () => {
      render(<PageTitle>Test Title</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Title')
    })

    it('should render with React element children', () => {
      render(
        <PageTitle>
          <span>Complex</span> <strong>Title</strong>
        </PageTitle>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Complex Title')

      // Check nested elements
      const span = heading.querySelector('span')
      const strong = heading.querySelector('strong')
      expect(span).toHaveTextContent('Complex')
      expect(strong).toHaveTextContent('Title')
    })

    it('should apply default classes', () => {
      render(<PageTitle>Default Classes Test</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass(
        'text-2xl',
        'font-bold',
        'tracking-tight',
        'sm:text-3xl',
        'md:text-4xl'
      )
    })

    it('should apply custom className', () => {
      const customClass = 'custom-title-class text-red-500'
      render(<PageTitle className={customClass}>Custom Class Test</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass(customClass)
      // Should still have default classes
      expect(heading).toHaveClass('text-2xl', 'font-bold', 'tracking-tight')
    })
  })

  describe('Different content types', () => {
    it('should handle empty children', () => {
      render(<PageTitle>{''}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle number children', () => {
      render(<PageTitle>{42}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('42')
    })

    it('should handle boolean children (should not render)', () => {
      render(<PageTitle>{true}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle null children', () => {
      render(<PageTitle>{null}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle undefined children', () => {
      render(<PageTitle>{undefined}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle array of children', () => {
      render(<PageTitle>{['Part 1', ' ', 'Part 2', ' ', 'Part 3']}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Part 1 Part 2 Part 3')
    })

    it('should handle mixed content children', () => {
      render(
        <PageTitle>
          Text before <span>span content</span> text after {123} end
        </PageTitle>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(
        'Text before span content text after 123 end'
      )
    })
  })

  describe('Edge cases', () => {
    it('should handle very long text', () => {
      const longText = 'A'.repeat(500)
      render(<PageTitle>{longText}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(longText)
    })

    it('should handle special characters', () => {
      const specialText = '& < > " \' © ® ™ € £ ¥'
      render(<PageTitle>{specialText}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(specialText)
    })

    it('should handle unicode characters', () => {
      const unicodeText = '🎉 🎊 🎈 Hello 世界 مرحبا мир'
      render(<PageTitle>{unicodeText}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(unicodeText)
    })

    it('should handle HTML-like strings (should be escaped)', () => {
      const htmlLikeText = '<script>alert("test")</script>'
      render(<PageTitle>{htmlLikeText}</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(htmlLikeText)
      expect(heading.innerHTML).not.toContain('<script>')
    })
  })

  describe('Props combinations', () => {
    it('should handle both children and className', () => {
      render(
        <PageTitle className="text-blue-600 text-5xl">
          Custom Styled Title
        </PageTitle>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Custom Styled Title')
      expect(heading).toHaveClass('text-blue-600', 'text-5xl')
    })

    it('should merge className with default classes', () => {
      render(
        <PageTitle className="additional-class">
          Title with Additional Class
        </PageTitle>
      )

      const heading = screen.getByRole('heading', { level: 1 })
      // Should have both default and additional classes
      expect(heading).toHaveClass(
        'text-2xl',
        'font-bold',
        'tracking-tight',
        'sm:text-3xl',
        'md:text-4xl',
        'additional-class'
      )
    })
  })

  describe('Responsive behavior', () => {
    it('should include responsive text size classes', () => {
      render(<PageTitle>Responsive Title</PageTitle>)

      const heading = screen.getByRole('heading', { level: 1 })
      // Check for responsive classes
      expect(heading).toHaveClass('text-2xl') // Default
      expect(heading).toHaveClass('sm:text-3xl') // Small screens
      expect(heading).toHaveClass('md:text-4xl') // Medium screens
    })
  })
})
