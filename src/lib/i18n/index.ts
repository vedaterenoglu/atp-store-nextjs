/**
 * Internationalization (i18n) Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for i18n configuration exports
 * - OCP: Open for extension with new languages and configurations
 * - ISP: Provides focused interface for internationalization
 * - DIP: Depends on i18next abstractions
 *
 * Design Patterns:
 * - Barrel Export Pattern: Consolidates i18n exports
 * - Facade Pattern: Unified interface to i18n functionality
 * - Configuration Pattern: Centralizes i18n configuration
 *
 * Architecture: Central export point for internationalization setup,
 * managing i18next configuration and language resources
 */

// Main i18n configuration
export { default as i18n } from './config'

// Export configuration constants
export { defaultNS, resources } from './config'

// Re-export i18next types for convenience
export type { TFunction, i18n as I18n } from 'i18next'
