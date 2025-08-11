/**
 * Customer Switcher Organism - Complete customer switching UI
 * SOLID Principles: SRP - Single responsibility for customer switching
 * Design Patterns: Atomic Design - Organism, Composite Pattern
 * Dependencies: Customer molecules, service integration
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { CustomerDropdown } from '../molecules/CustomerDropdown'
import { CustomerSearchModal } from './CustomerSearchModal'
import { toast } from '@/lib/utils/toast'
import type {
  CustomerAccount,
  ActiveCustomerContext,
} from '@/lib/types/customer.types'

export function CustomerSwitcher() {
  const { user } = useUser()
  const [activeContext, setActiveContext] =
    useState<ActiveCustomerContext | null>(null)
  const [customers, setCustomers] = useState<CustomerAccount[]>([])
  const [allCustomers, setAllCustomers] = useState<CustomerAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [isWelcomeModal, setIsWelcomeModal] = useState(false)
  const hasCheckedInitialState = useRef(false)

  const userRole = user?.publicMetadata?.['role'] as string | undefined
  const customerIds = user?.publicMetadata?.['customerids'] as string[] | undefined
  const isAdmin = userRole === 'admin'
  const isCustomer = userRole === 'customer'

  // Reset state when user changes (sign out/sign in)
  useEffect(() => {
    // Reset the checked flag when user changes
    hasCheckedInitialState.current = false
  }, [user?.id])

  // Fetch active customer context
  useEffect(() => {
    if (!user) {
      // User signed out - reset states
      setActiveContext(null)
      setCustomers([])
      setAllCustomers([])
      return
    }

    fetch('/api/customer/active')
      .then(res => res.json())
      .then((data: ActiveCustomerContext) => {
        setActiveContext(data)
      })
      .catch(error => {
        console.error('Failed to get active customer:', error)
      })
  }, [user])

  // Fetch customer accounts
  useEffect(() => {
    if (!user) return

    if (isCustomer && customerIds && customerIds.length > 0) {
      // Fetch titles for customer's accounts
      fetch('/api/customers/titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerIds }),
      })
        .then(res => res.json())
        .then(data => {
          setCustomers(data.customers || [])
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Failed to fetch customer titles:', error)
          setIsLoading(false)
        })
    } else if (isAdmin) {
      // If admin is impersonating, fetch that customer's title
      if (activeContext?.customerId) {
        fetch('/api/customers/titles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerIds: [activeContext.customerId] }),
        })
          .then(res => res.json())
          .then(data => {
            setCustomers(data.customers || [])
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Failed to fetch customer title:', error)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [user, isCustomer, isAdmin, customerIds, activeContext?.customerId])

  // Auto-open modal on sign-in for customer selection
  useEffect(() => {
    // Only check once per session per user
    if (hasCheckedInitialState.current) return
    
    // Wait for data to load
    if (isLoading) return
    
    // Must have customers loaded
    if (customers.length === 0 && isCustomer) return
    
    // For customers with single account - auto-select it
    if (isCustomer && customerIds && customerIds.length === 1) {
      const singleCustomerId = customerIds[0]
      hasCheckedInitialState.current = true  // Set BEFORE making the call
      // Auto-select the single customer ID
      fetch('/api/customer/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: singleCustomerId }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // Reload to apply the change
            window.location.reload()
          }
        })
        .catch(error => {
          console.error('Failed to auto-select customer:', error)
        })
      return
    }
    
    // For customers with multiple accounts - ALWAYS open modal on sign-in
    if (isCustomer && customerIds && customerIds.length > 1 && customers.length > 0) {
      hasCheckedInitialState.current = true  // Set BEFORE opening modal
      // Always open modal for welcome selection, even if cookie exists
      setIsWelcomeModal(true)
      setSearchModalOpen(true)
      return
    }
    
    // For admins, also check if they need to select a customer
    if (isAdmin) {
      hasCheckedInitialState.current = true  // Always mark as checked for admin
      // If admin has no active customer (not impersonating), they might want to select one
      // But we don't force it - admin can work without impersonating
      // Only auto-open if they previously had an impersonation that's no longer valid
      if (activeContext?.isImpersonating && !activeContext?.customerId) {
        setSearchModalOpen(true)
        if (allCustomers.length === 0) {
          fetchAllCustomers()
        }
      }
      return
    }
    
    // Mark as checked if we reach here (for other cases)
    hasCheckedInitialState.current = true
  })

  // Fetch all customers for admin search
  const fetchAllCustomers = async () => {
    if (!isAdmin) return

    try {
      const response = await fetch('/api/admin/customers')
      const data = await response.json()
      setAllCustomers(data.customers || [])
    } catch (error) {
      console.error('Failed to fetch all customers:', error)
      toast.error('Failed to load customer list')
    }
  }

  const handleCustomerSwitch = async (customerId: string) => {
    try {
      const response = await fetch('/api/customer/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId }),
      })

      const data = await response.json()
      if (data.success) {
        // Update active context
        setActiveContext({
          customerId,
          customerTitle: null,
          isImpersonating: isAdmin,
        })

        // Fetch title for the new customer
        const titlesResponse = await fetch('/api/customers/titles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerIds: [customerId] }),
        })

        const titlesData = await titlesResponse.json()
        const customer = titlesData.customers?.[0]
        if (customer) {
          setActiveContext({
            customerId,
            customerTitle:
              customer.customer_title || customer.customer_nickname || null,
            isImpersonating: isAdmin,
          })
        }

        toast.success(
          `Switched to customer: ${customer?.customer_title || customerId}`
        )

        // Refresh the page to update all components
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        toast.error(data.error || 'Failed to switch customer')
      }
    } catch (error) {
      console.error('Failed to switch customer:', error)
      toast.error('Failed to switch customer account')
    }
  }

  const handleSearchCustomers = () => {
    setIsWelcomeModal(false)  // Not a welcome modal when manually opened
    setSearchModalOpen(true)
    if (isAdmin && allCustomers.length === 0) {
      fetchAllCustomers()
    }
  }

  // Don't show switcher if user doesn't have access
  if (!isCustomer && !isAdmin) {
    return null
  }

  // Don't show if customer has no accounts
  if (isCustomer && (!customerIds || customerIds.length === 0)) {
    return null
  }

  // For customers with single account, don't show switcher
  if (
    isCustomer &&
    customerIds &&
    customerIds.length === 1 &&
    activeContext?.customerId
  ) {
    return null
  }

  return (
    <>
      <CustomerDropdown
        customers={customers}
        activeCustomerId={activeContext?.customerId || null}
        onSelect={handleCustomerSwitch}
        onSearchClick={handleSearchCustomers}
        isLoading={isLoading}
        isAdmin={isAdmin}
      />

      <CustomerSearchModal
        open={searchModalOpen}
        onOpenChange={(open) => {
          setSearchModalOpen(open)
          if (!open) setIsWelcomeModal(false)  // Reset welcome flag when closed
        }}
        customers={isAdmin ? allCustomers : customers}
        onSelect={handleCustomerSwitch}
        isLoading={isAdmin ? allCustomers.length === 0 : false}
        isAdmin={isAdmin}
        showWelcome={isWelcomeModal}
      />
    </>
  )
}
