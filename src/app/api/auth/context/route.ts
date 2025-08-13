/**
 * Secure Auth Context API Route
 * SOLID Principles: SRP - Single responsibility for providing auth context
 * Design Patterns: API Route Pattern, Security Pattern
 * Dependencies: Clerk auth, Customer service
 *
 * SECURITY: This route validates everything server-side.
 * Client cannot manipulate the response.
 */

import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export interface SecureAuthContext {
  isAuthenticated: boolean
  userId: string | null
  role: 'admin' | 'customer' | null
  customerIds: string[]
  activeCustomerId: string | null
  canAddToCart: boolean
  canBookmark: boolean
  canAccessAdmin: boolean
  canAccessCustomerFeatures: boolean
}

export async function GET() {
  try {
    // Get auth data from Clerk (server-side, cannot be manipulated)
    const { userId } = await auth()
    const user = await currentUser()

    // Not authenticated
    if (!userId || !user) {
      return NextResponse.json<SecureAuthContext>({
        isAuthenticated: false,
        userId: null,
        role: null,
        customerIds: [],
        activeCustomerId: null,
        canAddToCart: false,
        canBookmark: false,
        canAccessAdmin: false,
        canAccessCustomerFeatures: false,
      })
    }

    // Extract metadata from user.publicMetadata (server-side source of truth)
    const role = user.publicMetadata?.['role'] as 'admin' | 'customer' | null
    const customerIds = (user.publicMetadata?.['customerids'] as string[]) || []

    // Get active customer from cookies (server-side validated)
    const cookieStore = await cookies()
    const activeCustomerCookie = cookieStore.get('active_customer_id')
    // Fallback to legacy cookie name for backwards compatibility
    const legacyCookie = cookieStore.get('impersonating_customer_id')

    const activeCustomerId =
      activeCustomerCookie?.value || legacyCookie?.value || null

    // Validate active customer is in allowed list
    let validatedActiveCustomer: string | null = null
    if (activeCustomerId) {
      if (role === 'admin') {
        // Admin can impersonate any customer
        validatedActiveCustomer = activeCustomerId
      } else if (
        role === 'customer' &&
        customerIds.includes(activeCustomerId)
      ) {
        // Customer can only select from their own accounts
        validatedActiveCustomer = activeCustomerId
      } else {
      }
      // If validation fails, activeCustomer remains null
    } else {
    }

    // Server-side authorization logic (cannot be bypassed)
    const canAccessAdmin = role === 'admin'
    const canAccessCustomerFeatures =
      (role === 'customer' || role === 'admin') &&
      validatedActiveCustomer !== null

    const canAddToCart =
      role === 'admin' ||
      (role === 'customer' && validatedActiveCustomer !== null)

    const canBookmark =
      (role === 'customer' || role === 'admin') &&
      validatedActiveCustomer !== null

    // Return secure context
    const response: SecureAuthContext = {
      isAuthenticated: true,
      userId,
      role,
      customerIds,
      activeCustomerId: validatedActiveCustomer,
      canAddToCart,
      canBookmark,
      canAccessAdmin,
      canAccessCustomerFeatures,
    }

    return NextResponse.json<SecureAuthContext>(response)
  } catch (error) {
    console.error('Auth context error:', error)
    // On error, return unauthenticated state
    return NextResponse.json<SecureAuthContext>({
      isAuthenticated: false,
      userId: null,
      role: null,
      customerIds: [],
      activeCustomerId: null,
      canAddToCart: false,
      canBookmark: false,
      canAccessAdmin: false,
      canAccessCustomerFeatures: false,
    })
  }
}

// Cache for 10 seconds to reduce server load
export const revalidate = 10
