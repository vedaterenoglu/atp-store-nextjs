/**
 * GraphQL Loading State Component
 * SOLID Principles: SRP - Single responsibility for displaying loading states
 * Design Patterns: Presentational Component Pattern
 * Dependencies: None
 */

'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface GraphQLLoadingProps {
  message?: string
  className?: string
  variant?: 'default' | 'inline' | 'overlay'
}

export function GraphQLLoading({
  message = 'Loading...',
  className,
  variant = 'default',
}: GraphQLLoadingProps) {
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 text-sm text-muted-foreground',
          className
        )}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{message}</span>
      </div>
    )
  }

  if (variant === 'overlay') {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
          className
        )}
      >
        <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-8 shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center gap-4',
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

/**
 * Skeleton loader for data lists
 */
export function GraphQLListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  )
}

/**
 * Skeleton loader for cards
 */
export function GraphQLCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border p-6">
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="h-4 w-1/2 rounded bg-muted" />
      <div className="space-y-2">
        <div className="h-3 rounded bg-muted" />
        <div className="h-3 rounded bg-muted" />
        <div className="h-3 w-5/6 rounded bg-muted" />
      </div>
    </div>
  )
}
