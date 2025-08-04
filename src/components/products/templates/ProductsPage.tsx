/**
 * ProductsPage Template Component
 * SOLID Principles: Single Responsibility - Page layout and composition
 * Design Patterns: Template Pattern - Defines page structure
 * Dependencies: Atoms, Organisms, react-i18next, React hooks, Zustand store
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchBox } from '../atoms/SearchBox'
import { BookmarksFilterButton } from '../atoms/BookmarksFilterButton'
import { BackToCategoriesButton } from '../atoms/BackToCategoriesButton'
import { GoToCartButton } from '../atoms/GoToCartButton'
import { ProductsGrid } from '../organisms/ProductsGrid'
import { useCategorySearchStore } from '@/lib/stores'

interface Product {
  id: string
  name: string
  imageUrl?: string
  price: number
  unit: string
  categoryId: string
}

interface ProductsPageProps {
  products: Product[]
  initialSearch?: string
}

export function ProductsPage({
  products,
  initialSearch = '',
}: ProductsPageProps) {
  const { t } = useTranslation('products')
  const { searchPrefix, clearSearchPrefix } = useCategorySearchStore()
  const [searchTerm, setSearchTerm] = useState(initialSearch || searchPrefix)
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)

  // Set initial search term from Zustand store or prop
  useEffect(() => {
    if (searchPrefix && !initialSearch) {
      setSearchTerm(searchPrefix)
      // Clear the prefix after using it
      clearSearchPrefix()
    } else if (initialSearch) {
      setSearchTerm(initialSearch)
    }
  }, [initialSearch, searchPrefix, clearSearchPrefix])

  // Filter products based on search term and bookmarks
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.unit.toLowerCase().includes(searchLower) ||
          product.id.toLowerCase().startsWith(searchLower) ||
          product.categoryId.toLowerCase() === searchLower
      )
    }

    // Apply bookmarks filter (placeholder - will be implemented later)
    if (showBookmarksOnly) {
      // TODO: Filter by bookmarked products
      filtered = filtered
    }

    return filtered
  }, [products, searchTerm, showBookmarksOnly])

  const handleProductClick = (product: Product) => {
    // TODO: Implement product click action
    console.warn('Product clicked:', product.id)
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold">{t('title', 'Products')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('subtitle', 'Discover and order products for your business')}
            </p>

            <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center">
              <BackToCategoriesButton className="w-full lg:w-auto" />

              <SearchBox
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t('searchPlaceholder', 'Search products...')}
                className="w-full lg:flex-1"
              />

              <div className="flex gap-4 w-full lg:w-auto">
                <BookmarksFilterButton
                  isActive={showBookmarksOnly}
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className="flex-1 lg:flex-initial"
                />

                <GoToCartButton className="flex-1 lg:flex-initial" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8 sm:py-12">
          <ProductsGrid
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        </div>
      </div>
    </div>
  )
}
