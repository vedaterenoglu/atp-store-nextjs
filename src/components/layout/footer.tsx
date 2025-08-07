/**
 * Footer - Simple footer component with logo and copyright
 *
 * Features:
 * - Displays logo image with link to developer website
 * - Shows copyright with configurable year and author
 * - Centered layout with responsive spacing
 * - i18n support for all text content
 * - Email link with envelope icon
 * - Tooltips with i18n support
 *
 * Props: Optional year and author for copyright text
 * State: None (pure presentation component)
 */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/schadcn'

interface FooterProps {
  year?: number
  author?: string
}

export function Footer({
  year = new Date().getFullYear(),
  author = 'GTBS Coding',
}: FooterProps) {
  const { t } = useTranslation('common')
  const developerWebsite =
    process.env['NEXT_PUBLIC_DEVELOPER_WEB_SITE'] || 'https://gtbscoding.com'
  const developerEmail =
    process.env['NEXT_PUBLIC_DEVELOPER_EMAIL_ADDRESS'] || 'info@gtbscoding.com'

  return (
    <TooltipProvider>
      <footer className="mt-auto border-t -mx-4">
        <div className="px-4 py-4 sm:py-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm text-muted-foreground">
              {t('footer.copyright', { year })}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t('footer.createdBy')}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={developerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <Image
                      src="/logo-gtbs.png"
                      alt="GTBS Coding Logo"
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    <span>{author}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('tooltips.footer.developerWebsite')}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`mailto:${developerEmail}`}
                    className="text-foreground transition-colors hover:text-primary"
                    aria-label="Email developer"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('tooltips.footer.developerEmail')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  )
}
