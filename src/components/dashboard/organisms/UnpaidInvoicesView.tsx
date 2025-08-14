/**
 * @file UnpaidInvoicesView.tsx
 * @role Container component for unpaid invoices display
 * @patterns Container/Presenter, Error Boundary
 * @solid SRP - Single responsibility for unpaid invoices view
 * @tests /src/components/dashboard/organisms/__tests__/UnpaidInvoicesView.test.tsx
 */

import { GridContainer } from '../atoms/GridContainer'
import { InvoiceCard } from '../molecules/InvoiceCard'
import { Alert, AlertDescription } from '@/components/ui/schadcn'
import { FileText, AlertCircle } from 'lucide-react'
import type { CalculatedInvoice } from '@/lib/types/dashboard.types'
import { formatCurrency } from '@/lib/utils/invoice-calculations'
import { useTranslation } from 'react-i18next'

interface UnpaidInvoicesViewProps {
  invoices: CalculatedInvoice[]
  isLoading: boolean
  error: string | undefined
}

/**
 * UnpaidInvoicesView - Display container for unpaid invoices
 */
export function UnpaidInvoicesView({
  invoices,
  isLoading,
  error,
}: UnpaidInvoicesViewProps) {
  const { t } = useTranslation('customerDashboard')

  // Calculate total outstanding amount
  const totalOutstanding = invoices.reduce(
    (sum, invoice) => sum + invoice.remainingAmount,
    0
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('unpaidInvoices.title')}
        </h2>
        <GridContainer>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </GridContainer>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('unpaidInvoices.title')}
        </h2>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('unpaidInvoices.title')}
        </h2>
        <Alert>
          <AlertDescription>{t('unpaidInvoices.empty')}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('unpaidInvoices.title')}
        </h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            {invoices.length}{' '}
            {invoices.length === 1
              ? t('unpaidInvoices.invoice')
              : t('unpaidInvoices.invoices')}
          </p>
          <p className="text-sm font-semibold">
            {t('unpaidInvoices.total')}:{' '}
            {formatCurrency(
              totalOutstanding,
              invoices[0]?.invoice_exchange_unit || 'kr.'
            )}
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>
            ⚠️ {t('unpaidInvoices.paymentWarning').split('!!!')[0]}!!!
          </strong>{' '}
          {t('unpaidInvoices.paymentWarning').split('!!!')[1]}
        </AlertDescription>
      </Alert>

      <GridContainer>
        {invoices.map(invoice => (
          <InvoiceCard key={invoice.invoice_number} invoice={invoice} />
        ))}
      </GridContainer>
    </div>
  )
}
