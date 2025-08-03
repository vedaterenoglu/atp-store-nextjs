/**
 * @file graphql-provider.test.tsx
 * @role Unit tests for GraphQL provider component
 * @patterns Mock Pattern, Testing Hooks Pattern
 * @solid DIP: Tests depend on abstractions not implementations
 * @tests Targets 100% coverage of graphql-provider.tsx
 */

import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import React from 'react'
import {
  GraphQLProvider,
  useGraphQLClient,
  useGraphQLProviderCheck,
  GraphQLErrorBoundary,
} from '../graphql-provider'
import { getGraphQLClient } from '@/lib/graphql/client'
import type { Client } from 'urql'

// Mock the GraphQL client module
jest.mock('@/lib/graphql/client', () => ({
  getGraphQLClient: jest.fn(),
}))

// Mock urql Provider
jest.mock('urql', () => ({
  Provider: ({
    children,
    value,
  }: {
    children: React.ReactNode
    value: Client
  }) => (
    <div data-testid="urql-provider" data-client={value}>
      {children}
    </div>
  ),
  Client: jest.fn(),
}))

describe('GraphQLProvider', () => {
  const mockClient = {
    query: jest.fn(),
    mutation: jest.fn(),
    subscription: jest.fn(),
  } as unknown as Client

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getGraphQLClient as jest.Mock).mockReturnValue(mockClient)
  })

  describe('Provider Component', () => {
    it('should render children within urql provider', () => {
      render(
        <GraphQLProvider>
          <div data-testid="child">Test Child</div>
        </GraphQLProvider>
      )

      expect(screen.getByTestId('urql-provider')).toBeInTheDocument()
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('should use singleton client when no client prop provided', () => {
      render(
        <GraphQLProvider>
          <div>Test</div>
        </GraphQLProvider>
      )

      expect(getGraphQLClient).toHaveBeenCalledTimes(1)
    })

    it('should use injected client when provided', () => {
      const customClient = {
        query: jest.fn(),
      } as unknown as Client

      render(
        <GraphQLProvider client={customClient}>
          <div>Test</div>
        </GraphQLProvider>
      )

      expect(getGraphQLClient).not.toHaveBeenCalled()
      const provider = screen.getByTestId('urql-provider')
      expect(provider).toHaveAttribute('data-client', String(customClient))
    })

    it('should memoize client instance', () => {
      const { rerender } = render(
        <GraphQLProvider>
          <div>Test</div>
        </GraphQLProvider>
      )

      const firstCallCount = (getGraphQLClient as jest.Mock).mock.calls.length

      rerender(
        <GraphQLProvider>
          <div>Test Updated</div>
        </GraphQLProvider>
      )

      expect(getGraphQLClient).toHaveBeenCalledTimes(firstCallCount)
    })
  })

  describe('useGraphQLClient Hook', () => {
    it('should return client when used within provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <GraphQLProvider>{children}</GraphQLProvider>
      )

      const { result } = renderHook(() => useGraphQLClient(), { wrapper })

      expect(result.current).toBe(mockClient)
    })

    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        renderHook(() => useGraphQLClient())
      }).toThrow('useGraphQLClient must be used within GraphQLProvider')

      console.error = originalError
    })

    it('should work with custom injected client', () => {
      const customClient = {
        query: jest.fn(),
      } as unknown as Client

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <GraphQLProvider client={customClient}>{children}</GraphQLProvider>
      )

      const { result } = renderHook(() => useGraphQLClient(), { wrapper })

      expect(result.current).toBe(customClient)
    })
  })

  describe('useGraphQLProviderCheck Hook', () => {
    it('should return true when used within provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <GraphQLProvider>{children}</GraphQLProvider>
      )

      const { result } = renderHook(() => useGraphQLProviderCheck(), {
        wrapper,
      })

      expect(result.current).toBe(true)
    })

    it('should return false when used outside provider', () => {
      const { result } = renderHook(() => useGraphQLProviderCheck())

      expect(result.current).toBe(false)
    })
  })

  describe('GraphQLErrorBoundary', () => {
    // Component that throws an error
    const ErrorComponent = () => {
      throw new Error('Test GraphQL Error')
    }

    beforeEach(() => {
      // Suppress console.error for error boundary tests
      jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should render children when no error occurs', () => {
      render(
        <GraphQLErrorBoundary>
          <div data-testid="child">No Error</div>
        </GraphQLErrorBoundary>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.queryByText('GraphQL Error')).not.toBeInTheDocument()
    })

    it('should render default error UI when error occurs', () => {
      render(
        <GraphQLErrorBoundary>
          <ErrorComponent />
        </GraphQLErrorBoundary>
      )

      expect(screen.getByText('GraphQL Error')).toBeInTheDocument()
      expect(screen.getByText('Test GraphQL Error')).toBeInTheDocument()
    })

    it('should render custom fallback when provided', () => {
      const customFallback = (
        <div data-testid="custom-error">Custom Error UI</div>
      )

      render(
        <GraphQLErrorBoundary fallback={customFallback}>
          <ErrorComponent />
        </GraphQLErrorBoundary>
      )

      expect(screen.getByTestId('custom-error')).toBeInTheDocument()
      expect(screen.queryByText('GraphQL Error')).not.toBeInTheDocument()
    })

    it('should log error to console', () => {
      render(
        <GraphQLErrorBoundary>
          <ErrorComponent />
        </GraphQLErrorBoundary>
      )

      expect(console.error).toHaveBeenCalledWith(
        'GraphQL Error Boundary caught:',
        expect.any(Error),
        expect.any(Object)
      )
    })

    it('should handle errors without message', () => {
      const ErrorWithoutMessage = () => {
        const error = new Error()
        error.message = ''
        throw error
      }

      render(
        <GraphQLErrorBoundary>
          <ErrorWithoutMessage />
        </GraphQLErrorBoundary>
      )

      expect(
        screen.getByText('An unexpected error occurred')
      ).toBeInTheDocument()
    })

    it('should maintain error state even when props change', () => {
      const ErrorComponent = ({ message }: { message: string }) => {
        throw new Error(message)
      }

      const { rerender } = render(
        <GraphQLErrorBoundary>
          <ErrorComponent message="First Error" />
        </GraphQLErrorBoundary>
      )

      expect(screen.getByText('First Error')).toBeInTheDocument()

      // Rerender with different props - error boundary should maintain error state
      rerender(
        <GraphQLErrorBoundary>
          <ErrorComponent message="Second Error" />
        </GraphQLErrorBoundary>
      )

      // Should still show the first error, not the second
      expect(screen.getByText('First Error')).toBeInTheDocument()
      expect(screen.queryByText('Second Error')).not.toBeInTheDocument()
    })
  })

  describe('Component Decomposition', () => {
    it('should properly compose sub-components', () => {
      const { container } = render(
        <GraphQLProvider>
          <div data-testid="test">Content</div>
        </GraphQLProvider>
      )

      // Verify proper nesting structure
      const urqlProvider = container.querySelector(
        '[data-testid="urql-provider"]'
      )
      expect(urqlProvider).toBeInTheDocument()
      expect(
        urqlProvider?.querySelector('[data-testid="test"]')
      ).toBeInTheDocument()
    })
  })

  describe('Error Fallback Styles', () => {
    it('should apply proper styling to error fallback', () => {
      const ErrorComponent = () => {
        throw new Error('Style Test Error')
      }

      render(
        <GraphQLErrorBoundary>
          <ErrorComponent />
        </GraphQLErrorBoundary>
      )

      const container = screen.getByText('GraphQL Error').closest('div')
      expect(container?.parentElement).toHaveClass(
        'flex',
        'min-h-[200px]',
        'items-center',
        'justify-center',
        'p-4'
      )

      const heading = screen.getByText('GraphQL Error')
      expect(heading).toHaveClass(
        'text-lg',
        'font-semibold',
        'text-destructive'
      )

      const message = screen.getByText('Style Test Error')
      expect(message).toHaveClass('mt-2', 'text-sm', 'text-muted-foreground')
    })
  })
})
