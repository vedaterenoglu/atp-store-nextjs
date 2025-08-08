/**
 * SliderIndicator - Indicator dots for slider navigation
 * SOLID Principles: SRP - Single responsibility for slider indicators
 * Design Patterns: Atomic Component Pattern
 * Dependencies: React
 */

import { cn } from '@/lib/utils'

interface SliderIndicatorProps {
  total: number
  current: number
  onSelect?: (index: number) => void
  className?: string
}

export function SliderIndicator({
  total,
  current,
  onSelect,
  className = '',
}: SliderIndicatorProps) {
  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect?.(index)}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer',
            index === current
              ? 'bg-primary w-8'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
