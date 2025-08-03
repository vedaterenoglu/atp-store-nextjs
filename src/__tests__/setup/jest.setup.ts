/**
 * Jest Setup File
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for test environment setup
 * - OCP: Open for extension with additional global setup
 * - DIP: Depends on testing library abstractions
 *
 * Design Patterns:
 * - Initialization Pattern: Global test environment initialization
 * - Adapter Pattern: Adapts testing libraries to Jest environment
 *
 * Architecture: Configures global test environment including custom matchers,
 * mocks, and polyfills required for testing Next.js applications
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
// Clerk needs these to work in test mode
process.env['CLERK_TESTING'] = 'true'
process.env['CLERK_API_URL'] = 'https://api.clerk.dev'
process.env['CLERK_FRONTEND_API'] =
  'https://charmed-primate-18.clerk.accounts.dev'

// Polyfill for TextEncoder/TextDecoder (required for some dependencies)
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder

// Add fetch polyfills for MSW in Node.js environment BEFORE any imports
// Import node-fetch and set up polyfills immediately
import * as nodeFetch from 'node-fetch'

// Set up polyfills synchronously
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
      }), // deprecated but still used by some libraries
      removeListener: jest.fn(callback => {
        const index = listeners.indexOf(callback)
        if (index > -1) listeners.splice(index, 1)
      }), // deprecated but still used by some libraries
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

// Mock Next.js router
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

// Mock Next.js Image component
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: function Image(
      props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }
    ) {
      // Filter out Next.js specific props
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { priority, ...imgProps } = props
      // Return an img element with only valid HTML props
      return React.createElement('img', imgProps)
    },
  }
})

// Mock next/dynamic component
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: jest.fn(
    (
      importFn: () => Promise<unknown>,
      options?: { ssr?: boolean; loading?: () => React.JSX.Element }
    ) => {
      // Return different components based on the import
      const importStr = importFn.toString()

      if (importStr.includes('hero-section')) {
        // Return a component that simulates loading behavior
        return function MockHeroSection() {
          const [isLoading, setIsLoading] = React.useState(true)

          React.useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 0)
            return () => clearTimeout(timer)
          }, [])

          if (isLoading && options?.loading) {
            return React.createElement(React.Fragment, null, options.loading())
          }

          return React.createElement(
            'div',
            { 'data-testid': 'hero-section' },
            'Hero Section'
          )
        }
      }

      if (importStr.includes('features-section')) {
        // Return a component that simulates loading behavior
        return function MockFeaturesSection() {
          const [isLoading, setIsLoading] = React.useState(true)

          React.useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 0)
            return () => clearTimeout(timer)
          }, [])

          if (isLoading && options?.loading) {
            return React.createElement(React.Fragment, null, options.loading())
          }

          return React.createElement(
            'div',
            { 'data-testid': 'features-section' },
            'Features Section'
          )
        }
      }

      // Default mock component
      const MockComponent = () =>
        React.createElement('div', null, 'Mock Component')
      MockComponent.displayName = 'MockComponent'
      return MockComponent
    }
  ),
}))

// Mock Radix UI components that use portals
jest.mock('@radix-ui/react-dropdown-menu', () => {
  return {
    Root: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement(
        'div',
        { 'data-testid': 'dropdown-root', ...props },
        children
      ),
    Trigger: ({
      children,
      asChild,
      ...props
    }: React.PropsWithChildren<
      React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
    >) => {
      if (asChild && React.isValidElement(children)) {
        const childProps = {
          'data-testid': 'dropdown-trigger',
          ...props,
        }
        return React.cloneElement(
          children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
          childProps as React.HTMLAttributes<HTMLElement>
        )
      }
      return React.createElement(
        'button',
        { 'data-testid': 'dropdown-trigger', ...props },
        children
      )
    },
    Portal: ({ children }: React.PropsWithChildren) => children,
    Content: ({
      children,
      sideOffset: _sideOffset,
      ...props
    }: React.PropsWithChildren<
      React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number }
    >) => {
      void _sideOffset // Intentionally unused - excluded from DOM props
      return React.createElement(
        'div',
        { 'data-testid': 'dropdown-content', role: 'menu', ...props },
        children
      )
    },
    Item: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { role: 'menuitem', ...props }, children),
    CheckboxItem: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement(
        'div',
        { role: 'menuitemcheckbox', ...props },
        children
      ),
    RadioItem: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { role: 'menuitemradio', ...props }, children),
    Label: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { ...props }, children),
    Separator: (props: React.HTMLAttributes<HTMLHRElement>) =>
      React.createElement('hr', { ...props }),
    Group: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { role: 'group', ...props }, children),
    Sub: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement(
        'div',
        { 'data-testid': 'dropdown-sub', ...props },
        children
      ),
    SubContent: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { role: 'menu', ...props }, children),
    SubTrigger: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { role: 'menuitem', ...props }, children),
    RadioGroup: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) =>
      React.createElement('div', { role: 'radiogroup', ...props }, children),
  }
})

// Suppress console errors in tests (optional - can be removed if you want to see errors)
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

// Import the server type from MSW
import type { SetupServerApi } from 'msw/node'

// Setup MSW server after polyfills are ready using dynamic import
let server: SetupServerApi

beforeAll(async () => {
  // Dynamic import to ensure polyfills are ready
  const { server: mswServer } = await import('../mocks/server')
  server = mswServer

  server.listen({
    onUnhandledRequest: 'warn' as const, // Warn on unhandled requests during tests
  })
})

// Reset handlers after each test
afterEach(() => {
  if (server) {
    server.resetHandlers()
  }
})

// Clean up after all tests
afterAll(() => {
  if (server) {
    server.close()
  }
})

// Mock Zustand stores
jest.mock('@/lib/stores', () => {
  let mockLanguageStore = {
    language: 'sv',
    isLoading: false,
    setLanguage: jest.fn(),
    getAvailableLanguages: jest.fn(() => ['en', 'sv', 'tr']),
  }

  let mockThemeStore = {
    theme: 'system',
    resolvedTheme: 'light',
    systemTheme: 'light',
    setTheme: jest.fn(),
    setSystemTheme: jest.fn(),
  }

  let languageSubscribers: Array<() => void> = []
  let themeSubscribers: Array<() => void> = []

  const useLanguageStore = Object.assign(
    jest.fn(selector => {
      if (typeof selector === 'function') {
        return selector(mockLanguageStore)
      }
      return mockLanguageStore
    }),
    {
      setState: jest.fn(updates => {
        mockLanguageStore = {
          ...mockLanguageStore,
          ...(typeof updates === 'function'
            ? updates(mockLanguageStore)
            : updates),
        }
        languageSubscribers.forEach(sub => sub())
        // Update the mock to return new state
        useLanguageStore.mockImplementation(selector => {
          if (typeof selector === 'function') {
            return selector(mockLanguageStore)
          }
          return mockLanguageStore
        })
      }),
      getState: jest.fn(() => mockLanguageStore),
      persist: {
        rehydrate: jest.fn(),
      },
      subscribe: jest.fn(callback => {
        languageSubscribers.push(callback)
        return () => {
          languageSubscribers = languageSubscribers.filter(
            sub => sub !== callback
          )
        }
      }),
    }
  )

  const useThemeStore = Object.assign(
    jest.fn(selector => {
      if (typeof selector === 'function') {
        return selector(mockThemeStore)
      }
      return mockThemeStore
    }),
    {
      setState: jest.fn(updates => {
        mockThemeStore = {
          ...mockThemeStore,
          ...(typeof updates === 'function'
            ? updates(mockThemeStore)
            : updates),
        }
        themeSubscribers.forEach(sub => sub())
        // Update the mock to return new state
        useThemeStore.mockImplementation(selector => {
          if (typeof selector === 'function') {
            return selector(mockThemeStore)
          }
          return mockThemeStore
        })
      }),
      getState: jest.fn(() => mockThemeStore),
      persist: {
        rehydrate: jest.fn(),
      },
      subscribe: jest.fn(callback => {
        themeSubscribers.push(callback)
        return () => {
          themeSubscribers = themeSubscribers.filter(sub => sub !== callback)
        }
      }),
    }
  )

  return {
    useLanguageStore,
    useThemeStore,
  }
})
