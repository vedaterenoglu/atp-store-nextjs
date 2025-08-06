/**
 * BookmarksFilterButton Atom Component
 * SOLID Principles: Single Responsibility - Navigate to bookmarks or toggle filter
 * Design Patterns: Navigation/Toggle Component Pattern with Auth Guard
 * Dependencies: shadcn/ui Button, lucide-react icons, react-i18next, role auth, next router
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { Bookmark } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'

interface BookmarksFilterButtonProps {
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function BookmarksFilterButton({
  isActive = false,
  onClick,
  className,
}: BookmarksFilterButtonProps) {
  const { t } = useTranslation('products')
  const { requireAuth } = useRoleAuth()
  const router = useRouter()
  const { isSignedIn, sessionClaims } = useAuth()
  const { user } = useUser()

  const handleClick = () => {
    // Check if user is signed in and has customer role with customerid
    if (isSignedIn) {
      const metadata = sessionClaims?.['metadata'] as
        | Record<string, unknown>
        | undefined
      const sessionRole = metadata?.['role'] as string | undefined
      const publicRole = user?.publicMetadata?.['role'] as string | undefined
      const userRole = sessionRole || publicRole

      const sessionCustomerId = metadata?.['customerid'] as string | undefined
      const publicCustomerId = user?.publicMetadata?.['customerid'] as
        | string
        | undefined
      const hasCustomerId = sessionCustomerId || publicCustomerId

      // If customer with customerid, navigate to favorites
      if (userRole === 'customer' && hasCustomerId) {
        router.push('/favorites')
        return
      }
    }

    // Otherwise, require auth and then execute onClick (filter)
    requireAuth(
      'customer',
      () => {
        if (onClick) onClick()
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
