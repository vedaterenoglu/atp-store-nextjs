/**
 * Style System Constants
 * SOLID Principles: Single Responsibility - Defines style constants only
 * Design Patterns: Constants Pattern for centralized style definitions
 * Dependencies: None
 */

/**
 * Spacing scale for consistent padding/margin
 */
export const SPACING = {
  xs: 'p-2 sm:p-3',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-12',
} as const

export const SPACING_X = {
  xs: 'px-2 sm:px-3',
  sm: 'px-3 sm:px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-10',
  xl: 'px-8 sm:px-12 lg:px-16',
} as const

export const SPACING_Y = {
  xs: 'py-2 sm:py-3',
  sm: 'py-3 sm:py-4',
  md: 'py-4 sm:py-6',
  lg: 'py-6 sm:py-8 lg:py-10',
  xl: 'py-8 sm:py-12 lg:py-16',
} as const

/**
 * Container sizes for layout consistency
 */
export const CONTAINERS = {
  xs: 'max-w-3xl mx-auto',
  sm: 'max-w-4xl mx-auto',
  md: 'max-w-5xl mx-auto',
  lg: 'max-w-6xl mx-auto',
  xl: 'max-w-7xl mx-auto',
  full: 'w-full',
} as const

/**
 * Standard container with responsive padding
 */
export const CONTAINER_WITH_PADDING = {
  xs: 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
  sm: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  md: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
  lg: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  xl: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  full: 'w-full px-4 sm:px-6 lg:px-8',
} as const

/**
 * Gap sizes for flex/grid layouts
 */
export const GAPS = {
  xs: 'gap-2',
  sm: 'gap-3 sm:gap-4',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
  xl: 'gap-8 sm:gap-10 lg:gap-12',
} as const

/**
 * Standard component patterns
 */
export const COMPONENT_STYLES = {
  // Layout components
  navbar: {
    container: 'border-b -mx-4',
    inner: 'px-4 sm:px-8 py-3 sm:py-4',
  },
  footer: {
    container: 'mt-auto border-t -mx-4',
    inner: 'px-4 py-4 sm:py-6',
  },
  sidebar: {
    container: 'border-r h-full',
    inner: 'p-4 sm:p-6',
  },

  // Page templates
  page: {
    container: 'min-h-screen',
    content: 'py-8 sm:py-12 lg:py-16',
    section: 'px-4 sm:px-6 lg:px-8',
  },

  // Card components
  card: {
    header: 'px-4 sm:px-6 pb-3',
    content: 'px-4 sm:px-6 py-4',
    footer: 'px-4 sm:px-6 pt-3',
  },

  // Grid layouts
  grid: {
    container: 'grid w-full',
    responsive: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    gap: 'gap-4 sm:gap-6 lg:gap-8',
  },

  // Form components
  form: {
    container: 'space-y-4',
    field: 'space-y-2',
    buttonGroup: 'flex gap-2 sm:gap-4',
  },
} as const

/**
 * Responsive breakpoints (matching Tailwind defaults)
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
