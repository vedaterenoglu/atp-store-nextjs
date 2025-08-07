/**
 * AboutTitle Molecule - Title section for about us page
 * SOLID Principles: SRP - Manages title display
 * Design Patterns: Molecule Pattern
 * Dependencies: i18next, HeroPrimaryAction
 */

'use client'

import { useTranslation } from 'react-i18next'
import { HeroPrimaryAction } from '@/components/sections/home/hero-section'

export function AboutTitle() {
  const { t, ready } = useTranslation('aboutUs')

  if (!ready) {
    return (
      <div className="text-center mb-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded max-w-3xl mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
        {t('subtitle')}
      </p>
      <div className="flex justify-center">
        <HeroPrimaryAction />
      </div>
    </div>
  )
}
