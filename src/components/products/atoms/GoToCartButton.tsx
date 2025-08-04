/**
 * GoToCartButton Atom Component
 * SOLID Principles: Single Responsibility - Navigate to cart
 * Design Patterns: Navigation Component Pattern
 * Dependencies: shadcn/ui Button, Next.js router, react-i18next, customer auth
 */

'use client'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/schadcn'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { useCustomerAuth } from '@/lib/auth/customer-auth'

interface GoToCartButtonProps {
  className?: string
}

export function GoToCartButton({ className }: GoToCartButtonProps) {
  const { t } = useTranslation('products')
  const router = useRouter()
  const { requireCustomerAuth } = useCustomerAuth()

  const handleClick = () => {
    requireCustomerAuth(() => {
      router.push('/cart')
    })
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
