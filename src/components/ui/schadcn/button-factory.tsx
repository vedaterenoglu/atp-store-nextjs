/**
 * Button Factory for Common Patterns
 * SOLID Principles: SRP, OCP - Single responsibility, open for extension
 * Design Patterns: Factory Pattern, Builder Pattern
 * Dependencies: Button component, Next.js Link, Icons
 */

'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  ArrowRight, 
  ShoppingCart, 
  Filter,
  X,
  Check,
  Plus,
  Minus,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Search,
  Save,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Edit,
  Copy,
  Share2,
  Heart,
  Bookmark,
  type LucideIcon
} from 'lucide-react'
import { Button } from './button'
import { BUTTON_PRESETS } from './button-constants'
import { cn } from '@/lib/utils'

/**
 * Icon mapping for common button types
 */
const BUTTON_ICONS: Record<string, LucideIcon> = {
  back: ArrowLeft,
  forward: ArrowRight,
  cart: ShoppingCart,
  filter: Filter,
  close: X,
  confirm: Check,
  add: Plus,
  remove: Minus,
  loading: Loader2,
  previous: ChevronLeft,
  next: ChevronRight,
  home: Home,
  settings: Settings,
  search: Search,
  save: Save,
  download: Download,
  upload: Upload,
  refresh: RefreshCw,
  delete: Trash2,
  edit: Edit,
  copy: Copy,
  share: Share2,
  favorite: Heart,
  bookmark: Bookmark,
} as const

/**
 * Factory props interface
 */
interface ButtonFactoryProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  label: string
  icon?: keyof typeof BUTTON_ICONS | LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  href?: string
  onClick?: () => void
  preset?: keyof typeof BUTTON_PRESETS
}

/**
 * Main Button Factory Component
 */
export function ButtonFactory({
  label,
  icon,
  iconPosition = 'left',
  loading = false,
  href,
  onClick,
  preset,
  className,
  variant,
  size,
  disabled,
  ...props
}: ButtonFactoryProps) {
  const router = useRouter()
  
  // Apply preset if provided
  const presetConfig = preset ? BUTTON_PRESETS[preset] : undefined
  
  // Merge props with preset
  const finalVariant = variant || presetConfig?.variant
  const finalSize = size || presetConfig?.size
  const finalClassName = cn(presetConfig?.className, className)
  
  // Get icon component
  const IconComponent = React.useMemo(() => {
    if (loading) return BUTTON_ICONS['loading']
    if (!icon) return null
    if (typeof icon === 'string') return BUTTON_ICONS[icon]
    return icon
  }, [icon, loading])
  
  // Handle click with navigation support
  const handleClick = React.useCallback(() => {
    if (href && !onClick) {
      router.push(href)
    } else if (onClick) {
      onClick()
    }
  }, [href, onClick, router])
  
  // Render button content
  const buttonContent = (
    <>
      {IconComponent && iconPosition === 'left' && (
        <IconComponent className={cn('h-4 w-4', loading && 'animate-spin')} />
      )}
      <span>{label}</span>
      {IconComponent && iconPosition === 'right' && (
        <IconComponent className={cn('h-4 w-4', loading && 'animate-spin')} />
      )}
    </>
  )
  
  // If href is provided and no onClick, use Link
  if (href && !onClick) {
    return (
      <Button
        asChild
        variant={finalVariant}
        size={finalSize}
        className={finalClassName}
        disabled={disabled || loading}
        {...props}
      >
        <Link href={href}>{buttonContent}</Link>
      </Button>
    )
  }
  
  // Otherwise, render regular button
  return (
    <Button
      variant={finalVariant}
      size={finalSize}
      className={finalClassName}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </Button>
  )
}

/**
 * Pre-configured button factories for common patterns
 */
export const BackButton = (props: Partial<ButtonFactoryProps>) => (
  <ButtonFactory
    label={props.label || 'Back'}
    preset="navBack"
    icon="back"
    iconPosition="left"
    {...props}
  />
)

export const GoToCartButton = (props: Partial<ButtonFactoryProps>) => (
  <ButtonFactory
    preset="actionPrimary"
    icon="cart"
    iconPosition="right"
    label="Go to Cart"
    href="/cart"
    {...props}
  />
)

export const FilterButton = (props: Partial<ButtonFactoryProps> & { isActive?: boolean }) => (
  <ButtonFactory
    preset={props.isActive ? 'filterActive' : 'filterInactive'}
    icon="filter"
    iconPosition="left"
    label="Filter"
    {...props}
  />
)

export const SaveButton = (props: Partial<ButtonFactoryProps>) => (
  <ButtonFactory
    preset="formSubmit"
    icon="save"
    iconPosition="left"
    label="Save"
    {...props}
  />
)

export const CancelButton = (props: Partial<ButtonFactoryProps>) => (
  <ButtonFactory
    preset="formCancel"
    icon="close"
    iconPosition="left"
    label="Cancel"
    {...props}
  />
)

export const DeleteButton = (props: Partial<ButtonFactoryProps>) => (
  <ButtonFactory
    preset="actionDanger"
    icon="delete"
    iconPosition="left"
    label="Delete"
    {...props}
  />
)

export const LoadingButton = (props: Partial<ButtonFactoryProps>) => (
  <ButtonFactory
    preset="loading"
    loading={true}
    label="Loading..."
    {...props}
  />
)

export const IconButton = (props: Partial<ButtonFactoryProps> & { icon: keyof typeof BUTTON_ICONS | LucideIcon }) => (
  <ButtonFactory
    preset="iconAction"
    label=""
    className="sr-only"
    {...props}
  />
)