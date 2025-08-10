/**
 * AboutUsTemplate - Main template for About Us page
 * SOLID Principles: SRP - Orchestrates about us page layout
 * Design Patterns: Template Pattern, Composition Pattern
 * Dependencies: ImageSlider, AboutTitle, AboutContent, GoogleMapsEmbed, ContactForm, i18next
 */

'use client'

import { useTranslation } from 'react-i18next'
import { ImageSlider } from '@/components/about-us/molecules/ImageSlider'
import { AboutTitle } from '@/components/about-us/molecules/AboutTitle'
import { AboutContent } from '@/components/about-us/molecules/AboutContent'
import { GoogleMapsEmbed } from '@/components/about-us/molecules/GoogleMapsEmbed'
import { ContactForm } from '@/components/about-us/organisms/ContactForm'
import { ContactInfo } from '@/components/about-us/molecules/ContactInfo'
import {
  getPageClasses,
  getContainerClasses,
  getSpacingClasses,
  getGridClasses,
} from '@/lib/styles/utilities'
import { cn } from '@/lib/utils'

export function AboutUsTemplate() {
  const { t } = useTranslation('aboutUs')

  return (
    <div className={getPageClasses({ section: 'container' })}>
      {/* Hero Section with Image Slider */}
      <section className={cn('relative w-full')}>
        <ImageSlider />
      </section>

      {/* About Us Content Section */}
      <section
        className={cn(
          getPageClasses({ section: 'section' }),
          getSpacingClasses({ y: 'xl' })
        )}
      >
        <div
          className={getContainerClasses({ size: 'xl', withPadding: false })}
        >
          <AboutTitle />
          <AboutContent />
        </div>
      </section>

      {/* Location Section */}
      <section className={cn(getSpacingClasses({ y: 'xl' }), 'bg-muted/50')}>
        <div className={getContainerClasses({ size: 'xl' })}>
          <h2 className={cn('text-3xl font-bold text-center mb-8')}>
            {t('location.title')}
          </h2>
          <GoogleMapsEmbed />
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={cn(
          getPageClasses({ section: 'section' }),
          getSpacingClasses({ y: 'xl' })
        )}
      >
        <div
          className={getContainerClasses({ size: 'xl', withPadding: false })}
        >
          <h2 className={cn('text-3xl font-bold text-center mb-12')}>
            {t('contact.title')}
          </h2>
          <div
            className={cn(
              getGridClasses({ gap: 'lg', responsive: false }),
              'grid-cols-1 lg:grid-cols-2'
            )}
          >
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
