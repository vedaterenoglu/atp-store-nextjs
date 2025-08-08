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
import enFavorites from './locales/en/favorites.json'
import enAboutUs from './locales/en/aboutUs.json'
import enCampaign from './locales/en/campaign.json'
import enCart from './locales/en/cart.json'
import enAdmin from '../../../public/locales/en/admin.json'

import svCommon from './locales/sv/common.json'
import svAuth from './locales/sv/auth.json'
import svValidation from './locales/sv/validation.json'
import svCategories from './locales/sv/categories.json'
import svProducts from './locales/sv/products.json'
import svFavorites from './locales/sv/favorites.json'
import svAboutUs from './locales/sv/aboutUs.json'
import svCampaign from './locales/sv/campaign.json'
import svCart from './locales/sv/cart.json'
import svAdmin from '../../../public/locales/sv/admin.json'

import trCommon from './locales/tr/common.json'
import trAuth from './locales/tr/auth.json'
import trValidation from './locales/tr/validation.json'
import trCategories from './locales/tr/categories.json'
import trProducts from './locales/tr/products.json'
import trFavorites from './locales/tr/favorites.json'
import trAboutUs from './locales/tr/aboutUs.json'
import trCampaign from './locales/tr/campaign.json'
import trCart from './locales/tr/cart.json'
import trAdmin from '../../../public/locales/tr/admin.json'

import daCommon from './locales/da/common.json'
import daAuth from './locales/da/auth.json'
import daValidation from './locales/da/validation.json'
import daCategories from './locales/da/categories.json'
import daProducts from './locales/da/products.json'
import daFavorites from './locales/da/favorites.json'
import daAboutUs from './locales/da/aboutUs.json'
import daCampaign from './locales/da/campaign.json'
import daCart from './locales/da/cart.json'
import daAdmin from '../../../public/locales/da/admin.json'

import deCommon from './locales/de/common.json'
import deAuth from './locales/de/auth.json'
import deValidation from './locales/de/validation.json'
import deCategories from './locales/de/categories.json'
import deProducts from './locales/de/products.json'
import deFavorites from './locales/de/favorites.json'
import deAboutUs from './locales/de/aboutUs.json'
import deCampaign from './locales/de/campaign.json'
import deCart from './locales/de/cart.json'
import deAdmin from '../../../public/locales/de/admin.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    validation: enValidation,
    categories: enCategories,
    products: enProducts,
    favorites: enFavorites,
    aboutUs: enAboutUs,
    campaign: enCampaign,
    cart: enCart,
    admin: enAdmin,
  },
  sv: {
    common: svCommon,
    auth: svAuth,
    validation: svValidation,
    categories: svCategories,
    products: svProducts,
    favorites: svFavorites,
    aboutUs: svAboutUs,
    campaign: svCampaign,
    cart: svCart,
    admin: svAdmin,
  },
  tr: {
    common: trCommon,
    auth: trAuth,
    validation: trValidation,
    categories: trCategories,
    products: trProducts,
    favorites: trFavorites,
    aboutUs: trAboutUs,
    campaign: trCampaign,
    cart: trCart,
    admin: trAdmin,
  },
  da: {
    common: daCommon,
    auth: daAuth,
    validation: daValidation,
    categories: daCategories,
    products: daProducts,
    favorites: daFavorites,
    aboutUs: daAboutUs,
    campaign: daCampaign,
    cart: daCart,
    admin: daAdmin,
  },
  de: {
    common: deCommon,
    auth: deAuth,
    validation: deValidation,
    categories: deCategories,
    products: deProducts,
    favorites: deFavorites,
    aboutUs: deAboutUs,
    campaign: deCampaign,
    cart: deCart,
    admin: deAdmin,
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
      if (lang && ['en', 'sv', 'tr', 'da', 'de'].includes(lang)) {
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
      ns: [
        'common',
        'auth',
        'validation',
        'categories',
        'products',
        'favorites',
        'aboutUs',
        'campaign',
        'cart',
        'admin',
      ],
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
