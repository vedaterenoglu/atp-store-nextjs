/**
 * ContactForm Organism - Contact form component
 * SOLID Principles: SRP - Manages contact form functionality
 * Design Patterns: Organism Pattern
 * Dependencies: shadcn Form components, SendGrid API, i18next
 */

'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '@clerk/nextjs'
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

export function ContactForm() {
  const { t, ready, i18n } = useTranslation('aboutUs')
  const { user } = useUser()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || prev.name || '',
        email: user.primaryEmailAddress?.emailAddress || prev.email || '',
      }))
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          customerid: user?.publicMetadata?.['customerid'] as
            | string
            | undefined, // Send company registration number from Clerk metadata
          language: i18n.language, // Send the current language
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setStatusMessage(data.message || t('contact.form.success'))
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        // Hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setStatusMessage('')
        }, 5000)
      } else {
        setStatus('error')
        setStatusMessage(data.error || t('contact.form.error'))
      }
    } catch {
      setStatus('error')
      setStatusMessage(t('contact.form.error'))
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (status === 'error') {
      setStatus('idle')
      setStatusMessage('')
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('contact.form.fields.name.label')} *
              </Label>
              <Input
                id="name"
                placeholder={t('contact.form.fields.name.placeholder')}
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('contact.form.fields.email.label')} *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('contact.form.fields.email.placeholder')}
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                {t('contact.form.fields.phone.label')}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('contact.form.fields.phone.placeholder')}
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">
                {t('contact.form.fields.subject.label')} *
              </Label>
              <Select
                value={formData.subject}
                onValueChange={value => handleChange('subject', value)}
              >
                <SelectTrigger id="subject">
                  <SelectValue
                    placeholder={t('contact.form.fields.subject.placeholder')}
                  />
                </SelectTrigger>
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
            </div>
          </div>

          {/* Display Customer ID if available in Clerk metadata */}
          {user?.publicMetadata?.['customerid'] && (
            <div className="space-y-2">
              <Label htmlFor="customerId">
                {t('contact.form.fields.customerId.label', 'Customer ID')}
              </Label>
              <Input
                id="customerId"
                value={user.publicMetadata['customerid'] as string}
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

          <div className="space-y-2">
            <Label htmlFor="message">
              {t('contact.form.fields.message.label')} *
            </Label>
            <Textarea
              id="message"
              placeholder={t('contact.form.fields.message.placeholder')}
              value={formData.message}
              onChange={e => handleChange('message', e.target.value)}
              required
              className="min-h-[500px]"
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-800 rounded-md">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{statusMessage}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-800 rounded-md">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{statusMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
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
      </CardContent>
    </Card>
  )
}
