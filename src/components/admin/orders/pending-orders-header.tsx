/**
 * Pending Orders Header - Header component for pending orders page
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for pending orders header display
 * - OCP: Open for extension with new header features
 * - ISP: Focused interface for header functionality
 * - DIP: Depends on i18n translation abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable header component
 * - Template Method Pattern: Defines header structure
 *
 * Dependencies: i18n translations
 */

'use client'

import { useTranslation } from 'react-i18next'

export function PendingOrdersHeader() {
  const { t } = useTranslation('admin')

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        {t('pages.pendingOrders.title')}
      </h1>
      <p className="text-muted-foreground mt-2">
        {t('pages.pendingOrders.description')}
      </p>
    </div>
  )
}
