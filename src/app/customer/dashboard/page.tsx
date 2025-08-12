/**
 * Customer Dashboard Page - Protected Route
 *
 * Main dashboard overview page for customers with authentication guard
 *
 * SOLID Principles: Single Responsibility - Dashboard view with auth protection
 * Design Patterns: Guard Pattern - Protected route implementation
 * Dependencies: CustomerRouteGuard for authentication
 */

import { CustomerRouteGuard } from '@/components/auth/CustomerRouteGuard'

function DashboardContent() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Customer Dashboard
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Welcome to your dashboard
      </p>
    </div>
  )
}

export default function CustomerDashboardPage() {
  return (
    <CustomerRouteGuard requireActiveCustomer={true}>
      <DashboardContent />
    </CustomerRouteGuard>
  )
}
