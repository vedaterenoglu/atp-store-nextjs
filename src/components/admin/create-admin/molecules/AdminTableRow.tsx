/**
 * AdminTableRow Molecule - Table row for displaying admin user data
 * SOLID Principles: SRP - Single responsibility for rendering admin row
 * Design Patterns: Presentational Component Pattern
 * Dependencies: shadcn/ui Table, Button, lucide-react icons
 */

'use client'

import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { TableCell, TableRow, Button } from '@/components/ui'
import { Edit, Trash2, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminTableRowProps } from '../types/admin.types'

export default function AdminTableRow({
  admin,
  onEdit,
  onDelete,
}: AdminTableRowProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getFullName = () => {
    const firstName = admin.firstName || ''
    const lastName = admin.lastName || ''
    const fullName = `${firstName} ${lastName}`.trim()
    return fullName || t('createAdmin.table.notProvided')
  }

  return (
    <TableRow className="hover:bg-muted/50">
      {/* Email Column */}
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{admin.email}</span>
        </div>
      </TableCell>

      {/* Name Column */}
      <TableCell>
        <span
          className={cn(
            getFullName() === t('createAdmin.table.notProvided') &&
              'text-muted-foreground'
          )}
        >
          {getFullName()}
        </span>
      </TableCell>

      {/* Created Date Column */}
      <TableCell className="text-muted-foreground">
        {formatDate(admin.createdAt)}
      </TableCell>

      {/* Actions Column */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(admin)}
            className="h-8"
            aria-label={t('createAdmin.table.editAriaLabel').replace(
              '{email}',
              admin.email
            )}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            {t('createAdmin.table.edit')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(admin)}
            className="h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            aria-label={t('createAdmin.table.deleteAriaLabel').replace(
              '{email}',
              admin.email
            )}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            {t('createAdmin.table.delete')}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
