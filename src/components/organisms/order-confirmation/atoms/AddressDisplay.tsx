/**
 * Address Display Atom Component
 * SOLID Principles: SRP - Single responsibility for address display
 * Design Patterns: Presentation Component Pattern
 * Dependencies: React, types, utilities, shadcn/ui
 */

'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/schadcn/card'
import { formatAddressLines } from '../utils/order-formatters'
import type { AddressDisplayProps } from '../types/order-confirmation.types'

/**
 * Displays a formatted address with optional label and icon
 * @param props - Component props
 * @returns Rendered address display
 */
export function AddressDisplay({
  address,
  label,
  icon,
  className,
}: AddressDisplayProps) {
  const addressLines = formatAddressLines(address)

  return (
    <Card className={cn('p-4', className)}>
      <CardContent className="p-0">
        {label && (
          <div className="mb-2 flex items-center gap-2">
            {icon && <span className="size-4">{icon}</span>}
            <h4 className="text-sm font-semibold text-muted-foreground">
              {label}
            </h4>
          </div>
        )}
        <address className="not-italic">
          {addressLines.map((line, index) => (
            <div
              key={index}
              className={cn(
                'text-sm',
                index === 0 && 'font-medium', // First line (nickname) is bold
                index > 0 && 'text-muted-foreground'
              )}
            >
              {line}
            </div>
          ))}
        </address>
      </CardContent>
    </Card>
  )
}

/**
 * Compact version for inline display
 * @param props - Component props
 * @returns Rendered compact address
 */
export function AddressDisplayCompact({
  address,
  className,
}: Omit<AddressDisplayProps, 'label' | 'icon'>) {
  const { address_nickname, city } = address.fullAddress

  return (
    <span className={cn('text-sm', className)}>
      {address_nickname}, {city}
    </span>
  )
}
