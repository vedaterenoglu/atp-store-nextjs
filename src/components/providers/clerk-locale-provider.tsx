/**
 * Clerk Locale Provider Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for syncing Clerk locale with app language
 * - OCP: Open for extension with additional locale configurations
 * - DIP: Depends on abstractions (ClerkProvider, language store)
 * - ISP: Provides focused interface for Clerk locale management
 *
 * Design Patterns:
 * - Provider Pattern: Wraps ClerkProvider with locale synchronization
 * - Observer Pattern: Reacts to language store changes
 * - Adapter Pattern: Adapts i18next locale to Clerk locale object
 *
 * Architecture: Synchronizes Zustand language store with Clerk's
 * localization system, ensuring consistent UI language across all components
 */
'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { enUS, svSE, trTR } from '@clerk/localizations'
import { useLanguageStore } from '@/lib/stores'
import { useEffect, useState } from 'react'
import type { SupportedLanguage } from '@/lib/stores/language.store'

interface ClerkLocaleProviderProps {
  children: React.ReactNode
}

// Map i18next language codes to Clerk locale objects
// Note: Danish and German default to English until Clerk adds support
const CLERK_LOCALES: Record<SupportedLanguage, typeof enUS> = {
  en: enUS,
  sv: svSE,
  tr: trTR,
  da: enUS, // Danish not yet supported by Clerk, default to English
  de: enUS, // German not yet supported by Clerk, default to English
}

export function ClerkLocaleProvider({ children }: ClerkLocaleProviderProps) {
  // Get language from store
  const language = useLanguageStore(state => state.language)

  // Get initial language from localStorage to avoid flash
  const getInitialLocale = () => {
    if (typeof window === 'undefined') {
      return CLERK_LOCALES.sv // Server-side default
    }

    try {
      const stored = localStorage.getItem('language-storage')
      if (stored) {
        const parsed = JSON.parse(stored)
        const storedLang =
          (parsed?.state?.language as SupportedLanguage) || 'sv'
        return CLERK_LOCALES[storedLang]
      }
    } catch {
      // Silently handle localStorage errors
    }

    return CLERK_LOCALES.sv // Fallback to Swedish
  }

  // Initialize with the stored locale
  const [clerkLocale, setClerkLocale] = useState(getInitialLocale)

  // Update when language changes
  useEffect(() => {
    const newLocale = CLERK_LOCALES[language]
    setClerkLocale(newLocale)
  }, [language])

  // Use key to force remount when locale changes
  return (
    <ClerkProvider key={language} localization={clerkLocale}>
      {children}
    </ClerkProvider>
  )
}
