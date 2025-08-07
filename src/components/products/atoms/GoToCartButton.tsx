/**
 * GoToCartButton Atom Component
 * SOLID Principles: Single Responsibility - Navigate to cart with auth check
 * Design Patterns: Navigation Component Pattern with Auth Guard
 * Dependencies: shadcn/ui Button, Next.js router, react-i18next, role auth
 */

'use client'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/schadcn'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRoleAuth } from '@/lib/auth/role-auth'

interface GoToCartButtonProps {
  className?: string
}

export function GoToCartButton({ className }: GoToCartButtonProps) {
  const { t } = useTranslation('products')
  const router = useRouter()
  const { requireAuth } = useRoleAuth()

  const handleClick = () => {
    requireAuth(
      'customer',
      () => {
        router.push('/cart')
      },
      {
        showToast: true,
      }
    )
  }

  return (
    <Button
      variant="default"
      size="lg"
      className={cn('h-12 gap-2', className)}
      onClick={handleClick}
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline">{t('navigation.goToCart')}</span>
      <span className="sm:hidden">{t('navigation.cart')}</span>
    </Button>
  )
}
