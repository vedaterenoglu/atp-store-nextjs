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
  className?: string
}

export function QuantityCounter({
  quantity,
  onDecrease,
  onIncrease,
  min = 0,
  max = 99,
  disabled = false,
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
          onDecrease()
        }}
        disabled={disabled || quantity <= min}
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
          onIncrease()
        }}
        disabled={disabled || quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
