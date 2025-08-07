/**
 * UI Components Main Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for UI component exports aggregation
 * - OCP: Open for extension with new UI component categories
 * - ISP: Segregates UI components by their purpose
 * - DIP: Depends on abstractions (component interfaces)
 *
 * Design Patterns:
 * - Barrel Export Pattern: Consolidates all UI exports
 * - Facade Pattern: Provides unified interface to all UI components
 * - Composite Pattern: Aggregates multiple component categories
 *
 * Architecture: Master export point for all UI components,
 * organizing shadcn/ui base components and custom components
 */

// Re-export all shadcn/ui components
export * from './schadcn'

// Re-export all custom UI components
export * from './custom'

// Re-export all UI utilities
export * from '@/lib/utils'
