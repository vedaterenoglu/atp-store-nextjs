/**
 * Custom UI Components Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for exporting custom UI components
 * - OCP: Open for extension with new custom components
 * - ISP: Provides focused interface for custom UI components
 *
 * Design Patterns:
 * - Barrel Export Pattern: Consolidates exports for cleaner imports
 * - Facade Pattern: Provides unified interface to custom components
 *
 * Architecture: Central export point for all custom UI components,
 * enabling clean imports and better module organization
 */

// Theme management components
export { ThemeToggle } from './theme-toggle'

// Language management components
export { LanguageToggle } from './language-toggle'

// Grid components
export { GridLayout, GridErrorBoundary, GridSkeleton, GridItem } from './grid'
