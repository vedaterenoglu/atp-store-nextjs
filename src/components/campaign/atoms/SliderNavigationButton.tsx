/**
 * SliderNavigationButton - Navigation buttons for slider
 * SOLID Principles: SRP - Single responsibility for navigation controls
 * Design Patterns: Atomic Component Pattern
 * Dependencies: React, lucide-react
 */

import { Button } from '@/components/ui/schadcn/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SliderNavigationButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function SliderNavigationButton({
  direction,
  onClick,
  disabled = false,
  className = '',
}: SliderNavigationButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-opacity',
        direction === 'prev' ? '-left-6' : '-right-6',
        disabled ? 'opacity-50' : 'opacity-100',
        className
      )}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
    >
      <Icon className="h-6 w-6" />
    </Button>
  )
}
