/**
 * Products Error Page Test Suite
 * SOLID Principles: Single Responsibility - Test error boundary component
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library
 */

import { render, screen, fireEvent } from '@testing-library/react'
import ErrorPage from './error'

// Mock console.error to avoid test output noise
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalConsoleError
})

describe('Products Error Page', () => {
  const mockReset = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component rendering', () => {
    it('should render error page with all elements', () => {
      const testError = new Error('Test error message')

      render(<ErrorPage error={testError} reset={mockReset} />)

      // Check for icon by class
      const alertIcon = document.querySelector('.lucide-circle-alert')
      expect(alertIcon).toBeInTheDocument()
      expect(alertIcon).toHaveClass('h-12', 'w-12', 'text-destructive')

      // Check for heading
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Something went wrong!')

      // Check for description
      const description = screen.getByText(
        "We're having trouble loading the products. Please try again."
      )
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-muted-foreground mb-6')

      // Check for button
      const button = screen.getByRole('button', { name: 'Try again' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('gap-2')
    })

    it('should handle error with digest property', () => {
      const testError = new Error('Test error with digest') as Error & {
        digest?: string
      }
      testError.digest = 'error-digest-123'

      render(<ErrorPage error={testError} reset={mockReset} />)

      // Verify component renders correctly with digest
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
    })
  })

  describe('Error logging', () => {
    it('should log error on mount', () => {
      const testError = new Error('Test error for logging')

      render(<ErrorPage error={testError} reset={mockReset} />)

      // Check console.error was called with the error
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenCalledWith(
        'Products page error:',
        testError
      )
    })

    it('should only log error once on mount', () => {
      const testError = new Error('Test error')

      const { rerender } = render(
        <ErrorPage error={testError} reset={mockReset} />
      )

      // Re-render with same error
      rerender(<ErrorPage error={testError} reset={mockReset} />)

      // Should still only be called once due to useEffect dependency
      expect(console.error).toHaveBeenCalledTimes(1)
    })

    it('should log new error when error changes', () => {
      const firstError = new Error('First error')
      const secondError = new Error('Second error')

      const { rerender } = render(
        <ErrorPage error={firstError} reset={mockReset} />
      )

      // Change to new error
      rerender(<ErrorPage error={secondError} reset={mockReset} />)

      // Should be called twice with different errors
      expect(console.error).toHaveBeenCalledTimes(2)
      expect(console.error).toHaveBeenNthCalledWith(
        1,
        'Products page error:',
        firstError
      )
      expect(console.error).toHaveBeenNthCalledWith(
        2,
        'Products page error:',
        secondError
      )
    })
  })

  describe('Reset functionality', () => {
    it('should call reset function when button is clicked', () => {
      const testError = new Error('Test error')

      render(<ErrorPage error={testError} reset={mockReset} />)

      const button = screen.getByRole('button', { name: 'Try again' })
      fireEvent.click(button)

      expect(mockReset).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple reset clicks', () => {
      const testError = new Error('Test error')

      render(<ErrorPage error={testError} reset={mockReset} />)

      const button = screen.getByRole('button', { name: 'Try again' })

      // Click multiple times
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(mockReset).toHaveBeenCalledTimes(3)
    })
  })

  describe('Layout and styling', () => {
    it('should have correct layout structure', () => {
      const testError = new Error('Test error')

      const { container } = render(
        <ErrorPage error={testError} reset={mockReset} />
      )

      // Check main container - get the first div which is the root
      const mainContainer = container.firstChild
      expect(mainContainer).toHaveClass(
        'min-h-screen',
        'flex',
        'items-center',
        'justify-center'
      )

      // Check content container exists with text-center
      const contentContainer = screen.getByText(
        'Something went wrong!'
      ).parentElement
      expect(contentContainer?.className).toContain('text-center')

      // Check icon container
      const iconContainer = document.querySelector(
        '.lucide-circle-alert'
      )?.parentElement
      expect(iconContainer).toHaveClass('flex', 'justify-center', 'mb-4')
    })
  })
})
