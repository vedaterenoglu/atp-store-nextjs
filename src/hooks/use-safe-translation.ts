/**
 * Safe translation hook that handles i18n initialization
 * SOLID Principles: SRP - Single responsibility for safe translations
 * Design Patterns: Facade Pattern - Wraps useTranslation with safety checks
 * Dependencies: react-i18next
 */

import { useTranslation as useI18nTranslation } from 'react-i18next'

/**
 * Safe wrapper around useTranslation that prevents hooks order issues
 * Always calls the same hooks in the same order regardless of i18n state
 */
export function useSafeTranslation(namespace: string = 'common') {
  // Always call useTranslation hook (maintains consistent hook order)
  const translationResult = useI18nTranslation(namespace, {
    useSuspense: false,
  })

  // Safe fallback function that returns the key if translation isn't ready
  const t = translationResult.ready ? translationResult.t : (key: string) => key

  return {
    t,
    i18n: translationResult.i18n,
    ready: translationResult.ready,
  }
}
