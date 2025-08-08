/**
 * Customer cart page
 * SOLID Principles: SRP - Single responsibility for cart page
 * Design Patterns: Page Component Pattern
 * Dependencies: React, Next.js, Zustand cart store
 */

import type { Metadata } from 'next'
import { CustomerRouteGuard } from '@/components/auth/CustomerRouteGuard'
import { CustomerCartTemplate } from '@/components/cart/templates/CustomerCartTemplate'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review and manage items in your shopping cart',
}

export default function CartPage() {
  return (
    <CustomerRouteGuard requireCustomerId={true}>
      <CustomerCartTemplate />
    </CustomerRouteGuard>
  )
}
