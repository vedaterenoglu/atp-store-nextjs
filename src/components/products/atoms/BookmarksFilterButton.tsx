/**
 * BookmarksFilterButton Atom Component
 * SOLID Principles: Single Responsibility - Toggle bookmarks filter with auth check
 * Design Patterns: Toggle Component Pattern with Auth Guard
 * Dependencies: shadcn/ui Button, lucide-react icons, react-i18next, role auth
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { Bookmark } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { useRoleAuth } from '@/lib/auth/role-auth'

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
  const { requireAuth } = useRoleAuth()

  const handleClick = () => {
    requireAuth(
      'customer',
      () => {
        onClick()
      },
      {
        showToast: true,
      }
    )
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
