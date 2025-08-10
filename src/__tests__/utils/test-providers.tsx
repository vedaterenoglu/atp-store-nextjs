/**
 * Test Provider Utilities - Centralized provider setup for tests
 * SOLID Principles: SRP - Single responsibility for test provider setup
 * Design Patterns: Factory Pattern, Composite Pattern
 * Dependencies: React, testing-library, providers
 */

import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { ThemeInitializer } from '@/components/providers/theme-initializer'
import { I18nProvider } from '@/components/providers/i18n-provider'
import { ClerkLocaleProvider } from '@/components/providers/clerk-locale-provider'
import { CartProvider } from '@/components/providers/cart-provider'

/**
 * Options for customizing test provider setup
 */
interface TestProviderOptions {
  includeTheme?: boolean
  includeI18n?: boolean
  includeClerkLocale?: boolean
  includeCart?: boolean
  locale?: string
  theme?: 'light' | 'dark' | 'system'
}

/**
 * Default test provider options
 */
const defaultOptions: TestProviderOptions = {
  includeTheme: true,
  includeI18n: true,
  includeClerkLocale: true,
  includeCart: true,
  locale: 'en',
  theme: 'light',
}

/**
 * Create a test provider wrapper with specified providers
 */
export function createWrapper(options: TestProviderOptions = {}) {
  const opts = { ...defaultOptions, ...options }

  return function TestWrapper({ children }: { children: ReactNode }) {
    let wrapped = <>{children}</>

    // Add providers in reverse order of dependency
    if (opts.includeCart) {
      wrapped = <CartProvider>{wrapped}</CartProvider>
    }

    if (opts.includeClerkLocale) {
      wrapped = <ClerkLocaleProvider>{wrapped}</ClerkLocaleProvider>
    }

    if (opts.includeI18n) {
      wrapped = <I18nProvider>{wrapped}</I18nProvider>
    }

    if (opts.includeTheme) {
      wrapped = <ThemeInitializer>{wrapped}</ThemeInitializer>
    }

    return wrapped
  }
}

/**
 * Custom render function that includes providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: TestProviderOptions & Omit<RenderOptions, 'wrapper'>
) {
  const {
    includeTheme = true,
    includeI18n = true,
    includeClerkLocale = true,
    includeCart = true,
    locale = 'en',
    theme = 'light',
    ...renderOptions
  } = options || {}

  const Wrapper = createWrapper({
    includeTheme,
    includeI18n,
    includeClerkLocale,
    includeCart,
    locale,
    theme,
  })

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

/**
 * Minimal render without any providers (for isolated unit tests)
 */
export function renderMinimal(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, options)
}

/**
 * Render with only theme provider
 */
export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = createWrapper({
    includeTheme: true,
    includeI18n: false,
    includeClerkLocale: false,
    includeCart: false,
  })

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

/**
 * Render with only i18n provider
 */
export function renderWithI18n(
  ui: ReactElement,
  locale = 'en',
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = createWrapper({
    includeTheme: false,
    includeI18n: true,
    includeClerkLocale: false,
    includeCart: false,
    locale,
  })

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

/**
 * Render with cart provider (includes required dependencies)
 */
export function renderWithCart(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = createWrapper({
    includeTheme: false,
    includeI18n: false,
    includeClerkLocale: false,
    includeCart: true,
  })

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from @testing-library/react for convenience
export * from '@testing-library/react'
