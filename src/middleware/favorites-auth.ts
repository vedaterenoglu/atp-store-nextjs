/**
 * Favorites Route Protection Middleware
 * SOLID Principles: SRP - Single responsibility for route protection
 * Design Patterns: Middleware Pattern, Guard Pattern
 * Dependencies: Clerk auth
 */

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function protectFavoritesRoute() {
  const { userId, sessionClaims } = await auth()

  // Check if user is signed in
  if (!userId) {
    return NextResponse.redirect('/sign-in')
  }

  // Check role and customerid
  const metadata = sessionClaims?.['metadata'] as
    | Record<string, unknown>
    | undefined
  const userRole = metadata?.['role'] as string | undefined
  const customerId = metadata?.['customerid'] as string | undefined

  // Only allow customers with customerid
  if (userRole !== 'customer' || !customerId) {
    return NextResponse.redirect('/products')
  }

  return NextResponse.next()
}
