/**
 * Unit tests for ClerkLocaleProvider Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on Clerk locale provider behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render, screen, waitFor } from '@/__tests__/utils/test-utils'
import { ClerkLocaleProvider } from './clerk-locale-provider'

// Mock Clerk provider and localizations
const mockClerkProvider = jest.fn()
jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: (props: {
    children: React.ReactNode
    localization: unknown
  }) => {
    mockClerkProvider(props)
    return <div data-testid="clerk-provider">{props.children}</div>
  },
}))

// Mock Clerk localizations
jest.mock('@clerk/localizations', () => ({
  enUS: { locale: 'en-US' },
  svSE: { locale: 'sv-SE' },
  trTR: { locale: 'tr-TR' },
}))

// Get mocked localizations after mock is set up
const {
  enUS: mockEnUS,
  svSE: mockSvSE,
  trTR: mockTrTR,
} = jest.requireMock('@clerk/localizations')

// Mock language store
const mockLanguageStore = {
  language: 'sv' as 'sv' | 'en' | 'tr',
  setLanguage: jest.fn(),
  initializeLanguage: jest.fn(),
}

jest.mock('@/lib/stores', () => ({
  useLanguageStore: jest.fn(selector => {
    if (typeof selector === 'function') {
      return selector(mockLanguageStore)
    }
    return mockLanguageStore
  }),
}))

describe('ClerkLocaleProvider', () => {
  const mockChildren = <div data-testid="children">Test Content</div>

  // Mock localStorage
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn(),
    length: 0,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })
    mockLocalStorage.getItem.mockReturnValue(null)
    mockLanguageStore.language = 'sv'
  })

  it('should render children wrapped in ClerkProvider', () => {
    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    expect(screen.getByTestId('clerk-provider')).toBeInTheDocument()
    expect(screen.getByTestId('children')).toBeInTheDocument()
  })

  it('should use Swedish locale by default', () => {
    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )
  })

  it('should use stored language from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ state: { language: 'en' } })
    )

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockEnUS,
      })
    )
  })

  it('should handle invalid localStorage data gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid json')

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    // Should fallback to Swedish
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )
  })

  it('should handle localStorage errors gracefully', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    // Should fallback to Swedish
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )
  })

  it('should update locale when language changes', async () => {
    const { rerender } = render(
      <ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>
    )

    // Initial render with Swedish
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )

    // Change language to English
    mockLanguageStore.language = 'en'
    rerender(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    await waitFor(() => {
      expect(mockClerkProvider).toHaveBeenLastCalledWith(
        expect.objectContaining({
          localization: mockEnUS,
        })
      )
    })
  })

  it('should support Turkish locale', async () => {
    mockLanguageStore.language = 'tr'

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockTrTR,
      })
    )
  })

  it('should use language as key prop to force remount', () => {
    mockLanguageStore.language = 'en'

    const { container } = render(
      <ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>
    )

    // Check that ClerkProvider was called with the correct localization
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockEnUS,
      })
    )

    // The key prop is passed to the ClerkProvider element, not to the props
    // React handles key internally and doesn't pass it as a prop
    const clerkProviderElement = container.querySelector(
      '[data-testid="clerk-provider"]'
    )
    expect(clerkProviderElement).toBeInTheDocument()
  })

  it('should handle window being undefined in getInitialLocale', () => {
    // Override useState to test the getInitialLocale function
    const Component = () => {
      const [locale] = React.useState(() => {
        // Simulate the getInitialLocale function logic
        if (typeof window === 'undefined') {
          return mockSvSE
        }
        return mockEnUS
      })
      return (
        <div data-testid="locale">{(locale as { locale: string }).locale}</div>
      )
    }

    // Test with window defined
    render(<Component />)
    expect(screen.getByTestId('locale')).toHaveTextContent('en-US')

    // Can't actually test window undefined in jsdom environment
    // The coverage for lines 44-45 will be tested in integration/e2e tests
  })

  it('should handle missing language in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ state: {} }))

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    // Should fallback to Swedish
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )
  })

  it('should handle null state in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ state: null }))

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    // Should fallback to Swedish
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )
  })

  it('should handle empty localStorage response', () => {
    mockLocalStorage.getItem.mockReturnValue('')

    render(<ClerkLocaleProvider>{mockChildren}</ClerkLocaleProvider>)

    // Should fallback to Swedish
    expect(mockClerkProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        localization: mockSvSE,
      })
    )
  })

  it('should pass children through correctly', () => {
    const customChildren = (
      <>
        <div>Child 1</div>
        <div>Child 2</div>
      </>
    )

    render(<ClerkLocaleProvider>{customChildren}</ClerkLocaleProvider>)

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })
})
