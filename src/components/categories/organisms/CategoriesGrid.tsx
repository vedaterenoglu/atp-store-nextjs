/**
 * CategoriesGrid Organism Component
 * SOLID Principles: Single Responsibility - Manages grid layout for category cards
 * Design Patterns: Container Pattern - Handles responsive grid layout
 * Dependencies: CategoryCard component
 */

import { CategoryCard } from '../molecules/CategoryCard'
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
}

export function CategoriesGrid({ categories, className }: CategoriesGridProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1200px]',
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
        'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {categories.map(category => {
        const slug = category.stock_groups.split(' - ')[0]
        return (
          <CategoryCard
            key={category.stock_groups}
            id={category.stock_groups}
            name={category.stock_groups}
            imageUrl={category.image_url}
            slug={slug || undefined}
          />
        )
      })}
    </div>
  )
}
