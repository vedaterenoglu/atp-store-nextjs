/**
 * OverlayComponent Atom Component
 * SOLID Principles: Single Responsibility - Displays overlay with text
 * Design Patterns: Presentational Component Pattern
 * Dependencies: Tailwind CSS utilities
 */

import { cn } from '@/lib/utils'

interface OverlayComponentProps {
  title: string
  isVisible?: boolean
  className?: string
}

export function OverlayComponent({
  title,
  isVisible = true,
  className,
}: OverlayComponentProps) {
  return (
    <div
      className={cn(
        'absolute bottom-3 left-3 right-3 rounded-lg bg-black/70 backdrop-blur-sm',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <div className="px-3 py-2">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        {/* Select text - only visible on mobile */}
        <p className="text-xs text-green-400 font-semibold mt-1 md:hidden">
          Select
        </p>
      </div>
    </div>
  )
}
