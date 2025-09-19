/**
 * Unit tests for Auth Utilities
 * SOLID Principles: SRP - Testing single responsibility of auth utilities
 * Design Patterns: Test Pattern with pure function testing
 * Dependencies: Jest
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { extractRole, extractCustomerId, isValidRole } from '../auth-utils'
import type { UserRole } from '../auth-types'

describe('auth-utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('extractRole', () => {
    it('should extract role from sessionClaims metadata first', () => {
      const sessionClaims = {
        metadata: {
          role: 'admin' as const,
          customerid: 'CUST-123',
        },
      }
      const publicMetadata = {
        role: 'customer' as const,
      }
      const unsafeMetadata = {
        role: 'superadmin' as const,
      }

      const result = extractRole(sessionClaims, publicMetadata, unsafeMetadata)

      expect(result).toBe('admin')
    })

    it('should extract role from publicMetadata when sessionClaims not available', () => {
      const publicMetadata = {
        role: 'customer' as const,
      }
      const unsafeMetadata = {
        role: 'superadmin' as const,
      }

      const result = extractRole(null, publicMetadata, unsafeMetadata)

      expect(result).toBe('customer')
    })

    it('should extract role from unsafeMetadata as last resort', () => {
      const unsafeMetadata = {
        role: 'superadmin' as const,
      }

      const result = extractRole(null, null, unsafeMetadata)

      expect(result).toBe('superadmin')
    })

    it('should return null when no valid role found', () => {
      const result = extractRole(null, null, null)
      expect(result).toBe(null)
    })

    it('should return null for invalid role values', () => {
      const sessionClaims = {
        metadata: {
          role: 'invalid_role',
        },
      }

      const result = extractRole(sessionClaims, null, null)

      expect(result).toBe(null)
    })

    it('should handle undefined values gracefully', () => {
      const result = extractRole(undefined, undefined, undefined)
      expect(result).toBe(null)
    })

    it('should handle empty metadata objects', () => {
      const sessionClaims = { metadata: {} }
      const publicMetadata = {}
      const unsafeMetadata = {}

      const result = extractRole(sessionClaims, publicMetadata, unsafeMetadata)

      expect(result).toBe(null)
    })

    it('should respect priority order correctly', () => {
      // All three have roles
      const sessionClaims = { metadata: { role: 'admin' as const } }
      const publicMetadata = { role: 'customer' as const }
      const unsafeMetadata = { role: 'superadmin' as const }

      expect(extractRole(sessionClaims, publicMetadata, unsafeMetadata)).toBe(
        'admin'
      )
      expect(extractRole(null, publicMetadata, unsafeMetadata)).toBe('customer')
      expect(extractRole(null, null, unsafeMetadata)).toBe('superadmin')
    })
  })

  describe('extractCustomerId', () => {
    it('should extract customerid from sessionClaims metadata first', () => {
      const sessionClaims = {
        metadata: {
          customerid: 'SESSION-CUST-123',
        },
      }
      const publicMetadata = {
        customerid: 'PUBLIC-CUST-456',
      }

      const result = extractCustomerId(sessionClaims, publicMetadata)

      expect(result).toBe('SESSION-CUST-123')
    })

    it('should extract customerid from publicMetadata when sessionClaims not available', () => {
      const publicMetadata = {
        customerid: 'PUBLIC-CUST-456',
      }

      const result = extractCustomerId(null, publicMetadata)

      expect(result).toBe('PUBLIC-CUST-456')
    })

    it('should return null when no customerid found', () => {
      const result = extractCustomerId(null, null)
      expect(result).toBe(null)
    })

    it('should handle undefined values gracefully', () => {
      const result = extractCustomerId(undefined, undefined)
      expect(result).toBe(null)
    })

    it('should handle empty metadata objects', () => {
      const sessionClaims = { metadata: {} }
      const publicMetadata = {}

      const result = extractCustomerId(sessionClaims, publicMetadata)

      expect(result).toBe(null)
    })

    it('should convert customerid to string', () => {
      const sessionClaims = {
        metadata: {
          customerid: '12345' as string,
        },
      }

      const result = extractCustomerId(sessionClaims, null)

      expect(result).toBe('12345')
    })

    it('should handle null customerid values', () => {
      const sessionClaims = {
        metadata: {
          customerid: undefined,
        },
      }

      const result = extractCustomerId(sessionClaims, null)

      expect(result).toBe(null)
    })

    it('should respect priority order correctly', () => {
      const sessionClaims = { metadata: { customerid: 'SESSION-123' } }
      const publicMetadata = { customerid: 'PUBLIC-456' }

      expect(extractCustomerId(sessionClaims, publicMetadata)).toBe(
        'SESSION-123'
      )
      expect(extractCustomerId(null, publicMetadata)).toBe('PUBLIC-456')
    })
  })

  describe('isValidRole', () => {
    it('should return true for valid customer role', () => {
      expect(isValidRole('customer')).toBe(true)
    })

    it('should return true for valid admin role', () => {
      expect(isValidRole('admin')).toBe(true)
    })

    it('should return true for valid superadmin role', () => {
      expect(isValidRole('superadmin')).toBe(true)
    })

    it('should return false for invalid role', () => {
      expect(isValidRole('invalid')).toBe(false)
    })

    it('should return false for null', () => {
      expect(isValidRole(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isValidRole(undefined)).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isValidRole('')).toBe(false)
    })

    it('should return false for number', () => {
      expect(isValidRole(123)).toBe(false)
    })

    it('should return false for object', () => {
      expect(isValidRole({})).toBe(false)
    })

    it('should return false for array', () => {
      expect(isValidRole([])).toBe(false)
    })

    it('should be case sensitive', () => {
      expect(isValidRole('Customer')).toBe(false)
      expect(isValidRole('ADMIN')).toBe(false)
      expect(isValidRole('Superadmin')).toBe(false)
    })

    it('should type guard correctly', () => {
      const unknownValue: unknown = 'customer'

      if (isValidRole(unknownValue)) {
        // TypeScript should know this is UserRole
        const role: UserRole = unknownValue
        expect(role).toBe('customer')
      } else {
        fail('Should have been valid role')
      }
    })
  })

  describe('Edge cases', () => {
    it('should handle nested undefined metadata', () => {
      const sessionClaims = { metadata: undefined }
      const publicMetadata = undefined

      expect(extractRole(sessionClaims as never, publicMetadata, null)).toBe(
        null
      )
      expect(extractCustomerId(sessionClaims as never, publicMetadata)).toBe(
        null
      )
    })

    it('should handle metadata with extra properties', () => {
      const sessionClaims = {
        metadata: {
          role: 'admin' as const,
          customerid: 'CUST-123',
          extraProp: 'extra',
        },
      }

      expect(extractRole(sessionClaims, null, null)).toBe('admin')
      expect(extractCustomerId(sessionClaims, null)).toBe('CUST-123')
    })

    it('should handle boolean false customerid gracefully', () => {
      const sessionClaims = {
        metadata: {
          customerid: false,
        },
      }

      const result = extractCustomerId(sessionClaims as never, null)
      expect(result).toBe(null)
    })

    it('should handle empty string customerid', () => {
      const sessionClaims = {
        metadata: {
          customerid: '',
        },
      }

      const result = extractCustomerId(sessionClaims, null)
      expect(result).toBe(null)
    })
  })
})
