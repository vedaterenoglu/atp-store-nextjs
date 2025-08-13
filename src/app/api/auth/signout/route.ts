/**
 * Sign Out API Route
 * SOLID Principles: SRP - Single responsibility for sign out cleanup
 * Design Patterns: API Route Pattern
 * Dependencies: Next.js cookies
 *
 * Handles cleanup when user signs out:
 * - Deletes active_customer_id cookie
 * - Returns success response
 */

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Delete the active_customer_id cookie (primary)
    cookieStore.delete({
      name: 'active_customer_id',
      path: '/',
      // Important: Match the same options used when setting the cookie
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    // Delete legacy impersonating_customer_id cookie (for backwards compatibility)
    cookieStore.delete({
      name: 'impersonating_customer_id',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    // Also try to delete with just the names (fallback)
    cookieStore.delete('active_customer_id')
    cookieStore.delete('impersonating_customer_id')

    return NextResponse.json({
      success: true,
      message: 'Sign out cleanup completed',
    })
  } catch (error) {
    console.error('Sign out cleanup error:', error)
    // Still return success to not block sign out
    return NextResponse.json({
      success: true,
      message: 'Sign out completed with warnings',
    })
  }
}

// Also handle GET for testing
export async function GET() {
  return POST()
}
