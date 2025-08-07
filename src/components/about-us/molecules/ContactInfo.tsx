/**
 * ContactInfo Molecule - Contact information display
 * SOLID Principles: SRP - Manages contact info display
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
import { MapPin, Phone, Mail, Clock, Globe, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ContactInfo() {
  const { t, ready } = useTranslation('aboutUs')

  if (!ready) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="h-12 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: t('contact.info.address.title'),
      content: [
        t('contact.info.address.company'),
        t('contact.info.address.street'),
        t('contact.info.address.postal'),
        t('contact.info.address.country'),
      ],
    },
    {
      icon: Phone,
      title: t('contact.info.orderReception.title'),
      content: [
        {
          text: '+46 76 196 1113',
          href: 'tel:+46761961113',
          type: 'tel' as const,
        },
        {
          text: `${t('contact.info.orderReception.whatsapp')}: +46 76 196 1113`,
          href: 'https://wa.me/46761961113',
          type: 'whatsapp' as const,
        },
      ],
    },
    {
      icon: Phone,
      title: t('contact.info.customerService.title'),
      content: [
        {
          text: '+46 76 260 1112',
          href: 'tel:+46762601112',
          type: 'tel' as const,
        },
        {
          text: '+46 73 769 6164',
          href: 'tel:+46737696164',
          type: 'tel' as const,
        },
        {
          text: `${t('contact.info.customerService.whatsapp')}: +46 76 260 1112`,
          href: 'https://wa.me/46762601112',
          type: 'whatsapp' as const,
        },
        {
          text: `${t('contact.info.customerService.whatsapp')}: +46 73 769 6164`,
          href: 'https://wa.me/46737696164',
          type: 'whatsapp' as const,
        },
      ],
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      content: [
        {
          text: 'order@alfetissuepaper.se',
          href: 'mailto:order@alfetissuepaper.se',
          type: 'email' as const,
        },
        {
          text: 'info@alfetissuepaper.se',
          href: 'mailto:info@alfetissuepaper.se',
          type: 'email' as const,
        },
      ],
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      content: [
        t('contact.info.hours.weekdays'),
        t('contact.info.hours.weekend'),
      ],
    },
    {
      icon: Globe,
      title: t('contact.info.website.title'),
      content: [
        {
          text: 'atpstore.se',
          href: 'http://atpstore.se',
          type: 'website' as const,
        },
      ],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('contact.info.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{t('contact.info.description')}</p>

        {contactDetails.map((detail, index) => {
          const Icon = detail.icon
          return (
            <div key={index} className="flex items-start space-x-3">
              <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">{detail.title}</h3>
                {detail.content.map((line, lineIndex) => {
                  if (typeof line === 'string') {
                    return (
                      <p
                        key={lineIndex}
                        className="text-sm text-muted-foreground"
                      >
                        {line}
                      </p>
                    )
                  }

                  let IconComponent = null
                  let iconColor = ''

                  if (line.type === 'whatsapp') {
                    IconComponent = MessageCircle
                    iconColor = 'text-green-600'
                  } else if (line.type === 'tel') {
                    IconComponent = Phone
                    iconColor = 'text-blue-600'
                  }

                  return (
                    <div key={lineIndex} className="flex items-center gap-2">
                      {IconComponent && (
                        <IconComponent className={`h-4 w-4 ${iconColor}`} />
                      )}
                      <a
                        href={line.href}
                        target={
                          line.type === 'website' || line.type === 'whatsapp'
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          line.type === 'website' || line.type === 'whatsapp'
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="text-sm text-primary hover:underline"
                      >
                        {line.text}
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Social Media Links */}
        <div className="pt-6 border-t">
          <h3 className="font-semibold mb-3">
            {t('contact.info.social.title')}
          </h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Import Button here to avoid circular dependency
import { Button } from '@/components/ui/schadcn/button'
