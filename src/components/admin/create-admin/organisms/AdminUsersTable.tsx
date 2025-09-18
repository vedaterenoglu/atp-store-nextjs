/**
 * AdminUsersTable Organism - Table display for admin users with actions
 * SOLID Principles: SRP - Single responsibility for admin table display
 * Design Patterns: Composition Pattern, Iterator Pattern
 * Dependencies: shadcn/ui Table, AdminTableRow molecule
 */

'use client'

import { useSafeTranslation } from '@/hooks/use-safe-translation'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components/ui'
import { UserX, Shield } from 'lucide-react'
import AdminTableRow from '../molecules/AdminTableRow'
import type { AdminUsersTableProps } from '../types/admin.types'

export default function AdminUsersTable({
  admins,
  isLoading,
  onEdit,
  onDelete,
}: AdminUsersTableProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  // Loading state with skeleton
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('createAdmin.adminsList')}
          </CardTitle>
          <CardDescription>{t('createAdmin.loadingAdmins')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Empty state
  if (admins.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('createAdmin.adminsList')}
          </CardTitle>
          <CardDescription>
            {t('createAdmin.adminsListDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UserX className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {t('createAdmin.noAdminsFound')}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t('createAdmin.noAdminsDescription')}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Table with admin users
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('createAdmin.adminsList')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('createAdmin.table.email')}</TableHead>
                <TableHead>{t('createAdmin.table.name')}</TableHead>
                <TableHead>{t('createAdmin.table.createdAt')}</TableHead>
                <TableHead className="text-right">
                  {t('createAdmin.table.actions')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map(admin => (
                <AdminTableRow
                  key={admin.id}
                  admin={admin}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
