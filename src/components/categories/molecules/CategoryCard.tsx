/**
 * CategoryCard Molecular Component
 * SOLID Principles: Single Responsibility - Displays a category card with image, price, and overlay
 * Design Patterns: Composition Pattern - Combines atomic components
 * Dependencies: Atomic components, Next.js router, Zustand store
 */

'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/schadcn'
import { ImageContainer, OverlayComponent } from '@/components/categories'
import { cn } from '@/components/ui/utils'
import { useCategorySearchStore } from '@/lib/stores'

interface CategoryCardProps {
  id: string
  name: string
  imageUrl: string
  className?: string
}

export function CategoryCard({
  id,
  name,
  imageUrl,
  className,
}: CategoryCardProps) {
  const router = useRouter()
  const { setSearchPrefix } = useCategorySearchStore()

  const handleClick = () => {
    // Store full category id (stock_group) as search text
    setSearchPrefix(id)
    router.push('/products')
  }

  return (
    <div onClick={handleClick} className="group block cursor-pointer">
      <Card
        className={cn(
          'relative overflow-hidden rounded-xl bg-card transition-all duration-300',
          'hover:shadow-xl hover:scale-[1.02]',
          'hover:ring-2 hover:ring-green-500 hover:ring-offset-2',
          'border-0',
          className
        )}
      >
        {/* 3:2 aspect ratio container */}
        <div className="relative aspect-[3/2]">
          <ImageContainer src={imageUrl} alt={name} className="h-full w-full" />
          <OverlayComponent title={name} isVisible={true} />
        </div>
      </Card>
    </div>
  )
}
