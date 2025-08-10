/**
 * Hook for empty cart functionality with confirmation
 * SOLID Principles: SRP - Single responsibility for cart clearing
 * Design Patterns: Command Pattern, Facade Pattern
 * Dependencies: React, cart store, toast notifications
 */

'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/stores/cart.store'
import { toast } from '@/lib/utils/toast-wrapper'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook that provides empty cart functionality
 * Includes confirmation dialog state and clear action
 */
export function useEmptyCart() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const clearCart = useCartStore(state => state.clearCart)
  const itemCount = useCartStore(state => state.getItemCount())
  const { t } = useTranslation('cart')

  const openConfirmDialog = () => {
    if (itemCount === 0) {
      toast.info(t('emptyCart.alreadyEmpty'), {
        description: t('emptyCart.noItems'),
      })
      return
    }
    setIsConfirmOpen(true)
  }

  const closeConfirmDialog = () => {
    setIsConfirmOpen(false)
  }

  const confirmEmptyCart = () => {
    // Clear the cart
    clearCart()

    // Close dialog
    setIsConfirmOpen(false)

    // Show success toast
    toast.success(t('emptyCart.success'), {
      description: t('emptyCart.successDescription'),
    })
  }

  return {
    isConfirmOpen,
    openConfirmDialog,
    closeConfirmDialog,
    confirmEmptyCart,
    canEmpty: itemCount > 0,
  }
}
