/**
 * Active Customer API Route - Gets current active customer from cookie
 * SOLID Principles: SRP - Single responsibility for retrieving active customer
 * Design Patterns: Facade Pattern
 * Dependencies: Next.js cookies, Clerk auth
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth, currentUser } from '@clerk/nextjs/server'
import type { ActiveCustomerContext } from '@/lib/types/customer.types'

export async function GET() {
  try {
    // Authenticate user
    const authData = await auth()
    const user = await currentUser()

    if (!authData.userId || !user) {
      return NextResponse.json(
        {
          customerId: null,
          customerTitle: null,
          isImpersonating: false,
        } as ActiveCustomerContext,
        { status: 401 }
      )
    }

    const cookieStore = await cookies()
    const userRole = user.publicMetadata?.['role'] as string

    // Check for admin impersonation
    if (userRole === 'admin') {
      // Use the same cookie name as we set in switch route
      const activeId = cookieStore.get('active_customer_id')?.value

      // Also check legacy cookie for backwards compatibility
      const legacyId = cookieStore.get('impersonating_customer_id')?.value

      const impersonatingId = activeId || legacyId

      if (impersonatingId) {
        return NextResponse.json({
          customerId: impersonatingId,
          customerTitle: null, // Will be fetched separately
          isImpersonating: true,
        } as ActiveCustomerContext)
      }
    }

    // Check for regular customer active ID
    if (userRole === 'customer') {
      const activeId = cookieStore.get('active_customer_id')?.value
      const customerIds = user.publicMetadata?.['customerids'] as
        | string[]
        | undefined

      // Validate customer still has access
      if (activeId && customerIds?.includes(activeId)) {
        return NextResponse.json({
          customerId: activeId,
          customerTitle: null, // Will be fetched separately
          isImpersonating: false,
        } as ActiveCustomerContext)
      }
    }

    return NextResponse.json({
      customerId: null,
      customerTitle: null,
      isImpersonating: false,
    } as ActiveCustomerContext)
  } catch (error) {
    console.error('Get active customer error:', error)
    return NextResponse.json(
      {
        customerId: null,
        customerTitle: null,
        isImpersonating: false,
      } as ActiveCustomerContext,
      { status: 500 }
    )
  }
}
