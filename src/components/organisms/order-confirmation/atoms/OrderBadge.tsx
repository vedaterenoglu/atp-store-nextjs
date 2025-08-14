/**
 * Order Badge Atom Component
 * SOLID Principles: SRP - Single responsibility for order type badges
 * Design Patterns: Presentation Component Pattern
 * Dependencies: React, types, utilities, shadcn/ui
 */

'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/schadcn/badge'
import {
  formatOrderType,
  getOrderTypeBadgeVariant,
} from '../utils/order-formatters'
import type { OrderBadgeProps } from '../types/order-confirmation.types'

/**
 * Displays an order type badge with appropriate styling
 * @param props - Component props
 * @returns Rendered order badge
 */
export function OrderBadge({ type, variant, className }: OrderBadgeProps) {
  // Format the order type for display
  const displayText = formatOrderType(type)

  // Determine badge variant if not provided
  const badgeVariant = variant ?? getOrderTypeBadgeVariant(type)

  return (
    <Badge variant={badgeVariant} className={cn('font-medium', className)}>
      {displayText}
    </Badge>
  )
}

/**
 * Mini version for compact display
 * @param props - Component props
 * @returns Rendered mini badge
 */
export function OrderBadgeMini({
  type,
  className,
}: Omit<OrderBadgeProps, 'variant'>) {
  const displayText = formatOrderType(type)
  const badgeVariant = getOrderTypeBadgeVariant(type)

  return (
    <Badge
      variant={badgeVariant}
      className={cn('text-xs px-2 py-0.5', className)}
    >
      {displayText}
    </Badge>
  )
}

/**
 * Status indicator version
 * @param props - Component props
 * @returns Rendered status badge
 */
export function OrderStatusBadge({
  type,
  showIcon = false,
  className,
}: OrderBadgeProps & { showIcon?: boolean }) {
  const displayText = formatOrderType(type)
  const badgeVariant = getOrderTypeBadgeVariant(type)

  // Icon based on order type
  const icon = showIcon ? getOrderTypeIcon(type) : null

  return (
    <Badge
      variant={badgeVariant}
      className={cn('inline-flex items-center gap-1', className)}
    >
      {icon && <span className="size-3">{icon}</span>}
      {displayText}
    </Badge>
  )
}

/**
 * Helper to get icon for order type
 * @param orderType - The order type
 * @returns Icon element or null
 */
function getOrderTypeIcon(orderType: string): string | null {
  switch (orderType) {
    case 'Inland':
      return '🏠'
    case 'Inside EU':
      return '🇪🇺'
    case 'Outside EU':
      return '🌍'
    default:
      return null
  }
}
