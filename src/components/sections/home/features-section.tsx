/**
 * Features Section Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for features section rendering
 * - OCP: Open for extension with new features
 * - DIP: Depends on UI component abstractions
 *
 * Design Patterns:
 * - Composite Pattern: Composed of feature cards
 * - Iterator Pattern: Maps through feature data
 *
 * Architecture: Client-side component with i18n support
 */
'use client'

import { Package, Truck, Shield, Leaf, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Feature {
  icon: LucideIcon
  titleKey: string
  descriptionKey: string
}

const featuresData: Feature[] = [
  {
    icon: Package,
    titleKey: 'home.features.premiumQuality.title',
    descriptionKey: 'home.features.premiumQuality.description',
  },
  {
    icon: Truck,
    titleKey: 'home.features.fastDelivery.title',
    descriptionKey: 'home.features.fastDelivery.description',
  },
  {
    icon: Shield,
    titleKey: 'home.features.trustedBrand.title',
    descriptionKey: 'home.features.trustedBrand.description',
  },
  {
    icon: Leaf,
    titleKey: 'home.features.ecoFriendly.title',
    descriptionKey: 'home.features.ecoFriendly.description',
  },
]

export default function FeaturesSection() {
  return (
    <div className="mt-8 sm:mt-12 py-0 sm:py-2 bg-muted/50">
      <FeaturesContainer>
        <FeaturesGrid />
      </FeaturesContainer>
    </div>
  )
}

function FeaturesContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  )
}

function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 gap-0 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {featuresData.map(feature => (
        <FeatureCard key={feature.titleKey} feature={feature} />
      ))}
    </div>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="p-3 sm:p-4 bg-background">
      <FeatureIcon Icon={feature.icon} />
      <FeatureTitle titleKey={feature.titleKey} />
      <FeatureDescription descriptionKey={feature.descriptionKey} />
    </div>
  )
}

function FeatureIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="mb-1 sm:mb-2 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
    </div>
  )
}

function FeatureTitle({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation('common')
  return <h3 className="mb-1 sm:mb-2 font-semibold">{t(titleKey)}</h3>
}

function FeatureDescription({ descriptionKey }: { descriptionKey: string }) {
  const { t } = useTranslation('common')
  return <p className="text-sm text-muted-foreground">{t(descriptionKey)}</p>
}
