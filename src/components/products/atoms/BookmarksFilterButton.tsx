/**
 * BookmarksFilterButton Atom Component
 * SOLID Principles: Single Responsibility - Navigate to bookmarks or toggle filter
 * Design Patterns: Navigation/Toggle Component Pattern with Auth Guard
 * Dependencies: shadcn/ui Button, lucide-react icons, react-i18next, secure auth, next router
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useSecureAuth } from '@/hooks/use-secure-auth'
import { toast } from '@/lib/utils/toast'

interface BookmarksFilterButtonProps {
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function BookmarksFilterButton({
  isActive = false,
  className,
}: BookmarksFilterButtonProps) {
  const { t } = useTranslation('products')
  const router = useRouter()
  const { auth, isAuthenticated } = useSecureAuth()

  const handleClick = () => {
    console.log('🔘 BookmarksFilterButton clicked, auth state:', {
      isAuthenticated,
      auth,
      canBookmark: auth.canBookmark,
      activeCustomerId: auth.activeCustomerId,
      role: auth.role
    })
    
    // Use server-provided permission flags instead of manual checks
    if (!isAuthenticated) {
      toast.error('Please sign in to access bookmarks')
      return
    }
    
    // Check if user can bookmark (server handles admin logic)
    if (!auth.canBookmark) {
      if (!auth.role || (auth.role !== 'customer' && auth.role !== 'admin')) {
        toast.error('You need a customer or admin account to access bookmarks')
      } else {
        toast.error('Please select a customer account to access bookmarks')
      }
      return
    }
    
    // All checks passed, navigate to favorites
    router.push('/favorites')
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
