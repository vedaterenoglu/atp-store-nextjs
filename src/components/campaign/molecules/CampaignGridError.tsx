/**
 * CampaignGridError - Error display component for campaign grid
 * SOLID Principles: SRP - Single responsibility for error state display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, lucide-react, i18n
 */

'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/schadcn/button'
import { Card, CardContent } from '@/components/ui/schadcn/card'
import { useTranslation } from 'react-i18next'

interface CampaignGridErrorProps {
  error?: Error
  onRetry?: () => void
  className?: string
}

export function CampaignGridError({
  error,
  onRetry,
  className = '',
}: CampaignGridErrorProps) {
  const { t } = useTranslation('campaign')

  return (
    <Card className={`border-destructive ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">{t('errors.loadFailed')}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          {error?.message || t('errors.errorMessage')}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {t('errors.tryAgain')}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
