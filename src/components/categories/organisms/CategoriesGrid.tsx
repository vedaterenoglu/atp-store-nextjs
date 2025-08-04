/**
 * CategoriesGrid Organism Component
 * SOLID Principles: Single Responsibility - Manages category-specific grid logic
 * Design Patterns: Composition Pattern - Composes with GridLayout
 * Dependencies: CategoryCard, GridLayout, GridErrorBoundary, GridSkeleton
 */

'use client'

import { CategoryCard } from '../molecules'
import {
  GridErrorBoundary,
  GridSkeleton,
  GridItem,
} from '@/components/ui/custom/grid'
import { cn } from '@/components/ui/utils'

interface Category {
  stock_groups: string
  our_company: string
  image_url: string
  alt_text: string
}

interface CategoriesGridProps {
  categories: Category[]
  className?: string
  isLoading?: boolean
  error?: Error | null
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
          categories.map(category => {
            const slug = category.stock_groups.split(' - ')[0]
            return (
              <GridItem key={category.stock_groups}>
                <CategoryCard
                  id={category.stock_groups}
                  name={category.stock_groups}
                  imageUrl={category.image_url}
                  slug={slug || undefined}
                />
              </GridItem>
            )
          })
        )}
      </div>
    </GridErrorBoundary>
  )
}
