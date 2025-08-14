/**
 * @file InvoiceCard.tsx
 * @role Display card for individual unpaid invoice
 * @patterns Atomic Design, Presentation Component
 * @solid SRP - Single responsibility for invoice display
 * @tests /src/components/dashboard/molecules/__tests__/InvoiceCard.test.tsx
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn'
import { Badge } from '@/components/ui/schadcn'
import { formatDate, formatCurrency } from '@/lib/utils/invoice-calculations'
import type { CalculatedInvoice } from '@/lib/types/dashboard.types'
import { FileText, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface InvoiceCardProps {
  invoice: CalculatedInvoice
  className?: string
}

/**
 * InvoiceCard - Display component for unpaid invoice information
 */
export function InvoiceCard({ invoice, className }: InvoiceCardProps) {
  const { t } = useTranslation('customerDashboard')

  // Determine badge text based on invoice status
  const getBadgeText = () => {
    if (invoice.is_sent_in_the_bailiffs) {
      return t('status.inkasso')
    } else if (invoice.is_invoice_reminded) {
      return t('status.sentReminder')
    } else {
      return t('status.overdue')
    }
  }

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-shadow',
        invoice.isOverdue && 'border-red-200',
        className
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {invoice.invoice_number}
          </span>
          {invoice.isOverdue && (
            <Badge variant="destructive" className="text-xs">
              {getBadgeText()}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {t('unpaidInvoices.issued')} {formatDate(invoice.invoice_date)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className={cn(invoice.isOverdue && 'text-red-600 font-medium')}>
            {t('unpaidInvoices.due')} {formatDate(invoice.invoice_due_date)}
            {invoice.isOverdue &&
              ` ${t('unpaidInvoices.daysOverdue', { days: invoice.daysOverdue })}`}
          </span>
        </div>

        <div className="pt-3 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('unpaidInvoices.totalAmount')}
            </span>
            <span className="font-medium">
              {formatCurrency(
                invoice.totalAmount,
                invoice.invoice_exchange_unit
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('unpaidInvoices.payment')}
            </span>
            <span className="font-medium">
              {formatCurrency(
                invoice.totalAmount - invoice.remainingAmount,
                invoice.invoice_exchange_unit
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('unpaidInvoices.remaining')}
            </span>
            <span
              className={cn(
                'font-bold',
                invoice.isOverdue ? 'text-red-600' : 'text-primary'
              )}
            >
              {formatCurrency(
                invoice.remainingAmount,
                invoice.invoice_exchange_unit
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
