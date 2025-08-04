/**
 * BookmarksFilterButton Atom Component
 * SOLID Principles: Single Responsibility - Toggle bookmarks filter
 * Design Patterns: Toggle Component Pattern
 * Dependencies: shadcn/ui Button, lucide-react icons, react-i18next, customer auth
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { Bookmark } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { useCustomerAuth } from '@/lib/auth/customer-auth'

interface BookmarksFilterButtonProps {
  isActive: boolean
  onClick: () => void
  className?: string
}

export function BookmarksFilterButton({
  isActive,
  onClick,
  className,
}: BookmarksFilterButtonProps) {
  const { t } = useTranslation('products')
  const { requireCustomerAuth } = useCustomerAuth()

  const handleClick = () => {
    requireCustomerAuth(() => {
      onClick()
    })
  }

  return (
    <Button
      onClick={handleClick}
      variant={isActive ? 'default' : 'outline'}
      size="lg"
      className={cn('h-12 gap-2', className)}
    >
      <Bookmark className={cn('h-4 w-4', isActive && 'fill-current')} />
      {t('bookmarks.button')}
    </Button>
  )
}
