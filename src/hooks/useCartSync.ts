/**
 * Hook to sync cart with backend prices (SSOT pattern)
 * SOLID Principles: SRP - Single responsibility for cart synchronization
 * Design Patterns: Observer Pattern, SSOT Pattern
 * Dependencies: React, cart store
 */

'use client'

import { useEffect, useRef } from 'react'
import { useCartStore } from '@/lib/stores/cart.store'

/**
 * Custom hook to ensure cart prices are always synced with backend
 * Implements Single Source of Truth pattern where backend is the authority
 *
 * @param options - Configuration options
 * @param options.syncOnMount - Whether to sync prices on component mount (default: true)
 * @param options.syncInterval - Optional interval in ms to periodically sync prices
 */
export function useCartSync(options?: {
  syncOnMount?: boolean
  syncInterval?: number
}) {
  const { syncOnMount = true, syncInterval } = options || {}
  const refreshPrices = useCartStore(state => state.refreshPrices)
  const cart = useCartStore(state => state.cart)
  const isLoading = useCartStore(state => state.isLoading)
  const hasInitialSync = useRef(false)

  // Sync on mount if enabled and cart has items
  useEffect(() => {
    if (
      syncOnMount &&
      cart &&
      cart.items.length > 0 &&
      !hasInitialSync.current
    ) {
      hasInitialSync.current = true
      refreshPrices()
    }
  }, [syncOnMount, cart, refreshPrices])

  // Optional periodic sync
  useEffect(() => {
    if (!syncInterval || !cart || cart.items.length === 0) return

    const interval = setInterval(() => {
      if (!isLoading) {
        refreshPrices()
      }
    }, syncInterval)

    return () => clearInterval(interval)
  }, [syncInterval, cart, isLoading, refreshPrices])

  return {
    isLoading,
    refreshPrices,
  }
}
