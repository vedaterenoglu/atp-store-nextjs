/**
 * i18next Configuration
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for internationalization setup
 * - OCP: Open for extension with additional languages/namespaces
 * - DIP: Depends on i18next abstractions, not concrete implementations
 *
 * Design Patterns:
 * - Configuration Pattern: Centralized i18n configuration
 * - Adapter Pattern: Language detection integration
 * - Module Pattern: Encapsulated translation resources
 *
 * Architecture: Centralized i18n configuration with automatic language detection
 * and namespace-based translation organization for English, Swedish, and Turkish
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

// Import translation files
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enValidation from './locales/en/validation.json'
import enCategories from './locales/en/categories.json'
import enProducts from './locales/en/products.json'

import svCommon from './locales/sv/common.json'
import svAuth from './locales/sv/auth.json'
import svValidation from './locales/sv/validation.json'
import svCategories from './locales/sv/categories.json'
import svProducts from './locales/sv/products.json'

import trCommon from './locales/tr/common.json'
import trAuth from './locales/tr/auth.json'
import trValidation from './locales/tr/validation.json'
import trCategories from './locales/tr/categories.json'
import trProducts from './locales/tr/products.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    validation: enValidation,
    categories: enCategories,
    products: enProducts,
  },
  sv: {
    common: svCommon,
    auth: svAuth,
    validation: svValidation,
    categories: svCategories,
    products: svProducts,
  },
  tr: {
    common: trCommon,
    auth: trAuth,
    validation: trValidation,
    categories: trCategories,
    products: trProducts,
  },
} as const

// Helper function to get stored language
export function getStoredLanguage(): string {
  if (typeof window === 'undefined') return 'sv' // SSR fallback

  try {
    const stored = localStorage.getItem('language-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      const lang = parsed?.state?.language
      if (lang && ['en', 'sv', 'tr'].includes(lang)) {
        return lang
      }
    }
  } catch {
    // Silently handle error
  }

  return 'sv' // Fallback to Swedish
}

// Don't initialize immediately - will be done by I18nInitializer
export const initI18n = async () => {
  const initialLanguage = getStoredLanguage()

  await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: initialLanguage, // Use stored language or Swedish fallback
      fallbackLng: 'sv', // Fallback to Swedish
      defaultNS,
      ns: ['common', 'auth', 'validation', 'categories', 'products'],
      resources,

      interpolation: {
        escapeValue: false, // React already does escaping
      },

      react: {
        useSuspense: false, // We'll handle loading states manually
      },

      debug: false, // Disable debug in production
    })

  return i18n
}

export default i18n
