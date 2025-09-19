/**
 * Unit tests for Admin Management API Routes
 * SOLID Principles: SRP - Testing single responsibility of admin user management
 * Design Patterns: Test Pattern with comprehensive mocking
 * Dependencies: Jest, Next.js API route testing, Clerk mocks
 */

import { NextRequest } from 'next/server'
import { GET } from '../list-admins/route'
import { PUT } from '../update-admin/route'
import { DELETE } from '../delete-admin/route'

// Mock NextResponse to work in Jest environment
jest.mock('next/server', () => ({
  NextRequest: jest.requireActual('next/server').NextRequest,
  NextResponse: {
    json: (body: unknown, options?: { status?: number }) => {
      const response = new Response(JSON.stringify(body), {
        status: options?.status || 200,
        headers: { 'Content-Type': 'application/json' },
      })
      return response
    },
  },
}))

// Mock Clerk functions
const mockAuth = jest.fn()
const mockCurrentUser = jest.fn()
const mockClerkClient = jest.fn()

jest.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
  currentUser: () => mockCurrentUser(),
  clerkClient: () => mockClerkClient(),
}))

// Mock user data
const mockSuperadminUser = {
  id: 'superadmin_123',
  publicMetadata: { role: 'superadmin' },
  emailAddresses: [{ emailAddress: 'superadmin@test.com' }],
  firstName: 'Super',
  lastName: 'Admin',
}

const mockAdminUser = {
  id: 'admin_456',
  publicMetadata: { role: 'admin' },
  emailAddresses: [{ emailAddress: 'admin@test.com' }],
  firstName: 'Regular',
  lastName: 'Admin',
}

const mockCustomerUser = {
  id: 'customer_789',
  publicMetadata: { role: 'customer' },
  emailAddresses: [{ emailAddress: 'customer@test.com' }],
  firstName: 'Customer',
  lastName: 'User',
}

const mockAdminUsers = [
  {
    id: 'admin_1',
    emailAddresses: [{ emailAddress: 'admin1@test.com' }],
    firstName: 'Admin',
    lastName: 'One',
    publicMetadata: { role: 'admin' },
    createdAt: Date.now() - 86400000,
    lastSignInAt: Date.now() - 3600000,
  },
  {
    id: 'admin_2',
    emailAddresses: [{ emailAddress: 'admin2@test.com' }],
    firstName: 'Admin',
    lastName: 'Two',
    publicMetadata: { role: 'superadmin' },
    createdAt: Date.now() - 172800000,
    lastSignInAt: Date.now() - 7200000,
  },
]

describe('Admin Management API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/admin/users/list-admins', () => {
    it('should return admin users for superadmin', async () => {
      // Mock authentication as superadmin
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)
      mockClerkClient.mockResolvedValue({
        users: {
          getUserList: jest.fn().mockResolvedValue({
            data: mockAdminUsers,
          }),
        },
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.admins).toHaveLength(2)
      expect(data.admins[0].role).toBe('admin')
      expect(data.admins[1].role).toBe('superadmin')
    })

    it('should return 401 for unauthenticated user', async () => {
      mockAuth.mockResolvedValue({ userId: null })
      mockCurrentUser.mockResolvedValue(null)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 403 for non-superadmin user', async () => {
      mockAuth.mockResolvedValue({ userId: 'admin_456' })
      mockCurrentUser.mockResolvedValue(mockAdminUser)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Access denied: Superadmin privileges required')
    })

    it('should handle Clerk API errors', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)
      mockClerkClient.mockResolvedValue({
        users: {
          getUserList: jest
            .fn()
            .mockRejectedValue(new Error('Clerk API error')),
        },
      })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch admin users')
    })
  })

  describe('PUT /api/admin/users/update-admin', () => {
    const createRequest = (body: object) => {
      return new NextRequest(
        'http://localhost:3000/api/admin/users/update-admin',
        {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    it('should update admin user for superadmin', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)
      mockClerkClient.mockResolvedValue({
        users: {
          getUser: jest.fn().mockResolvedValue({
            ...mockAdminUsers[0],
            publicMetadata: { role: 'admin' },
          }),
          updateUser: jest.fn().mockResolvedValue({
            ...mockAdminUsers[0],
            firstName: 'Updated',
            lastName: 'Admin',
          }),
        },
      })

      const request = createRequest({
        userId: 'admin_1',
        firstName: 'Updated',
        lastName: 'Admin',
        role: 'admin',
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.user.firstName).toBe('Updated')
    })

    it('should prevent superadmin from demoting themselves', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)

      const request = createRequest({
        userId: 'superadmin_123',
        role: 'admin',
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Cannot demote your own superadmin account')
    })

    it('should validate request data', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)

      const request = createRequest({
        userId: '', // Invalid empty userId
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid request data')
    })

    it('should return 403 for non-superadmin', async () => {
      mockAuth.mockResolvedValue({ userId: 'admin_456' })
      mockCurrentUser.mockResolvedValue(mockAdminUser)

      const request = createRequest({
        userId: 'admin_1',
        firstName: 'Updated',
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Access denied: Superadmin privileges required')
    })
  })

  describe('DELETE /api/admin/users/delete-admin', () => {
    const createRequest = (body: object) => {
      return new NextRequest(
        'http://localhost:3000/api/admin/users/delete-admin',
        {
          method: 'DELETE',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    it('should delete admin user for superadmin', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)
      mockClerkClient.mockResolvedValue({
        users: {
          getUser: jest.fn().mockResolvedValue({
            ...mockAdminUsers[0],
            publicMetadata: { role: 'admin' },
          }),
          getUserList: jest.fn().mockResolvedValue({
            data: [mockSuperadminUser, mockAdminUsers[1]], // Multiple superadmins
          }),
          deleteUser: jest.fn().mockResolvedValue({}),
        },
      })

      const request = createRequest({
        userId: 'admin_1',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.deletedUserId).toBe('admin_1')
    })

    it('should prevent deleting own account', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)

      const request = createRequest({
        userId: 'superadmin_123',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Cannot delete your own account')
    })

    it('should prevent deleting last superadmin', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)
      mockClerkClient.mockResolvedValue({
        users: {
          getUser: jest.fn().mockResolvedValue({
            id: 'superadmin_456',
            publicMetadata: { role: 'superadmin' },
          }),
          getUserList: jest.fn().mockResolvedValue({
            data: [{ publicMetadata: { role: 'superadmin' } }], // Only one superadmin
          }),
        },
      })

      const request = createRequest({
        userId: 'superadmin_456',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Cannot delete the last superadmin account')
    })

    it('should return 403 for non-superadmin', async () => {
      mockAuth.mockResolvedValue({ userId: 'admin_456' })
      mockCurrentUser.mockResolvedValue(mockAdminUser)

      const request = createRequest({
        userId: 'admin_1',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Access denied: Superadmin privileges required')
    })

    it('should handle non-admin user deletion attempt', async () => {
      mockAuth.mockResolvedValue({ userId: 'superadmin_123' })
      mockCurrentUser.mockResolvedValue(mockSuperadminUser)
      mockClerkClient.mockResolvedValue({
        users: {
          getUser: jest.fn().mockResolvedValue({
            id: 'customer_789',
            publicMetadata: { role: 'customer' },
          }),
        },
      })

      const request = createRequest({
        userId: 'customer_789',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Target user is not an admin')
    })
  })

  describe('Access Control Integration', () => {
    it('should consistently block customer users from all endpoints', async () => {
      mockAuth.mockResolvedValue({ userId: 'customer_789' })
      mockCurrentUser.mockResolvedValue(mockCustomerUser)

      // Test list endpoint
      const listResponse = await GET()
      expect(listResponse.status).toBe(403)

      // Test update endpoint
      const updateRequest = new NextRequest('http://localhost:3000', {
        method: 'PUT',
        body: JSON.stringify({ userId: 'admin_1' }),
      })
      const updateResponse = await PUT(updateRequest)
      expect(updateResponse.status).toBe(403)

      // Test delete endpoint
      const deleteRequest = new NextRequest('http://localhost:3000', {
        method: 'DELETE',
        body: JSON.stringify({ userId: 'admin_1' }),
      })
      const deleteResponse = await DELETE(deleteRequest)
      expect(deleteResponse.status).toBe(403)
    })
  })
})
