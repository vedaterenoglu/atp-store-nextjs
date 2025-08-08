/**
 * Customer route guard component
 * SOLID Principles: SRP - Single responsibility for customer authentication guard
 * Design Patterns: Guard Pattern, HOC Pattern
 * Dependencies: React, Clerk
 */

'use client'

import { useUser, SignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/schadcn/dialog'

interface CustomerRouteGuardProps {
  children: React.ReactNode
  requireCustomerId?: boolean
}

export function CustomerRouteGuard({
  children,
  requireCustomerId = true,
}: CustomerRouteGuardProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  const [showSignInModal, setShowSignInModal] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    // Check if user is signed in
    if (!isSignedIn) {
      setShowSignInModal(true)
      return
    }

    // Check if user has customer role
    const userRole = user?.publicMetadata?.['role'] as string
    if (userRole !== 'customer') {
      setShowSignInModal(true)
      return
    }

    // Check if user has customerid (lowercase)
    if (requireCustomerId) {
      const customerid = user?.publicMetadata?.customerid as string
      if (!customerid) {
        console.error('User does not have customerid')
        setShowSignInModal(true)
        return
      }
    }

    // All checks passed
    setShowSignInModal(false)
  }, [isLoaded, isSignedIn, user, requireCustomerId])

  // Loading state
  if (!isLoaded) {
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
    (!requireCustomerId || user?.publicMetadata?.customerid)

  return (
    <>
      {hasAccess ? (
        children
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Sign in to view your cart
            </h2>
            <p className="text-muted-foreground mb-6">
              Please sign in with your customer account to access your shopping
              cart.
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
            redirectUrl="/cart"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
