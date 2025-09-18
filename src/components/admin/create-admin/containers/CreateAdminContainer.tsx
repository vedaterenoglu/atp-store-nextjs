/**
 * CreateAdminContainer - Main container orchestrating all admin management
 * SOLID Principles: SRP - Single responsibility for admin management orchestration
 * Design Patterns: Container/Presenter Pattern, Facade Pattern
 * Dependencies: All custom hooks, organisms, molecules, React Hook Form
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { Separator } from '@/components/ui'
import { createAdminSchema } from '../utils/admin.validation'
import useCreateAdmin from '../hooks/useCreateAdmin'
import useAdminList from '../hooks/useAdminList'
import useAdminCRUD from '../hooks/useAdminCRUD'
import CreateAdminForm from '../organisms/CreateAdminForm'
import AdminUsersTable from '../organisms/AdminUsersTable'
import EditAdminDialog from '../molecules/EditAdminDialog'
import DeleteAdminDialog from '../molecules/DeleteAdminDialog'
import type {
  CreateAdminContainerProps,
  CreateAdminFormData,
  EditAdminFormData,
  AdminUser,
  AdminManagementState,
} from '../types/admin.types'

export default function CreateAdminContainer({
  isSuperAdmin,
}: CreateAdminContainerProps) {
  // Translations
  const { t } = useSafeTranslation('admin')

  // State for dialog management
  const [state, setState] = useState<AdminManagementState>({
    editingAdmin: null,
    deletingAdmin: null,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
  })

  // Custom hooks for data management
  const {
    isLoading: isCreating,
    error: createError,
    success: createSuccess,
    createAdmin,
  } = useCreateAdmin()

  const {
    admins,
    isLoading: isLoadingAdmins,
    error: listError,
    fetchAdmins,
  } = useAdminList()

  const {
    updateAdmin,
    deleteAdmin,
    isLoading: isCrudLoading,
    error: crudError,
  } = useAdminCRUD()

  // React Hook Form for create admin
  const createForm = useForm<CreateAdminFormData>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Handle form submission
  const handleCreateAdmin = useCallback(
    async (data: CreateAdminFormData) => {
      await createAdmin(data)
      createForm.reset()
      await fetchAdmins() // Refresh the list after creating
    },
    [createAdmin, createForm, fetchAdmins]
  )

  // Handle edit dialog
  const handleOpenEditDialog = useCallback((admin: AdminUser) => {
    setState(prev => ({
      ...prev,
      editingAdmin: admin,
      isEditDialogOpen: true,
    }))
  }, [])

  const handleCloseEditDialog = useCallback((open: boolean) => {
    setState(prev => ({
      ...prev,
      isEditDialogOpen: open,
      editingAdmin: open ? prev.editingAdmin : null,
    }))
  }, [])

  const handleEditSubmit = useCallback(
    async (data: EditAdminFormData) => {
      if (state.editingAdmin) {
        const success = await updateAdmin(state.editingAdmin.id, data)
        if (success) {
          await fetchAdmins() // Refresh the list after updating
          handleCloseEditDialog(false)
        }
      }
    },
    [state.editingAdmin, updateAdmin, fetchAdmins, handleCloseEditDialog]
  )

  // Handle delete dialog
  const handleOpenDeleteDialog = useCallback((admin: AdminUser) => {
    setState(prev => ({
      ...prev,
      deletingAdmin: admin,
      isDeleteDialogOpen: true,
    }))
  }, [])

  const handleCloseDeleteDialog = useCallback((open: boolean) => {
    setState(prev => ({
      ...prev,
      isDeleteDialogOpen: open,
      deletingAdmin: open ? prev.deletingAdmin : null,
    }))
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (state.deletingAdmin) {
      const success = await deleteAdmin(state.deletingAdmin.id)
      if (success) {
        await fetchAdmins() // Refresh the list after deleting
        handleCloseDeleteDialog(false)
      }
    }
  }, [state.deletingAdmin, deleteAdmin, fetchAdmins, handleCloseDeleteDialog])

  // Reset errors when dialogs close
  useEffect(() => {
    if (!state.isEditDialogOpen && !state.isDeleteDialogOpen) {
      // Clear any CRUD errors when dialogs close
    }
  }, [state.isEditDialogOpen, state.isDeleteDialogOpen])

  // Display error from any operation
  const displayError = createError || listError || crudError

  // Access control
  if (!isSuperAdmin) {
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">
            {t('createAdmin.accessDenied')}
          </h1>
          <p className="text-muted-foreground">
            {t('createAdmin.accessDeniedMessage')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('createAdmin.pageTitle')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('createAdmin.pageSubtitle')}
        </p>
      </div>

      <Separator />

      {/* Create Admin Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {t('createAdmin.sectionTitle')}
        </h2>
        <CreateAdminForm
          onSubmit={handleCreateAdmin}
          isLoading={isCreating}
          error={displayError}
          success={createSuccess}
          form={createForm}
        />
      </div>

      <Separator />

      {/* Admin Users Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {t('createAdmin.adminsList')}
        </h2>
        <AdminUsersTable
          admins={admins}
          isLoading={isLoadingAdmins}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      </div>

      {/* Edit Dialog */}
      <EditAdminDialog
        isOpen={state.isEditDialogOpen}
        onOpenChange={handleCloseEditDialog}
        admin={state.editingAdmin}
        onSubmit={handleEditSubmit}
        isLoading={isCrudLoading}
      />

      {/* Delete Dialog */}
      <DeleteAdminDialog
        isOpen={state.isDeleteDialogOpen}
        onOpenChange={handleCloseDeleteDialog}
        admin={state.deletingAdmin}
        onConfirm={handleDeleteConfirm}
        isLoading={isCrudLoading}
      />
    </div>
  )
}
