/**
 * StatusAlert Atom - Reusable alert component for success/error messages
 * SOLID Principles: SRP - Single responsibility for displaying status alerts
 * Design Patterns: Presentational Component Pattern
 * Dependencies: shadcn/ui Alert, lucide-react icons
 */

import { Alert, AlertDescription } from '@/components/ui'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import type { StatusAlertProps } from '../types/admin.types'

export default function StatusAlert({
  type,
  message,
  onClose,
}: StatusAlertProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  const isSuccess = type === 'success'

  return (
    <Alert
      className={cn(
        'relative',
        isSuccess
          ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
          : 'border-destructive bg-destructive/10'
      )}
    >
      {isSuccess ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <XCircle className="h-4 w-4 text-destructive" />
      )}
      <AlertDescription
        className={cn(
          'pr-8',
          isSuccess ? 'text-green-600' : 'text-destructive'
        )}
      >
        {message}
      </AlertDescription>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 hover:bg-muted"
          aria-label={t('createAdmin.closeAlert')}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  )
}
