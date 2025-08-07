/**
 * Bookmark Button Component - Atomic toggle button for product bookmarking
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for bookmark toggle functionality
 * - OCP: Open for extension via props and styling
 * - DIP: Depends on abstractions (onClick handler)
 *
 * Design Patterns:
 * - Atomic Component: Smallest reusable UI element
 * - Controlled Component: State managed by parent
 * - Optimistic UI: Immediate visual feedback
 *
 * Dependencies: Lucide icons, shadcn/ui button, clsx
 */

'use client'

import { useState, useEffect, useTransition } from 'react'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/schadcn'
import { cn } from '@/lib/utils'
import { useBookmarkStore } from '@/lib/stores/bookmark-store'

export interface BookmarkButtonProps {
  /** Product ID to bookmark */
  productId: string
  /** Initial bookmarked state */
  isBookmarked?: boolean
  /** Callback when bookmark is toggled */
  onToggle?: (productId: string, isBookmarked: boolean) => void | Promise<void>
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
  /** Accessible label */
  ariaLabel?: string
  /** Show loading state */
  showLoading?: boolean
}

/**
 * Atomic bookmark toggle button for product cards
 * Provides optimistic UI updates with loading states
 */
export function BookmarkButton({
  productId,
  isBookmarked: initialBookmarked = false,
  onToggle,
  size = 'sm',
  className,
  ariaLabel,
  showLoading = true,
}: BookmarkButtonProps) {
  // Manage local state for optimistic updates
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)
  const [isPending, startTransition] = useTransition()
  const { isLoading: isInitializing } = useBookmarkStore()

  // Sync with prop changes
  useEffect(() => {
    setIsBookmarked(initialBookmarked)
  }, [initialBookmarked])

  const handleClick = async (e: React.MouseEvent) => {
    // Prevent event bubbling to parent card
    e.preventDefault()
    e.stopPropagation()

    // Don't allow clicks while initializing
    if (isInitializing) return

    // Optimistically update UI
    const newState = !isBookmarked
    setIsBookmarked(newState)

    // Call parent handler with new state
    if (onToggle) {
      if (showLoading) {
        startTransition(async () => {
          try {
            await onToggle(productId, newState)
          } catch (error) {
            console.error('Failed to toggle bookmark:', error)
            // Revert on error
            setIsBookmarked(!newState)
          }
        })
      } else {
        try {
          await onToggle(productId, newState)
        } catch (error) {
          console.error('Failed to toggle bookmark:', error)
          // Revert on error
          setIsBookmarked(!newState)
        }
      }
    }
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'h-8 w-8',
      icon: 'h-4 w-4',
    },
    md: {
      button: 'h-10 w-10',
      icon: 'h-5 w-5',
    },
    lg: {
      button: 'h-12 w-12',
      icon: 'h-6 w-6',
    },
  }

  const config = sizeConfig[size]
  const label = ariaLabel || (isBookmarked ? 'Remove bookmark' : 'Add bookmark')

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        config.button,
        'absolute top-2 left-2 z-10',
        'bg-orange-500/90 backdrop-blur-sm',
        'hover:bg-orange-500',
        'transition-all duration-200',
        'text-white',
        isBookmarked && 'bg-orange-600/90 hover:bg-orange-600',
        isPending && 'opacity-50 cursor-wait',
        className
      )}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isBookmarked}
      disabled={isPending}
      type="button"
    >
      {isInitializing ? (
        <Loader2 className={cn(config.icon, 'animate-spin')} />
      ) : isBookmarked ? (
        <BookmarkCheck
          className={cn(
            config.icon,
            'fill-current',
            'transition-transform duration-200',
            isBookmarked && 'scale-110'
          )}
        />
      ) : (
        <Bookmark
          className={cn(
            config.icon,
            'transition-transform duration-200 hover:scale-110'
          )}
        />
      )}
    </Button>
  )
}

/**
 * Static variant for non-interactive bookmark display
 */
export function BookmarkIndicator({
  isBookmarked,
  size = 'sm',
  className,
}: Pick<BookmarkButtonProps, 'isBookmarked' | 'size' | 'className'>) {
  const sizeConfig = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const iconSize = sizeConfig[size]

  if (!isBookmarked) return null

  return (
    <div
      className={cn(
        'absolute top-2 left-2 z-10',
        'p-2 rounded-md',
        'bg-background/80 backdrop-blur-sm',
        'text-primary',
        className
      )}
      aria-label="Bookmarked"
    >
      <BookmarkCheck className={cn(iconSize, 'fill-current')} />
    </div>
  )
}
