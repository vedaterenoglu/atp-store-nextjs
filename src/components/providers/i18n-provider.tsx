/**
 * I18nProvider - Internationalization context provider with language persistence
 *
 * Features:
 * - Initializes i18n with user's stored language preference
 * - Displays professional loading state during initialization
 * - Automatically updates language when store changes
 * - Prevents hook order issues by not rendering children until ready
 *
 * Props: Children components to wrap
 * State: Initialization status tracked locally
 */
'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, { initI18n } from '@/lib/i18n'
import { useLanguageStore } from '@/lib/stores'
import { I18nLoading } from './i18n-loading'

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [i18nInstance, setI18nInstance] = useState<typeof i18n | null>(null)
  const { language } = useLanguageStore()

  // Initial initialization - only runs once
  useEffect(() => {
    const initialize = async () => {
      try {
        if (!i18n.isInitialized) {
          const initializedI18n = await initI18n()
          setI18nInstance(initializedI18n)
          setIsInitialized(true)
        } else {
          // Already initialized from a previous mount
          setI18nInstance(i18n)
          setIsInitialized(true)
        }
      } catch (error) {
        console.error('Failed to initialize i18n:', error)
        // Fallback - still set initialized to prevent infinite loading
        setI18nInstance(i18n)
        setIsInitialized(true)
      }
    }

    initialize()
  }, []) // Empty dependency - only run once on mount

  // Language change handler - separate from initialization
  useEffect(() => {
    if (isInitialized && i18nInstance && i18nInstance.language !== language) {
      // Change language without showing loading screen
      i18nInstance.changeLanguage(language).catch(error => {
        console.error('Failed to change language:', error)
      })
    }
  }, [language, isInitialized, i18nInstance])

  if (!isInitialized || !i18nInstance) {
    // Only show loading on first initialization, never on language changes
    return <I18nLoading />
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
