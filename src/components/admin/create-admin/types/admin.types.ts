/**
 * Admin Types - TypeScript interfaces for admin components
 * SOLID Principles: ISP - Interface Segregation Principle
 * Design Patterns: Type Definition Pattern
 * Dependencies: None
 */

import type { ReactNode } from 'react'
import type { UseFormReturn } from 'react-hook-form'

// ============= Domain Types =============

export interface AdminUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: string
}

export interface CreateAdminFormData {
  email: string
  password: string
}

export interface EditAdminFormData {
  email: string
  firstName?: string | undefined
  lastName?: string | undefined
}

// ============= API Types =============

export interface CreateAdminResponse {
  success: boolean
  userId?: string
  email?: string
  message?: string
  error?: string
}

export interface AdminListResponse {
  success?: boolean
  admins: AdminUser[]
  error?: string
}

export interface UpdateAdminResponse {
  success: boolean
  message?: string
  error?: string
}

export interface DeleteAdminResponse {
  success: boolean
  message?: string
  error?: string
}

// ============= Hook Return Types =============

export interface UseCreateAdminReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  createAdmin: (data: CreateAdminFormData) => Promise<void>
  reset: () => void
}

export interface UseAdminListReturn {
  admins: AdminUser[]
  isLoading: boolean
  error: string | null
  fetchAdmins: () => Promise<void>
}

export interface UseAdminCRUDReturn {
  updateAdmin: (id: string, data: EditAdminFormData) => Promise<boolean>
  deleteAdmin: (id: string) => Promise<boolean>
  isLoading: boolean
  error: string | null
}

// ============= Component Props =============

// Atom Props
export interface StatusAlertProps {
  type: 'success' | 'error'
  message: string
  onClose?: () => void
}

export interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string | undefined
  required?: boolean
  disabled?: boolean
  register?: ReturnType<
    UseFormReturn<CreateAdminFormData | EditAdminFormData>['register']
  > // React Hook Form register
}

export interface SubmitButtonProps {
  isLoading: boolean
  loadingText?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  variant?: 'default' | 'destructive' | 'outline'
}

// Molecule Props
export interface AdminTableRowProps {
  admin: AdminUser
  onEdit: (admin: AdminUser) => void
  onDelete: (admin: AdminUser) => void
}

export interface EditAdminDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  admin: AdminUser | null
  onSubmit: (data: EditAdminFormData) => Promise<void>
  isLoading: boolean
}

export interface DeleteAdminDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  admin: AdminUser | null
  onConfirm: () => Promise<void>
  isLoading: boolean
}

// Organism Props
export interface CreateAdminFormProps {
  onSubmit: (data: CreateAdminFormData) => Promise<void>
  isLoading: boolean
  error: string | null
  success: boolean
  form: UseFormReturn<CreateAdminFormData>
}

export interface AdminUsersTableProps {
  admins: AdminUser[]
  isLoading: boolean
  onEdit: (admin: AdminUser) => void
  onDelete: (admin: AdminUser) => void
}

// Container Props
export interface CreateAdminContainerProps {
  isSuperAdmin: boolean
}

// ============= State Types =============

export interface AdminManagementState {
  editingAdmin: AdminUser | null
  deletingAdmin: AdminUser | null
  isEditDialogOpen: boolean
  isDeleteDialogOpen: boolean
}
