/**
 * ButtonGroup Component for Related Actions
 * SOLID Principles: SRP - Single responsibility for grouping buttons
 * Design Patterns: Composite Pattern
 * Dependencies: React, cn utility
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { BUTTON_GROUP_CLASSES } from './button-constants'

/**
 * ButtonGroup props interface
 */
interface ButtonGroupProps {
  children: React.ReactNode
  /**
   * Layout direction
   */
  direction?: 'horizontal' | 'vertical' | 'grid'
  /**
   * Spacing between buttons
   */
  spacing?: 'tight' | 'normal' | 'loose'
  /**
   * Make the group responsive
   */
  responsive?: boolean
  /**
   * Number of columns for grid layout
   */
  columns?: 2 | 3
  /**
   * Alignment of buttons within the group
   */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /**
   * Additional className
   */
  className?: string
  /**
   * Separator between buttons
   */
  separator?: boolean
  /**
   * Full width group
   */
  fullWidth?: boolean
}

/**
 * ButtonGroup Component
 */
export function ButtonGroup({
  children,
  direction = 'horizontal',
  spacing = 'normal',
  responsive = false,
  columns = 2,
  align = 'start',
  className,
  separator = false,
  fullWidth = false,
}: ButtonGroupProps) {
  // Get base classes based on direction and spacing
  const getBaseClasses = () => {
    if (direction === 'grid') {
      if (responsive) {
        return BUTTON_GROUP_CLASSES.grid.responsive
      }
      return columns === 3
        ? BUTTON_GROUP_CLASSES.grid.three
        : BUTTON_GROUP_CLASSES.grid.two
    }
    
    if (direction === 'vertical') {
      return BUTTON_GROUP_CLASSES.vertical[spacing]
    }
    
    // Horizontal
    if (responsive) {
      return BUTTON_GROUP_CLASSES.horizontal.responsive
    }
    return BUTTON_GROUP_CLASSES.horizontal[spacing]
  }
  
  // Get alignment classes
  const getAlignmentClasses = () => {
    const alignMap = {
      start: direction === 'horizontal' ? 'justify-start' : 'items-start',
      center: direction === 'horizontal' ? 'justify-center' : 'items-center',
      end: direction === 'horizontal' ? 'justify-end' : 'items-end',
      stretch: direction === 'horizontal' ? 'justify-between' : 'items-stretch',
    }
    return alignMap[align]
  }
  
  // Process children to add separators if needed
  const processedChildren = React.useMemo(() => {
    if (!separator || direction === 'grid') return children
    
    const childArray = React.Children.toArray(children)
    const result: React.ReactNode[] = []
    
    childArray.forEach((child, index) => {
      result.push(child)
      
      // Add separator between buttons (not after the last one)
      if (index < childArray.length - 1) {
        result.push(
          <div
            key={`separator-${index}`}
            className={cn(
              'bg-border',
              direction === 'horizontal' ? 'h-4 w-px' : 'h-px w-full'
            )}
          />
        )
      }
    })
    
    return result
  }, [children, separator, direction])
  
  return (
    <div
      className={cn(
        getBaseClasses(),
        getAlignmentClasses(),
        fullWidth && 'w-full',
        separator && 'items-center',
        className
      )}
    >
      {processedChildren}
    </div>
  )
}

/**
 * Pre-configured ButtonGroup variants
 */
export const ModalButtonGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ButtonGroup
    direction="horizontal"
    spacing="normal"
    align="end"
    className={cn('mt-6', className)}
  >
    {children}
  </ButtonGroup>
)

export const FormButtonGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ButtonGroup
    direction="horizontal"
    spacing="normal"
    responsive
    fullWidth
    className={cn('mt-6', className)}
  >
    {children}
  </ButtonGroup>
)

export const CardButtonGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ButtonGroup
    direction="horizontal"
    spacing="tight"
    align="end"
    className={cn('mt-4', className)}
  >
    {children}
  </ButtonGroup>
)

export const FilterButtonGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ButtonGroup
    direction="horizontal"
    spacing="tight"
    separator
    className={className || ''}
  >
    {children}
  </ButtonGroup>
)

export const ToolbarButtonGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ButtonGroup
    direction="horizontal"
    spacing="tight"
    separator
    className={cn('rounded-md border bg-background p-1', className)}
  >
    {children}
  </ButtonGroup>
)