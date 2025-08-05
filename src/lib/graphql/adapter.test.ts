/**
 * GraphQL Adapter Test Suite
 * SOLID Principles: Single Responsibility - Test GraphQL adapter functionality
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, GraphQL mocks
 */

import { graphQLClientAdapter } from './adapter'
import { getGraphQLClient } from './client'
import type { DocumentNode } from 'graphql'
import { Kind } from 'graphql'
import type { Client, OperationResult, CombinedError } from '@urql/core'

// Mock the client module
jest.mock('./client')

// Type the mocked function
const mockGetGraphQLClient = getGraphQLClient as jest.MockedFunction<
  typeof getGraphQLClient
>

describe('graphQLClientAdapter', () => {
  // Mock client methods
  const mockQuery = jest.fn()
  const mockMutation = jest.fn()
  const mockToPromise = jest.fn()

  // Mock client
  const mockClient = {
    query: mockQuery,
    mutation: mockMutation,
  } as unknown as Client

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetGraphQLClient.mockReturnValue(mockClient)

    // Setup default promise behavior
    mockQuery.mockReturnValue({ toPromise: mockToPromise })
    mockMutation.mockReturnValue({ toPromise: mockToPromise })
  })

  describe('request method', () => {
    it('should execute GraphQL query with string document', async () => {
      const mockResult = {
        operation: {} as never,
        data: { users: [{ id: 1, name: 'Test User' }] },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const queryString = 'query GetUsers { users { id name } }'
      const variables = { limit: 10 }

      const result = await graphQLClientAdapter.request({
        document: queryString,
        variables,
      })

      expect(mockGetGraphQLClient).toHaveBeenCalledTimes(1)
      expect(mockQuery).toHaveBeenCalledWith(queryString, variables)
      expect(mockToPromise).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResult)
    })

    it('should execute GraphQL query with DocumentNode', async () => {
      const mockResult = {
        operation: {} as never,
        data: { user: { id: 1, name: 'Test User' } },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const queryString =
        'query GetUser($id: ID!) { user(id: $id) { id name } }'
      const documentNode = {
        kind: Kind.DOCUMENT,
        definitions: [],
        loc: {
          source: {
            body: queryString,
            name: 'GraphQL request',
            locationOffset: { line: 1, column: 1 },
          },
        },
      }
      const variables = { id: '1' }

      const result = await graphQLClientAdapter.request({
        document: documentNode as unknown as DocumentNode,
        variables,
      })

      expect(mockQuery).toHaveBeenCalledWith(queryString, variables)
      expect(result).toEqual(mockResult)
    })

    it('should handle DocumentNode without loc property', async () => {
      const mockResult = {
        operation: {} as never,
        data: { test: true },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const documentNode = {
        kind: Kind.DOCUMENT,
        definitions: [],
        // No loc property
      }

      await graphQLClientAdapter.request({
        document: documentNode as unknown as DocumentNode,
        variables: undefined,
      })

      expect(mockQuery).toHaveBeenCalledWith('', {})
    })

    it('should handle DocumentNode with loc but no source.body', async () => {
      const mockResult = {
        operation: {} as never,
        data: { test: true },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const documentNode = {
        kind: Kind.DOCUMENT,
        definitions: [],
        loc: undefined,
      }

      await graphQLClientAdapter.request({
        document: documentNode as unknown as DocumentNode,
      })

      expect(mockQuery).toHaveBeenCalledWith('', {})
    })

    it('should handle request without variables', async () => {
      const mockResult = {
        operation: {} as never,
        data: { users: [] },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const queryString = 'query GetUsers { users { id name } }'

      await graphQLClientAdapter.request({
        document: queryString,
      })

      expect(mockQuery).toHaveBeenCalledWith(queryString, {})
    })

    it('should handle GraphQL errors', async () => {
      const mockResult = {
        operation: {} as never,
        data: null,
        error: {
          name: 'CombinedError',
          message: 'GraphQL Error',
          graphQLErrors: [
            {
              message: 'Field error',
              path: ['users'],
              extensions: {},
            } as never,
          ],
          networkError: undefined,
        } as unknown as CombinedError,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const result = await graphQLClientAdapter.request({
        document: 'query { users { id } }',
      })

      expect(result.error).toBeDefined()
      expect(result.error?.message).toBe('GraphQL Error')
      expect(result.data).toBeNull()
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network error')
      mockToPromise.mockRejectedValue(networkError)

      await expect(
        graphQLClientAdapter.request({
          document: 'query { test }',
        })
      ).rejects.toThrow('Network error')
    })
  })

  describe('mutate method', () => {
    it('should execute GraphQL mutation with string document', async () => {
      const mockResult = {
        operation: {} as never,
        data: { createUser: { id: 1, name: 'New User' } },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const mutationString =
        'mutation CreateUser($input: UserInput!) { createUser(input: $input) { id name } }'
      const variables = { input: { name: 'New User' } }

      const result = await graphQLClientAdapter.mutate({
        document: mutationString,
        variables,
      })

      expect(mockGetGraphQLClient).toHaveBeenCalledTimes(1)
      expect(mockMutation).toHaveBeenCalledWith(mutationString, variables)
      expect(mockToPromise).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockResult)
    })

    it('should execute GraphQL mutation with DocumentNode', async () => {
      const mockResult = {
        operation: {} as never,
        data: { updateUser: { id: 1, name: 'Updated User' } },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const mutationString =
        'mutation UpdateUser($id: ID!, $input: UserInput!) { updateUser(id: $id, input: $input) { id name } }'
      const documentNode = {
        kind: Kind.DOCUMENT,
        definitions: [],
        loc: {
          source: {
            body: mutationString,
            name: 'GraphQL mutation',
            locationOffset: { line: 1, column: 1 },
          },
        },
      }
      const variables = { id: '1', input: { name: 'Updated User' } }

      const result = await graphQLClientAdapter.mutate({
        document: documentNode as unknown as DocumentNode,
        variables,
      })

      expect(mockMutation).toHaveBeenCalledWith(mutationString, variables)
      expect(result).toEqual(mockResult)
    })

    it('should handle mutation without variables', async () => {
      const mockResult = {
        operation: {} as never,
        data: { clearCache: true },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const mutationString = 'mutation ClearCache { clearCache }'

      await graphQLClientAdapter.mutate({
        document: mutationString,
      })

      expect(mockMutation).toHaveBeenCalledWith(mutationString, {})
    })

    it('should handle DocumentNode without loc for mutation', async () => {
      const mockResult = {
        operation: {} as never,
        data: { test: true },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const documentNode = {
        kind: Kind.DOCUMENT,
        definitions: [],
        // No loc property
      }

      await graphQLClientAdapter.mutate({
        document: documentNode as unknown as DocumentNode,
        variables: { test: true },
      })

      expect(mockMutation).toHaveBeenCalledWith('', { test: true })
    })

    it('should handle mutation errors', async () => {
      const mockResult = {
        operation: {} as never,
        data: null,
        error: {
          name: 'CombinedError',
          message: 'Mutation failed',
          graphQLErrors: [
            {
              message: 'Validation error',
              path: ['createUser'],
              extensions: { code: 'VALIDATION_ERROR' },
            } as never,
          ],
          networkError: undefined,
        } as unknown as CombinedError,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const result = await graphQLClientAdapter.mutate({
        document: 'mutation { createUser }',
        variables: {},
      })

      expect(result.error).toBeDefined()
      expect(result.error?.graphQLErrors).toHaveLength(1)
      expect(result.data).toBeNull()
    })

    it('should handle mutation network errors', async () => {
      const networkError = new Error('Connection refused')
      mockToPromise.mockRejectedValue(networkError)

      await expect(
        graphQLClientAdapter.mutate({
          document: 'mutation { test }',
        })
      ).rejects.toThrow('Connection refused')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty string document for request', async () => {
      const mockResult = {
        operation: {} as never,
        data: null,
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      await graphQLClientAdapter.request({
        document: '',
      })

      expect(mockQuery).toHaveBeenCalledWith('', {})
    })

    it('should handle empty string document for mutation', async () => {
      const mockResult = {
        operation: {} as never,
        data: null,
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      await graphQLClientAdapter.mutate({
        document: '',
      })

      expect(mockMutation).toHaveBeenCalledWith('', {})
    })

    it('should handle complex nested variables', async () => {
      const mockResult = {
        operation: {} as never,
        data: { result: true },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const complexVariables = {
        input: {
          nested: {
            deep: {
              value: [1, 2, 3],
              object: { key: 'value' },
            },
          },
          array: [{ id: 1 }, { id: 2 }],
        },
      }

      await graphQLClientAdapter.request({
        document: 'query Test($input: ComplexInput) { test(input: $input) }',
        variables: complexVariables,
      })

      expect(mockQuery).toHaveBeenCalledWith(
        'query Test($input: ComplexInput) { test(input: $input) }',
        complexVariables
      )
    })

    it('should handle special characters in query string', async () => {
      const mockResult = {
        operation: {} as never,
        data: { result: true },
        error: undefined as CombinedError | undefined,
        extensions: undefined,
        stale: false,
        hasNext: false,
      }
      mockToPromise.mockResolvedValue(mockResult as unknown as OperationResult)

      const specialQuery = `query {
        test(input: "special \\"quoted\\" text with \\n newlines")
      }`

      await graphQLClientAdapter.request({
        document: specialQuery,
      })

      expect(mockQuery).toHaveBeenCalledWith(specialQuery, {})
    })
  })
})
