/**
 * Customer route guard component
 * SOLID Principles: SRP - Single responsibility for customer authentication guard
 * Design Patterns: Guard Pattern, HOC Pattern
 * Dependencies: React, Clerk, Customer Service
 */

'use client'

import { useUser, SignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/schadcn/dialog'
import { toast } from '@/lib/utils/toast'

interface CustomerRouteGuardProps {
  children: React.ReactNode
  requireActiveCustomer?: boolean
}

export function CustomerRouteGuard({
  children,
  requireActiveCustomer = true,
}: CustomerRouteGuardProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [activeCustomerId, setActiveCustomerId] = useState<string | null>(null)
  const [checkingCustomer, setCheckingCustomer] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    // Check if user is signed in
    if (!isSignedIn) {
      setShowSignInModal(true)
      setCheckingCustomer(false)
      return
    }

    // Check if user has customer role
    const userRole = user?.publicMetadata?.['role'] as string
    if (userRole !== 'customer') {
      setShowSignInModal(true)
      setCheckingCustomer(false)
      return
    }

    // Check for active customer from cookie
    if (requireActiveCustomer) {
      fetch('/api/customer/active')
        .then(res => res.json())
        .then(data => {
          if (data.customerId) {
            setActiveCustomerId(data.customerId)
            setShowSignInModal(false)
          } else {
            // User needs to select a customer
            const customerIds = user?.publicMetadata?.customerids as string[] | undefined
            if (customerIds && customerIds.length > 0) {
              toast.warning('Please select a customer account to continue', {
                position: 'bottom-left',
              })
            } else {
              toast.error('No customer accounts found for your user', {
                position: 'bottom-left',
              })
              setShowSignInModal(true)
            }
          }
          setCheckingCustomer(false)
        })
        .catch(error => {
          console.error('Failed to check active customer:', error)
          setCheckingCustomer(false)
        })
    } else {
      // All checks passed
      setShowSignInModal(false)
      setCheckingCustomer(false)
    }
  }, [isLoaded, isSignedIn, user, requireActiveCustomer])

  // Loading state
  if (!isLoaded || checkingCustomer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Check authentication and authorization
  const hasAccess =
    isSignedIn &&
    user?.publicMetadata?.['role'] === 'customer' &&
    (!requireActiveCustomer || activeCustomerId)

  return (
    <>
      {hasAccess ? (
        children
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Customer Access Required
            </h2>
            <p className="text-muted-foreground mb-6">
              {!isSignedIn 
                ? 'Please sign in with a valid customer account to access this area.'
                : !activeCustomerId && requireActiveCustomer
                ? 'Please select a customer account from the dropdown in the navigation bar.'
                : 'Please sign in with a valid customer account to access this area.'}
            </p>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-md">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none p-0',
              },
            }}
            redirectUrl="/customer/dashboard"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
