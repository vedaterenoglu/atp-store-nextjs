/**
 * Skeleton Component
 * SOLID Principles: Single Responsibility - Loading placeholder
 * Design Patterns: Component Pattern
 * Dependencies: None
 */

import { cn } from '@/components/ui/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}