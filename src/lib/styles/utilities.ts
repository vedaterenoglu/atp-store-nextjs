/**
 * Style Utility Functions
 * SOLID Principles: Single Responsibility - Style utility functions only
 * Design Patterns: Factory Pattern for generating consistent class names
 * Dependencies: clsx, tailwind-merge, style constants
 */

import { cn } from '@/lib/utils'
import {
  SPACING,
  SPACING_X,
  SPACING_Y,
  CONTAINERS,
  CONTAINER_WITH_PADDING,
  GAPS,
  COMPONENT_STYLES,
} from './constants'

/**
 * Container style options
 */
interface ContainerOptions {
  size?: keyof typeof CONTAINERS
  withPadding?: boolean
  className?: string
}

/**
 * Get container classes with consistent styling
 */
export function getContainerClasses({
  size = 'xl',
  withPadding = true,
  className,
}: ContainerOptions = {}): string {
  const baseClasses = withPadding
    ? CONTAINER_WITH_PADDING[size]
    : CONTAINERS[size]

  return cn(baseClasses, className)
}

/**
 * Spacing style options
 */
interface SpacingOptions {
  x?: keyof typeof SPACING_X
  y?: keyof typeof SPACING_Y
  all?: keyof typeof SPACING
  className?: string
}

/**
 * Get spacing classes with consistent padding
 */
export function getSpacingClasses({
  x,
  y,
  all,
  className,
}: SpacingOptions = {}): string {
  if (all) {
    return cn(SPACING[all], className)
  }

  const classes: string[] = []
  if (x) classes.push(SPACING_X[x])
  if (y) classes.push(SPACING_Y[y])

  return cn(classes, className)
}

/**
 * Card style options
 */
interface CardOptions {
  variant?: 'header' | 'content' | 'footer'
  className?: string
}

/**
 * Get card section classes
 */
export function getCardClasses({
  variant = 'content',
  className,
}: CardOptions = {}): string {
  return cn(COMPONENT_STYLES.card[variant], className)
}

/**
 * Grid style options
 */
interface GridOptions {
  gap?: keyof typeof GAPS
  responsive?: boolean
  className?: string
}

/**
 * Get grid layout classes
 */
export function getGridClasses({
  gap = 'md',
  responsive = true,
  className,
}: GridOptions = {}): string {
  const baseClasses = [
    COMPONENT_STYLES.grid.container,
    GAPS[gap],
    responsive && COMPONENT_STYLES.grid.responsive,
  ].filter(Boolean)

  return cn(baseClasses, className)
}

/**
 * Page layout options
 */
interface PageOptions {
  section?: 'container' | 'content' | 'section'
  className?: string
}

/**
 * Get page layout classes
 */
export function getPageClasses({
  section = 'container',
  className,
}: PageOptions = {}): string {
  return cn(COMPONENT_STYLES.page[section], className)
}

/**
 * Layout component options
 */
interface LayoutOptions {
  component: 'navbar' | 'footer' | 'sidebar'
  part: 'container' | 'inner'
  className?: string
}

/**
 * Get layout component classes
 */
export function getLayoutClasses({
  component,
  part,
  className,
}: LayoutOptions): string {
  return cn(COMPONENT_STYLES[component][part], className)
}

/**
 * Form layout options
 */
interface FormOptions {
  variant?: 'container' | 'field' | 'buttonGroup'
  className?: string
}

/**
 * Get form layout classes
 */
export function getFormClasses({
  variant = 'container',
  className,
}: FormOptions = {}): string {
  return cn(COMPONENT_STYLES.form[variant], className)
}

/**
 * Responsive class builder
 */
interface ResponsiveOptions {
  base: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  className?: string
}

/**
 * Build responsive classes with breakpoints
 */
export function getResponsiveClasses({
  base,
  sm,
  md,
  lg,
  xl,
  className,
}: ResponsiveOptions): string {
  const classes = [
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`,
  ].filter(Boolean)

  return cn(classes, className)
}
