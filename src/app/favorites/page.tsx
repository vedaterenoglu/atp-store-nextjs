/**
 * Favorites Page - Customer's bookmarked products view
 * SOLID Principles: SRP - Single page responsibility
 * Design Patterns: Page Component Pattern
 * Dependencies: CustomersFavoriteProducts template, CustomerRouteGuard
 */

import { CustomersFavoriteProducts } from '@/components/favorites/templates'
import { CustomerRouteGuard } from '@/components/auth/CustomerRouteGuard'

export default function FavoritesPage() {
  // Favorites page requires customer role with active customer
  return (
    <CustomerRouteGuard requireActiveCustomer={true}>
      <CustomersFavoriteProducts />
    </CustomerRouteGuard>
  )
}
