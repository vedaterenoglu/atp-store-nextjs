/**
 * ControlledTooltip - Tooltip that properly hides on click
 * SOLID Principles: SRP - Single responsibility for controlled tooltip behavior
 * Design Patterns: Wrapper Component Pattern
 * Dependencies: React, Radix UI Tooltip
 */

'use client'

import * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/schadcn/tooltip'

interface ControlledTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  asChild?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export function ControlledTooltip({
  children,
  content,
  asChild = true,
  side = 'top',
  align = 'center',
  sideOffset = 4,
}: ControlledTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 100)
  }

  const handleClick = () => {
    setOpen(false)
  }

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        asChild={asChild}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        onPointerDownOutside={() => setOpen(false)}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export function ControlledTooltipProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
}
