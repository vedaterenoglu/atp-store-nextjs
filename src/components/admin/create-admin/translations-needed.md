# New Translation Keys Needed for Admin Components

## Summary
This document lists all new translation keys that need to be added to the 5 language files (en, tr, de, da, sv) for the admin create-admin components.

## New Translation Keys Required

### CreateAdminContainer Component
- `admin.createAdmin.accessDenied`: "Access Denied"
- `admin.createAdmin.accessDeniedMessage`: "Only super administrators can access this page."
- `admin.createAdmin.sectionTitle`: "Create New Admin"
- `admin.createAdmin.pageTitle`: "Admin User Management"
- `admin.createAdmin.pageSubtitle`: "Create and manage administrator accounts with elevated system privileges"

### CreateAdminForm Component
- `admin.createAdmin.form.emailHelp`: "The email address will be used for login and notifications"
- `admin.createAdmin.form.passwordRequirements`: "Password requirements:"
- `admin.createAdmin.form.passwordMinLength`: "Minimum {n} characters"
- `admin.createAdmin.form.passwordUppercase`: "At least one uppercase letter"
- `admin.createAdmin.form.passwordLowercase`: "At least one lowercase letter"
- `admin.createAdmin.form.passwordNumber`: "At least one number"

### AdminUsersTable Component
- `admin.createAdmin.loadingAdmins`: "Loading admin users..."
- `admin.createAdmin.noAdminsFound`: "No Admin Users Found"
- `admin.createAdmin.noAdminsDescription`: "There are currently no admin users in the system. Create a new admin user to get started."

### AdminTableRow Component
- `admin.createAdmin.table.notProvided`: "Not provided"
- `admin.createAdmin.table.edit`: "Edit"
- `admin.createAdmin.table.delete`: "Delete"
- `admin.createAdmin.table.editAriaLabel`: "Edit admin {email}"
- `admin.createAdmin.table.deleteAriaLabel`: "Delete admin {email}"

### EditAdminDialog Component
- `admin.createAdmin.form.firstNamePlaceholder`: "John"
- `admin.createAdmin.form.lastNamePlaceholder`: "Doe"
- `admin.createAdmin.form.updating`: "Updating..."
- `admin.createAdmin.form.update`: "Update Admin"

### DeleteAdminDialog Component
- `admin.createAdmin.deleteTitle`: "Delete Admin User"
- `admin.createAdmin.deleteConfirmation`: "Are you sure you want to delete this admin user?"
- `admin.createAdmin.deleteWarning`: "This action cannot be undone."
- `admin.createAdmin.form.deleting`: "Deleting..."
- `admin.createAdmin.form.delete`: "Delete Admin"

### StatusAlert Component
- `admin.createAdmin.closeAlert`: "Close alert"

## Total New Keys: 28

## Notes
- Some keys can reuse existing translations from the admin.json file
- The `{n}` and `{email}` are placeholders for dynamic values
- All 5 language files need to be updated: en, tr, de, da, sv