/**
 * Centralized i18n Mocks
 * SOLID Principles: SRP - Single source of truth for i18n mocks
 * Design Patterns: Factory Pattern for creating mock instances
 * Dependencies: None - pure mock functions
 */

/**
 * Default translations for tests
 */
export const defaultTranslations: Record<string, string> = {
  // Navbar tooltips
  'tooltips.navbar.home': 'Go to home page',
  'tooltips.navbar.dashboard': 'Customer dashboard',
  'tooltips.navbar.theme': 'Change theme',
  'tooltips.navbar.language': 'Change language',
  'tooltips.navbar.signIn': 'Sign in to your account',
  'tooltips.navbar.userMenu': 'User menu',
  'tooltips.navbar.admin': 'Admin panel',
  'tooltips.navbar.cart': 'Shopping cart',

  // Actions
  'actions.signIn': 'Sign In',
  'actions.signOut': 'Sign Out',
  'actions.addToCart': 'Add to Cart',
  'actions.removeFromCart': 'Remove from Cart',
  'actions.bookmark': 'Bookmark',
  'actions.unbookmark': 'Remove Bookmark',
  'actions.viewDetails': 'View Details',
  'actions.checkout': 'Checkout',

  // Common
  'common.loading': 'Loading...',
  'common.error': 'Something went wrong',
  'common.noResults': 'No results found',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.sort': 'Sort',

  // Auth messages
  requireSignIn: 'To continue you must sign in',
  insufficientPermissions: 'Insufficient permissions. Please contact support.',

  // Product
  'product.outOfStock': 'Out of Stock',
  'product.inStock': 'In Stock',
  'product.price': 'Price',
  'product.discount': 'Discount',

  // Cart
  'cart.empty': 'Your cart is empty',
  'cart.total': 'Total',
  'cart.subtotal': 'Subtotal',
  'cart.tax': 'Tax',
  'cart.shipping': 'Shipping',

  // Card
  'card.addToCart': 'Add to Cart',

  // Messages
  'messages.noCampaigns': 'No campaigns available',
  'messages.checkBackSoon': 'Please check back soon',
  'messages.viewingDetails': 'Viewing details for {{product}}',
  'messages.addedToCart': '{{count}} item added to cart',
  'messages.addedToCartPlural': '{{count}} items added to cart',

  // Page
  'page.goToAllProducts': 'Go to All Products',
  'page.title': 'Campaign Products',
  'page.description': 'Check out our latest campaign offers',

  // Errors
  'errors.loadFailed': 'Failed to load campaigns',
  'errors.errorMessage': 'Something went wrong. Please try again.',
  'errors.tryAgain': 'Try Again',
}

/**
 * Mock translation function
 */
export interface MockTranslationFunction {
  (key: string, options?: Record<string, unknown>): string
}

/**
 * Mock useTranslation return type
 */
export interface MockUseTranslation {
  t: MockTranslationFunction
  i18n: {
    language: string
    changeLanguage: jest.MockedFunction<(lng: string) => Promise<void>>
  }
  ready: boolean
}

/**
 * Create mock translation function
 */
export function createTranslationMock(
  customTranslations?: Record<string, string>
): MockTranslationFunction {
  const translations = { ...defaultTranslations, ...customTranslations }

  return (key: string, options?: Record<string, unknown>): string => {
    let translation = translations[key] || key

    // Handle interpolation
    if (options) {
      Object.entries(options).forEach(([placeholder, value]) => {
        translation = translation.replace(`{{${placeholder}}}`, String(value))
      })
    }

    return translation
  }
}

/**
 * Create mock useTranslation hook
 */
export function createUseTranslationMock(
  language: string = 'en',
  customTranslations?: Record<string, string>
): MockUseTranslation {
  return {
    t: createTranslationMock(customTranslations),
    i18n: {
      language,
      changeLanguage: jest.fn().mockResolvedValue(undefined),
    },
    ready: true,
  }
}

/**
 * Create mock useSafeTranslation hook
 */
export interface MockUseSafeTranslation {
  t: MockTranslationFunction
  ready: boolean
}

/**
 * Create mock for useSafeTranslation
 */
export function createSafeTranslationMock(
  customTranslations?: Record<string, string>
): MockUseSafeTranslation {
  return {
    t: createTranslationMock(customTranslations),
    ready: true,
  }
}

/**
 * Mock for loading state
 */
export function createTranslationLoadingMock(): MockUseTranslation {
  return {
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn().mockResolvedValue(undefined),
    },
    ready: false,
  }
}

// Export centralized mock object for jest.setup.ts
export const i18nMocks = {
  reactI18next: {
    useTranslation: jest.fn(() => ({
      t: (key: string, options?: Record<string, unknown>) => {
        let translation = defaultTranslations[key] || key

        // Handle interpolation
        if (options) {
          Object.entries(options).forEach(([placeholder, value]) => {
            translation = translation.replace(
              `{{${placeholder}}}`,
              String(value)
            )
          })
        }

        return translation
      },
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(() => Promise.resolve()),
      },
      ready: true,
    })),
    Trans: ({ children }: { children?: React.ReactNode }) => children,
    initReactI18next: {
      type: '3rdParty',
      init: jest.fn(),
    },
    withTranslation: () => (Component: React.ComponentType) => Component,
  },
  i18next: {
    init: jest.fn(() => Promise.resolve()),
    use: jest.fn(function () {
      return this
    }),
    changeLanguage: jest.fn(() => Promise.resolve()),
    language: 'en',
    languages: ['en', 'sv', 'tr', 'da', 'de'],
    exists: jest.fn(() => true),
    getFixedT: jest.fn(() => (key: string) => key),
    hasResourceBundle: jest.fn(() => true),
    addResourceBundle: jest.fn(),
    t: (key: string) => key,
    dir: jest.fn(() => 'ltr'),
    isInitialized: true,
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}
