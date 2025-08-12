/**
 * Cart provider component
 * SOLID Principles: SRP - Single responsibility for cart initialization
 * Design Patterns: Provider Pattern
 * Dependencies: React, Clerk, Zustand cart store
 */

'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/stores/cart.store'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { initializeCart, resetCart, isInitialized } = useCartStore()
  const [activeCustomerId, setActiveCustomerId] = useState<string | null>(null)

  // Fetch active customer from cookie/API
  useEffect(() => {
    if (!isSignedIn || !user) {
      setActiveCustomerId(null)
      return
    }

    // Get active customer from API (which checks cookies)
    fetch('/api/customer/active')
      .then(res => res.json())
      .then(data => {
        if (data.customerId) {
          setActiveCustomerId(data.customerId)
        }
      })
      .catch(err => {
        console.error('Failed to fetch active customer:', err)
        setActiveCustomerId(null)
      })
  }, [isSignedIn, user])

  useEffect(() => {
    // Wait for auth to load
    if (!isLoaded) return

    // If not signed in, reset cart
    if (!isSignedIn || !user) {
      resetCart()
      return
    }

    // Check user role and customer IDs
    const role = user.publicMetadata?.['role'] as string
    const customerids = user.publicMetadata?.['customerids'] as string[] | undefined

    // Support both customer and admin roles
    if (role !== 'customer' && role !== 'admin') {
      // Not a valid role, reset cart
      resetCart()
      return
    }

    // For customers, must have customerids
    if (role === 'customer' && (!customerids || customerids.length === 0)) {
      resetCart()
      return
    }

    // Wait for active customer to be determined
    if (!activeCustomerId) {
      // Don't reset yet, waiting for active customer
      return
    }

    // Initialize cart with active customer
    if (!isInitialized) {
      initializeCart(user.id, activeCustomerId)
    }
  }, [isLoaded, isSignedIn, user, activeCustomerId, initializeCart, resetCart, isInitialized])

  return <>{children}</>
}
