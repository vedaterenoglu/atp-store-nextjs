/**
 * Auth Components Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Each component has single responsibility
 * - OCP: Components open for extension via props
 * - ISP: Focused interfaces for each component
 *
 * Design Patterns:
 * - Component Pattern: Reusable auth UI components
 * - Module Pattern: Organized component exports
 *
 * Dependencies: None (barrel export only)
 */

// Protected route wrapper component
export { ProtectedRoute } from './protected-route'

// Re-export types from protected route
export type { ProtectedRouteProps } from './protected-route'
