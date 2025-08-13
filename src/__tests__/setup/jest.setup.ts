/**
 * Jest Setup File - CLEAN VERSION
 *
 * This file contains ONLY essential polyfills and browser API mocks.
 * All component mocks should be defined inline in individual test files.
 */

import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import React from 'react'

// Load test environment variables
import dotenv from 'dotenv'
import path from 'path'

// Load .env.test file
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

// Configure Clerk for test environment
process.env['CLERK_TESTING'] = 'true'
process.env['CLERK_API_URL'] = 'https://api.clerk.dev'
process.env['CLERK_FRONTEND_API'] =
  'https://charmed-primate-18.clerk.accounts.dev'

// ============================================
// POLYFILLS AND BROWSER API MOCKS ONLY
// ============================================

// Polyfill for TextEncoder/TextDecoder (required for some dependencies)
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder

// Add fetch polyfills for MSW in Node.js environment
import * as nodeFetch from 'node-fetch'
;(() => {
  if (!globalThis.fetch) {
    globalThis.fetch = nodeFetch.default as unknown as typeof globalThis.fetch
    globalThis.Headers =
      nodeFetch.Headers as unknown as typeof globalThis.Headers
    globalThis.Request =
      nodeFetch.Request as unknown as typeof globalThis.Request
    globalThis.Response =
      nodeFetch.Response as unknown as typeof globalThis.Response
  }

  // Also set on global object for compatibility
  global.fetch = globalThis.fetch
  global.Headers = globalThis.Headers
  global.Request = globalThis.Request
  global.Response = globalThis.Response

  // Add TransformStream polyfill for MSW
  if (!globalThis.TransformStream) {
    // @ts-expect-error - Basic mock implementation for testing
    globalThis.TransformStream = class TransformStream {
      constructor() {
        // Basic mock implementation
      }
    }
  }

  // Add BroadcastChannel polyfill for MSW
  if (!globalThis.BroadcastChannel) {
    // @ts-expect-error - Basic mock implementation for testing
    globalThis.BroadcastChannel = class BroadcastChannel {
      constructor() {
        // Basic mock implementation
      }
      postMessage() {}
      close() {}
    }
  }
})()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => {
    const listeners: Array<() => void> = []
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(callback => {
        listeners.push(callback)
      }),
      removeListener: jest.fn(callback => {
        const index = listeners.indexOf(callback)
        if (index > -1) listeners.splice(index, 1)
      }),
      addEventListener: jest.fn((event, callback) => {
        if (event === 'change') listeners.push(callback)
      }),
      removeEventListener: jest.fn((event, callback) => {
        if (event === 'change') {
          const index = listeners.indexOf(callback)
          if (index > -1) listeners.splice(index, 1)
        }
      }),
      dispatchEvent: jest.fn(),
    }
  }),
})

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor() {}

  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
}
global.localStorage = localStorageMock as unknown as Storage

// ============================================
// EXTERNAL PACKAGE MOCKS ONLY
// ============================================

// Mock Next.js navigation (external package)
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js Image component (external package)
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: function Image(
      props: React.ImgHTMLAttributes<HTMLImageElement> & {
        priority?: boolean
        fill?: boolean
        sizes?: string
      }
    ) {
      // Filter out Next.js specific props
      const { priority, fill, sizes, ...imgProps } = props
      // Return an img element with data attributes for testing
      return React.createElement('img', {
        ...imgProps,
        'data-priority': priority,
        'data-fill': fill,
        'data-sizes': sizes,
        'data-testid': 'product-image',
      })
    },
  }
})

// Mock next/dynamic (external package)
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: jest.fn(() => {
    const MockComponent = () =>
      React.createElement('div', null, 'Mock Component')
    MockComponent.displayName = 'MockComponent'
    return MockComponent
  }),
}))

// ============================================
// MSW SERVER SETUP
// ============================================

import type { SetupServerApi } from 'msw/node'

let server: SetupServerApi

beforeAll(async () => {
  // Dynamic import to ensure polyfills are ready
  const { server: mswServer } = await import('../mocks/server')
  server = mswServer

  server.listen({
    onUnhandledRequest: 'warn' as const,
  })
})

afterEach(() => {
  if (server) {
    server.resetHandlers()
  }
})

afterAll(() => {
  if (server) {
    server.close()
  }
})

// ============================================
// TEST LIFECYCLE HOOKS
// ============================================

// Suppress specific console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('not wrapped in act'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
})
