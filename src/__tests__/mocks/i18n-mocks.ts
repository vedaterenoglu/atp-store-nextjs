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
