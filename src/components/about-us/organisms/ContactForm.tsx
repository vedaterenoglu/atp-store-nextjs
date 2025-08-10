/**
 * ContactForm Organism - Contact form component with React Hook Form
 * SOLID Principles: SRP - Manages contact form functionality with validation
 * Design Patterns: Organism Pattern, Form Validation Pattern
 * Dependencies: React Hook Form, Zod, shadcn Form components, SendGrid API, i18next
 */

'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useAuthService } from '@/lib/auth/use-auth-service'
import { submitContactForm } from '@/app/actions/contact.action'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn/card'
import { Button } from '@/components/ui/schadcn/button'
import { Input } from '@/components/ui/schadcn/input'
import { Textarea } from '@/components/ui/schadcn/textarea'
import { Label } from '@/components/ui/schadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/schadcn/select'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/schadcn/form'

// Define the validation schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  phone: z.string().optional(),
  subject: z
    .enum(['general', 'sales', 'support', 'partnership', 'feedback'])
    .refine(val => val !== undefined, { message: 'Please select a subject' }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters',
  }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const { t, ready, i18n } = useTranslation('aboutUs')
  const { user } = useAuthService()

  // Initialize React Hook Form with Zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'general' as const,
      message: '',
    },
  })

  const {
    formState: { isSubmitting, isSubmitSuccessful },
    setError,
    reset,
    setValue,
  } = form

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      if (user.name) {
        setValue('name', user.name)
      }
      if (user.email) {
        setValue('email', user.email)
      }
    }
  }, [user, setValue])

  // Handle form submission using Server Action
  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Call the Server Action directly
      const result = await submitContactForm({
        ...data,
        customerid: user?.customerId || undefined, // Send customer ID if available
        language: i18n.language, // Send the current language
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to send message')
      }

      // Reset form after successful submission
      reset()

      // Reset success state after 5 seconds
      setTimeout(() => {
        form.clearErrors()
      }, 5000)
    } catch (error) {
      setError('root', {
        type: 'manual',
        message:
          error instanceof Error ? error.message : t('contact.form.error'),
      })
    }
  }

  if (!ready) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('contact.form.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          {t('contact.form.description')}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('contact.form.fields.name.label')} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('contact.form.fields.name.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('contact.form.fields.email.label')} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('contact.form.fields.email.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('contact.form.fields.phone.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t('contact.form.fields.phone.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('contact.form.fields.subject.label')} *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              'contact.form.fields.subject.placeholder'
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">
                          {t('contact.form.fields.subject.options.general')}
                        </SelectItem>
                        <SelectItem value="sales">
                          {t('contact.form.fields.subject.options.sales')}
                        </SelectItem>
                        <SelectItem value="support">
                          {t('contact.form.fields.subject.options.support')}
                        </SelectItem>
                        <SelectItem value="partnership">
                          {t('contact.form.fields.subject.options.partnership')}
                        </SelectItem>
                        <SelectItem value="feedback">
                          {t('contact.form.fields.subject.options.feedback')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Display Customer ID if available */}
            {user?.customerId && (
              <div className="space-y-2">
                <Label htmlFor="customerId">
                  {t('contact.form.fields.customerId.label', 'Customer ID')}
                </Label>
                <Input
                  id="customerId"
                  value={user.customerId}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  {t(
                    'contact.form.fields.customerId.helper',
                    'Your company registration number'
                  )}
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('contact.form.fields.message.label')} *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('contact.form.fields.message.placeholder')}
                      className="min-h-[500px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Messages */}
            {isSubmitSuccessful && !form.formState.errors.root && (
              <div className="flex items-center gap-2 p-4 bg-green-50 text-green-800 rounded-md">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{t('contact.form.success')}</p>
              </div>
            )}

            {form.formState.errors.root && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-800 rounded-md">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{form.formState.errors.root.message}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t('contact.form.submit')}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
