/**
 * AboutContent Molecule - Content sections for about us page
 * SOLID Principles: SRP - Manages content display
 * Design Patterns: Molecule Pattern
 * Dependencies: shadcn Card, i18next
 */

'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn/card'
import { CheckCircle, Users, Globe, Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function AboutContent() {
  const { t, ready } = useTranslation('aboutUs')

  // Get history paragraphs as array with fallback
  const historyParagraphsRaw = t('history.paragraphs', { returnObjects: true })
  const historyParagraphs = Array.isArray(historyParagraphsRaw)
    ? historyParagraphsRaw
    : []

  // Return loading state if translations not ready
  if (!ready) {
    return (
      <div className="space-y-12">
        <Card>
          <CardContent className="py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const features = [
    {
      icon: Users,
      title: t('features.expertTeam.title'),
      description: t('features.expertTeam.description'),
    },
    {
      icon: Globe,
      title: t('features.globalPresence.title'),
      description: t('features.globalPresence.description'),
    },
    {
      icon: Award,
      title: t('features.qualityAssured.title'),
      description: t('features.qualityAssured.description'),
    },
    {
      icon: CheckCircle,
      title: t('features.trustedPartner.title'),
      description: t('features.trustedPartner.description'),
    },
  ]
  return (
    <div className="space-y-12">
      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('mission.title')}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">{t('mission.paragraph1')}</p>
          <p className="text-muted-foreground mt-4">
            {t('mission.paragraph2')}
          </p>
        </CardContent>
      </Card>

      {/* History Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('history.title')}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          {historyParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-muted-foreground ${index < historyParagraphs.length - 1 ? 'mb-4' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Values Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('values.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong>{t('values.items.integrity.label')}:</strong>{' '}
                {t('values.items.integrity.description')}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong>{t('values.items.innovation.label')}:</strong>{' '}
                {t('values.items.innovation.description')}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong>{t('values.items.customerFocus.label')}:</strong>{' '}
                {t('values.items.customerFocus.description')}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong>{t('values.items.sustainability.label')}:</strong>{' '}
                {t('values.items.sustainability.description')}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
