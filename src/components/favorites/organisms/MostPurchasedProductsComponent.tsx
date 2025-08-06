/**
 * MostPurchasedProductsComponent Organism - Container for most purchased products
 * SOLID Principles: SRP - Manages most purchased products section
 * Design Patterns: Organism Pattern, Container Pattern
 * Dependencies: MostPurchasedProductsGrid molecule
 */

'use client'

import { MostPurchasedProductsGrid } from '@/components/favorites/molecules'

export function MostPurchasedProductsComponent() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Most Purchased Products</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Based on your purchase history
        </p>
      </div>
      <MostPurchasedProductsGrid />
    </div>
  )
}
