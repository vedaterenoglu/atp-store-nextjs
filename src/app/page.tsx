/**
 * Home Page Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility as the home page entry point
 * - OCP: Open for extension through composition of sections
 * - DIP: Depends on abstractions (section components)
 *
 * Design Patterns:
 * - Composite Pattern: Composes multiple section components
 * - Template Method: Defines page structure for sections
 * - Dynamic Import Pattern: Client-side rendering for i18n components
 *
 * Architecture: Client component with dynamically imported sections
 * to handle i18n without hydration issues
 */
'use client'

import dynamic from 'next/dynamic'

// Dynamic imports with no SSR to prevent hydration issues
const HeroSection = dynamic(
  () => import('@/components/sections/home/hero-section'),
  {
    ssr: false,
    loading: () => (
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mt-8 sm:mt-12 space-y-2">
              <div className="h-9 sm:h-12 bg-muted rounded animate-pulse w-3/4 mx-auto" />
              <div className="h-9 sm:h-12 bg-muted rounded animate-pulse w-2/3 mx-auto" />
            </div>
            <div className="mt-2 space-y-2">
              <div className="h-6 bg-muted rounded animate-pulse w-full" />
              <div className="h-6 bg-muted rounded animate-pulse w-5/6 mx-auto" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-x-6">
              <div className="h-11 w-36 bg-muted rounded animate-pulse" />
              <div className="h-11 w-28 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    ),
  }
)

const FeaturesSection = dynamic(
  () => import('@/components/sections/home/features-section'),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 sm:mt-12 py-0 sm:py-2 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-0 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-3 sm:p-4 bg-background">
                  <div className="mb-1 sm:mb-2 h-8 w-8 sm:h-10 sm:w-10 bg-muted rounded-lg animate-pulse" />
                  <div className="mb-1 sm:mb-2 h-6 bg-muted rounded animate-pulse w-3/4" />
                  <div className="space-y-1">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}
