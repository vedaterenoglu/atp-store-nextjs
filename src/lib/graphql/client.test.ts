/**
 * GraphQL Client Unit Tests
 * SOLID Principles: Single Responsibility (testing GraphQL client)
 * Design Patterns: Mock Pattern for external dependencies
 * Dependencies: Jest, MSW, urql mocks
 */

import { Client } from '@urql/core'
import {
  createGraphQLClient,
  getGraphQLClient,
  executeGraphQLOperation,
  executeGraphQLMutation,
  executeGraphQLSubscription,
  resetGraphQLClient,
} from './client'
import * as toastModule from '@/lib/utils/toast'

// Mock environment
jest.mock('@/lib/config/env', () => ({
  env: {
    NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: 'http://localhost:8080/v1/graphql',
    HASURA_GRAPHQL_ADMIN_SECRET: 'test-admin-secret',
  },
}))

// Mock toast
jest.mock('@/lib/utils/toast', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}))

// Mock urql
jest.mock('@urql/core', () => ({
  Client: jest.fn().mockImplementation(() => ({
    query: jest.fn(),
    mutation: jest.fn(),
    subscription: jest.fn(),
  })),
  cacheExchange: jest.fn(),
  fetchExchange: jest.fn(),
  errorExchange: jest.fn(config => ({
    onError: config.onError,
  })),
}))

describe('GraphQL Client', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    // Reset singleton
    resetGraphQLClient()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('createGraphQLClient', () => {
    it('should create client with correct configuration', () => {
      createGraphQLClient()

      expect(Client).toHaveBeenCalledWith({
        url: 'http://localhost:8080/v1/graphql',
        exchanges: expect.any(Array),
        fetchOptions: expect.any(Function),
      })
    })

    it('should configure headers with admin secret', () => {
      createGraphQLClient()

      const mockConfig = (Client as jest.MockedClass<typeof Client>).mock
        .calls[0]?.[0]
      const headers =
        typeof mockConfig?.fetchOptions === 'function'
          ? mockConfig.fetchOptions()
          : mockConfig?.fetchOptions

      expect(headers).toEqual({
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'test-admin-secret',
        },
      })
    })

    it('should handle network errors in error exchange', () => {
      // Create client first to trigger errorExchange
      createGraphQLClient()

      // Get error handler from errorExchange
      const urqlCore = jest.requireMock('@urql/core')
      const errorExchangeMock = urqlCore.errorExchange as jest.MockedFunction<
        typeof urqlCore.errorExchange
      >
      const errorHandler = errorExchangeMock.mock.calls[0][0].onError

      // Simulate network error
      const networkError = new Error('Network failed')
      errorHandler({ networkError, graphQLErrors: [] })

      expect(toastModule.toast.error).toHaveBeenCalledWith(
        'Network error. Please check your connection.'
      )
    })

    it('should handle GraphQL errors in error exchange', () => {
      // Create client first to trigger errorExchange
      createGraphQLClient()

      const urqlCore = jest.requireMock('@urql/core')
      const errorExchangeMock = urqlCore.errorExchange as jest.MockedFunction<
        typeof urqlCore.errorExchange
      >
      const errorHandler = errorExchangeMock.mock.calls[0][0].onError

      // Simulate GraphQL error
      const graphQLError = {
        message: 'Field not found',
        extensions: { code: 'FIELD_NOT_FOUND' },
      }
      errorHandler({ networkError: null, graphQLErrors: [graphQLError] })

      expect(toastModule.toast.error).toHaveBeenCalledWith('Field not found')
    })

    it('should handle access denied errors', () => {
      // Create client first to trigger errorExchange
      createGraphQLClient()

      const urqlCore = jest.requireMock('@urql/core')
      const errorExchangeMock = urqlCore.errorExchange as jest.MockedFunction<
        typeof urqlCore.errorExchange
      >
      const errorHandler = errorExchangeMock.mock.calls[0][0].onError

      const accessDeniedError = {
        message: 'Access denied',
        extensions: { code: 'access-denied' },
      }
      errorHandler({ networkError: null, graphQLErrors: [accessDeniedError] })

      expect(toastModule.toast.error).toHaveBeenCalledWith(
        'Access denied. Please check your permissions.'
      )
    })

    it('should handle invalid JWT errors', () => {
      // Create client first to trigger errorExchange
      createGraphQLClient()

      const urqlCore = jest.requireMock('@urql/core')
      const errorExchangeMock = urqlCore.errorExchange as jest.MockedFunction<
        typeof urqlCore.errorExchange
      >
      const errorHandler = errorExchangeMock.mock.calls[0][0].onError

      const jwtError = {
        message: 'Invalid JWT',
        extensions: { code: 'invalid-jwt' },
      }
      errorHandler({ networkError: null, graphQLErrors: [jwtError] })

      expect(toastModule.toast.error).toHaveBeenCalledWith(
        'Authentication error. Please sign in again.'
      )
    })
  })

  describe('getGraphQLClient', () => {
    it('should return singleton instance', () => {
      const client1 = getGraphQLClient()
      const client2 = getGraphQLClient()

      expect(client1).toBe(client2)
      expect(Client).toHaveBeenCalledTimes(1)
    })
  })

  describe('executeGraphQLOperation', () => {
    it('should execute query and return data', async () => {
      const mockData = { users: [{ id: '1', name: 'Test User' }] }
      const mockClient = {
        query: jest.fn().mockReturnValue({
          toPromise: jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null }),
        }),
      }

      const result = await executeGraphQLOperation(
        'query GetUsers { users { id name } }',
        {},
        mockClient as unknown as Client
      )

      expect(result).toEqual(mockData)
      expect(mockClient.query).toHaveBeenCalledWith(
        'query GetUsers { users { id name } }',
        {}
      )
    })

    it('should throw error when query fails', async () => {
      const mockError = new Error('Query failed')
      const mockClient = {
        query: jest.fn().mockReturnValue({
          toPromise: jest
            .fn()
            .mockResolvedValue({ data: null, error: mockError }),
        }),
      }

      await expect(
        executeGraphQLOperation(
          'query { test }',
          {},
          mockClient as unknown as Client
        )
      ).rejects.toThrow('Query failed')
    })

    it('should throw error when no data returned', async () => {
      const mockClient = {
        query: jest.fn().mockReturnValue({
          toPromise: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }

      await expect(
        executeGraphQLOperation(
          'query { test }',
          {},
          mockClient as unknown as Client
        )
      ).rejects.toThrow('No data returned from GraphQL operation')
    })
  })

  describe('executeGraphQLMutation', () => {
    it('should execute mutation and return data', async () => {
      const mockData = { createUser: { id: '1', name: 'New User' } }
      const mockClient = {
        mutation: jest.fn().mockReturnValue({
          toPromise: jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null }),
        }),
      }

      const result = await executeGraphQLMutation(
        'mutation CreateUser($name: String!) { createUser(name: $name) { id name } }',
        { name: 'New User' },
        mockClient as unknown as Client
      )

      expect(result).toEqual(mockData)
      expect(mockClient.mutation).toHaveBeenCalledWith(
        'mutation CreateUser($name: String!) { createUser(name: $name) { id name } }',
        { name: 'New User' }
      )
    })

    it('should throw error when mutation fails', async () => {
      const mockError = new Error('Mutation failed')
      const mockClient = {
        mutation: jest.fn().mockReturnValue({
          toPromise: jest
            .fn()
            .mockResolvedValue({ data: null, error: mockError }),
        }),
      }

      await expect(
        executeGraphQLMutation(
          'mutation { test }',
          {},
          mockClient as unknown as Client
        )
      ).rejects.toThrow('Mutation failed')
    })

    it('should throw error when no data returned from mutation', async () => {
      const mockClient = {
        mutation: jest.fn().mockReturnValue({
          toPromise: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }

      await expect(
        executeGraphQLMutation(
          'mutation { test }',
          {},
          mockClient as unknown as Client
        )
      ).rejects.toThrow('No data returned from GraphQL mutation')
    })
  })

  describe('executeGraphQLSubscription', () => {
    it('should execute subscription and call onData', () => {
      const mockUnsubscribe = jest.fn()
      const mockSubscribe = jest.fn(callback => {
        // Simulate data by calling the callback
        callback({ data: { messageAdded: 'Hello' }, error: null })
        return { unsubscribe: mockUnsubscribe }
      })

      const mockClient = {
        subscription: jest.fn().mockReturnValue({
          subscribe: mockSubscribe,
        }),
      }

      const onData = jest.fn()
      const onError = jest.fn()

      const unsubscribe = executeGraphQLSubscription(
        {
          query: 'subscription { messageAdded }',
          variables: {},
          onData,
          onError,
        },
        mockClient as unknown as Client
      )

      expect(mockClient.subscription).toHaveBeenCalledWith(
        'subscription { messageAdded }',
        {}
      )
      expect(onData).toHaveBeenCalledWith({ messageAdded: 'Hello' })
      expect(onError).not.toHaveBeenCalled()

      // Test unsubscribe
      unsubscribe()
      expect(mockUnsubscribe).toHaveBeenCalled()
    })

    it('should call onError when subscription has error', () => {
      const mockError = new Error('Subscription error')
      const mockSubscribe = jest.fn(callback => {
        callback({ data: null, error: mockError })
        return { unsubscribe: jest.fn() }
      })

      const mockClient = {
        subscription: jest.fn().mockReturnValue({
          subscribe: mockSubscribe,
        }),
      }

      const onData = jest.fn()
      const onError = jest.fn()

      executeGraphQLSubscription(
        {
          query: 'subscription { test }',
          onData,
          onError,
        },
        mockClient as unknown as Client
      )

      expect(onData).not.toHaveBeenCalled()
      expect(onError).toHaveBeenCalledWith(mockError)
    })

    it('should handle subscription errors', () => {
      const mockError = new Error('Connection failed')
      const mockSubscribe = jest.fn(callback => {
        // Simulate error through the result object
        callback({ data: null, error: mockError })
        return { unsubscribe: jest.fn() }
      })

      const mockClient = {
        subscription: jest.fn().mockReturnValue({
          subscribe: mockSubscribe,
        }),
      }

      const onData = jest.fn()
      const onError = jest.fn()

      executeGraphQLSubscription(
        {
          query: 'subscription { test }',
          onData,
          onError,
        },
        mockClient as unknown as Client
      )

      expect(onError).toHaveBeenCalledWith(mockError)
    })
  })
})
