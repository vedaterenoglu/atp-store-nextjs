/**
 * CreateAdminForm Organism - Complete form for creating new admin users
 * SOLID Principles: SRP - Single responsibility for admin creation form
 * Design Patterns: Form Component Pattern, Composition Pattern
 * Dependencies: React Hook Form, atoms (FormField, SubmitButton, StatusAlert)
 */

'use client'

import { useEffect } from 'react'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { UserPlus, Shield, Mail, Lock } from 'lucide-react'
import FormField from '../atoms/FormField'
import SubmitButton from '../atoms/SubmitButton'
import StatusAlert from '../atoms/StatusAlert'
import { VALIDATION_RULES } from '../utils/admin.validation'
import type {
  CreateAdminFormProps,
  CreateAdminFormData,
} from '../types/admin.types'

export default function CreateAdminForm({
  onSubmit,
  isLoading,
  error,
  success,
  form,
}: CreateAdminFormProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form

  // Reset form on successful submission
  useEffect(() => {
    if (success) {
      reset({
        email: '',
        password: '',
      })
    }
  }, [success, reset])

  const handleFormSubmit = async (data: CreateAdminFormData) => {
    await onSubmit(data)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('createAdmin.cardTitle')}
        </CardTitle>
        <CardDescription>{t('createAdmin.cardDescription')}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Success Alert */}
          {success && (
            <StatusAlert type="success" message={t('createAdmin.success')} />
          )}

          {/* Error Alert */}
          {error && <StatusAlert type="error" message={error} />}

          {/* Email Field with Icon */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{t('createAdmin.form.email')}</span>
            </div>
            <FormField
              id="email"
              label=""
              type="email"
              placeholder={t('createAdmin.form.emailPlaceholder')}
              error={errors.email?.message}
              required
              disabled={isLoading || isSubmitting}
              register={register('email')}
            />
            <p className="text-xs text-muted-foreground">
              {t('createAdmin.form.emailHelp')}
            </p>
          </div>

          {/* Password Field with Icon */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span>{t('createAdmin.form.password')}</span>
            </div>
            <FormField
              id="password"
              label=""
              type="password"
              placeholder={t('createAdmin.form.passwordPlaceholder')}
              error={errors.password?.message}
              required
              disabled={isLoading || isSubmitting}
              register={register('password')}
            />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {t('createAdmin.form.passwordRequirements')}
              </p>
              <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                <li>
                  {t('createAdmin.form.passwordMinLength').replace(
                    '{n}',
                    VALIDATION_RULES.PASSWORD_MIN_LENGTH.toString()
                  )}
                </li>
                <li>{t('createAdmin.form.passwordUppercase')}</li>
                <li>{t('createAdmin.form.passwordLowercase')}</li>
                <li>{t('createAdmin.form.passwordNumber')}</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <SubmitButton
              isLoading={isLoading || isSubmitting}
              loadingText={t('createAdmin.form.submitting')}
              type="submit"
              className="w-full"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('createAdmin.form.submit')}
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
