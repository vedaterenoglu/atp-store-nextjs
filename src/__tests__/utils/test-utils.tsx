/**
 * Test Utilities for React Testing Library
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for providing test utilities
 * - OCP: Open for extension with additional providers
 * - DIP: Depends on React Testing Library abstractions
 * - ISP: Focused interface for test rendering
 *
 * Design Patterns:
 * - Facade Pattern: Simplifies test setup with custom render
 * - Provider Pattern: Wraps components with necessary providers
 * - Factory Pattern: Creates configured test instances
 *
 * Architecture: Provides custom render function that includes all app providers,
 * ensuring components are tested in an environment similar to production
 */

import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'

interface ProvidersProps {
  children: React.ReactNode
}

/**
 * All providers wrapper for testing
 * For unit tests, we skip providers to avoid complex mocking
 * For integration tests, providers can be added as needed
 */
function AllProviders({ children }: ProvidersProps) {
  // For simple unit tests, we don't need all providers
  // This avoids complex mocking of stores and external dependencies
  return <>{children}</>
}

/**
 * Custom render function that wraps components with necessary providers
 */
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// Override render with custom render
export { customRender as render }

/**
 * Creates a mock Zustand store for testing
 * @param initialState Initial state for the store
 */
export function createMockStore<T extends object>(initialState: T) {
  const store = {
    getState: () => initialState,
    setState: jest.fn(),
    subscribe: jest.fn(),
    destroy: jest.fn(),
  }
  return store
}

/**
 * Mock implementation of useRouter from next/navigation
 */
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
}

/**
 * Helper to wait for async operations
 */
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

/**
 * Helper to mock fetch responses
 */
export function mockFetch(data: unknown, status = 200) {
  return jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  })
}
