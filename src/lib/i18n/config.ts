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
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Import translation files
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enValidation from './locales/en/validation.json'

import svCommon from './locales/sv/common.json'
import svAuth from './locales/sv/auth.json'
import svValidation from './locales/sv/validation.json'

import trCommon from './locales/tr/common.json'
import trAuth from './locales/tr/auth.json'
import trValidation from './locales/tr/validation.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    validation: enValidation,
  },
  sv: {
    common: svCommon,
    auth: svAuth,
    validation: svValidation,
  },
  tr: {
    common: trCommon,
    auth: trAuth,
    validation: trValidation,
  },
} as const

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    defaultNS,
    ns: ['common', 'auth', 'validation'],
    resources,

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    react: {
      useSuspense: false, // We'll handle loading states manually
    },

    debug: process.env.NODE_ENV === 'development',
  })

export default i18n
