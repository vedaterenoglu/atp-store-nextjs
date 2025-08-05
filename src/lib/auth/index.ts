/**
 * Auth Module Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Each exported module has single responsibility
 * - ISP: Consumers only import what they need
 * - DIP: Exports abstractions, not implementations
 *
 * Design Patterns:
 * - Facade Pattern: Provides unified interface to auth subsystem
 * - Module Pattern: Encapsulates auth functionality
 *
 * Dependencies: None (barrel export only)
 */

// Core authentication hook with role-based checking
export { useRoleAuth } from './role-auth'

// Types for auth system
export type { AuthCheckResult, RequireAuthOptions, UserRole } from './role-auth'

// Legacy customer auth hook (kept for backwards compatibility)
export { useCustomerAuth } from './customer-auth'
