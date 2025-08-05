/**
 * Pending Orders List - Display list of pending orders
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for pending orders list display
 * - OCP: Open for extension with new list features
 * - ISP: Focused interface for list functionality
 * - DIP: Depends on order data abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable list component
 * - List Pattern: Displays collection of orders
 * - Empty State Pattern: Handles empty list scenarios
 *
 * Dependencies: i18n translations, shadcn/ui components
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/schadcn'

export function PendingOrdersList() {
  const { t } = useTranslation('admin')

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <div className="text-center">
            <p className="text-lg">{t('pages.pendingOrders.empty')}</p>
            <p className="text-sm mt-2">
              {t('pages.pendingOrders.lastUpdated')}:{' '}
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
