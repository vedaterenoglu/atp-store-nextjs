/**
 * @file page.tsx
 * @role Customer Dashboard Page - Server Component with client-side interactivity
 * @patterns Protected Route Pattern, Server Component Pattern
 * @solid SRP - Single responsibility for dashboard page rendering
 * @tests /src/app/customer/dashboard/__tests__/page.test.tsx
 */

import { CustomerRouteGuard } from '@/components/auth/CustomerRouteGuard'
import { DashboardLayout } from '@/components/dashboard/organisms/DashboardLayout'

export default function CustomerDashboardPage() {
  return (
    <CustomerRouteGuard requireActiveCustomer={true}>
      <DashboardLayout />
    </CustomerRouteGuard>
  )
}
