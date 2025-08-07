/**
 * Hero Section Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for hero section rendering
 * - OCP: Open for extension with new content
 * - DIP: Depends on UI component abstractions
 *
 * Design Patterns:
 * - Composite Pattern: Composed of sub-components
 * - Presentation Component Pattern: Focuses on display logic
 *
 * Architecture: Client-side component with i18n support
 */
'use client'

import { Button } from '@/components/ui/schadcn'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <HeroContainer>
        <HeroContent />
        <HeroBackground />
      </HeroContainer>
    </div>
  )
}

function HeroContainer({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto px-4 py-2">{children}</div>
}

function HeroContent() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <HeroTitle />
      <HeroDescription />
      <HeroActions />
    </div>
  )
}

function HeroTitle() {
  const { t } = useTranslation('common')

  return (
    <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl mt-8 sm:mt-12">
      {t('home.hero.title')}
      <span className="block text-primary">{t('home.hero.subtitle')}</span>
    </h1>
  )
}

function HeroDescription() {
  const { t } = useTranslation('common')

  return (
    <p className="mt-6 sm:mt-8 text-lg leading-8 text-muted-foreground">
      {t('home.hero.description')}
    </p>
  )
}

function HeroActions() {
  return (
    <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-6">
      <HeroPrimaryAction />
      <HeroSecondaryAction />
    </div>
  )
}

export function HeroPrimaryAction() {
  const { t } = useTranslation('common')

  return (
    <Button size="lg" className="gap-2" asChild>
      <Link href="/categories">
        {t('home.hero.browseProducts')}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  )
}

function HeroSecondaryAction() {
  const { t } = useTranslation('common')

  return (
    <Button
      size="lg"
      className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 cursor-pointer"
      asChild
    >
      <Link href="/about-us">{t('home.hero.aboutUs')}</Link>
    </Button>
  )
}

function HeroBackground() {
  return (
    <div
      className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl"
      aria-hidden="true"
    >
      <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-primary/30 opacity-20" />
    </div>
  )
}
