/**
 * Fetch Mock Utilities - Mock fetch for API route testing
 * SOLID Principles: SRP - Single responsibility for fetch mocking
 * Design Patterns: Mock Pattern, Builder Pattern
 * Dependencies: None
 */

import React from 'react'

/**
 * Response builder for mock fetch
 */
export class MockResponse {
  private data: unknown
  private status: number
  public statusText: string
  public headers: Record<string, string>

  constructor(data: unknown, init?: ResponseInit) {
    this.data = data
    this.status = init?.status || 200
    this.statusText = init?.statusText || 'OK'
    this.headers = (init?.headers as Record<string, string>) || {}
  }

  async json() {
    return this.data
  }

  async text() {
    return JSON.stringify(this.data)
  }

  get ok() {
    return this.status >= 200 && this.status < 300
  }
}

/**
 * Sequence response configuration
 */
export interface SequenceResponse {
  type: 'success' | 'error' | 'reject'
  data?: unknown
  error?: string
  status?: number
}

/**
 * Mock fetch function builder
 */
export class FetchMockBuilder {
  private mocks: Map<string, MockResponse> = new Map()
  private defaultResponse: MockResponse | null = null

  /**
   * Add a mock response for a specific URL pattern
   */
  mockRoute(urlPattern: string | RegExp, data: unknown, init?: ResponseInit) {
    const key = urlPattern instanceof RegExp ? urlPattern.source : urlPattern
    this.mocks.set(key, new MockResponse(data, init))
    return this
  }

  /**
   * Mock a successful API response
   */
  mockSuccess(urlPattern: string | RegExp, data: unknown) {
    return this.mockRoute(urlPattern, data, { status: 200 })
  }

  /**
   * Mock an error response
   */
  mockError(
    urlPattern: string | RegExp,
    message = 'Internal Server Error',
    status = 500
  ) {
    return this.mockRoute(
      urlPattern,
      { error: message },
      { status, statusText: message }
    )
  }

  /**
   * Set default response for unmatched URLs
   */
  mockDefault(data: unknown, init?: ResponseInit) {
    this.defaultResponse = new MockResponse(data, init)
    return this
  }

  /**
   * Mock different responses based on call sequence
   * Useful for testing partial failures and retry logic
   */
  mockSequence(sequences: SequenceResponse[]): jest.Mock {
    let callCount = 0
    return jest.fn(async () => {
      const sequence = sequences[callCount % sequences.length]
      callCount++

      if (!sequence) {
        return new MockResponse(
          { error: 'No sequence defined' },
          { status: 500, statusText: 'Internal Server Error' }
        )
      }

      if (sequence.type === 'reject') {
        return Promise.reject(new Error(sequence.error || 'Network error'))
      }

      if (sequence.type === 'error') {
        return new MockResponse(
          { error: sequence.error || 'Internal Server Error' },
          {
            status: sequence.status || 500,
            statusText: sequence.error || 'Internal Server Error',
          }
        )
      }

      // Success response
      return new MockResponse(sequence.data, { status: sequence.status || 200 })
    })
  }

  /**
   * Build the mock fetch function
   */
  build(): jest.Mock {
    return jest.fn(async (url: string) => {
      // Check each mock pattern
      for (const [pattern, response] of this.mocks.entries()) {
        if (url.includes(pattern) || new RegExp(pattern).test(url)) {
          return response
        }
      }

      // Return default if no match
      if (this.defaultResponse) {
        return this.defaultResponse
      }

      // Default 404 response
      return new MockResponse(
        { error: 'Not Found' },
        { status: 404, statusText: 'Not Found' }
      )
    })
  }
}

/**
 * Create a simple mock fetch for single endpoint
 */
export function mockFetch(data: unknown, init?: ResponseInit): jest.Mock {
  return jest.fn(async () => new MockResponse(data, init))
}

/**
 * Create mock fetch for API routes with real mock data
 */
export function mockApiRoutes() {
  // Use synchronous import for mock data
  const { mockApiResponses } = require('../mocks/api-mocks')

  return new FetchMockBuilder()
    .mockSuccess('/api/categories', mockApiResponses.categories)
    .mockSuccess('/api/products', mockApiResponses.products)
    .mockSuccess('/api/campaign', mockApiResponses.campaign)
    .mockSuccess('/api/most-purchased', mockApiResponses.mostPurchased)
    .mockSuccess('/api/bookmarks', mockApiResponses.bookmarks)
    .mockSuccess('/api/price', mockApiResponses.price)
    .mockSuccess('/api/cart', mockApiResponses.cart)
    .build()
}

/**
 * Setup global fetch mock
 */
export function setupFetchMock() {
  const fetchMock = mockApiRoutes()
  global.fetch = fetchMock as any
  return fetchMock
}

/**
 * Restore original fetch
 */
export function restoreFetch() {
  if ('fetch' in global) {
    delete (global as any).fetch
  }
}

/**
 * Create a mock callback function for testing
 * Centralized mock for callback functions to avoid inline jest.fn()
 */
export function createMockCallback<T = unknown>(): jest.Mock<void, [T]> {
  return jest.fn<void, [T]>()
}

/**
 * Create a mock async callback function for testing
 */
export function createMockAsyncCallback<T = unknown, R = void>(): jest.Mock<
  Promise<R>,
  [T]
> {
  return jest.fn<Promise<R>, [T]>()
}

/**
 * Create a mock React component
 * Centralized mock for React components to avoid inline jest.fn()
 */
export function createMockComponent(
  _componentName: string,
  testId?: string
): jest.Mock {
  return jest.fn(() => {
    if (testId) {
      return React.createElement('div', { 'data-testid': testId })
    }
    return null
  })
}

/**
 * Create a mock service function that returns a promise
 * Centralized mock for async service functions
 */
export function createMockServiceFunction<T = unknown>(
  defaultValue: T
): jest.Mock<Promise<T>, []> {
  return jest.fn<Promise<T>, []>().mockResolvedValue(defaultValue)
}

/**
 * Create component mocks for common patterns
 */
export const componentMocks = {
  createDefaultExport: (componentName: string, testId?: string) => ({
    __esModule: true,
    default: createMockComponent(componentName, testId),
  }),
  createNamedExport: (componentName: string, testId?: string) => ({
    [componentName]: createMockComponent(componentName, testId),
  }),
}

/**
 * Create a mock font function that returns font config
 */
export function createMockFont(variable: string, className: string): jest.Mock {
  return jest.fn(() => ({
    variable,
    className,
  }))
}

/**
 * Create a mock provider component that wraps children
 */
export function createMockProvider(testId: string): jest.Mock {
  return jest.fn(({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': testId }, children)
  )
}

/**
 * Create a mock component that returns null
 */
export function createMockNullComponent(): jest.Mock {
  return jest.fn(() => null)
}

/**
 * Create a mock component with custom render function
 */
export function createMockComponentWithRender(
  renderFn: (props: Record<string, unknown>) => React.ReactElement
): jest.Mock {
  return jest.fn(renderFn)
}

/**
 * Create a mock console method
 */
export function createMockConsoleMethod(): jest.Mock {
  return jest.fn()
}
