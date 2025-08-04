/**
 * BookmarksFilterButton Atom Component
 * SOLID Principles: Single Responsibility - Toggle bookmarks filter
 * Design Patterns: Toggle Component Pattern
 * Dependencies: shadcn/ui Button, lucide-react icons
 */

'use client'

import { Bookmark } from 'lucide-react'
import { cn } from '@/components/ui/utils'

interface BookmarksFilterButtonProps {
  isActive: boolean
  onClick: () => void
  className?: string
}

export function BookmarksFilterButton({
  isActive,
  onClick,
  className,
}: BookmarksFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-12 items-center gap-2 rounded-md border px-4 font-medium transition-colors',
        isActive
          ? 'border-blue-500 bg-blue-500 text-white'
          : 'border-gray-600 bg-transparent text-white hover:border-gray-500',
        className
      )}
    >
      <Bookmark className={cn('h-4 w-4', isActive && 'fill-current')} />
      My Bookmarks
    </button>
  )
}
