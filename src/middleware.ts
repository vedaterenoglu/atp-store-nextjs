/**
 * Clerk Authentication Middleware with Customer Context
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for route protection and customer validation
 * - OCP: Open for extension with new protected routes
 * - DIP: Depends on Clerk middleware abstraction
 *
 * Design Patterns:
 * - Middleware Pattern: Intercepts requests for authentication
 * - Strategy Pattern: Route matching determines protection strategy
 * - Chain of Responsibility: Part of Next.js middleware chain
 *
 * Architecture: Edge runtime middleware that protects specific routes
 * using Clerk's authentication system with SSOT auth logic and customer context
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/orders(.*)',
  '/admin(.*)',
  '/cart(.*)',
  '/favorites(.*)',
  '/customer(.*)',
])

// Define routes that require specific roles
const roleProtectedRoutes: {
  pattern: RegExp
  requiredRole: string
  requiresActiveCustomer?: boolean
}[] = [
  { pattern: /^\/admin(.*)/, requiredRole: 'admin' },
  {
    pattern: /^\/cart(.*)/,
    requiredRole: 'customer',
    requiresActiveCustomer: true,
  },
  {
    pattern: /^\/favorites(.*)/,
    requiredRole: 'customer',
    requiresActiveCustomer: true,
  },
  {
    pattern: /^\/customer(.*)/,
    requiredRole: 'customer',
    requiresActiveCustomer: true,
  },
  {
    pattern: /^\/orders(.*)/,
    requiredRole: 'customer',
    requiresActiveCustomer: true,
  },
]

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  // If user is not authenticated and has customer cookies, clear them
  if (!userId) {
    const hasCustomerCookies = 
      req.cookies.has('active_customer_id') || 
      req.cookies.has('impersonating_customer_id')
    
    if (hasCustomerCookies) {
      // User signed out but cookies remain - clear them
      const response = NextResponse.next()
      response.cookies.delete('active_customer_id')
      response.cookies.delete('impersonating_customer_id')
      return response
    }
  }

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
      | { role?: string; customerids?: string[] }
      | undefined
    const userRole = metadata?.role
    const customerIds = metadata?.customerids

    // Check each protected route pattern
    for (const {
      pattern,
      requiredRole,
      requiresActiveCustomer,
    } of roleProtectedRoutes) {
      if (pattern.test(pathname)) {
        // Check role requirement
        if (userRole !== requiredRole) {
          const homeUrl = new URL('/', req.url)
          homeUrl.searchParams.set('error', 'unauthorized')
          homeUrl.searchParams.set('required_role', requiredRole)
          return NextResponse.redirect(homeUrl)
        }

        // Check active customer requirement for customer routes
        if (requiresActiveCustomer && userRole === 'customer') {
          // Check if user has any customer IDs
          if (!customerIds || customerIds.length === 0) {
            const profileUrl = new URL('/profile/complete', req.url)
            profileUrl.searchParams.set('message', 'no_customer_accounts')
            return NextResponse.redirect(profileUrl)
          }

          // Check for active customer cookie
          const activeCustomerId = req.cookies.get('active_customer_id')?.value

          // Validate active customer is in user's allowed list
          if (activeCustomerId && !customerIds.includes(activeCustomerId)) {
            // Invalid customer ID in cookie - clear it
            const response = NextResponse.redirect(req.url)
            response.cookies.delete('active_customer_id')
            return response
          }

          // Note: Client-side CustomerRouteGuard will handle prompting for selection
          // if no active customer is set
        }

        // Check for admin impersonation
        if (userRole === 'admin' && requiresActiveCustomer) {
          // Admin can view customer routes via impersonation
          const impersonatingId = req.cookies.get(
            'impersonating_customer_id'
          )?.value

          // Allow admin access if impersonating
          if (!impersonatingId && pathname !== '/customer/switch') {
            // Redirect admin to customer selection
            const switchUrl = new URL('/customer/switch', req.url)
            switchUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(switchUrl)
          }
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
