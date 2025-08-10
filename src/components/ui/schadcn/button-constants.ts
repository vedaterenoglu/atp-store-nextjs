/**
 * Button Constants and Presets
 * SOLID Principles: SRP - Single responsibility for button configurations
 * Design Patterns: Constants Pattern, Configuration Object Pattern
 * Dependencies: None
 */

import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from './button'

/**
 * Common button class names extracted as constants (DRY principle)
 */
export const BUTTON_CLASSES = {
  // Width variants
  fullWidth: 'w-full',
  responsiveWidth: 'w-full sm:w-auto',
  
  // Spacing variants
  withGap: {
    xs: 'gap-1',
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-3',
  },
  
  // Margin variants
  margin: {
    top: {
      sm: 'mt-2',
      md: 'mt-4',
      lg: 'mt-6',
      xl: 'mt-8',
    },
    bottom: {
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8',
    },
  },
  
  // Common patterns
  iconButton: 'size-9',
  floatingButton: 'fixed bottom-4 right-4 z-50 shadow-lg',
  stickyButton: 'sticky bottom-0 z-10',
} as const

/**
 * Button presets for consistent styling across the app
 */
export const BUTTON_PRESETS: Record<
  string,
  VariantProps<typeof buttonVariants> & { className?: string }
> = {
  // Navigation buttons
  navPrimary: {
    variant: 'default',
    size: 'default',
  },
  navSecondary: {
    variant: 'ghost',
    size: 'sm',
  },
  navBack: {
    variant: 'outline',
    size: 'default',
    className: BUTTON_CLASSES.withGap.md,
  },
  
  // Form buttons
  formSubmit: {
    variant: 'default',
    size: 'lg',
    className: BUTTON_CLASSES.fullWidth,
  },
  formCancel: {
    variant: 'outline',
    size: 'default',
  },
  formReset: {
    variant: 'ghost',
    size: 'sm',
  },
  
  // Action buttons
  actionPrimary: {
    variant: 'default',
    size: 'default',
  },
  actionSecondary: {
    variant: 'secondary',
    size: 'default',
  },
  actionDanger: {
    variant: 'destructive',
    size: 'default',
  },
  
  // Card buttons
  cardAction: {
    variant: 'outline',
    size: 'sm',
  },
  cardPrimary: {
    variant: 'default',
    size: 'sm',
  },
  
  // Modal buttons
  modalConfirm: {
    variant: 'default',
    size: 'default',
  },
  modalCancel: {
    variant: 'outline',
    size: 'default',
  },
  modalClose: {
    variant: 'ghost',
    size: 'icon',
  },
  
  // Filter/Toggle buttons
  filterActive: {
    variant: 'default',
    size: 'sm',
  },
  filterInactive: {
    variant: 'outline',
    size: 'sm',
  },
  
  // Icon buttons
  iconAction: {
    variant: 'ghost',
    size: 'icon',
  },
  iconPrimary: {
    variant: 'default',
    size: 'icon',
  },
  
  // Loading button
  loading: {
    variant: 'outline',
    size: 'default',
    className: 'pointer-events-none opacity-50',
  },
} as const

/**
 * Button group spacing configurations
 */
export const BUTTON_GROUP_CLASSES = {
  horizontal: {
    tight: 'flex gap-1',
    normal: 'flex gap-2',
    loose: 'flex gap-4',
    responsive: 'flex flex-col gap-2 sm:flex-row sm:gap-3',
  },
  vertical: {
    tight: 'flex flex-col gap-1',
    normal: 'flex flex-col gap-2',
    loose: 'flex flex-col gap-4',
  },
  grid: {
    two: 'grid grid-cols-2 gap-2',
    three: 'grid grid-cols-3 gap-2',
    responsive: 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

/**
 * Animation configurations for different button states
 */
export const BUTTON_ANIMATIONS = {
  click: 'active:scale-95',
  hover: 'hover:scale-105',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
} as const