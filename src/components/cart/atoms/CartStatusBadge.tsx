/**
 * Cart status badge atom component
 * SOLID Principles: SRP - Single responsibility for displaying cart status
 * Design Patterns: Presentational Component Pattern
 * Dependencies: React, cart types, clsx, i18n
 */

'use client'

import { clsx } from 'clsx'
import { CartStatus } from '@/types/cart'
import {
  CheckCircle,
  Clock,
  ShoppingCart,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

interface CartStatusBadgeProps {
  status: CartStatus
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CartStatusBadge({
  status,
  showIcon = true,
  size = 'md',
  className,
}: CartStatusBadgeProps) {
  const { t } = useSafeTranslation('cart')

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const statusConfig = {
    [CartStatus.ACTIVE]: {
      label: t('status.active'),
      icon: ShoppingCart,
      className:
        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    },
    [CartStatus.PENDING]: {
      label: t('status.pending'),
      icon: Clock,
      className:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    },
    [CartStatus.CHECKED_OUT]: {
      label: t('status.checkedOut'),
      icon: CheckCircle,
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    },
    [CartStatus.ABANDONED]: {
      label: t('status.abandoned'),
      icon: XCircle,
      className:
        'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    },
    [CartStatus.EXPIRED]: {
      label: t('status.expired'),
      icon: AlertCircle,
      className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        config.className,
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </span>
  )
}
