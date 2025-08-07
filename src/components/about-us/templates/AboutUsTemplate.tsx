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

export function AboutUsTemplate() {
  const { t } = useTranslation('aboutUs')

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative w-full">
        <ImageSlider />
      </section>

      {/* About Us Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AboutTitle />
          <AboutContent />
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('location.title')}
          </h2>
          <GoogleMapsEmbed />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('contact.title')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
