/**
 * Order Store
 * SOLID Principles: SRP - Single responsibility for order state management
 * Design Patterns: Store Pattern, Observer Pattern
 * Dependencies: zustand
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface OrderState {
  // Current order being processed
  currentOrderNumber: string | null
  currentOrderDate: string | null

  // Order submission state
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean

  // Address selection state
  showAddressModal: boolean
  selectedDispatchAddressId: string | null
  selectedInvoiceAddressId: string | null

  // Actions
  setCurrentOrder: (orderNumber: string, orderDate: string) => void
  clearCurrentOrder: () => void
  setSubmitting: (isSubmitting: boolean) => void
  setSubmitError: (error: string | null) => void
  setSubmitSuccess: (success: boolean) => void
  setShowAddressModal: (show: boolean) => void
  setSelectedAddresses: (dispatchId: string, invoiceId: string) => void
  clearSelectedAddresses: () => void
  resetOrderState: () => void
}

const initialState = {
  currentOrderNumber: null,
  currentOrderDate: null,
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  showAddressModal: false,
  selectedDispatchAddressId: null,
  selectedInvoiceAddressId: null,
}

export const useOrderStore = create<OrderState>()(
  devtools(
    set => ({
      ...initialState,

      setCurrentOrder: (orderNumber, orderDate) =>
        set({
          currentOrderNumber: orderNumber,
          currentOrderDate: orderDate,
        }),

      clearCurrentOrder: () =>
        set({
          currentOrderNumber: null,
          currentOrderDate: null,
        }),

      setSubmitting: isSubmitting =>
        set({
          isSubmitting,
          submitError: null, // Clear error when starting submission
        }),

      setSubmitError: submitError =>
        set({
          submitError,
          isSubmitting: false,
        }),

      setSubmitSuccess: submitSuccess =>
        set({
          submitSuccess,
          isSubmitting: false,
        }),

      setShowAddressModal: showAddressModal =>
        set({
          showAddressModal,
        }),

      setSelectedAddresses: (
        selectedDispatchAddressId,
        selectedInvoiceAddressId
      ) =>
        set({
          selectedDispatchAddressId,
          selectedInvoiceAddressId,
        }),

      clearSelectedAddresses: () =>
        set({
          selectedDispatchAddressId: null,
          selectedInvoiceAddressId: null,
        }),

      resetOrderState: () => set(initialState),
    }),
    {
      name: 'order-store',
    }
  )
)
