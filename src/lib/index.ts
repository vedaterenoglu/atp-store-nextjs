/**
 * Library Main Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for library exports aggregation
 * - OCP: Open for extension with new library modules
 * - ISP: Segregates library modules by their domain
 * - DIP: Depends on module abstractions
 *
 * Design Patterns:
 * - Barrel Export Pattern: Central export point for library modules
 * - Facade Pattern: Unified interface to library functionality
 * - Module Pattern: Encapsulates library organization
 *
 * Architecture: Master export point for all library modules,
 * providing clean import paths and maintaining separation of concerns
 */

// State management stores
export * from './stores'

// Internationalization
export * from './i18n'

// Note: Other library modules (actions, api, auth, etc.)
// will be exported when their index files are created
