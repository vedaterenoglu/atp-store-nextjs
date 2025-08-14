'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95 active:transition-transform",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  disabled,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  // Internal debounce state
  const [isDebouncing, setIsDebouncing] = React.useState(false)
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  // Enhanced click handler with debounce
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // For submit buttons, don't interfere with form submission
      if (type === 'submit' && !onClick) {
        // Let the form handle the submission naturally
        return
      }
      
      // Prevent if disabled or debouncing
      if (disabled || isDebouncing) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      // Start debounce BEFORE calling onClick
      setIsDebouncing(true)

      // Call original onClick if provided
      if (onClick) {
        onClick(event)
      }

      // Clear any existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      // Re-enable after 250ms
      debounceTimeoutRef.current = setTimeout(() => {
        setIsDebouncing(false)
      }, 250)
    },
    [onClick, disabled, isDebouncing, type]
  )

  const Comp = asChild ? Slot : "button"

  // Combine disabled states
  const isDisabled = disabled || isDebouncing

  // Add visual feedback classes when debouncing
  const finalClassName = cn(
    buttonVariants({ variant, size, className }),
    isDebouncing && "opacity-50 cursor-not-allowed pointer-events-none"
  )

  // If using asChild (for Link components), pass through props differently
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={finalClassName}
        aria-disabled={isDisabled}
        onClick={handleClick}
        {...props}
      />
    )
  }

  return (
    <Comp
      data-slot="button"
      type={type}
      className={finalClassName}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    />
  )
}

export { Button, buttonVariants }

// Export button utilities
export * from './button-constants'
export * from './button-factory'
export * from './button-group'
