/**
 * TitleComponent Atom - Page heading for favorites
 * SOLID Principles: SRP - Single responsibility for title display
 * Design Patterns: Atomic Design Pattern
 * Dependencies: None
 */

'use client'

interface TitleComponentProps {
  className?: string
}

export function TitleComponent({ className }: TitleComponentProps) {
  return (
    <h1 className={`text-3xl font-bold ${className || ''}`}>
      My Favorite Products
    </h1>
  )
}
