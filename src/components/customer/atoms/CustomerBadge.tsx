/**
 * Customer Badge Atom - Displays current customer context
 * SOLID Principles: SRP - Single responsibility for displaying customer info
 * Design Patterns: Atomic Design - Atom
 * Dependencies: shadcn Badge component
 */

'use client'

import { Badge } from '@/components/ui/schadcn/badge'
import { cn } from '@/lib/utils'

interface CustomerBadgeProps {
  customerId: string
  customerTitle?: string
  isImpersonating?: boolean
  className?: string
}

export function CustomerBadge({
  customerId,
  customerTitle,
  isImpersonating = false,
  className,
}: CustomerBadgeProps) {
  const displayText = customerTitle || customerId

  return (
    <Badge
      variant={isImpersonating ? 'destructive' : 'secondary'}
      className={cn('max-w-[200px] truncate', className)}
      title={displayText}
    >
      {isImpersonating && <span className="mr-1 font-bold">👁</span>}
      {displayText}
    </Badge>
  )
}
