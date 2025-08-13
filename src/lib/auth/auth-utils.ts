/**
 * Authentication Utilities - Shared logic for auth extraction
 * SOLID Principles: DRY - Don't repeat yourself
 * Design Patterns: Utility Functions
 * Dependencies: None (pure functions)
 */

import type { UserRole } from './auth-types'

/**
 * Type definitions for Clerk metadata objects
 */
interface SessionClaimsMetadata {
  metadata?: {
    role?: string | undefined
    customerid?: string | undefined
  }
}

/**
 * Extract role with consistent priority chain
 * Priority: sessionClaims > publicMetadata > unsafeMetadata
 */
export function extractRole(
  sessionClaims: SessionClaimsMetadata | null | undefined,
  publicMetadata: Record<string, unknown> | null | undefined,
  unsafeMetadata: Record<string, unknown> | null | undefined
): UserRole {
  // Priority 1: Session Claims (most secure, set by backend)
  const sessionRole = sessionClaims?.metadata?.role
  if (isValidRole(sessionRole)) return sessionRole

  // Priority 2: Public Metadata (secure, admin-modifiable)
  const publicRole = publicMetadata?.['role']
  if (isValidRole(publicRole)) return publicRole

  // Priority 3: Unsafe Metadata (client-modifiable, least secure)
  const unsafeRole = unsafeMetadata?.['role']
  if (isValidRole(unsafeRole)) return unsafeRole

  return null
}

/**
 * Extract customer ID with consistent priority chain
 * Note: Clerk stores as 'customerid' (lowercase), we expose as 'customerId' (camelCase)
 */
export function extractCustomerId(
  sessionClaims: SessionClaimsMetadata | null | undefined,
  publicMetadata: Record<string, unknown> | null | undefined
): string | null {
  // Priority 1: Session Claims
  const sessionCustomerId = sessionClaims?.metadata?.customerid // Note: lowercase in Clerk
  if (sessionCustomerId) return String(sessionCustomerId)

  // Priority 2: Public Metadata
  const publicCustomerId = publicMetadata?.['customerid'] // Note: lowercase in Clerk
  if (publicCustomerId) return String(publicCustomerId)

  return null
}

/**
 * Validate role value
 */
export function isValidRole(role: unknown): role is UserRole {
  return role === 'customer' || role === 'admin' || role === 'staff'
}
