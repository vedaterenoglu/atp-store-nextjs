/**
 * Admin Sign-Out Handler - Clears customer cookie when admin signs out
 * SOLID Principles: SRP - Single responsibility for handling admin sign-out cleanup
 * Design Patterns: Observer Pattern
 * Dependencies: Clerk hooks, customer service
 */

'use client'

import { useEffect, useRef } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'

export function AdminSignOutHandler() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const wasAdminRef = useRef(false)
  const wasSignedInRef = useRef(false)

  useEffect(() => {
    const isAdmin = user?.publicMetadata?.['role'] === 'admin'
    
    // Track if user was admin and signed in
    if (isSignedIn && isAdmin) {
      wasAdminRef.current = true
      wasSignedInRef.current = true
    }
    
    // Detect when admin signs out
    if (wasAdminRef.current && wasSignedInRef.current && !isSignedIn) {
      // Admin has signed out, clear the customer cookie
      fetch('/api/customer/clear', { method: 'POST' })
        .then(() => {
          console.log('Customer selection cleared after admin sign-out')
        })
        .catch(error => {
          console.error('Failed to clear customer selection:', error)
        })
        .finally(() => {
          // Reset flags
          wasAdminRef.current = false
          wasSignedInRef.current = false
        })
    }
    
    // Update signed-in status
    wasSignedInRef.current = isSignedIn || false
  }, [isSignedIn, user])

  return null // This component doesn't render anything
}