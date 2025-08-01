/**
 * Components Main Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for component exports aggregation
 * - OCP: Open for extension with new component categories
 * - ISP: Segregates components by their domain/purpose
 * - DIP: Depends on component abstractions
 *
 * Design Patterns:
 * - Barrel Export Pattern: Central export point for all components
 * - Facade Pattern: Unified interface to component library
 * - Module Pattern: Encapsulates component organization
 *
 * Architecture: Master export point organizing all component categories,
 * providing clean import paths and maintaining clear separation of concerns
 */

// UI Components (includes shadcn/ui and custom components)
export * from './ui'

// Layout Components
export * from './layout'

// Note: Other component categories (admin, forms, etc.)
// will be exported when their index files are created
