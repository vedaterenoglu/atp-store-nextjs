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
    
    console.log('🔍 API/context: User metadata:', {
      userId,
      role,
      customerIds,
      publicMetadata: user.publicMetadata,
      hasCustomerIds: Array.isArray(user.publicMetadata?.['customerids']),
      customerIdsType: typeof user.publicMetadata?.['customerids']
    })

    // Get active customer from cookies (server-side validated)
    const cookieStore = await cookies()
    const activeCustomerCookie = cookieStore.get('active_customer_id')
    // Fallback to legacy cookie name for backwards compatibility
    const legacyCookie = cookieStore.get('impersonating_customer_id')
    
    console.log('🍪 API/context: Reading cookies for role:', role)
    console.log('🍪 API/context: active_customer_id cookie:', activeCustomerCookie?.value || 'NOT FOUND')
    console.log('🍪 API/context: impersonating_customer_id cookie:', legacyCookie?.value || 'NOT FOUND')
    
    const activeCustomerId = activeCustomerCookie?.value || legacyCookie?.value || null
    console.log('🍪 API/context: Final activeCustomerId:', activeCustomerId || 'NONE')

    // Validate active customer is in allowed list
    let validatedActiveCustomer: string | null = null
    if (activeCustomerId) {
      console.log('🔍 API/context: Validating customer selection')
      console.log('🔍 API/context: Role:', role)
      console.log('🔍 API/context: Active Customer ID:', activeCustomerId)
      console.log('🔍 API/context: Customer IDs array:', customerIds)
      console.log('🔍 API/context: Customer IDs length:', customerIds.length)
      console.log('🔍 API/context: Is in array?', customerIds.includes(activeCustomerId))
      
      // Additional debug for array check
      if (customerIds.length > 0) {
        customerIds.forEach((id, index) => {
          console.log(`🔍 API/context: customerIds[${index}]: "${id}" === "${activeCustomerId}"?`, id === activeCustomerId)
        })
      }
      
      if (role === 'admin') {
        // Admin can impersonate any customer
        validatedActiveCustomer = activeCustomerId
        console.log('✅ API/context: Admin validated with customer:', validatedActiveCustomer)
      } else if (role === 'customer' && customerIds.includes(activeCustomerId)) {
        // Customer can only select from their own accounts
        validatedActiveCustomer = activeCustomerId
        console.log('✅ API/context: Customer validated with customer:', validatedActiveCustomer)
      } else {
        console.log('⚠️ API/context: Validation failed - customer ID not in allowed list')
        console.log('⚠️ API/context: Reason:', {
          isCustomerRole: role === 'customer',
          hasCustomerIds: customerIds.length > 0,
          isInArray: customerIds.includes(activeCustomerId)
        })
      }
      // If validation fails, activeCustomer remains null
    } else {
      console.log('⚠️ API/context: No active customer ID in cookies')
    }

    // Server-side authorization logic (cannot be bypassed)
    const canAccessAdmin = role === 'admin'
    const canAccessCustomerFeatures = 
      (role === 'customer' || role === 'admin') && validatedActiveCustomer !== null
    
    const canAddToCart = 
      role === 'admin' || 
      (role === 'customer' && validatedActiveCustomer !== null)
    
    const canBookmark = 
      (role === 'customer' || role === 'admin') && validatedActiveCustomer !== null

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
    
    console.log('📤 API/context: Returning response:', response)
    
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