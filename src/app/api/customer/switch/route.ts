/**
 * Customer Switch API Route - Sets active customer in HTTP-only cookie
 * SOLID Principles: SRP - Single responsibility for customer switching
 * Design Patterns: Facade Pattern over cookie management
 * Dependencies: Next.js cookies, Clerk auth
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth, currentUser } from '@clerk/nextjs/server'
import type {
  CustomerSwitchRequest,
  CustomerSwitchResponse,
} from '@/lib/types/customer.types'

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authData = await auth()
    const user = await currentUser()

    if (!authData.userId || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as CustomerSwitchResponse,
        { status: 401 }
      )
    }

    // Parse request
    const body: CustomerSwitchRequest = await request.json()
    const { customerId } = body

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Customer ID required',
        } as CustomerSwitchResponse,
        { status: 400 }
      )
    }

    // Get user role and customer IDs
    const userRole = user.publicMetadata?.['role'] as string
    const customerIds = user.publicMetadata?.['customerids'] as
      | string[]
      | undefined

    // Admin can switch to any customer
    if (userRole === 'admin') {
      // Set active customer cookie for admin (same as customer role)
      const cookieStore = await cookies()

      cookieStore.set('active_customer_id', customerId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      // Create response with explicit cookie header
      const response = NextResponse.json({
        success: true,
        customerId,
      } as CustomerSwitchResponse)

      // Also set cookie in response headers for redundancy
      response.cookies.set('active_customer_id', customerId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    }

    // Regular customer can only switch to their own accounts
    if (userRole === 'customer') {
      // Validate customer has access to this ID
      if (!customerIds || !customerIds.includes(customerId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Access denied to this customer account',
          } as CustomerSwitchResponse,
          { status: 403 }
        )
      }

      // Set active customer cookie
      const cookieStore = await cookies()
      cookieStore.set('active_customer_id', customerId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })

      return NextResponse.json({
        success: true,
        customerId,
      } as CustomerSwitchResponse)
    }

    return NextResponse.json(
      { success: false, error: 'Invalid role' } as CustomerSwitchResponse,
      { status: 403 }
    )
  } catch (error) {
    console.error('Customer switch error:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to switch customer',
      } as CustomerSwitchResponse,
      { status: 500 }
    )
  }
}
