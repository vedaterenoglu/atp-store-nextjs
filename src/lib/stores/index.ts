/**
 * Stores Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for exporting state management stores
 * - OCP: Open for extension with new stores
 * - ISP: Provides focused interface for state management
 * - DIP: Depends on Zustand abstractions
 *
 * Design Patterns:
 * - Barrel Export Pattern: Consolidates store exports
 * - Facade Pattern: Unified interface to state management
 * - Observer Pattern: Stores implement observer pattern via Zustand
 *
 * Architecture: Central export point for all Zustand stores,
 * managing global client-side state for theme and language preferences
 */

// Theme management store
export { useThemeStore } from './theme.store'
export type { Theme } from './theme.store'

// Language management store
export { useLanguageStore } from './language.store'
export type { SupportedLanguage } from './language.store'
