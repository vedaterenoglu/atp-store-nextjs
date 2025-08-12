/**
 * GoToCartButton Atom Component
 * SOLID Principles: Single Responsibility - Navigate to cart with auth check
 * Design Patterns: Navigation Component Pattern with Auth Guard
 * Dependencies: shadcn/ui Button, Next.js router, react-i18next, secure auth
 */

'use client'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/schadcn'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSecureAuth } from '@/hooks/use-secure-auth'
import { toast } from '@/lib/utils/toast'

interface GoToCartButtonProps {
  className?: string
}

export function GoToCartButton({ className }: GoToCartButtonProps) {
  const { t } = useTranslation('products')
  const router = useRouter()
  const { auth, isAuthenticated } = useSecureAuth()

  const handleClick = () => {
    // Use server-provided permission flags instead of manual checks
    // The server already handles admin logic correctly
    if (!isAuthenticated) {
      toast.error('Please sign in to access cart')
      return
    }
    
    // Check if user can access customer features (includes admin with customer)
    if (!auth.canAccessCustomerFeatures) {
      if (!auth.role || (auth.role !== 'customer' && auth.role !== 'admin')) {
        toast.error('You need a customer or admin account to access cart')
      } else {
        toast.error('Please select a customer account to access cart')
      }
      return
    }
    
    // All checks passed, navigate to cart
    router.push('/cart')
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
