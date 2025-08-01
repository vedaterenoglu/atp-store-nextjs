/**
 * I18n Provider Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for i18n initialization and context
 * - OCP: Open for extension with additional i18n features
 * - DIP: Depends on i18n abstractions
 *
 * Design Patterns:
 * - Provider Pattern: Provides i18n context to children
 * - Initialization Pattern: Ensures proper i18n setup
 * - Loading State Pattern: Shows loading during initialization
 *
 * Architecture: Client-side provider that initializes i18n with stored
 * language preference and provides context to all child components
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
