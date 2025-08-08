/**
 * Clerk User Metadata Type Definitions
 * SOLID Principles: ISP - Interface for Clerk metadata
 * Design Patterns: Type Definition Pattern
 * Dependencies: @clerk/nextjs
 */

export {}

declare global {
  interface UserPublicMetadata {
    customerid?: string // Swedish company registration number (e.g., "SE0 1001 1086")
    companyName?: string // Optional company name
    orgNumber?: string // Alternative field name for organization number
  }

  interface UserPrivateMetadata {
    // Add private metadata fields if needed
    internalNotes?: string
  }

  interface UserUnsafeMetadata {
    // Add unsafe metadata fields if needed (user-editable)
    preferredContactMethod?: 'email' | 'phone'
  }
}
