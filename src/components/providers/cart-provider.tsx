/**
 * Cart provider component
 * SOLID Principles: SRP - Single responsibility for cart initialization
 * Design Patterns: Provider Pattern
 * Dependencies: React, Clerk, Zustand cart store
 */

'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/stores/cart.store'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { initializeCart, resetCart, isInitialized } = useCartStore()

  useEffect(() => {
    // Wait for auth to load
    if (!isLoaded) return

    // If not signed in, reset cart
    if (!isSignedIn || !user) {
      resetCart()
      return
    }

    // Check if user is a customer with customerid
    const role = user.publicMetadata?.['role'] as string
    const customerid = user.publicMetadata?.customerid as string

    if (role !== 'customer' || !customerid) {
      // Not a customer, reset cart
      resetCart()
      return
    }

    // Initialize cart for the customer
    if (!isInitialized) {
      initializeCart(user.id, customerid)
    }
  }, [isLoaded, isSignedIn, user, initializeCart, resetCart, isInitialized])

  return <>{children}</>
}
