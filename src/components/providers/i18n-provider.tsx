/**
 * I18nProvider - Internationalization context provider with language persistence
 *
 * Features:
 * - Initializes i18n with user's stored language preference
 * - Displays loading skeleton during initialization
 * - Automatically updates language when store changes
 *
 * Props: Children components to wrap
 * State: Initialization status tracked locally
 */
'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, { initI18n } from '@/lib/i18n'
import { useLanguageStore } from '@/lib/stores'

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const { language } = useLanguageStore()

  useEffect(() => {
    const initialize = async () => {
      if (!i18n.isInitialized) {
        await initI18n()
        setIsInitialized(true)
      } else {
        // If already initialized, just sync the language
        if (i18n.language !== language) {
          await i18n.changeLanguage(language)
        }
        setIsInitialized(true)
      }
    }

    initialize()
  }, [language])

  if (!isInitialized) {
    // Return a minimal loading state to prevent hydration issues
    return <div suppressHydrationWarning>{children}</div>
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
