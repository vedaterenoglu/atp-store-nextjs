/**
 * Providers Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for exporting provider components
 * - OCP: Open for extension with new providers
 * - DIP: Provides abstraction layer for provider imports
 *
 * Design Patterns:
 * - Barrel Export Pattern: Centralized export point
 * - Facade Pattern: Simplified import interface
 *
 * Architecture: Centralized export for all provider components
 */

export { ThemeInitializer } from './theme-initializer'
export { I18nProvider } from './i18n-provider'
export { ClerkLocaleProvider } from './clerk-locale-provider'
export { CartProvider } from './cart-provider'
