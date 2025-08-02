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

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/orders(.*)',
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  // Clerk middleware should run on all routes except static files and Next.js internals
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
