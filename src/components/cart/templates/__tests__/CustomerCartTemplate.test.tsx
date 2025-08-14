/**
 * CustomerCartTemplate Order Submission Tests
 * Tests the complete order submission flow with OrderConfirmationModal
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomerCartTemplate } from '../CustomerCartTemplate'
import {
  useCartStore,
  useCartItems,
  useCartSummary,
} from '@/lib/stores/cart.store'
import { useOrderStore } from '@/lib/stores/order.store'
import { useAddressStore } from '@/lib/stores/address.store'
import { OrderService } from '@/services/order.service'
import { AddressService } from '@/services/address.service'
import { toast } from '@/lib/utils/toast'

// Mock dependencies
jest.mock('@/lib/stores/cart.store')
jest.mock('@/lib/stores/order.store')
jest.mock('@/lib/stores/address.store')
jest.mock('@/services/order.service')
jest.mock('@/services/address.service')
jest.mock('@/lib/utils/toast')
jest.mock('@/hooks/use-cart-sync', () => ({
  useCartSync: jest.fn(),
}))
jest.mock('@/hooks/use-safe-translation', () => ({
  useSafeTranslation: () => ({
    t: (key: string) => key,
  }),
}))
jest.mock('@/lib/utils/price', () => ({
  formatPrice: (amount: number) => `${amount} kr`,
}))

// Mock the OrderConfirmationModal component
jest.mock('@/components/organisms/OrderConfirmationModal', () => ({
  OrderConfirmationModal: jest.fn(props => {
    const { isOpen, onClose, orderData } = props
    if (!isOpen) return null
    return (
      <div data-testid="order-confirmation-modal">
        <h2>Order Confirmation</h2>
        <p>Order Number: {orderData?.orderNumber}</p>
        <button onClick={onClose}>Close</button>
      </div>
    )
  }),
}))

// Mock the AddressSelectionModal component
jest.mock('@/components/organisms/AddressSelectionModal', () => ({
  AddressSelectionModal: jest.fn(({ isOpen, onAddressSelect }) => {
    if (!isOpen) return null
    return (
      <div data-testid="address-selection-modal">
        <button onClick={() => onAddressSelect('address-1', 'address-2')}>
          Select Addresses
        </button>
      </div>
    )
  }),
}))

// Mock cart components
jest.mock('../../organisms', () => ({
  CartItemsList: jest.fn(() => <div>Cart Items List</div>),
}))
jest.mock('../../molecules', () => ({
  CartSummaryCard: jest.fn(() => <div>Cart Summary</div>),
}))
jest.mock('../../atoms', () => ({
  CartEmptyState: jest.fn(() => <div>Empty Cart</div>),
  EmptyCartButton: jest.fn(() => <button>Empty Cart</button>),
}))

describe('CustomerCartTemplate - Order Submission with Modal', () => {
  const mockCart = {
    id: 'cart-1',
    customerId: 'customer-1',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 100,
        vatRate: 25,
        thumbnailUrl: 'test.jpg',
      },
    ],
  }

  const mockSummary = {
    subtotal: 200,
    tax: 50,
    total: 250,
    itemCount: 1,
    uniqueItemCount: 1,
    totalDiscount: 0,
    shipping: 0,
  }

  const mockAddresses = [
    {
      id: 'address-1',
      fullAddress: {
        address_nickname: 'Main Office',
        line_1: '123 Test Street',
        line_2: '',
        city: 'Stockholm',
        country: 'Sweden',
      },
    },
    {
      id: 'address-2',
      fullAddress: {
        address_nickname: 'Billing Address',
        line_1: '456 Invoice Lane',
        line_2: '',
        city: 'Stockholm',
        country: 'Sweden',
      },
    },
  ]

  const mockOrderResponse = {
    success: true,
    data: {
      orderNumber: 'ORD-2024-001',
      orderDate: '2024-01-15',
      customerTitle: 'Test Customer',
      affectedRows: 1,
      dispatchAddress: {
        address_nickname: 'Main Office',
        line_1: '123 Test Street',
        line_2: null,
        city: 'Stockholm',
      },
      invoiceAddress: {
        address_nickname: 'Billing Address',
        line_1: '456 Invoice Lane',
        line_2: null,
        city: 'Stockholm',
      },
    },
  }

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()

    // Setup cart store mock
    ;(useCartStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        cart: mockCart,
        items: mockCart.items,
        summary: mockSummary,
        updateQuantity: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: jest.fn(),
        isLoading: false,
        companyId: 'company-1',
      }
      return selector ? selector(state) : state
    })

    // Mock useCartItems and useCartSummary hooks
    ;(useCartItems as jest.Mock).mockReturnValue(mockCart.items)
    ;(useCartSummary as jest.Mock).mockReturnValue(mockSummary)

    // Setup order store mock with state that can be updated
    let showAddressModal = false
    const setShowAddressModal = jest.fn((value: boolean) => {
      showAddressModal = value
    })

    ;(useOrderStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        showAddressModal,
        setShowAddressModal,
        setSubmitting: jest.fn(),
      }
      return selector ? selector(state) : state
    })

    // Setup address store mock
    ;(useAddressStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        customerAddresses: mockAddresses,
        setCustomerAddresses: jest.fn(),
        getAddressById: jest.fn((id: string) => {
          return mockAddresses.find(addr => addr.id === id) || mockAddresses[0]
        }),
      }
      return selector ? selector(state) : state
    })

    // Setup AddressService mock
    ;(AddressService.getCustomerAddresses as jest.Mock) = jest
      .fn()
      .mockResolvedValue({
        success: true,
        data: {
          formattedAddresses: mockAddresses,
        },
      })

    // Setup OrderService mocks
    ;(OrderService.getOrderType as jest.Mock) = jest
      .fn()
      .mockReturnValue('Inland')
    ;(OrderService.createOrder as jest.Mock) = jest
      .fn()
      .mockResolvedValue(mockOrderResponse)

    // Setup toast mock
    ;(toast.success as jest.Mock) = jest.fn()
    ;(toast.error as jest.Mock) = jest.fn()
  })

  it('should display the OrderConfirmationModal after successful order submission', async () => {
    const user = userEvent.setup()

    // Mock the order store to track modal state changes
    let addressModalOpen = false
    const mockSetShowAddressModal = jest.fn((value: boolean) => {
      addressModalOpen = value
    })

    ;(useOrderStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        showAddressModal: addressModalOpen,
        setShowAddressModal: mockSetShowAddressModal,
        setSubmitting: jest.fn(),
      }
      return selector ? selector(state) : state
    })

    const { rerender } = render(<CustomerCartTemplate />)

    // Find and click the submit order button
    const submitButton = screen.getByRole('button', {
      name: /actions.submitOrder/i,
    })
    expect(submitButton).toBeInTheDocument()

    await user.click(submitButton)

    // Wait for address fetching
    await waitFor(() => {
      expect(AddressService.getCustomerAddresses).toHaveBeenCalledWith(
        'company-1',
        'customer-1'
      )
    })

    // The modal should be set to open for multiple addresses
    await waitFor(() => {
      expect(mockSetShowAddressModal).toHaveBeenCalledWith(true)
    })

    // Update the modal state and rerender
    addressModalOpen = true
    rerender(<CustomerCartTemplate />)

    // Find and click address selection in modal
    const selectAddressesButton = await screen.findByText('Select Addresses')
    await user.click(selectAddressesButton)

    // Wait for order creation
    await waitFor(() => {
      expect(OrderService.createOrder).toHaveBeenCalledWith({
        companyId: 'company-1',
        companyNickname: 'alfe',
        customerId: 'customer-1',
        dispatchAddressId: 'address-1',
        invoiceAddressId: 'address-2',
        orderLines: [
          {
            stockId: 'prod-1',
            lineInfo: 'Test Product',
            quantity: 2,
            unitPrice: 100,
            vatPercent: 25,
          },
        ],
        country: 'Sweden',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: 'se',
      })
    })

    // Check that OrderConfirmationModal is displayed
    await waitFor(() => {
      const modal = screen.getByTestId('order-confirmation-modal')
      expect(modal).toBeInTheDocument()
    })

    // Verify order number is displayed
    expect(screen.getByText('Order Number: ORD-2024-001')).toBeInTheDocument()
  })

  it('should clear the cart after successful order submission', async () => {
    const user = userEvent.setup()
    const clearCartMock = jest.fn()

    ;(useCartStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        cart: mockCart,
        items: mockCart.items,
        summary: mockSummary,
        updateQuantity: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: clearCartMock,
        isLoading: false,
        companyId: 'company-1',
      }
      return selector ? selector(state) : state
    })

    // Re-mock useCartItems and useCartSummary for this test
    ;(useCartItems as jest.Mock).mockReturnValue(mockCart.items)
    ;(useCartSummary as jest.Mock).mockReturnValue(mockSummary)

    render(<CustomerCartTemplate />)

    // Submit order
    const submitButton = screen.getByRole('button', {
      name: /actions.submitOrder/i,
    })
    await user.click(submitButton)

    // Select addresses
    const selectAddressesButton = await screen.findByText('Select Addresses')
    await user.click(selectAddressesButton)

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByTestId('order-confirmation-modal')).toBeInTheDocument()
    })

    // Click close button to trigger cart clearing
    const closeButton = screen.getByRole('button', { name: /Close/i })
    await user.click(closeButton)

    // Now cart should be cleared
    await waitFor(() => {
      expect(clearCartMock).toHaveBeenCalled()
    })
  })

  it('should close the modal when close button is clicked', async () => {
    const user = userEvent.setup()

    render(<CustomerCartTemplate />)

    // Submit order
    const submitButton = screen.getByRole('button', {
      name: /actions.submitOrder/i,
    })
    await user.click(submitButton)

    // Select addresses
    const selectAddressesButton = await screen.findByText('Select Addresses')
    await user.click(selectAddressesButton)

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByTestId('order-confirmation-modal')).toBeInTheDocument()
    })

    // Click close button
    const closeButton = screen.getByRole('button', { name: /Close/i })
    await user.click(closeButton)

    // Modal should be removed
    await waitFor(() => {
      expect(
        screen.queryByTestId('order-confirmation-modal')
      ).not.toBeInTheDocument()
    })
  })

  it('should pass correct order data to the modal', async () => {
    const user = userEvent.setup()

    render(<CustomerCartTemplate />)

    // Submit order
    const submitButton = screen.getByRole('button', {
      name: /actions.submitOrder/i,
    })
    await user.click(submitButton)

    // Select addresses
    const selectAddressesButton = await screen.findByText('Select Addresses')
    await user.click(selectAddressesButton)

    // Wait for modal
    await waitFor(() => {
      expect(screen.getByTestId('order-confirmation-modal')).toBeInTheDocument()
    })

    // Get the mock of OrderConfirmationModal
    const {
      OrderConfirmationModal,
    } = require('@/components/organisms/OrderConfirmationModal')

    // Check that modal was called with correct props (first argument only)
    expect(OrderConfirmationModal.mock.calls[0][0]).toMatchObject({
      isOpen: true,
      orderData: expect.objectContaining({
        orderNumber: 'ORD-2024-001',
        orderDate: '2024-01-15',
        customerTitle: 'Test Customer',
        customerId: 'customer-1',
      }),
      dispatchAddress: expect.objectContaining({
        id: 'address-1',
        fullAddress: expect.objectContaining({
          address_nickname: 'Main Office',
          city: 'Stockholm',
          country: 'Sweden',
          line_1: '123 Test Street',
        }),
      }),
      invoiceAddress: expect.objectContaining({
        id: 'address-2',
        fullAddress: expect.objectContaining({
          address_nickname: 'Billing Address',
          city: 'Stockholm',
          country: 'Sweden',
          line_1: '456 Invoice Lane',
        }),
      }),
      orderLines: expect.arrayContaining([
        expect.objectContaining({
          stockId: 'prod-1',
          lineInfo: 'Test Product',
          quantity: 2,
          unitPrice: 100,
          vatPercent: 25,
        }),
      ]),
      orderSummary: expect.objectContaining({
        subtotal: 200,
        vatTotal: 50,
        total: 250,
      }),
      orderMetadata: expect.objectContaining({
        orderType: 'Inland',
        orderLanguage: 'se',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        totalItems: 1,
        totalQuantity: 2,
      }),
    })
  })
})
