/**
 * SliderControls - Control panel for slider navigation
 * SOLID Principles: SRP - Single responsibility for slider controls
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, campaign atoms
 */

import { SliderNavigationButton, SliderIndicator } from '../atoms'

interface SliderControlsProps {
  total: number
  current: number
  onPrevious: () => void
  onNext: () => void
  onSelect?: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  className?: string
}

export function SliderControls({
  total,
  current,
  onPrevious,
  onNext,
  onSelect,
  canScrollPrev,
  canScrollNext,
  className = '',
}: SliderControlsProps) {
  return (
    <>
      {/* Navigation Buttons */}
      <SliderNavigationButton
        direction="prev"
        onClick={onPrevious}
        disabled={!canScrollPrev}
      />
      <SliderNavigationButton
        direction="next"
        onClick={onNext}
        disabled={!canScrollNext}
      />

      {/* Indicators */}
      <div className={`absolute bottom-4 left-0 right-0 z-20 ${className}`}>
        <SliderIndicator
          total={total}
          current={current}
          {...(onSelect && { onSelect })}
        />
      </div>
    </>
  )
}
