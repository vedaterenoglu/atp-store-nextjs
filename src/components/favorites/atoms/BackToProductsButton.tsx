/**
 * BackToProductsButton Atom - Navigation button to products page
 * SOLID Principles: SRP - Single navigation responsibility
 * Design Patterns: Atomic Design Pattern
 * Dependencies: Next.js Link, shadcn/ui Button
 */

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/schadcn'
import { ArrowLeft } from 'lucide-react'

interface BackToProductsButtonProps {
  className?: string
}

export function BackToProductsButton({ className }: BackToProductsButtonProps) {
  return (
    <Link href="/products">
      <Button variant="outline" size="lg" className={`h-12 ${className || ''}`}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>
    </Link>
  )
}
