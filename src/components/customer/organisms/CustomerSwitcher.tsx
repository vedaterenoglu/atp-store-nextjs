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
import { useSecureAuth } from '@/hooks/use-secure-auth'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import type {
  CustomerAccount,
  ActiveCustomerContext,
} from '@/lib/types/customer.types'

export function CustomerSwitcher() {
  const { t } = useSafeTranslation('common')
  const { user } = useUser()
  const { refreshAuth } = useSecureAuth()
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
  const customerIds = user?.publicMetadata?.['customerids'] as
    | string[]
    | undefined
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
        console.error(
          '🔍 CustomerSwitcher: Failed to get active customer:',
          error
        )
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
    // Only check once per session per user
    if (hasCheckedInitialState.current) {
      return
    }

    // Wait for ALL data to load (both customers and context)
    if (isLoading || isContextLoading) {
      return
    }

    // Must have customers loaded
    if (customers.length === 0 && isCustomer) return

    // For customers with single account - auto-select it
    if (isCustomer && customerIds && customerIds.length === 1) {
      const singleCustomerId = customerIds[0]
      if (!singleCustomerId) return // Type guard for undefined

      hasCheckedInitialState.current = true // Set BEFORE making the call

      // If already has this customer selected, don't reload
      if (activeContext?.customerId === singleCustomerId) {
        return
      }
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
    if (
      isCustomer &&
      customerIds &&
      customerIds.length > 1 &&
      customers.length > 0
    ) {
      hasCheckedInitialState.current = true // Set BEFORE checking

      // If customer already selected, don't open modal
      if (activeContext?.customerId) {
        return
      }
      // Open modal for welcome selection
      setIsWelcomeModal(true)
      setSearchModalOpen(true)
      return
    }

    // For admins - open modal if no customer selected
    if (isAdmin) {
      // Check if we just selected a customer (after page refresh)
      if (typeof window !== 'undefined') {
        const justSelected = sessionStorage.getItem('customer_just_selected')
        if (justSelected === 'true') {
          sessionStorage.removeItem('customer_just_selected')
          hasCheckedInitialState.current = true
          return
        }
      }

      // Don't proceed if admin customers are still loading
      if (isAdminCustomersLoading) {
        return
      }

      hasCheckedInitialState.current = true // Mark as checked

      // If admin has no active customer selected, open modal for selection
      if (!activeContext?.customerId) {
        setIsWelcomeModal(true)
        setSearchModalOpen(true)
        // Fetch all customers for admin to choose from
        if (allCustomers.length === 0 && !isAdminCustomersLoading) {
          // Fetch all customers for admin search using service
          const fetchAllCustomers = async () => {
            if (!isAdmin) return

            setIsAdminCustomersLoading(true)
            try {
              const data = await customerService.fetchAllActiveCustomers()
              setAllCustomers(data.customers || [])
              setIsAdminCustomersLoading(false)
            } catch (error) {
              console.error('Failed to fetch all customers:', error)
              toast.error(t('messages.customer.failedToLoadList'))
              setIsAdminCustomersLoading(false)
            }
          }
          fetchAllCustomers()
        }
      }
      return
    }

    // Mark as checked if we reach here (for other cases)
    hasCheckedInitialState.current = true
  }, [
    isLoading,
    isContextLoading,
    isCustomer,
    isAdmin,
    customerIds,
    customers.length,
    allCustomers.length,
    isAdminCustomersLoading,
    activeContext?.customerId,
    t,
  ])

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
        const titlesData = await customerService.fetchCustomerTitles([
          customerId,
        ])
        const customer = titlesData.customers?.[0]

        if (customer) {
          setActiveContext({
            customerId,
            customerTitle:
              customer.customer_title || customer.customer_nickname || null,
            isImpersonating: isAdmin,
          })
        }

        const customerName = customer?.customer_title || customerId
        toast.success(
          t('messages.customer.switchedTo').replace(
            '{{customer}}',
            customerName
          )
        )

        // Force refresh the auth context to get updated permissions
        await refreshAuth()

        // Mark that we just selected a customer (will persist through refresh)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('customer_just_selected', 'true')
        }

        // Small delay for better UX - allows toast to be visible
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        toast.error(data.error || t('messages.customer.failedToSwitch'))
      }
    } catch (error) {
      console.error('Failed to switch customer:', error)
      toast.error(t('messages.customer.failedToSwitchAccount'))
    }
  }

  const handleSearchCustomers = () => {
    setIsWelcomeModal(false) // Not a welcome modal when manually opened
    setSearchModalOpen(true)
    if (isAdmin && allCustomers.length === 0) {
      // Fetch all customers for admin search using service
      const fetchAllCustomers = async () => {
        if (!isAdmin) return

        setIsAdminCustomersLoading(true)
        try {
          const data = await customerService.fetchAllActiveCustomers()
          setAllCustomers(data.customers || [])
          setIsAdminCustomersLoading(false)
        } catch (error) {
          console.error('Failed to fetch all customers:', error)
          toast.error('Failed to load customer list')
          setIsAdminCustomersLoading(false)
        }
      }
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
        onOpenChange={open => {
          setSearchModalOpen(open)
          if (!open) {
            setIsWelcomeModal(false) // Reset welcome flag when closed
          }
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
