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
import { getGridClasses, getContainerClasses } from '@/lib/styles/utilities'
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
          getContainerClasses({ size: 'xl' }),
          getGridClasses({ gap: 'md', responsive: false }),
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
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
