/**
 * I18n Initializer Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for initializing i18n on client side
 * - OCP: Open for extension with additional initialization logic
 * - DIP: Depends on i18n abstraction
 *
 * Design Patterns:
 * - Initialization Pattern: Ensures i18n is properly initialized
 * - Client Component Pattern: Runs only on client side
 *
 * Architecture: Client-side component that initializes i18n configuration
 */
'use client'

import { useEffect, useState } from 'react'
import { initI18n } from '@/lib/i18n'
import { useLanguageStore } from '@/lib/stores'

export function I18nInitializer() {
  const [initialized, setInitialized] = useState(false)
  const { language } = useLanguageStore()

  useEffect(() => {
    const initialize = async () => {
      if (!initialized) {
        await initI18n()
        setInitialized(true)
      }
    }

    initialize()
  }, [initialized])

  // After initialization, sync with language store
  useEffect(() => {
    if (initialized && language) {
      import('@/lib/i18n')
        .then(({ default: i18n }) => {
          if (i18n && i18n.language !== language) {
            i18n.changeLanguage(language)
          }
        })
        .catch(() => {
          // Handle import errors gracefully
        })
    }
  }, [initialized, language])

  return null
}
