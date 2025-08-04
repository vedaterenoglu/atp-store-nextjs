/**
 * GridSkeleton Component - Skeleton loader for grid items
 * SOLID Principles: Single Responsibility - Handles loading state
 * Design Patterns: Composition Pattern - Works with GridLayout
 * Dependencies: shadcn/ui Skeleton
 */

import React from 'react'
import { Skeleton } from '@/components/ui/schadcn'
import { cn } from '@/components/ui/utils'

interface GridSkeletonProps {
  count?: number
  className?: string
  itemClassName?: string
  variant?: 'card' | 'list' | 'custom'
  customContent?: React.ReactNode
}

export function GridSkeleton({
  count = 6,
  className,
  itemClassName,
  variant = 'card',
  customContent,
}: GridSkeletonProps) {
  const renderSkeletonItem = () => {
    if (customContent) {
      return customContent
    }

    switch (variant) {
      case 'card':
        return (
          <div className={cn('space-y-3', itemClassName)}>
            <Skeleton className="aspect-[3/2] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        )
      case 'list':
        return (
          <div className={cn('flex items-center space-x-4', itemClassName)}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        )
      default:
        return <Skeleton className={cn('h-32 w-full', itemClassName)} />
    }
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={`skeleton-${index}`} className={className}>
          {renderSkeletonItem()}
        </div>
      ))}
    </>
  )
}
