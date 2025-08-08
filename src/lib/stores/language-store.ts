/**
 * Language Store
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for language state management
 * - OCP: Open for extension with new language features
 * - DIP: Depends on Zustand abstractions
 *
 * Design Patterns:
 * - State Management Pattern: Centralized language state
 * - Observer Pattern: Components subscribe to language changes
 *
 * Architecture: Global language state management using Zustand
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SupportedLanguage = 'en' | 'sv' | 'tr' | 'da' | 'de'

// Extend window interface for i18n and Clerk
declare global {
  interface Window {
    i18n?: {
      changeLanguage: (language: string) => Promise<void>
    }
    Clerk?: {
      setLocale: (locale: string) => Promise<void>
    }
  }
}

interface LanguageStore {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => Promise<void>
  initializeLanguage: () => Promise<void>
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',

      setLanguage: async (language: SupportedLanguage) => {
        set({ language })

        // Update document language attribute
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language
        }

        // Update i18n if available
        if (
          typeof window !== 'undefined' &&
          'i18n' in window &&
          window.i18n &&
          typeof window.i18n === 'object' &&
          'changeLanguage' in window.i18n &&
          typeof window.i18n.changeLanguage === 'function'
        ) {
          await window.i18n.changeLanguage(language)
        }

        // Update Clerk locale if available
        if (
          typeof window !== 'undefined' &&
          'Clerk' in window &&
          window.Clerk &&
          typeof window.Clerk === 'object' &&
          'setLocale' in window.Clerk &&
          typeof window.Clerk.setLocale === 'function'
        ) {
          await window.Clerk.setLocale(language)
        }
      },

      initializeLanguage: async () => {
        const { language, setLanguage } = get()
        await setLanguage(language)
      },
    }),
    {
      name: 'language-storage',
    }
  )
)
