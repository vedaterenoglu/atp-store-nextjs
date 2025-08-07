/**
 * BackToCategoriesButton Atom Component
 * SOLID Principles: Single Responsibility - Navigate back to categories
 * Design Patterns: Navigation Component Pattern
 * Dependencies: shadcn/ui Button, Next.js Link, react-i18next
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BackToCategoriesButtonProps {
  className?: string
}

export function BackToCategoriesButton({
  className,
}: BackToCategoriesButtonProps) {
  const { t } = useTranslation('products')

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn('h-12 gap-2', className)}
      asChild
    >
      <Link href="/categories">
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">
          {t('navigation.backToCategories')}
        </span>
        <span className="sm:hidden">{t('navigation.back')}</span>
      </Link>
    </Button>
  )
}
