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

// Polyfill for TextEncoder/TextDecoder (required for some dependencies)
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
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
    default: function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
      // Return an img element with the same props
      return React.createElement('img', props)
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
      args[0].includes('Warning: ReactDOM.render')
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
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
  }

  let languageSubscribers: Array<() => void> = []
  let themeSubscribers: Array<() => void> = []

  const useLanguageStore = Object.assign(
    jest.fn(() => mockLanguageStore),
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
        useLanguageStore.mockReturnValue(mockLanguageStore)
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
    jest.fn(() => mockThemeStore),
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
        useThemeStore.mockReturnValue(mockThemeStore)
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

  // Initialize with default values
  useLanguageStore.mockReturnValue(mockLanguageStore)
  useThemeStore.mockReturnValue(mockThemeStore)

  return {
    useLanguageStore,
    useThemeStore,
  }
})
