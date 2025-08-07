/**
 * CategoriesGrid Organism Component
 * SOLID Principles: Single Responsibility - Manages category-specific grid logic
 * Design Patterns: Composition Pattern - Composes with GridLayout
 * Dependencies: CategoryCard, GridLayout, GridErrorBoundary, GridSkeleton
 */

'use client'

import { CategoryCard } from '@/components/categories'
import {
  GridErrorBoundary,
  GridSkeleton,
  GridItem,
} from '@/components/ui/custom/grid'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  companyId: string
  imageUrl: string
  altText: string
}

interface CategoriesGridProps {
  categories: Category[]
  className?: string
  isLoading?: boolean
  error?: Error | null | undefined
}

export function CategoriesGrid({
  categories,
  className,
  isLoading = false,
  error = null,
}: CategoriesGridProps) {
  if (error) {
    throw error // Let error boundary handle it
  }

  return (
    <GridErrorBoundary>
      <div
        className={cn(
          'mx-auto grid w-full max-w-7xl gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'px-4 sm:px-6 lg:px-8',
          className
        )}
      >
        {isLoading ? (
          <GridSkeleton count={6} variant="card" />
        ) : (
          categories.map(category => (
            <GridItem key={category.id}>
              <CategoryCard
                id={category.id}
                name={category.name}
                imageUrl={category.imageUrl}
              />
            </GridItem>
          ))
        )}
      </div>
    </GridErrorBoundary>
  )
}
