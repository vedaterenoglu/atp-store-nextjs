/**
 * CustomersFavoriteProducts Template Component
 * SOLID Principles: SRP - Orchestrates favorites page layout
 * Design Patterns: Template Pattern, Composition Pattern
 * Dependencies: BackToProductsButton, FavoriteProductsGrid, MostPurchasedProductsComponent
 */

'use client'

import { BackToProductsButton } from '@/components/favorites/atoms'
import { FavoriteProductsGrid } from '@/components/favorites/organisms'
import { MostPurchasedProductsComponent } from '@/components/favorites/organisms'

export function CustomersFavoriteProducts() {
  return (
    <div className="min-h-screen">
      {/* Header Section - matching products page layout */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold">My Favorite Products</h1>
            <p className="text-lg text-muted-foreground">
              Manage your bookmarked products and view purchase history
            </p>

            <div className="mx-auto mt-8 flex max-w-5xl justify-center">
              <BackToProductsButton className="w-full sm:w-auto" />
            </div>
          </div>
        </div>

        {/* Favorite Products Section */}
        <div className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Your Bookmarked Products
              </h2>
              <FavoriteProductsGrid />
            </div>
          </div>
        </div>

        {/* Most Purchased Products Section */}
        <div className="py-8 sm:py-12 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MostPurchasedProductsComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
