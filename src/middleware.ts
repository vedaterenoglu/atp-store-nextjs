/**
 * Clerk Authentication Middleware
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for route protection
 * - OCP: Open for extension with new protected routes
 * - DIP: Depends on Clerk middleware abstraction
 *
 * Design Patterns:
 * - Middleware Pattern: Intercepts requests for authentication
 * - Strategy Pattern: Route matching determines protection strategy
 * - Chain of Responsibility: Part of Next.js middleware chain
 *
 * Architecture: Edge runtime middleware that protects specific routes
 * using Clerk's authentication system with SSOT auth logic
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/orders(.*)',
  '/admin(.*)',
  '/cart(.*)',
  '/favorites(.*)',
])

// Define routes that require specific roles
const roleProtectedRoutes: {
  pattern: RegExp
  requiredRole: string
  requiresCustomerId?: boolean
}[] = [
  { pattern: /^\/admin(.*)/, requiredRole: 'admin' },
  {
    pattern: /^\/cart(.*)/,
    requiredRole: 'customer',
    requiresCustomerId: true,
  },
  {
    pattern: /^\/favorites(.*)/,
    requiredRole: 'customer',
    requiresCustomerId: true,
  },
]

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  // Check if route requires authentication
  if (isProtectedRoute(req)) {
    // Not signed in - redirect to custom sign-in page
    if (!userId) {
      return redirectToSignIn({
        returnBackUrl: req.nextUrl.pathname,
      })
    }

    // Check role-based access using SSOT logic
    const pathname = req.nextUrl.pathname

    // Extract auth data with consistent priority (sessionClaims > publicMetadata)
    const metadata = sessionClaims?.['metadata'] as
      | { role?: string; customerid?: string }
      | undefined
    const userRole = metadata?.role
    const customerId = metadata?.customerid

    // Check each protected route pattern
    for (const {
      pattern,
      requiredRole,
      requiresCustomerId,
    } of roleProtectedRoutes) {
      if (pattern.test(pathname)) {
        // Check role requirement
        if (userRole !== requiredRole) {
          const homeUrl = new URL('/', req.url)
          homeUrl.searchParams.set('error', 'unauthorized')
          homeUrl.searchParams.set('required_role', requiredRole)
          return NextResponse.redirect(homeUrl)
        }

        // Check customer ID requirement for customer routes
        if (requiresCustomerId && !customerId) {
          const profileUrl = new URL('/profile/complete', req.url)
          profileUrl.searchParams.set('message', 'complete_profile')
          return NextResponse.redirect(profileUrl)
        }
      }
    }

    // All checks passed - protect the route
    await auth.protect()
  }

  // For non-protected routes, continue without auth
  return NextResponse.next()
})

export const config = {
  // Clerk middleware should run on all routes except static files and Next.js internals
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
