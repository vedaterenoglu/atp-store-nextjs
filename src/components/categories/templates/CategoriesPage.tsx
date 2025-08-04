/**
 * CategoriesPage Template Component
 * SOLID Principles: Single Responsibility - Page layout and composition
 * Design Patterns: Template Pattern - Defines page structure
 * Dependencies: Atomic/Organism components, react-i18next
 */

'use client'

import { useTranslation } from 'react-i18next'
import { PageTitle, ViewAllProductsButton } from '../atoms'
import { CategoriesGrid } from '../organisms'

interface Category {
  id: string
  name: string
  companyId: string
  imageUrl: string
  altText: string
}

interface CategoriesPageProps {
  categories: Category[]
  error?: Error | null
}

export function CategoriesPage({ categories, error }: CategoriesPageProps) {
  const { t } = useTranslation('categories')

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <div className="mx-auto mb-8 max-w-[1200px] px-4 sm:mb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <PageTitle>{t('title', 'Categories')}</PageTitle>
          <ViewAllProductsButton />
        </div>
      </div>

      {/* Categories Grid */}
      <CategoriesGrid categories={categories} error={error} />
    </div>
  )
}
