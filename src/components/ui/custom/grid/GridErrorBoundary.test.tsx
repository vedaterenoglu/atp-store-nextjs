/**
 * GridErrorBoundary Component Unit Tests
 * SOLID Principles: Single Responsibility - Test GridErrorBoundary component behavior
 * Design Patterns: Test Pattern - Unit tests with comprehensive coverage
 * Dependencies: Jest, React Testing Library, mock event data
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { GridErrorBoundary } from './GridErrorBoundary'

// Mock console.error to prevent noise in test output
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalError
})

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>Child content</div>
}

describe('GridErrorBoundary', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Normal Operation', () => {
    it('should render children when no error occurs', () => {
      render(
        <GridErrorBoundary>
          <div>Test child content</div>
        </GridErrorBoundary>
      )

      expect(screen.getByText('Test child content')).toBeInTheDocument()
    })

    it('should render multiple children when no error occurs', () => {
      render(
        <GridErrorBoundary>
          <div>First child</div>
          <div>Second child</div>
        </GridErrorBoundary>
      )

      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should catch errors and display error UI', () => {
      render(
        <GridErrorBoundary>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Test error message')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /try again/i })
      ).toBeInTheDocument()
    })

    it('should display default error message when error has no message', () => {
      const ErrorWithoutMessage = () => {
        throw new Error('')
      }

      render(
        <GridErrorBoundary>
          <ErrorWithoutMessage />
        </GridErrorBoundary>
      )

      expect(
        screen.getByText('An error occurred while loading this content')
      ).toBeInTheDocument()
    })

    it('should call onError callback when error occurs', () => {
      const onError = jest.fn()

      render(
        <GridErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Test error message' }),
        expect.objectContaining({ componentStack: expect.any(String) })
      )
    })

    it('should log error to console', () => {
      render(
        <GridErrorBoundary>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(console.error).toHaveBeenCalledWith(
        'GridErrorBoundary caught error:',
        expect.objectContaining({ message: 'Test error message' }),
        expect.objectContaining({ componentStack: expect.any(String) })
      )
    })
  })

  describe('Fallback UI', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <div>Custom error fallback</div>

      render(
        <GridErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(screen.getByText('Custom error fallback')).toBeInTheDocument()
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })

    it('should render default error UI when no fallback provided', () => {
      render(
        <GridErrorBoundary>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })

  describe('Reset Functionality', () => {
    it('should reset error state when Try Again button is clicked', () => {
      let shouldThrow = true
      const ControlledError = () => {
        if (shouldThrow) {
          throw new Error('Controlled error')
        }
        return <div>Child content</div>
      }

      const { rerender } = render(
        <GridErrorBoundary>
          <ControlledError />
        </GridErrorBoundary>
      )

      // Verify error UI is shown
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Controlled error')).toBeInTheDocument()

      // Update state to not throw
      shouldThrow = false

      // Click Try Again button
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))

      // Force re-render
      rerender(
        <GridErrorBoundary>
          <ControlledError />
        </GridErrorBoundary>
      )

      // Verify children are rendered again
      expect(screen.getByText('Child content')).toBeInTheDocument()
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })

    it('should not reset if child throws error again after reset', () => {
      const shouldThrow = true
      const DynamicError = () => {
        if (shouldThrow) {
          throw new Error('Dynamic error')
        }
        return <div>Success content</div>
      }

      render(
        <GridErrorBoundary>
          <DynamicError />
        </GridErrorBoundary>
      )

      // Verify error UI is shown
      expect(screen.getByText('Dynamic error')).toBeInTheDocument()

      // Click Try Again while error condition persists
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))

      // Should still show error since component throws again
      expect(screen.getByText('Dynamic error')).toBeInTheDocument()
    })
  })

  describe('Styling and className', () => {
    it('should apply custom className to error UI', () => {
      render(
        <GridErrorBoundary className="custom-error-class">
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      const errorContainer = screen.getByText(
        'Something went wrong'
      ).parentElement
      expect(errorContainer).toHaveClass('custom-error-class')
    })

    it('should apply default styling classes', () => {
      render(
        <GridErrorBoundary>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      const errorContainer = screen.getByText(
        'Something went wrong'
      ).parentElement
      expect(errorContainer).toHaveClass('flex')
      expect(errorContainer).toHaveClass('min-h-[200px]')
      expect(errorContainer).toHaveClass('w-full')
      expect(errorContainer).toHaveClass('flex-col')
      expect(errorContainer).toHaveClass('items-center')
      expect(errorContainer).toHaveClass('justify-center')
    })
  })

  describe('Static Method getDerivedStateFromError', () => {
    it('should return error state', () => {
      const error = new Error('Test static error')
      const state = GridErrorBoundary.getDerivedStateFromError(error)

      expect(state).toEqual({
        hasError: true,
        error: error,
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle errors without Error instance', () => {
      const ThrowString = () => {
        throw 'String error'
      }

      render(
        <GridErrorBoundary>
          <ThrowString />
        </GridErrorBoundary>
      )

      // React wraps non-Error throws, but the boundary still catches them
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should handle multiple sequential errors', () => {
      const onError = jest.fn()
      let errorMessage = 'First Error'

      const MultiError = () => {
        throw new Error(errorMessage)
      }

      render(
        <GridErrorBoundary onError={onError}>
          <MultiError />
        </GridErrorBoundary>
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(screen.getByText('First Error')).toBeInTheDocument()

      // Reset and trigger another error with different message
      errorMessage = 'Second Error'
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))

      expect(onError).toHaveBeenCalledTimes(2)
      expect(screen.getByText('Second Error')).toBeInTheDocument()
    })

    it('should not call onError if not provided', () => {
      // This test ensures no errors when onError is undefined
      expect(() => {
        render(
          <GridErrorBoundary>
            <ThrowError shouldThrow={true} />
          </GridErrorBoundary>
        )
      }).not.toThrow()
    })
  })

  describe('Component Lifecycle', () => {
    it('should maintain error state across re-renders', () => {
      const { rerender } = render(
        <GridErrorBoundary>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(screen.getByText('Test error message')).toBeInTheDocument()

      // Re-render with same props
      rerender(
        <GridErrorBoundary>
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      // Error state should persist
      expect(screen.getByText('Test error message')).toBeInTheDocument()
    })

    it('should handle prop updates while in error state', () => {
      const { rerender } = render(
        <GridErrorBoundary className="initial-class">
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      const errorContainer = screen.getByText(
        'Something went wrong'
      ).parentElement
      expect(errorContainer).toHaveClass('initial-class')

      // Update className prop while in error state
      rerender(
        <GridErrorBoundary className="updated-class">
          <ThrowError shouldThrow={true} />
        </GridErrorBoundary>
      )

      expect(errorContainer).toHaveClass('updated-class')
      expect(errorContainer).not.toHaveClass('initial-class')
    })
  })
})
