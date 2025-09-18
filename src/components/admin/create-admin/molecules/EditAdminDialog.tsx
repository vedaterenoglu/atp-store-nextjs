/**
 * EditAdminDialog Molecule - Dialog for editing admin user information
 * SOLID Principles: SRP - Single responsibility for edit dialog
 * Design Patterns: Controlled Component Pattern, Modal Pattern
 * Dependencies: shadcn/ui Dialog, React Hook Form, Zod validation
 */

'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import FormField from '../atoms/FormField'
import SubmitButton from '../atoms/SubmitButton'
import { Button } from '@/components/ui'
import { editAdminSchema } from '../utils/admin.validation'
import type {
  EditAdminDialogProps,
  EditAdminFormData,
} from '../types/admin.types'

export default function EditAdminDialog({
  isOpen,
  onOpenChange,
  admin,
  onSubmit,
  isLoading,
}: EditAdminDialogProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAdminFormData>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  })

  // Reset form when admin changes or dialog opens
  useEffect(() => {
    if (admin && isOpen) {
      reset({
        email: admin.email || '',
        firstName: admin.firstName || '',
        lastName: admin.lastName || '',
      })
    } else if (!isOpen) {
      reset({
        email: '',
        firstName: '',
        lastName: '',
      })
    }
  }, [admin, isOpen, reset])

  const handleFormSubmit = async (data: EditAdminFormData) => {
    await onSubmit(data)
    onOpenChange(false)
  }

  const handleCancel = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('createAdmin.editTitle')}</DialogTitle>
          <DialogDescription>
            {t('createAdmin.editDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField
            id="email"
            label={t('createAdmin.form.email')}
            type="email"
            placeholder={t('createAdmin.form.emailPlaceholder')}
            error={errors.email?.message}
            required
            disabled={isLoading}
            register={register('email')}
          />

          <FormField
            id="firstName"
            label={t('createAdmin.form.firstName')}
            placeholder={t('createAdmin.form.firstNamePlaceholder')}
            error={errors.firstName?.message}
            disabled={isLoading}
            register={register('firstName')}
          />

          <FormField
            id="lastName"
            label={t('createAdmin.form.lastName')}
            placeholder={t('createAdmin.form.lastNamePlaceholder')}
            error={errors.lastName?.message}
            disabled={isLoading}
            register={register('lastName')}
          />

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
              isLoading={isLoading}
              loadingText={t('createAdmin.form.updating')}
              type="submit"
            >
              {t('createAdmin.form.update')}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
