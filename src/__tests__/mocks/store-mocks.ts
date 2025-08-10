/**
 * Centralized Store Mocks
 * SOLID Principles: SRP - Single source of truth for Zustand store mocks
 * Design Patterns: Factory Pattern for creating mock instances
 * Dependencies: None - pure mock functions
 */

/**
 * Mock cart count hook
 */
export function mockUseCartCount(count: number = 0): number {
  return count
}

/**
 * Mock cart store
 */
export interface MockCartStore {
  items: Array<{ id: string; quantity: number }>
  isLoading: boolean
  error: string | null
  addItem: jest.MockedFunction<(id: string) => void>
  removeItem: jest.MockedFunction<(id: string) => void>
  updateQuantity: jest.MockedFunction<(id: string, quantity: number) => void>
  clearCart: jest.MockedFunction<() => void>
}

/**
 * Create mock cart store
 */
export function createCartStoreMock(
  overrides?: Partial<MockCartStore>
): MockCartStore {
  return {
    items: [],
    isLoading: false,
    error: null,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    ...overrides,
  }
}

/**
 * Mock theme store
 */
export interface MockThemeStore {
  theme: 'light' | 'dark' | 'system'
  resolvedTheme: 'light' | 'dark'
  systemTheme: 'light' | 'dark'
  setTheme: jest.MockedFunction<(theme: 'light' | 'dark' | 'system') => void>
  setSystemTheme: jest.MockedFunction<(systemTheme: 'light' | 'dark') => void>
  toggleTheme?: jest.MockedFunction<() => void>
}

/**
 * Create mock theme store
 */
export function createThemeStoreMock(
  theme: 'light' | 'dark' | 'system' = 'system',
  resolvedTheme: 'light' | 'dark' = 'light'
): MockThemeStore {
  return {
    theme,
    resolvedTheme,
    systemTheme: 'light',
    setTheme: jest.fn(),
    setSystemTheme: jest.fn(),
    toggleTheme: jest.fn(),
  }
}

/**
 * Mock language store
 */
export interface MockLanguageStore {
  language: 'en' | 'sv' | 'tr' | 'da' | 'de'
  setLanguage: jest.MockedFunction<
    (language: 'en' | 'sv' | 'tr' | 'da' | 'de') => Promise<void>
  >
  isLoading: boolean
  getAvailableLanguages: jest.MockedFunction<
    () => readonly ('en' | 'sv' | 'tr' | 'da' | 'de')[]
  >
}

/**
 * Create mock language store
 */
export function createLanguageStoreMock(
  language: 'en' | 'sv' | 'tr' | 'da' | 'de' = 'en'
): MockLanguageStore {
  return {
    language,
    setLanguage: jest.fn().mockResolvedValue(undefined),
    isLoading: false,
    getAvailableLanguages: jest.fn(
      () => ['en', 'sv', 'tr', 'da', 'de'] as const
    ),
  }
}

/**
 * Mock bookmark store
 */
export interface MockBookmarkStore {
  bookmarks: string[]
  isLoading: boolean
  addBookmark: jest.MockedFunction<(productId: string) => void>
  removeBookmark: jest.MockedFunction<(productId: string) => void>
  isBookmarked: jest.MockedFunction<(productId: string) => boolean>
}

/**
 * Create mock bookmark store
 */
export function createBookmarkStoreMock(
  bookmarks: string[] = []
): MockBookmarkStore {
  return {
    bookmarks,
    isLoading: false,
    addBookmark: jest.fn(),
    removeBookmark: jest.fn(),
    isBookmarked: jest.fn((productId: string) => bookmarks.includes(productId)),
  }
}
