/**
 * Address Store
 * SOLID Principles: SRP - Single responsibility for address state management
 * Design Patterns: Store Pattern, Observer Pattern
 * Dependencies: zustand, address service types
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { FormattedAddress } from '@/services/address.service'

export interface AddressState {
  // Customer addresses
  customerAddresses: FormattedAddress[]
  
  // Selected addresses for current order
  selectedDispatchAddress: FormattedAddress | null
  selectedInvoiceAddress: FormattedAddress | null
  
  // Loading state
  isLoadingAddresses: boolean
  addressError: string | null
  
  // Actions
  setCustomerAddresses: (addresses: FormattedAddress[]) => void
  setSelectedAddresses: (
    dispatchAddress: FormattedAddress,
    invoiceAddress: FormattedAddress
  ) => void
  setSelectedDispatchAddress: (address: FormattedAddress) => void
  setSelectedInvoiceAddress: (address: FormattedAddress) => void
  clearSelectedAddresses: () => void
  clearAllAddresses: () => void
  setLoadingAddresses: (loading: boolean) => void
  setAddressError: (error: string | null) => void
  
  // Getters
  getAddressById: (id: string) => FormattedAddress | undefined
  hasAddresses: () => boolean
}

const initialState = {
  customerAddresses: [],
  selectedDispatchAddress: null,
  selectedInvoiceAddress: null,
  isLoadingAddresses: false,
  addressError: null,
}

export const useAddressStore = create<AddressState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setCustomerAddresses: (addresses: FormattedAddress[]) =>
          set({
            customerAddresses: addresses,
            addressError: null,
          }),

        setSelectedAddresses: (
          dispatchAddress: FormattedAddress,
          invoiceAddress: FormattedAddress
        ) =>
          set({
            selectedDispatchAddress: dispatchAddress,
            selectedInvoiceAddress: invoiceAddress,
          }),

        setSelectedDispatchAddress: (address: FormattedAddress) =>
          set({
            selectedDispatchAddress: address,
          }),

        setSelectedInvoiceAddress: (address: FormattedAddress) =>
          set({
            selectedInvoiceAddress: address,
          }),

        clearSelectedAddresses: () =>
          set({
            selectedDispatchAddress: null,
            selectedInvoiceAddress: null,
          }),

        clearAllAddresses: () =>
          set({
            customerAddresses: [],
            selectedDispatchAddress: null,
            selectedInvoiceAddress: null,
            addressError: null,
          }),

        setLoadingAddresses: (isLoadingAddresses: boolean) =>
          set({
            isLoadingAddresses,
          }),

        setAddressError: (addressError: string | null) =>
          set({
            addressError,
            isLoadingAddresses: false,
          }),

        getAddressById: (id: string): FormattedAddress | undefined => {
          return get().customerAddresses.find(
            (addr: FormattedAddress) => addr.id === id
          )
        },

        hasAddresses: (): boolean => {
          return get().customerAddresses.length > 0
        },
      }),
      {
        name: 'address-store',
        partialize: (state: AddressState) => ({
          // Only persist the addresses, not loading/error states
          customerAddresses: state.customerAddresses,
        }),
      }
    ),
    {
      name: 'address-store',
    }
  )
)

// Selectors
export const useCustomerAddresses = () =>
  useAddressStore((state: AddressState) => state.customerAddresses)

export const useSelectedAddresses = () =>
  useAddressStore((state: AddressState) => ({
    dispatch: state.selectedDispatchAddress,
    invoice: state.selectedInvoiceAddress,
  }))

export const useAddressLoading = () =>
  useAddressStore((state: AddressState) => state.isLoadingAddresses)