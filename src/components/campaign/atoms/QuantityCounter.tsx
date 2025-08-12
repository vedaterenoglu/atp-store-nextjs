/**
 * QuantityCounter - Counter component for selecting product quantity
 * SOLID Principles: SRP - Single responsibility for quantity management
 * Design Patterns: Atomic Component Pattern
 * Dependencies: React, shadcn/ui Button, lucide-react
 */

'use client'

import { Button } from '@/components/ui/schadcn/button'
import { Minus, Plus } from 'lucide-react'

interface QuantityCounterProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  min?: number
  max?: number
  disabled?: boolean
  canModify?: boolean  // New prop to determine if user has permission
  className?: string
}

export function QuantityCounter({
  quantity,
  onDecrease,
  onIncrease,
  min = 0,
  max = 99,
  disabled = false,
  canModify = true,  // Default to true for backwards compatibility
  className = '',
}: QuantityCounterProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={e => {
          e.stopPropagation()
          // Always call handler - parent will show toast if needed
          onDecrease()
        }}
        disabled={disabled || !canModify || quantity <= min}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="font-medium w-8 text-center">{quantity}</span>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={e => {
          e.stopPropagation()
          // Always call handler - parent will show toast if needed
          onIncrease()
        }}
        disabled={disabled || !canModify || quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
