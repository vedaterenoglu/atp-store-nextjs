/**
 * CategoryCard Molecular Component
 * SOLID Principles: Single Responsibility - Displays a category card with image, price, and overlay
 * Design Patterns: Composition Pattern - Combines atomic components
 * Dependencies: Atomic components, Next.js Link
 */

'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/schadcn'
import { ImageContainer, OverlayComponent } from '../atoms'
import { cn } from '@/components/ui/utils'

interface CategoryCardProps {
  id: string
  name: string
  imageUrl: string
  slug?: string | undefined
  className?: string
}

export function CategoryCard({
  id,
  name,
  imageUrl,
  slug,
  className,
}: CategoryCardProps) {
  const href = `/categories/${slug || id}`

  return (
    <Link href={href} className="group block">
      <Card
        className={cn(
          'relative overflow-hidden rounded-xl bg-card transition-all duration-300',
          'hover:shadow-xl hover:scale-[1.02]',
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
    </Link>
  )
}
