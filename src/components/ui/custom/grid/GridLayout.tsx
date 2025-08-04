/**
 * GridLayout Component - Generic responsive grid layout
 * SOLID Principles: Single Responsibility - Handles grid layout only
 * Design Patterns: Composition Pattern - Composes with any content
 * Dependencies: None
 */

import { cn } from '@/components/ui/utils'
import React from 'react'

interface GridLayoutProps {
  children: React.ReactNode
  className?: string | undefined
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
}

export function GridLayout({
  children,
  className,
  gap = 'md',
  maxWidth = 'xl',
  padding = true,
}: GridLayoutProps) {
  const gridClasses = cn(
    // Base grid
    'grid w-full',
    // Gap
    gapClasses[gap],
    // Max width
    maxWidth !== 'full' && 'mx-auto',
    maxWidthClasses[maxWidth],
    // Padding
    padding && 'px-4 sm:px-6 lg:px-8',
    className
  )

  return <div className={gridClasses}>{children}</div>
}
