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
import { customerService } from '@/services/customer.service'
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
  const [isContextLoading, setIsContextLoading] = useState(true)
  const [isAdminCustomersLoading, setIsAdminCustomersLoading] = useState(false)
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

  // Fetch active customer context using service
  useEffect(() => {
    if (!user) {
      // User signed out - reset states
      setActiveContext(null)
      setCustomers([])
      setAllCustomers([])
      setIsContextLoading(false)
      return
    }

    setIsContextLoading(true)
    customerService
      .getActiveCustomer()
      .then((data: ActiveCustomerContext) => {
        setActiveContext(data)
        setIsContextLoading(false)
      })
      .catch(error => {
        console.error('Failed to get active customer:', error)
        setIsContextLoading(false)
      })
  }, [user])

  // Fetch customer accounts
  useEffect(() => {
    if (!user) return

    if (isCustomer && customerIds && customerIds.length > 0) {
      // Fetch titles for customer's accounts using service
      customerService
        .fetchCustomerTitles(customerIds)
        .then(data => {
          setCustomers(data.customers || [])
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Failed to fetch customer titles:', error)
          setIsLoading(false)
        })
    } else if (isAdmin) {
      // If admin is impersonating, fetch that customer's title using service
      if (activeContext?.customerId) {
        customerService
          .fetchCustomerTitles([activeContext.customerId])
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
    console.log('CustomerSwitcher useEffect running:', {
      hasChecked: hasCheckedInitialState.current,
      isLoading,
      isContextLoading,
      isCustomer,
      customersLength: customers.length,
      customerIds,
      activeCustomerId: activeContext?.customerId
    })
    
    // Only check once per session per user
    if (hasCheckedInitialState.current) return
    
    // Wait for ALL data to load (both customers and context)
    if (isLoading || isContextLoading) return
    
    // Must have customers loaded
    if (customers.length === 0 && isCustomer) return
    
    // For customers with single account - auto-select it
    if (isCustomer && customerIds && customerIds.length === 1) {
      const singleCustomerId = customerIds[0]
      hasCheckedInitialState.current = true  // Set BEFORE making the call
      
      // If already has this customer selected, don't reload
      if (activeContext?.customerId === singleCustomerId) {
        console.log('Single customer already selected:', singleCustomerId)
        return
      }
      
      console.log('Auto-selecting single customer:', singleCustomerId)
      // Auto-select the single customer ID using service
      customerService
        .switchCustomer(singleCustomerId)
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
    
    // For customers with multiple accounts - open modal ONLY if no customer selected
    if (isCustomer && customerIds && customerIds.length > 1 && customers.length > 0) {
      hasCheckedInitialState.current = true  // Set BEFORE checking
      
      // If customer already selected, don't open modal
      if (activeContext?.customerId) {
        console.log('Customer already selected, not opening modal:', activeContext.customerId)
        return
      }
      
      console.log('Opening modal for multiple customers - no active customer')
      // Open modal for welcome selection
      setIsWelcomeModal(true)
      setSearchModalOpen(true)
      return
    }
    
    // For admins - open modal if no customer selected
    if (isAdmin) {
      hasCheckedInitialState.current = true  // Mark as checked
      
      // If admin has no active customer selected, open modal for selection
      if (!activeContext?.customerId) {
        console.log('Opening modal for admin - no customer selected')
        setIsWelcomeModal(true)
        setSearchModalOpen(true)
        // Fetch all customers for admin to choose from
        if (allCustomers.length === 0) {
          fetchAllCustomers()
        }
      } else {
        console.log('Admin already has customer selected:', activeContext.customerId)
      }
      return
    }
    
    // Mark as checked if we reach here (for other cases)
    hasCheckedInitialState.current = true
  }, [isLoading, isContextLoading, isCustomer, isAdmin, customerIds, customers.length, activeContext?.customerId])

  // Fetch all customers for admin search using service
  const fetchAllCustomers = async () => {
    if (!isAdmin) return

    console.log('Fetching all customers for admin...')
    setIsAdminCustomersLoading(true)
    try {
      const data = await customerService.fetchAllActiveCustomers()
      console.log('Admin customers response:', {
        customersCount: data.customers?.length || 0,
        customers: data.customers,
      })
      setAllCustomers(data.customers || [])
      setIsAdminCustomersLoading(false)
    } catch (error) {
      console.error('Failed to fetch all customers:', error)
      toast.error('Failed to load customer list')
      setIsAdminCustomersLoading(false)
    }
  }

  const handleCustomerSwitch = async (customerId: string) => {
    try {
      // Switch customer using service
      const data = await customerService.switchCustomer(customerId)
      
      if (data.success) {
        // Update active context
        setActiveContext({
          customerId,
          customerTitle: null,
          isImpersonating: isAdmin,
        })

        // Fetch title for the new customer using service
        const titlesData = await customerService.fetchCustomerTitles([customerId])
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
        isLoading={isAdmin ? isAdminCustomersLoading : false}
        isAdmin={isAdmin}
        showWelcome={isWelcomeModal}
      />
    </>
  )
}
