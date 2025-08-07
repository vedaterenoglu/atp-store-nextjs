/**
 * BackToProductsButton Atom - Navigation button to products page
 * SOLID Principles: SRP - Single navigation responsibility
 * Design Patterns: Atomic Design Pattern
 * Dependencies: Next.js Link, shadcn/ui Button, react-i18next
 */

'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { ArrowLeft } from 'lucide-react'

interface BackToProductsButtonProps {
  className?: string
}

export function BackToProductsButton({ className }: BackToProductsButtonProps) {
  const { t } = useTranslation('favorites')

  return (
    <Link href="/products">
      <Button variant="outline" size="lg" className={`h-12 ${className || ''}`}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t('navigation.backToProducts')}
      </Button>
    </Link>
  )
}
