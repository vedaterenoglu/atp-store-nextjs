/**
 * CustomersFavoriteProducts Template Component
 * SOLID Principles: SRP - Orchestrates favorites page layout
 * Design Patterns: Template Pattern, Composition Pattern
 * Dependencies: BackToProductsButton, FavoriteProductsGrid, MostPurchasedProductsComponent
 */

'use client'

import { useTranslation } from 'react-i18next'
import { BackToProductsButton } from '@/components/favorites/atoms'
import { FavoriteProductsGrid } from '@/components/favorites/organisms'
import { MostPurchasedProductsGrid } from '@/components/favorites/molecules'

export function CustomersFavoriteProducts() {
  const { t } = useTranslation('favorites')

  return (
    <div className="min-h-screen">
      {/* Header Section - matching products page layout */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold">{t('title')}</h1>
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>

            <div className="mx-auto mt-8 flex max-w-5xl justify-center">
              <BackToProductsButton className="w-full sm:w-auto" />
            </div>
          </div>
        </div>

        {/* My Favorite Products Section */}
        <div className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {t('sections.favorites.title')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('sections.favorites.description')}
                </p>
              </div>
              <FavoriteProductsGrid />
            </div>
          </div>
        </div>

        {/* Most Purchased Products Section */}
        <div className="py-8 sm:py-12 border-t">
          <MostPurchasedProductsGrid />
        </div>
      </div>
    </div>
  )
}
