/**
 * Admin Dashboard - Authenticate User Page
 * SOLID Principles: SRP - Single responsibility for user authentication
 * Design Patterns: Form Component Pattern, State Management Pattern
 * Dependencies: React Hook Form, Customer API, User Search API
 */

'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Loader2,
  Search,
  UserCheck,
  CheckCircle,
  AlertCircle,
  User,
  Shield,
  Users,
} from 'lucide-react'
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/schadcn/alert'
import { Badge } from '@/components/ui/schadcn/badge'
import { Checkbox } from '@/components/ui/schadcn/checkbox'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

// Types
interface Customer {
  customer_id: string
  customer_title: string
  customer_nickname: string
}

interface FoundUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: 'admin' | 'customer' | null
  customerIds: string[]
  createdAt: string
}

// Form schemas will be defined inside component to use translations
type SearchForm = {
  email: string
}

export default function AuthenticateUserPage() {
  const { t } = useSafeTranslation('admin')
  const [isSearching, setIsSearching] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)
  const [customerFilter, setCustomerFilter] = useState('')

  // Form validation schema with translations
  const searchFormSchema = z.object({
    email: z
      .string()
      .email(
        t('authenticateUser.validation.invalidEmail') || 'Invalid email address'
      ),
  })

  // Search form
  const searchForm = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema),
  })

  // Load customers on mount
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch('/api/admin/customers')
        if (!response.ok) {
          throw new Error('Failed to load customers')
        }
        const data = await response.json()
        setCustomers(data.customers || [])
      } catch {
        setAuthError(t('authenticateUser.errors.loadCustomers'))
      } finally {
        setIsLoadingCustomers(false)
      }
    }
    loadCustomers()
  }, [t])

  // Search for user
  const onSearch = async (data: SearchForm) => {
    setIsSearching(true)
    setSearchError(null)
    setFoundUser(null)
    setAuthSuccess(false)
    setSelectedCustomers([])

    try {
      const response = await fetch(
        `/api/admin/users/search?email=${encodeURIComponent(data.email)}`
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || t('authenticateUser.search.error'))
      }

      if (result.user) {
        setFoundUser(result.user)
        // Only pre-select customer access for non-admin users
        if (result.user.role !== 'admin') {
          setSelectedCustomers(result.user.customerIds || [])
        } else {
          setSelectedCustomers([])
        }
      } else {
        setSearchError(t('authenticateUser.search.notFound'))
      }
    } catch (err) {
      setSearchError(
        err instanceof Error ? err.message : t('authenticateUser.search.error')
      )
    } finally {
      setIsSearching(false)
    }
  }

  // Authenticate user with selected customers
  const onAuthenticate = async () => {
    if (!foundUser || selectedCustomers.length === 0) return

    setIsAuthenticating(true)
    setAuthError(null)
    setAuthSuccess(false)

    try {
      const response = await fetch('/api/admin/users/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: foundUser.id,
          customerIds: selectedCustomers,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || t('authenticateUser.errors.authenticate')
        )
      }

      setAuthSuccess(true)
      // Update found user with new customer IDs
      setFoundUser({
        ...foundUser,
        customerIds: selectedCustomers,
      })

      // Clear success message after 5 seconds
      setTimeout(() => setAuthSuccess(false), 5000)
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : t('authenticateUser.errors.authenticate')
      )
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Toggle customer selection
  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  // Filter customers based on search
  const filteredCustomers = customers.filter(
    customer =>
      customer.customer_title
        .toLowerCase()
        .includes(customerFilter.toLowerCase()) ||
      customer.customer_id.toLowerCase().includes(customerFilter.toLowerCase())
  )

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('authenticateUser.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('authenticateUser.subtitle')}
        </p>
      </div>

      {/* Search Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('authenticateUser.search.title')}
          </CardTitle>
          <CardDescription>
            {t('authenticateUser.search.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={searchForm.handleSubmit(onSearch)}
            className="space-y-4"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder={t('authenticateUser.search.emailPlaceholder')}
                  {...searchForm.register('email')}
                  disabled={isSearching}
                />
                {searchForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {searchForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('authenticateUser.search.searching')}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    {t('authenticateUser.search.button')}
                  </>
                )}
              </Button>
            </div>
          </form>

          {searchError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* User Details Card */}
      {foundUser && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('authenticateUser.userDetails.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">
                  {t('authenticateUser.userDetails.email')}
                </Label>
                <p className="font-medium">{foundUser.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  {t('authenticateUser.userDetails.name')}
                </Label>
                <p className="font-medium">
                  {foundUser.firstName || foundUser.lastName
                    ? `${foundUser.firstName || ''} ${foundUser.lastName || ''}`.trim()
                    : t('authenticateUser.userDetails.notSet')}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  {t('authenticateUser.userDetails.role')}
                </Label>
                <div className="mt-1">
                  {foundUser.role === 'admin' ? (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Shield className="mr-1 h-3 w-3" />
                      {t('authenticateUser.userDetails.roleAdmin')}
                    </Badge>
                  ) : foundUser.role === 'customer' ? (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Users className="mr-1 h-3 w-3" />
                      {t('authenticateUser.userDetails.roleCustomer')}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      {t('authenticateUser.userDetails.roleNone')}
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">
                  {t('authenticateUser.userDetails.created')}
                </Label>
                <p className="font-medium">
                  {new Date(foundUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {foundUser.customerIds.length > 0 && (
              <div>
                <Label className="text-muted-foreground">
                  {t('authenticateUser.userDetails.currentAccess')} (
                  {foundUser.customerIds.length})
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {foundUser.customerIds.map(id => {
                    const customer = customers.find(c => c.customer_id === id)
                    return (
                      <Badge key={id} variant="outline">
                        {customer?.customer_title || id}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Admin User Warning */}
      {foundUser && foundUser.role === 'admin' && (
        <Alert className="mb-6 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 dark:text-amber-500">
            {t('authenticateUser.adminWarning.title')}
          </AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-400">
            {t('authenticateUser.adminWarning.message')}
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Customers Card */}
      {foundUser &&
        foundUser.role !== 'admin' &&
        selectedCustomers.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('authenticateUser.selectedCustomers.title')} (
                {selectedCustomers.length})
              </CardTitle>
              <CardDescription>
                {t('authenticateUser.selectedCustomers.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedCustomers.map(customerId => {
                  const customer = customers.find(
                    c => c.customer_id === customerId
                  )
                  return (
                    <Badge
                      key={customerId}
                      variant="secondary"
                      className="px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => toggleCustomer(customerId)}
                    >
                      <span>{customer?.customer_title || customerId}</span>
                      <span className="text-xs opacity-60">×</span>
                    </Badge>
                  )
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {t('authenticateUser.selectedCustomers.removeHint')}
              </p>
            </CardContent>
          </Card>
        )}

      {/* Customer Selection Card - Only for non-admin users */}
      {foundUser && foundUser.role !== 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              {t('authenticateUser.linkCustomers.title')}
            </CardTitle>
            <CardDescription>
              {t('authenticateUser.linkCustomers.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingCustomers ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : customers.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t('authenticateUser.linkCustomers.noCustomers')}
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {/* Customer Search Box */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t(
                        'authenticateUser.linkCustomers.searchPlaceholder'
                      )}
                      value={customerFilter}
                      onChange={e => setCustomerFilter(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {customerFilter && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t('authenticateUser.linkCustomers.searchResults', {
                        filtered: filteredCustomers.length,
                        total: customers.length,
                      })}
                    </p>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4">
                  {filteredCustomers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {t('authenticateUser.linkCustomers.noResults')} &quot;
                      {customerFilter}&quot;
                    </div>
                  ) : (
                    filteredCustomers.map(customer => (
                      <div
                        key={customer.customer_id}
                        className="flex items-center space-x-3 py-2 px-3 hover:bg-accent rounded-md cursor-pointer"
                        onClick={() => toggleCustomer(customer.customer_id)}
                      >
                        <Checkbox
                          checked={selectedCustomers.includes(
                            customer.customer_id
                          )}
                          onCheckedChange={() =>
                            toggleCustomer(customer.customer_id)
                          }
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        />
                        <Label className="flex-1 cursor-pointer">
                          <div className="font-medium">
                            {customer.customer_title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t('authenticateUser.linkCustomers.customerId')}:{' '}
                            {customer.customer_id}
                          </div>
                        </Label>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomers.length}{' '}
                    {t('authenticateUser.linkCustomers.selected')}
                  </p>
                  <Button
                    onClick={onAuthenticate}
                    disabled={
                      isAuthenticating || selectedCustomers.length === 0
                    }
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('authenticateUser.linkCustomers.updating')}
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        {t('authenticateUser.linkCustomers.updateButton')}
                      </>
                    )}
                  </Button>
                </div>

                {authSuccess && (
                  <Alert className="mt-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">
                      {t('authenticateUser.success.title')}
                    </AlertTitle>
                    <AlertDescription className="text-green-600">
                      {t('authenticateUser.success.message')}
                    </AlertDescription>
                  </Alert>
                )}

                {authError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
