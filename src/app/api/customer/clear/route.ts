/**
 * Clear Customer API Route - Clears active customer cookie
 * SOLID Principles: SRP - Single responsibility for clearing customer context
 * Design Patterns: Facade Pattern
 * Dependencies: Next.js cookies, Clerk auth
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function POST() {
  try {
    // Authenticate user
    const authData = await auth()
    const user = await currentUser()

    if (!authData.userId || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const cookieStore = await cookies()
    const userRole = user.publicMetadata?.['role'] as string

    // Clear active customer cookie for both roles (we use same cookie name now)
    cookieStore.delete('active_customer_id')
    
    // Also clear legacy cookie name for backwards compatibility
    if (userRole === 'admin') {
      cookieStore.delete('impersonating_customer_id')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Clear customer error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clear customer' },
      { status: 500 }
    )
  }
}
