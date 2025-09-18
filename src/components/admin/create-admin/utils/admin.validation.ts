/**
 * Admin Validation Utils - Form validation schemas
 * SOLID Principles: SRP - Single responsibility for validation
 * Design Patterns: Factory Pattern for schema creation
 * Dependencies: Zod validation library
 */

import { z } from 'zod'
import type {
  CreateAdminFormData,
  EditAdminFormData,
} from '../types/admin.types'

// ============= Validation Constants =============

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 100
const EMAIL_MAX_LENGTH = 255
const NAME_MAX_LENGTH = 50

// ============= Error Messages =============

export const ValidationMessages = {
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
    maxLength: `Email must be less than ${EMAIL_MAX_LENGTH} characters`,
  },
  password: {
    required: 'Password is required',
    minLength: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    maxLength: `Password must be less than ${PASSWORD_MAX_LENGTH} characters`,
    weak: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  },
  firstName: {
    maxLength: `First name must be less than ${NAME_MAX_LENGTH} characters`,
    invalid: 'First name can only contain letters and spaces',
  },
  lastName: {
    maxLength: `Last name must be less than ${NAME_MAX_LENGTH} characters`,
    invalid: 'Last name can only contain letters and spaces',
  },
} as const

// ============= Custom Validation Functions =============

/**
 * Validates password strength
 * Requires at least one uppercase, one lowercase, and one number
 */
const isStrongPassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  return hasUpperCase && hasLowerCase && hasNumber
}

/**
 * Validates name format
 * Allows only letters, spaces, hyphens, and apostrophes
 */
const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s\-']+$/.test(name)
}

// ============= Schema Factory Functions =============

/**
 * Creates a validated email schema
 */
const createEmailSchema = (
  messages: typeof ValidationMessages.email = ValidationMessages.email
) =>
  z
    .string()
    .min(1, messages.required)
    .email(messages.invalid)
    .max(EMAIL_MAX_LENGTH, messages.maxLength)
    .transform(email => email.toLowerCase().trim())

/**
 * Creates a validated password schema with strength requirements
 */
const createPasswordSchema = (
  messages: typeof ValidationMessages.password = ValidationMessages.password
) =>
  z
    .string()
    .min(1, messages.required)
    .min(PASSWORD_MIN_LENGTH, messages.minLength)
    .max(PASSWORD_MAX_LENGTH, messages.maxLength)
    .refine(isStrongPassword, messages.weak)

/**
 * Creates a validated name schema (optional)
 */
const createNameSchema = (
  fieldName: 'firstName' | 'lastName',
  messages:
    | typeof ValidationMessages.firstName
    | typeof ValidationMessages.lastName = ValidationMessages[fieldName]
) =>
  z
    .string()
    .max(NAME_MAX_LENGTH, messages.maxLength)
    .refine(val => !val || isValidName(val), messages.invalid)
    .transform(name => name?.trim())
    .optional()

// ============= Main Validation Schemas =============

/**
 * Validation schema for creating a new admin
 */
export const createAdminSchema = z.object({
  email: createEmailSchema(),
  password: createPasswordSchema(),
}) satisfies z.ZodType<CreateAdminFormData>

/**
 * Validation schema for editing an existing admin
 */
export const editAdminSchema = z.object({
  email: createEmailSchema(),
  firstName: createNameSchema('firstName'),
  lastName: createNameSchema('lastName'),
})

// ============= Validation Helper Functions =============

/**
 * Validates create admin form data
 */
export const validateCreateAdminData = (
  data: unknown
):
  | { success: true; data: CreateAdminFormData }
  | { success: false; errors: z.ZodError } => {
  const result = createAdminSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, errors: result.error }
}

/**
 * Validates edit admin form data
 */
export const validateEditAdminData = (
  data: unknown
):
  | { success: true; data: EditAdminFormData }
  | { success: false; errors: z.ZodError } => {
  const result = editAdminSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, errors: result.error }
}

/**
 * Gets localized validation schema with custom messages
 * Useful for i18n support
 */
export const getLocalizedSchemas = (t: (key: string) => string) => {
  const localizedMessages = {
    email: {
      required: t(
        'createAdmin.validation.emailRequired'
      ) as typeof ValidationMessages.email.required,
      invalid: t(
        'createAdmin.validation.invalidEmail'
      ) as typeof ValidationMessages.email.invalid,
      maxLength: t(
        'createAdmin.validation.emailMaxLength'
      ) as typeof ValidationMessages.email.maxLength,
    },
    password: {
      required: t(
        'createAdmin.validation.passwordRequired'
      ) as typeof ValidationMessages.password.required,
      minLength: t(
        'createAdmin.validation.passwordMin'
      ) as typeof ValidationMessages.password.minLength,
      maxLength: t(
        'createAdmin.validation.passwordMaxLength'
      ) as typeof ValidationMessages.password.maxLength,
      weak: t(
        'createAdmin.validation.passwordWeak'
      ) as typeof ValidationMessages.password.weak,
    },
    firstName: {
      maxLength: t(
        'createAdmin.validation.firstNameMaxLength'
      ) as typeof ValidationMessages.firstName.maxLength,
      invalid: t(
        'createAdmin.validation.firstNameInvalid'
      ) as typeof ValidationMessages.firstName.invalid,
    },
    lastName: {
      maxLength: t(
        'createAdmin.validation.lastNameMaxLength'
      ) as typeof ValidationMessages.lastName.maxLength,
      invalid: t(
        'createAdmin.validation.lastNameInvalid'
      ) as typeof ValidationMessages.lastName.invalid,
    },
  }

  return {
    createAdminSchema: z.object({
      email: createEmailSchema(localizedMessages.email),
      password: createPasswordSchema(localizedMessages.password),
    }),
    editAdminSchema: z.object({
      email: createEmailSchema(localizedMessages.email),
      firstName: createNameSchema('firstName', localizedMessages.firstName),
      lastName: createNameSchema('lastName', localizedMessages.lastName),
    }),
  }
}

// ============= Export Validation Constants =============

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
} as const
