/**
 * DeleteAdminDialog Molecule - Confirmation dialog for deleting admin users
 * SOLID Principles: SRP - Single responsibility for delete confirmation
 * Design Patterns: Modal Pattern, Confirmation Dialog Pattern
 * Dependencies: shadcn/ui Dialog, Button components
 */

'use client'

import { useSafeTranslation } from '@/hooks/use-safe-translation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { Button } from '@/components/ui'
import SubmitButton from '../atoms/SubmitButton'
import { AlertTriangle } from 'lucide-react'
import type { DeleteAdminDialogProps } from '../types/admin.types'

export default function DeleteAdminDialog({
  isOpen,
  onOpenChange,
  admin,
  onConfirm,
  isLoading,
}: DeleteAdminDialogProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {t('createAdmin.deleteTitle')}
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <p>{t('createAdmin.deleteConfirmation')}</p>
            {admin && (
              <div className="rounded-md bg-muted p-3">
                <p className="font-medium text-foreground">{admin.email}</p>
                {(admin.firstName || admin.lastName) && (
                  <p className="text-sm text-muted-foreground">
                    {[admin.firstName, admin.lastName]
                      .filter(Boolean)
                      .join(' ')}
                  </p>
                )}
              </div>
            )}
            <p className="text-sm text-destructive font-medium">
              {t('createAdmin.deleteWarning')}
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {t('createAdmin.cancel')}
          </Button>
          <SubmitButton
            variant="destructive"
            isLoading={isLoading}
            loadingText={t('createAdmin.form.deleting')}
            onClick={handleConfirm}
            type="button"
          >
            {t('createAdmin.form.delete')}
          </SubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
