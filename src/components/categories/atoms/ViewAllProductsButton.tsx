/**
 * ViewAllProductsButton Atom Component
 * SOLID Principles: Single Responsibility - Navigation button to products
 * Design Patterns: Presentational Component Pattern
 * Dependencies: shadcn Button, Next.js Link, react-i18next
 */

'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { ArrowRight } from 'lucide-react'

interface ViewAllProductsButtonProps {
  href?: string
  className?: string
}

export function ViewAllProductsButton({
  href = '/products',
  className,
}: ViewAllProductsButtonProps) {
  const { t } = useTranslation('categories')

  return (
    <Button asChild variant="outline" size="lg" className={className}>
      <Link href={href}>
        {t('viewAllProducts', 'View All Products')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}
