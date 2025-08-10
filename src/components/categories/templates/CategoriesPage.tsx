/**
 * CategoriesPage Template Component
 * SOLID Principles: Single Responsibility - Page layout and composition
 * Design Patterns: Template Pattern - Defines page structure
 * Dependencies: Atomic/Organism components, react-i18next
 */

'use client'

import { useTranslation } from 'react-i18next'
import {
  PageTitle,
  ViewAllProductsButton,
  CategoriesGrid,
} from '@/components/categories'
import { getPageClasses, getContainerClasses } from '@/lib/styles/utilities'
import { cn } from '@/lib/utils'

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
    <div
      className={cn(
        getPageClasses({ section: 'container' }),
        getPageClasses({ section: 'content' })
      )}
    >
      {/* Header Section */}
      <div className={cn(getContainerClasses({ size: 'lg' }), 'mb-8 sm:mb-12')}>
        <div
          className={cn(
            'flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'
          )}
        >
          <PageTitle>{t('title', 'Categories')}</PageTitle>
          <ViewAllProductsButton />
        </div>
      </div>

      {/* Categories Grid */}
      <CategoriesGrid categories={categories} error={error} />
    </div>
  )
}
