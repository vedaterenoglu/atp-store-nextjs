/**
 * Unit tests for CampaignErrorBoundary Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { CampaignErrorBoundary } from '../CampaignErrorBoundary'

// Mock interfaces
interface MockCampaignGridErrorProps {
  error?: Error
  onRetry?: () => void
  className?: string
}

// Mock CampaignGridError
jest.mock('../CampaignGridError', () => ({
  CampaignGridError: jest.fn(
    ({ error, onRetry }: MockCampaignGridErrorProps) => (
      <div data-testid="campaign-grid-error">
        <span data-testid="error-message">
          {error?.message || 'Something went wrong'}
        </span>
        {onRetry && (
          <button data-testid="retry-button" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    )
  ),
}))

// Test utility components for error testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div data-testid="child-content">Child content</div>
}

class ComponentWithLifecycleError extends React.Component {
  override componentDidMount() {
    throw new Error('Lifecycle error')
  }
  override render() {
    return <div>Component</div>
  }
}

const BrokenComponent = () => {
  throw new Error('Render phase error')
}

const CustomError = ({ message }: { message: string }) => {
  throw new Error(message)
}

// Mock console.error to prevent noise in test output
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalConsoleError
})

describe('CampaignErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Normal Rendering', () => {
    it('should render children when there is no error', () => {
      render(
        <CampaignErrorBoundary>
          <div data-testid="child-content">Test content</div>
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('child-content')).toBeInTheDocument()
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('should render multiple children without error', () => {
      render(
        <CampaignErrorBoundary>
          <div data-testid="first-child">First</div>
          <div data-testid="second-child">Second</div>
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('first-child')).toBeInTheDocument()
      expect(screen.getByTestId('second-child')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should catch errors and display error UI', () => {
      render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('campaign-grid-error')).toBeInTheDocument()
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Test error message'
      )
      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument()
    })

    it('should log error to console', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error')

      render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      expect(consoleErrorSpy).toHaveBeenCalled()
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Campaign Error Boundary caught:',
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      )
      expect(consoleErrorSpy.mock.calls[0]?.[1]?.message).toBe(
        'Test error message'
      )
    })

    it('should pass error object to CampaignGridError', () => {
      render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      const errorMessage = screen.getByTestId('error-message')
      expect(errorMessage).toHaveTextContent('Test error message')
    })
  })

  describe('State Management', () => {
    it('should initialize with no error state', () => {
      const { container } = render(
        <CampaignErrorBoundary>
          <div data-testid="child">Child</div>
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(
        container.querySelector('[data-testid="campaign-grid-error"]')
      ).toBeNull()
    })

    it('should update state when error occurs', () => {
      const { rerender } = render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={false} />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('child-content')).toBeInTheDocument()

      // Trigger error
      rerender(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('campaign-grid-error')).toBeInTheDocument()
    })
  })

  describe('Reset Functionality', () => {
    it('should reset error state when retry is clicked', () => {
      const { rerender } = render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('campaign-grid-error')).toBeInTheDocument()

      // Click retry button
      const retryButton = screen.getByTestId('retry-button')
      retryButton.click()

      // Rerender with non-throwing component
      rerender(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={false} />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('child-content')).toBeInTheDocument()
      expect(
        screen.queryByTestId('campaign-grid-error')
      ).not.toBeInTheDocument()
    })

    it('should call onRetry prop when provided', () => {
      const onRetryMock = jest.fn()

      render(
        <CampaignErrorBoundary onRetry={onRetryMock}>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      const retryButton = screen.getByTestId('retry-button')
      retryButton.click()

      expect(onRetryMock).toHaveBeenCalledTimes(1)
    })

    it('should handle reset without onRetry prop', () => {
      render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      const retryButton = screen.getByTestId('retry-button')

      // Should not throw when onRetry is not provided
      expect(() => retryButton.click()).not.toThrow()
    })

    it('should clear error from state on reset', () => {
      const { rerender } = render(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Test error message'
      )

      // Click retry to reset
      const retryButton = screen.getByTestId('retry-button')
      retryButton.click()

      // Rerender with non-throwing component
      rerender(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={false} />
        </CampaignErrorBoundary>
      )

      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  describe('Error Types', () => {
    it('should handle different error types', () => {
      render(
        <CampaignErrorBoundary>
          <CustomError message="Custom error occurred" />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Custom error occurred'
      )
    })

    it('should handle errors thrown in lifecycle methods', () => {
      render(
        <CampaignErrorBoundary>
          <ComponentWithLifecycleError />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('campaign-grid-error')).toBeInTheDocument()
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Lifecycle error'
      )
    })
  })

  describe('Props Handling', () => {
    it('should render with children prop', () => {
      render(
        <CampaignErrorBoundary>
          <div>Test child</div>
        </CampaignErrorBoundary>
      )

      expect(screen.getByText('Test child')).toBeInTheDocument()
    })

    it('should handle onRetry prop correctly', () => {
      const onRetryMock = jest.fn()

      const { rerender } = render(
        <CampaignErrorBoundary onRetry={onRetryMock}>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      screen.getByTestId('retry-button').click()
      expect(onRetryMock).toHaveBeenCalledTimes(1)

      // Update to remove onRetry
      rerender(
        <CampaignErrorBoundary>
          <ThrowError shouldThrow={true} />
        </CampaignErrorBoundary>
      )

      screen.getByTestId('retry-button').click()
      // Should still be called only once from before
      expect(onRetryMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('Static Methods', () => {
    it('should have getDerivedStateFromError static method', () => {
      expect(CampaignErrorBoundary.getDerivedStateFromError).toBeDefined()
      expect(typeof CampaignErrorBoundary.getDerivedStateFromError).toBe(
        'function'
      )
    })

    it('should return correct state from getDerivedStateFromError', () => {
      const error = new Error('Static method test')
      const newState = CampaignErrorBoundary.getDerivedStateFromError(error)

      expect(newState).toEqual({
        hasError: true,
        error: error,
      })
    })
  })

  describe('Component Lifecycle', () => {
    it('should catch errors during render phase', () => {
      render(
        <CampaignErrorBoundary>
          <BrokenComponent />
        </CampaignErrorBoundary>
      )

      expect(screen.getByTestId('campaign-grid-error')).toBeInTheDocument()
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Render phase error'
      )
    })

    it('should maintain error boundary across re-renders', () => {
      const { rerender } = render(
        <CampaignErrorBoundary>
          <div>Initial content</div>
        </CampaignErrorBoundary>
      )

      expect(screen.getByText('Initial content')).toBeInTheDocument()

      // Rerender with same non-throwing content
      rerender(
        <CampaignErrorBoundary>
          <div>Updated content</div>
        </CampaignErrorBoundary>
      )

      expect(screen.getByText('Updated content')).toBeInTheDocument()
      expect(
        screen.queryByTestId('campaign-grid-error')
      ).not.toBeInTheDocument()
    })
  })
})
