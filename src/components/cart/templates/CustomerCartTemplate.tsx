/**
 * Customer cart template component
 * SOLID Principles: SRP - Single responsibility for customer cart layout
 * Design Patterns: Template Component Pattern
 * Dependencies: React, Zustand cart store, organisms, molecules
 */

'use client'

import { useState } from 'react'
import { ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { CartItemsList } from '../organisms'
import { CartSummaryCard } from '../molecules'
import { CartEmptyState } from '../atoms'
import { Button } from '@/components/ui/schadcn'
import {
  useCartStore,
  useCartItems,
  useCartSummary,
} from '@/lib/stores/cart.store'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils/price'

export function CustomerCartTemplate() {
  const router = useRouter()
  const { t } = useTranslation('cart')
  const [isUpdating, setIsUpdating] = useState(false)

  // Get cart data from Zustand store
  const cart = useCartStore(state => state.cart)
  const items = useCartItems()
  const summary = useCartSummary()
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const checkout = useCartStore(state => state.checkout)
  const isLoading = useCartStore(state => state.isLoading)

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    setIsUpdating(true)
    try {
      updateQuantity(itemId, quantity)
      toast.success(t('messages.cartUpdated'))
    } catch (error) {
      toast.error(t('messages.updateFailed'))
      console.error('Error updating quantity:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(true)
    try {
      removeFromCart(itemId)
      toast.success(t('messages.itemRemoved'))
    } catch (error) {
      toast.error(t('messages.removeFailed'))
      console.error('Error removing item:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return

    setIsUpdating(true)
    try {
      const success = await checkout()
      if (success) {
        toast.success(t('messages.checkoutSuccess'))
        router.push('/orders')
      } else {
        toast.error(t('messages.checkoutFailed'))
      }
    } catch (error) {
      toast.error(t('messages.checkoutError'))
      console.error('Checkout failed:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!cart || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
          <CartEmptyState
            title={t('emptyCart.title')}
            description={t('emptyCart.description')}
            icon={<ShoppingCart className="h-16 w-16" />}
            action={
              <Link href="/products">
                <Button size="lg">{t('emptyCart.action')}</Button>
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first container with proper padding */}
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          {/* Mobile-optimized Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            {/* Mobile: Stack vertically */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
                  <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
                  {t('title')}
                </span>
                <span className="text-sm text-muted-foreground sm:text-lg">
                  ({summary?.itemCount || 0}{' '}
                  {summary?.itemCount === 1
                    ? t('summary.item')
                    : t('summary.items_plural')}
                  )
                </span>
              </h1>
              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                  size="sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('actions.continueShopping')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile-first Content Layout */}
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
            {/* Cart Items - Full width on mobile */}
            <div className="w-full lg:flex-1">
              <CartItemsList
                items={items}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                readonly={isUpdating || isLoading}
              />
            </div>

            {/* Summary - Sticky on mobile bottom, sidebar on desktop */}
            <div className="w-full lg:w-96">
              {/* Desktop: Sticky sidebar */}
              <div className="lg:sticky lg:top-4">
                <div className="space-y-4">
                  {summary && <CartSummaryCard summary={summary} />}

                  {/* Mobile: Fixed bottom checkout bar */}
                  <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 lg:static lg:border-0 lg:bg-transparent lg:p-0">
                    <div className="mx-auto max-w-lg space-y-3 lg:max-w-none">
                      {/* Mobile: Show total */}
                      <div className="flex items-center justify-between lg:hidden">
                        <span className="text-sm font-medium">
                          {t('summary.total')}
                        </span>
                        <span className="text-lg font-bold">
                          {formatPrice(summary?.total || 0)}
                        </span>
                      </div>

                      {/* Checkout Button */}
                      <Button
                        size="lg"
                        className="w-full gap-2"
                        onClick={handleCheckout}
                        disabled={isUpdating || isLoading || items.length === 0}
                      >
                        <CreditCard className="h-5 w-5" />
                        {isUpdating
                          ? t('actions.processing')
                          : t('actions.submitOrder')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Add padding to account for fixed bottom bar */}
          <div className="h-32 lg:hidden" />
        </div>
      </div>
    </div>
  )
}
