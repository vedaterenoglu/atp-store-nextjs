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
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { CartItemsList } from '../organisms'
import { CartSummaryCard } from '../molecules'
import { CartEmptyState, EmptyCartButton } from '../atoms'
import { Button } from '@/components/ui/schadcn'
import {
  useCartStore,
  useCartItems,
  useCartSummary,
} from '@/lib/stores/cart.store'
import { useCartSync } from '@/hooks/use-cart-sync'
import { toast } from '@/lib/utils/toast'
import { formatPrice } from '@/lib/utils/price'
import { AddressSelectionModal } from '@/components/organisms/AddressSelectionModal'
import { OrderConfirmationModal } from '@/components/organisms/OrderConfirmationModal'
import { OrderService, type OrderLineInput } from '@/services/order.service'
import {
  AddressService,
  type FormattedAddress,
} from '@/services/address.service'
import { useOrderStore } from '@/lib/stores/order.store'
import { useAddressStore } from '@/lib/stores/address.store'
import type {
  OrderData,
  OrderSummary,
  OrderMetadata,
} from '@/components/organisms/order-confirmation/types/order-confirmation.types'

export function CustomerCartTemplate() {
  const { t } = useSafeTranslation('cart')
  const [isUpdating, setIsUpdating] = useState(false)

  // Order confirmation modal state
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [orderConfirmationData, setOrderConfirmationData] = useState<{
    orderData: OrderData
    dispatchAddress: FormattedAddress
    invoiceAddress: FormattedAddress
    orderLines: OrderLineInput[]
    orderSummary: OrderSummary
    orderMetadata: OrderMetadata
  } | null>(null)

  // Sync cart with backend on mount (SSOT pattern)
  useCartSync({ syncOnMount: true })

  // Get cart data from Zustand store
  const cart = useCartStore(state => state.cart)
  const items = useCartItems()
  const summary = useCartSummary()
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const clearCart = useCartStore(state => state.clearCart)
  const isLoading = useCartStore(state => state.isLoading)
  const companyId = useCartStore(state => state.companyId)

  // Order store
  const showAddressModal = useOrderStore(state => state.showAddressModal)
  const setShowAddressModal = useOrderStore(state => state.setShowAddressModal)

  // Address store
  const setCustomerAddresses = useAddressStore(
    state => state.setCustomerAddresses
  )
  const getAddressById = useAddressStore(state => state.getAddressById)
  const setSubmitting = useOrderStore(state => state.setSubmitting)

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    setIsUpdating(true)
    try {
      await updateQuantity(itemId, quantity)
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
      await removeFromCart(itemId)
      toast.success(t('messages.itemRemoved'))
    } catch (error) {
      toast.error(t('messages.removeFailed'))
      console.error('Error removing item:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0 || !cart.customerId) return

    setIsUpdating(true)

    try {
      // Fetch customer addresses
      const result = await AddressService.getCustomerAddresses(
        companyId,
        cart.customerId
      )

      if (!result.success || !result.data) {
        toast.error(t('errors.fetchAddressesFailed'))
        setIsUpdating(false)
        return
      }

      const addresses = result.data.formattedAddresses
      setCustomerAddresses(addresses) // Store addresses for later use

      if (addresses.length === 0) {
        toast.error(t('addressSelection.noAddresses'))
        setIsUpdating(false)
        return
      }

      if (addresses.length === 1) {
        // Single address - auto-select for both dispatch and invoice
        const singleAddress = addresses[0]
        if (singleAddress) {
          await handleAddressSelect(singleAddress.id, singleAddress.id)
        }
      } else {
        // Multiple addresses - show modal for selection
        setIsUpdating(false)
        setShowAddressModal(true)
      }
    } catch (error) {
      console.error('Error fetching addresses:', error)
      toast.error(t('errors.fetchAddressesFailed'))
      setIsUpdating(false)
    }
  }

  const handleAddressSelect = async (
    dispatchAddressId: string,
    invoiceAddressId: string
  ) => {
    if (!cart || !cart.customerId) {
      toast.error(t('errors.orderCreationFailed'))
      return
    }

    setSubmitting(true)
    setIsUpdating(true)

    try {
      // Get the invoice address to determine country
      const invoiceAddress = getAddressById(invoiceAddressId)
      if (!invoiceAddress) {
        toast.error(t('errors.orderCreationFailed'))
        setSubmitting(false)
        setIsUpdating(false)
        return
      }

      // Get country from invoice address
      const country = invoiceAddress.fullAddress.country

      // Determine order type based on country
      const orderType = OrderService.getOrderType(country)

      // Determine language based on order type
      const orderLanguage = orderType === 'Inland' ? 'se' : 'en'

      // Transform cart items to order lines
      const orderLines: OrderLineInput[] = items.map(item => ({
        stockId: item.productId,
        lineInfo: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        vatPercent: item.vatRate || 0,
      }))

      // Get company nickname from environment variable
      const companyNickname = process.env['NEXT_PUBLIC_COMPANY_ID'] || 'alfe'

      // Create the order
      const result = await OrderService.createOrder({
        companyId,
        companyNickname,
        customerId: cart.customerId,
        dispatchAddressId,
        invoiceAddressId,
        orderLines,
        country,
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: orderLanguage,
      })

      if (result.success && result.data) {
        // Transform addresses from API response to FormattedAddress format
        const transformAddress = (
          address:
            | {
                address_nickname?: string
                line_1?: string
                line_2?: string | null
                city?: string
              }
            | null
            | undefined,
          addressId: string,
          addressCountry: string
        ): FormattedAddress => ({
          id: addressId,
          label: `${address?.address_nickname || ''}: ${address?.line_1 || ''}${
            address?.line_2 ? ` ${address.line_2}` : ''
          } ${address?.city || ''}`,
          fullAddress: {
            address_id: addressId,
            address_nickname: address?.address_nickname || '',
            line_1: address?.line_1 || '',
            line_2: address?.line_2 || '',
            city: address?.city || '',
            country: addressCountry,
          },
        })

        // Use addresses directly from API response
        // Note: country was already used when creating the order
        // Transform addresses safely - handle cases where addresses might be undefined
        const dispatchAddr = transformAddress(
          result.data.dispatchAddress || null,
          dispatchAddressId,
          country
        )
        const invoiceAddr = transformAddress(
          result.data.invoiceAddress || null,
          invoiceAddressId,
          country
        )

        // Calculate totals from cart summary
        const subtotal = summary?.subtotal || 0
        const vatTotal = summary?.tax || 0
        const grandTotal = summary?.total || 0

        // Count total items and quantity
        const totalItems = items.length
        const totalQuantity = items.reduce(
          (sum, item) => sum + item.quantity,
          0
        )

        // Prepare order confirmation data
        setOrderConfirmationData({
          orderData: {
            orderNumber: result.data.orderNumber || 'N/A',
            orderDate: result.data.orderDate || new Date().toISOString(),
            customerTitle: result.data.customerTitle || cart.customerId || '',
            customerId: cart.customerId || '',
          },
          dispatchAddress: dispatchAddr,
          invoiceAddress: invoiceAddr,
          orderLines,
          orderSummary: {
            subtotal,
            vatTotal,
            total: grandTotal,
          },
          orderMetadata: {
            orderType,
            orderLanguage,
            exchangeUnit: 'kr.',
            exchangeRate: 1,
            totalItems,
            totalQuantity,
          },
        })

        // Show the confirmation modal
        setShowOrderModal(true)

        // Close address modal (cart will be cleared when user closes confirmation)
        setShowAddressModal(false)
      } else {
        toast.error(result.error || t('errors.orderCreationFailed'))
      }
    } catch (error) {
      console.error('Order creation failed:', error)
      toast.error(t('errors.orderCreationFailed'))
    } finally {
      setSubmitting(false)
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
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
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
                <EmptyCartButton
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                />
              </div>
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

      {/* Address Selection Modal */}
      {cart?.customerId && (
        <AddressSelectionModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          companyId={companyId}
          customerId={cart.customerId}
          onAddressSelect={handleAddressSelect}
        />
      )}

      {/* Order Confirmation Modal */}
      {orderConfirmationData && (
        <OrderConfirmationModal
          isOpen={showOrderModal}
          onClose={() => {
            setShowOrderModal(false)
            setOrderConfirmationData(null)
            clearCart() // Clear cart after user closes the confirmation
          }}
          orderData={orderConfirmationData.orderData}
          dispatchAddress={orderConfirmationData.dispatchAddress}
          invoiceAddress={orderConfirmationData.invoiceAddress}
          orderLines={orderConfirmationData.orderLines}
          orderSummary={orderConfirmationData.orderSummary}
          orderMetadata={orderConfirmationData.orderMetadata}
        />
      )}
    </div>
  )
}
