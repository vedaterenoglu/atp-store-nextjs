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
 * using Clerk's authentication system
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
const roleProtectedRoutes: { pattern: RegExp; requiredRole: string }[] = [
  { pattern: /^\/admin(.*)/, requiredRole: 'customer' },
  { pattern: /^\/cart(.*)/, requiredRole: 'customer' },
  { pattern: /^\/favorites(.*)/, requiredRole: 'customer' },
]

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  // Check if route requires authentication
  if (isProtectedRoute(req)) {
    // Not signed in - redirect to sign-in
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname)
      return redirectToSignIn({ returnBackUrl: req.nextUrl.pathname })
    }

    // Check role-based access
    const pathname = req.nextUrl.pathname
    for (const { pattern, requiredRole } of roleProtectedRoutes) {
      if (pattern.test(pathname)) {
        const metadata = sessionClaims?.['metadata'] as
          | { role?: string; customerid?: string }
          | undefined
        const userRole = metadata?.['role']

        // Wrong role - redirect to home with error
        if (userRole !== requiredRole) {
          const homeUrl = new URL('/', req.url)
          homeUrl.searchParams.set('error', 'unauthorized')
          homeUrl.searchParams.set('required_role', requiredRole)
          return NextResponse.redirect(homeUrl)
        }

        // Special check for favorites - must have customerid
        if (pathname.startsWith('/favorites') && !metadata?.['customerid']) {
          const homeUrl = new URL('/', req.url)
          homeUrl.searchParams.set('error', 'no_customer_id')
          return NextResponse.redirect(homeUrl)
        }
      }
    }

    // Authentication and role check passed
    await auth.protect()
  }

  // For non-protected routes, continue without auth
  return NextResponse.next()
})

export const config = {
  // Clerk middleware should run on all routes except static files and Next.js internals
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
