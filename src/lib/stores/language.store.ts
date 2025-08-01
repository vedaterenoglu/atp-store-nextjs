/**
 * Language Preference Store
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for language state management
 * - OCP: Open for extension with additional language features
 * - DIP: Depends on Zustand abstraction and i18next interface
 *
 * Design Patterns:
 * - Observer Pattern: Components subscribe to language changes via Zustand
 * - Adapter Pattern: Integrates with i18next for language switching
 * - State Pattern: Manages language state transitions
 *
 * Architecture: Zustand store that manages language preferences with i18next
 * integration and localStorage persistence for English, Swedish, and Turkish
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { i18n } from '@/lib/i18n'

export type SupportedLanguage = 'en' | 'sv' | 'tr'

interface LanguageStore {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => Promise<void>
  getAvailableLanguages: () => readonly SupportedLanguage[]
  isLoading: boolean
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    set => ({
      language: 'en',
      isLoading: false,

      setLanguage: async (language: SupportedLanguage) => {
        set({ isLoading: true })
        try {
          // Update i18next language
          await i18n.changeLanguage(language)

          // Update store state
          set({ language, isLoading: false })

          // Update document lang attribute
          document.documentElement.lang = language
        } catch (error) {
          console.error('Failed to change language:', error)
          set({ isLoading: false })
          throw error
        }
      },

      getAvailableLanguages: () => ['en', 'sv', 'tr'] as const,
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ language: state.language }),
      onRehydrateStorage: () => state => {
        // Apply stored language on rehydration
        if (state?.language) {
          i18n.changeLanguage(state.language)
          document.documentElement.lang = state.language
        }
      },
    }
  )
)
