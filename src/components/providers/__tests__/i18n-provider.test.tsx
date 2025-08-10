/**
 * Unit tests for I18nProvider Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on i18n provider behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { renderWithProviders, screen, waitFor } from '@/__tests__/utils'
import { I18nProvider } from '../i18n-provider'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18next-provider">{children}</div>
  ),
}))

// Mock I18nLoading component
jest.mock('../i18n-loading', () => ({
  I18nLoading: () => (
    <div data-testid="i18n-loading">Initializing Language Settings</div>
  ),
}))

// Mock i18n module using factory function
jest.mock('@/lib/i18n', () => ({
  default: {
    language: 'en',
    changeLanguage: jest.fn(),
    isInitialized: false,
  },
  initI18n: jest.fn(),
}))

// Mock language store
jest.mock('@/lib/stores', () => ({
  useLanguageStore: jest.fn(),
}))

describe('I18nProvider', () => {
  const mockChildren = <div data-testid="children">Test Content</div>

  let mockI18n: {
    language: string
    changeLanguage: jest.Mock
    isInitialized: boolean
  }
  let mockInitI18n: jest.Mock
  let mockUseLanguageStore: jest.Mock

  beforeAll(() => {
    // Access mocks after they're created
    const i18nModule = jest.requireMock('@/lib/i18n')
    const storeModule = jest.requireMock('@/lib/stores')

    mockI18n = i18nModule.default
    mockInitI18n = i18nModule.initI18n
    mockUseLanguageStore = storeModule.useLanguageStore
  })

  beforeEach(() => {
    jest.clearAllMocks()

    // Reset mock values
    mockI18n.language = 'en'
    mockI18n.isInitialized = false
    mockI18n.changeLanguage.mockResolvedValue(undefined)
    mockInitI18n.mockResolvedValue(undefined)

    mockUseLanguageStore.mockReturnValue({
      language: 'en',
      setLanguage: jest.fn(),
      initializeLanguage: jest.fn(),
    })
  })

  it('should render loading state initially', () => {
    renderWithProviders(<I18nProvider>{mockChildren}</I18nProvider>)

    // Should show loading component, not children
    expect(screen.getByTestId('i18n-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('children')).not.toBeInTheDocument()
  })

  it('should call initI18n when not initialized', async () => {
    renderWithProviders(<I18nProvider>{mockChildren}</I18nProvider>)

    // Should call initI18n
    await waitFor(() => {
      expect(mockInitI18n).toHaveBeenCalledTimes(1)
    })
  })

  it('should render I18nextProvider after initialization completes', async () => {
    mockInitI18n.mockResolvedValue(mockI18n)

    renderWithProviders(<I18nProvider>{mockChildren}</I18nProvider>)

    // Wait for initialization to complete
    await waitFor(() => {
      expect(screen.getByTestId('i18next-provider')).toBeInTheDocument()
      expect(screen.getByTestId('children')).toBeInTheDocument()
    })
  })

  it('should handle already initialized state', async () => {
    // Set isInitialized before clearing mocks
    mockI18n.isInitialized = true
    mockInitI18n.mockResolvedValue(mockI18n)

    renderWithProviders(<I18nProvider>{mockChildren}</I18nProvider>)

    // Should eventually render children
    await waitFor(() => {
      expect(screen.getByTestId('i18next-provider')).toBeInTheDocument()
      expect(screen.getByTestId('children')).toBeInTheDocument()
    })
  })

  it('should pass children through correctly', async () => {
    mockInitI18n.mockResolvedValue(mockI18n)

    const customChildren = (
      <>
        <div>Child 1</div>
        <div>Child 2</div>
      </>
    )

    renderWithProviders(<I18nProvider>{customChildren}</I18nProvider>)

    // Wait for initialization to complete
    await waitFor(() => {
      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 2')).toBeInTheDocument()
    })
  })
})
