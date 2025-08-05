/**
 * Server-side GraphQL Fetch Test Suite
 * SOLID Principles: Single Responsibility - Test server-side GraphQL fetching
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, GraphQL mocks
 */

import { serverGraphQLFetch } from './server-fetch'
import { print, Kind } from 'graphql'
import type { DocumentNode } from 'graphql'

// Mock dependencies
jest.mock('@/lib/config/env', () => ({
  env: {
    NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: 'http://localhost:8080/v1/graphql',
  },
  hasuraConfig: {
    getAuthHeaders: () => ({
      'x-hasura-admin-secret': 'test-admin-secret',
      'x-hasura-role': 'admin',
    }),
  },
}))

jest.mock('graphql', () => ({
  ...jest.requireActual('graphql'),
  print: jest.fn(() => 'printed query'),
}))

// Store the original fetch
const originalFetch = global.fetch

// Create a proper fetch mock
const mockFetch = jest.fn<
  Promise<Response>,
  [RequestInfo | URL, RequestInit?]
>()

// Create fetch mock before any tests run
beforeAll(() => {
  // Replace global fetch with our mock
  global.fetch = mockFetch
})

// Restore original fetch after all tests
afterAll(() => {
  global.fetch = originalFetch
})

describe('serverGraphQLFetch', () => {
  const mockPrint = print as jest.MockedFunction<typeof print>

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset console.error mock
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Successful operations', () => {
    it('should execute GraphQL query with string document', async () => {
      const mockData = { users: [{ id: '1', name: 'Test User' }] }
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: mockData }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const queryString = 'query GetUsers { users { id name } }'
      const variables = { limit: 10 }

      const result = await serverGraphQLFetch({
        document: queryString,
        variables,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/v1/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'test-admin-secret',
            'x-hasura-role': 'admin',
          },
          body: JSON.stringify({
            query: queryString,
            variables,
          }),
          cache: 'no-store',
        }
      )

      expect(result).toEqual({ data: mockData })
      expect(console.error).not.toHaveBeenCalled()
    })

    it('should execute GraphQL query with DocumentNode', async () => {
      const mockData = { user: { id: '1', name: 'Test User' } }
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: mockData }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)
      mockPrint.mockReturnValue('query GetUser { user { id name } }')

      const documentNode: DocumentNode = {
        kind: Kind.DOCUMENT,
        definitions: [],
      }
      const variables = { id: '1' }

      const result = await serverGraphQLFetch({
        document: documentNode,
        variables,
      })

      expect(mockPrint).toHaveBeenCalledWith(documentNode)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/v1/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'test-admin-secret',
            'x-hasura-role': 'admin',
          },
          body: JSON.stringify({
            query: 'query GetUser { user { id name } }',
            variables,
          }),
          cache: 'no-store',
        }
      )

      expect(result).toEqual({ data: mockData })
    })

    it('should handle operations without variables', async () => {
      const mockData = { users: [] }
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: mockData }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const queryString = 'query GetUsers { users { id name } }'

      const result = await serverGraphQLFetch({
        document: queryString,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/v1/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'test-admin-secret',
            'x-hasura-role': 'admin',
          },
          body: JSON.stringify({
            query: queryString,
            variables: {},
          }),
          cache: 'no-store',
        }
      )

      expect(result).toEqual({ data: mockData })
    })

    it('should handle empty data response', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({}),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result).toEqual({})
    })

    it('should handle response with data as TData', async () => {
      const mockData = { test: true }
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: mockData }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result).toEqual({ data: mockData })
    })
  })

  describe('Error handling', () => {
    it('should handle non-ok response', async () => {
      const mockResponse = {
        ok: false,
        statusText: 'Internal Server Error',
        json: jest.fn(),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe(
        'GraphQL request failed: Internal Server Error'
      )
      expect(console.error).toHaveBeenCalledWith(
        'Server GraphQL fetch error:',
        result.error
      )
    })

    it('should handle GraphQL errors', async () => {
      const mockErrors = [
        { message: 'Field not found', extensions: { code: 'FIELD_ERROR' } },
        { message: 'Invalid argument', extensions: { code: 'ARG_ERROR' } },
      ]
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ errors: mockErrors }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe(
        'GraphQL errors: Field not found, Invalid argument'
      )
      expect(console.error).toHaveBeenCalledWith(
        'Server GraphQL fetch error:',
        result.error
      )
    })

    it('should handle single GraphQL error', async () => {
      const mockErrors = [{ message: 'Access denied' }]
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ errors: mockErrors }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error?.message).toBe('GraphQL errors: Access denied')
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network error')
      mockFetch.mockRejectedValueOnce(networkError)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBe(networkError)
      expect(console.error).toHaveBeenCalledWith(
        'Server GraphQL fetch error:',
        networkError
      )
    })

    it('should handle non-Error exceptions', async () => {
      mockFetch.mockRejectedValueOnce('String error')

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBeInstanceOf(Error)
      expect(result.error?.message).toBe('Unknown error occurred')
      expect(console.error).toHaveBeenCalledWith(
        'Server GraphQL fetch error:',
        'String error'
      )
    })

    it('should handle JSON parse errors', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe('Invalid JSON')
    })

    it('should handle empty errors array', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ errors: [] }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      // Empty errors array should not cause an error
      expect(result.error).toBeUndefined()
      expect(result).toEqual({})
    })
  })

  describe('Request status checks', () => {
    it('should handle response.ok check for success', async () => {
      const mockData = { test: true }
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: mockData }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBeUndefined()
      expect(result.data).toEqual(mockData)
    })

    it('should catch errors after response is received', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({
          errors: [{ message: 'GraphQL Error' }],
        }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result.error).toBeDefined()
      expect(result.data).toBeUndefined()
    })

    it('should return empty object when no data and no errors', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: null }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { test }',
      })

      expect(result).toEqual({})
      expect(result.error).toBeUndefined()
      expect(result.data).toBeUndefined()
    })
  })

  describe('Edge cases', () => {
    it('should handle complex nested variables', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: { result: true } }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const complexVariables = {
        input: {
          nested: {
            deep: {
              value: [1, 2, 3],
              object: { key: 'value' },
            },
          },
          array: [{ id: 1 }, { id: 2 }],
          nullValue: null,
          undefinedValue: undefined,
        },
      }

      await serverGraphQLFetch({
        document:
          'mutation Complex($input: ComplexInput) { complex(input: $input) }',
        variables: complexVariables,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/v1/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'test-admin-secret',
            'x-hasura-role': 'admin',
          },
          body: JSON.stringify({
            query:
              'mutation Complex($input: ComplexInput) { complex(input: $input) }',
            variables: complexVariables,
          }),
          cache: 'no-store',
        }
      )
    })

    it('should handle special characters in query', async () => {
      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: { result: true } }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const specialQuery = `query {
        test(input: "special \\"quoted\\" text with \\n newlines")
      }`

      await serverGraphQLFetch({
        document: specialQuery,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/v1/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'test-admin-secret',
            'x-hasura-role': 'admin',
          },
          body: JSON.stringify({
            query: specialQuery,
            variables: {},
          }),
          cache: 'no-store',
        }
      )
    })

    it('should handle very large response data', async () => {
      const largeData = {
        users: Array.from({ length: 1000 }, (_, i) => ({
          id: i.toString(),
          name: `User ${i}`,
          email: `user${i}@example.com`,
          profile: {
            bio: 'A'.repeat(1000),
          },
        })),
      }

      const mockResponse = {
        ok: true,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: largeData }),
      } as unknown as Response

      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await serverGraphQLFetch({
        document: 'query { users { id name email profile { bio } } }',
      })

      expect(result).toEqual({ data: largeData })
    })
  })
})
