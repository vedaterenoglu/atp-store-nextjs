/**
 * Cart summary card molecule component
 * SOLID Principles: SRP - Single responsibility for displaying cart summary
 * Design Patterns: Composite Component Pattern
 * Dependencies: React, cart types, atoms, UI components
 */

'use client'

import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import type { CartSummaryProps } from '@/types/cart'
import { PriceDisplay } from '../atoms'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn/card'
import { Separator } from '@/components/ui/schadcn'

export function CartSummaryCard({
  summary,
  showDetails = true,
  className,
}: CartSummaryProps) {
  const { t } = useTranslation('cart')

  const summaryItems = [
    {
      label: t('summary.subtotal'),
      value: summary.subtotal,
      show: showDetails,
    },
    {
      label: t('summary.discount'),
      value: -summary.totalDiscount,
      show: showDetails && summary.totalDiscount > 0,
      className: 'text-green-600 dark:text-green-400',
    },
    {
      label: t('summary.tax'),
      value: summary.tax,
      show: showDetails && summary.tax > 0,
    },
    {
      label: t('summary.shipping'),
      value: summary.shipping,
      show: showDetails && summary.shipping > 0,
    },
  ]

  return (
    <Card className={clsx('', className)}>
      <CardHeader className="pb-3 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">
          {t('summary.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 sm:px-6">
        {/* Item Count - More prominent on mobile */}
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-muted-foreground font-medium">
            {t('summary.items')}
          </span>
          <span className="font-medium">
            {summary.itemCount}{' '}
            {summary.itemCount === 1
              ? t('summary.item')
              : t('summary.items_plural')}
            {summary.uniqueItemCount !== summary.itemCount && (
              <span className="text-muted-foreground ml-1 text-xs sm:text-sm">
                ({summary.uniqueItemCount} {t('summary.unique')})
              </span>
            )}
          </span>
        </div>

        {/* Detailed Breakdown - Slightly larger text on mobile */}
        {summaryItems.map(
          item =>
            item.show && (
              <div
                key={item.label}
                className="flex justify-between text-sm sm:text-base"
              >
                <span className="text-muted-foreground">{item.label}</span>
                <PriceDisplay
                  amount={Math.abs(item.value)}
                  size="sm"
                  {...(item.className && { className: item.className })}
                />
              </div>
            )
        )}

        {showDetails && <Separator className="my-3" />}

        {/* Total - More prominent on mobile */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold sm:text-xl">
            {t('summary.total')}
          </span>
          <PriceDisplay
            amount={summary.total}
            size="lg"
            className="text-xl font-bold sm:text-2xl"
          />
        </div>

        {/* Mobile: VAT notice */}
        <p className="text-xs text-muted-foreground text-center pt-2 sm:text-sm">
          {t('summary.includingVat')}
        </p>
      </CardContent>
    </Card>
  )
}
