/**
 * Admin Dashboard - Create Customer Account Page
 * SOLID Principles: SRP - Single responsibility for customer creation
 * Design Patterns: Form Component Pattern
 * Dependencies: React Hook Form, Clerk API
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, UserPlus, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/schadcn/button'
import { Input } from '@/components/ui/schadcn/input'
import { Label } from '@/components/ui/schadcn/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn/card'
import { Alert, AlertDescription } from '@/components/ui/schadcn/alert'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

type CreateCustomerForm = {
  email: string
  password: string
}

export default function CreateCustomerPage() {
  const { t } = useSafeTranslation('admin')

  // Form validation schema with translations
  const createCustomerSchema = z.object({
    email: z.string().email(t('createCustomer.validation.invalidEmail')),
    password: z.string().min(8, t('createCustomer.validation.passwordMin')),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerForm>({
    resolver: zodResolver(createCustomerSchema),
  })

  const onSubmit = async (data: CreateCustomerForm) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/admin/users/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || t('createCustomer.errors.createFailed'))
      }

      setSuccess(true)
      reset()

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('createCustomer.errors.default')
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('createCustomer.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('createCustomer.subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {t('createCustomer.cardTitle')}
          </CardTitle>
          <CardDescription>
            {t('createCustomer.cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('createCustomer.form.email')}{' '}
                <span className="text-destructive">
                  {t('createCustomer.form.required')}
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('createCustomer.form.emailPlaceholder')}
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">
                {t('createCustomer.form.password')}{' '}
                <span className="text-destructive">
                  {t('createCustomer.form.required')}
                </span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t('createCustomer.form.passwordPlaceholder')}
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Success Alert */}
            {success && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  {t('createCustomer.success')}
                </AlertDescription>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('createCustomer.form.submitting')}
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t('createCustomer.form.submit')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">
            {t('createCustomer.notes.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('createCustomer.notes.note1')}</p>
          <p>• {t('createCustomer.notes.note2')}</p>
          <p>• {t('createCustomer.notes.note3')}</p>
          <p>• {t('createCustomer.notes.note4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
