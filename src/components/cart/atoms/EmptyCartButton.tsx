/**
 * Empty Cart Button Atom Component
 * SOLID Principles: SRP - Single responsibility for empty cart action
 * Design Patterns: Composite Component Pattern
 * Dependencies: React, UI components, empty cart hook
 */

'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/schadcn'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/schadcn/alert-dialog'
import { useEmptyCart } from '@/hooks/use-empty-cart'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface EmptyCartButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showIcon?: boolean
  showText?: boolean
}

export function EmptyCartButton({
  variant = 'outline',
  size = 'sm',
  className,
  showIcon = true,
  showText = true,
}: EmptyCartButtonProps) {
  const { t } = useTranslation('cart')
  const {
    isConfirmOpen,
    openConfirmDialog,
    closeConfirmDialog,
    confirmEmptyCart,
    canEmpty,
  } = useEmptyCart()

  if (!canEmpty) {
    return null
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={openConfirmDialog}
        className={cn('gap-2', className)}
      >
        {showIcon && <Trash2 className="h-4 w-4" />}
        {showText && <span>{t('emptyCart.button')}</span>}
      </Button>

      <AlertDialog open={isConfirmOpen} onOpenChange={closeConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('emptyCart.confirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('emptyCart.confirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('emptyCart.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEmptyCart}>
              {t('emptyCart.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
