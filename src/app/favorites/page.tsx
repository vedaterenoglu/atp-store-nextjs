/**
 * Favorites Page - Customer's bookmarked products view
 * SOLID Principles: SRP - Single page responsibility
 * Design Patterns: Page Component Pattern
 * Dependencies: CustomersFavoriteProducts template
 */

import { CustomersFavoriteProducts } from '@/components/favorites/templates'

export default function FavoritesPage() {
  return <CustomersFavoriteProducts />
}
