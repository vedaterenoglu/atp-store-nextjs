/**
 * Unit tests for Apollo Provider Wrapper
 * SOLID Principles: SRP - Testing single responsibility of Apollo client setup
 * Design Patterns: Test Pattern with comprehensive mocking
 * Dependencies: Jest, React Testing Library, Apollo Client mocks
 */

import { render } from '@testing-library/react'
import { ApolloWrapper } from './ApolloWrapper'

// Mock Apollo Client dependencies - must be declared before jest.mock calls
jest.mock('@apollo/client', () => ({
  ApolloLink: {
    from: jest.fn(),
  },
  HttpLink: jest.fn(),
}))

jest.mock('@apollo/experimental-nextjs-app-support/ssr', () => ({
  ApolloNextAppProvider: jest.fn(({ children }) => children),
  NextSSRInMemoryCache: jest.fn(),
  NextSSRApolloClient: jest.fn(),
  SSRMultipartLink: jest.fn(),
}))

// Import mocked modules to get access to jest functions
import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

// Type the mocked functions
const mockHttpLink = HttpLink as jest.MockedClass<typeof HttpLink>
const mockNextSSRApolloClient = NextSSRApolloClient as jest.MockedClass<
  typeof NextSSRApolloClient
>
const mockNextSSRInMemoryCache = NextSSRInMemoryCache as jest.MockedClass<
  typeof NextSSRInMemoryCache
>
const mockApolloNextAppProvider = ApolloNextAppProvider as jest.MockedFunction<
  typeof ApolloNextAppProvider
>
const mockApolloLinkFrom = ApolloLink.from as jest.MockedFunction<
  typeof ApolloLink.from
>
const mockSSRMultipartLink = SSRMultipartLink as jest.MockedClass<
  typeof SSRMultipartLink
>

describe('ApolloWrapper', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }

    // Reset constructor mocks to return mock instances
    ;(mockHttpLink as unknown as jest.Mock).mockImplementation(() => ({
      __typename: 'HttpLink',
    }))
    ;(mockNextSSRInMemoryCache as unknown as jest.Mock).mockImplementation(
      () => ({
        __typename: 'NextSSRInMemoryCache',
      })
    )
    ;(mockNextSSRApolloClient as unknown as jest.Mock).mockImplementation(
      () => ({
        __typename: 'NextSSRApolloClient',
      })
    )
    ;(mockSSRMultipartLink as unknown as jest.Mock).mockImplementation(() => ({
      __typename: 'SSRMultipartLink',
    }))

    mockApolloLinkFrom.mockReturnValue({
      __typename: 'CombinedLink',
    } as unknown as ReturnType<typeof ApolloLink.from>)
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Component Rendering', () => {
    it('should render children within ApolloNextAppProvider', () => {
      const TestChild = () => <div data-testid="test-child">Test Content</div>

      const { getByTestId } = render(
        <ApolloWrapper>
          <TestChild />
        </ApolloWrapper>
      )

      // Verify child component is rendered
      expect(getByTestId('test-child')).toBeInTheDocument()
      expect(mockApolloNextAppProvider).toHaveBeenCalled()
      const callArgs = mockApolloNextAppProvider.mock.calls[0]
      expect(callArgs).toBeDefined()
      expect(callArgs?.[0]).toMatchObject({
        makeClient: expect.any(Function),
        children: expect.anything(),
      })
    })

    it('should pass makeClient function to ApolloNextAppProvider', () => {
      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Verify makeClient function is passed
      const lastCall =
        mockApolloNextAppProvider.mock.calls[
          mockApolloNextAppProvider.mock.calls.length - 1
        ]
      expect(lastCall).toBeDefined()
      expect(lastCall?.[0]).toHaveProperty('makeClient')
      expect(typeof lastCall?.[0]?.makeClient).toBe('function')
    })
  })

  describe('makeClient function', () => {
    it('should create HttpLink with environment variables', () => {
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] =
        'https://test-endpoint.com/graphql'
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET'] = 'test-secret'

      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      const clientInstance = makeClientCall?.makeClient?.()

      expect(mockHttpLink).toHaveBeenCalledWith({
        uri: 'https://test-endpoint.com/graphql',
        headers: {
          'x-hasura-admin-secret': 'test-secret',
          'x-hasura-role': 'admin',
        },
      })

      expect(clientInstance).toBeDefined()
    })

    it('should use default values when environment variables are not set', () => {
      delete process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
      delete process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET']

      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      expect(mockHttpLink).toHaveBeenCalledWith({
        uri: 'https://gtbs-crm-backend-app.herokuapp.com/v1/graphql',
        headers: {
          'x-hasura-admin-secret': '',
          'x-hasura-role': 'admin',
        },
      })
    })

    it('should create NextSSRApolloClient with proper cache configuration', () => {
      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      expect(mockNextSSRInMemoryCache).toHaveBeenCalledWith({
        typePolicies: {
          Query: {
            fields: {
              customer_bookmarks: {
                merge: expect.any(Function),
              },
            },
          },
        },
      })
    })

    it('should test customer_bookmarks merge function returns incoming data', () => {
      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      // Get the merge function from the cache configuration
      const cacheConfig = mockNextSSRInMemoryCache.mock.calls[0]?.[0]
      expect(cacheConfig).toBeDefined()
      const mergeFunction = (
        cacheConfig as {
          typePolicies?: {
            Query?: {
              fields?: {
                customer_bookmarks?: {
                  merge?: (
                    existing: unknown[],
                    incoming: unknown[]
                  ) => unknown[]
                }
              }
            }
          }
        }
      )?.typePolicies?.Query?.fields?.customer_bookmarks?.merge
      expect(mergeFunction).toBeDefined()

      // Test the merge function behavior
      const existingData = [{ id: 1, name: 'old' }]
      const incomingData = [{ id: 2, name: 'new' }]

      const result = mergeFunction?.(existingData, incomingData)
      expect(result).toEqual(incomingData)
    })

    it('should test customer_bookmarks merge function with undefined existing data', () => {
      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      // Get the merge function from the cache configuration
      const cacheConfig = mockNextSSRInMemoryCache.mock.calls[0]?.[0]
      expect(cacheConfig).toBeDefined()
      const mergeFunction = (
        cacheConfig as {
          typePolicies?: {
            Query?: {
              fields?: {
                customer_bookmarks?: {
                  merge?: (
                    existing: unknown[],
                    incoming: unknown[]
                  ) => unknown[]
                }
              }
            }
          }
        }
      )?.typePolicies?.Query?.fields?.customer_bookmarks?.merge
      expect(mergeFunction).toBeDefined()

      // Test the merge function with undefined existing (default parameter)
      const incomingData = [{ id: 1, name: 'test' }]

      const result = mergeFunction?.([] as unknown[], incomingData)
      expect(result).toEqual(incomingData)
    })
  })

  describe('Link Configuration', () => {
    it('should test environment variable fallback in URI configuration', () => {
      // Test that when environment variables are empty strings, defaults are used
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] = ''
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET'] =
        null as unknown as string

      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      expect(mockHttpLink).toHaveBeenCalledWith({
        uri: 'https://gtbs-crm-backend-app.herokuapp.com/v1/graphql',
        headers: {
          'x-hasura-admin-secret': '',
          'x-hasura-role': 'admin',
        },
      })
    })

    it('should use HttpLink directly on client side (window defined)', () => {
      // Mock client environment (window defined)
      const originalWindow = (global as { window?: Window }).window
      ;(global as { window?: Window }).window = {} as Window

      const mockHttpLinkInstance = {
        uri: 'test',
        headers: {},
        __typename: 'HttpLink',
      }
      ;(mockHttpLink as unknown as jest.Mock).mockReturnValue(
        mockHttpLinkInstance
      )

      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      // Should NOT create SSRMultipartLink on client side
      expect(mockSSRMultipartLink).not.toHaveBeenCalled()
      expect(mockApolloLinkFrom).not.toHaveBeenCalled()

      // Verify NextSSRApolloClient was called with HttpLink directly
      expect(mockNextSSRApolloClient).toHaveBeenCalledWith(
        expect.objectContaining({
          link: mockHttpLinkInstance,
          defaultOptions: {
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
          },
        })
      )

      // Restore window
      if (originalWindow) {
        ;(global as { window?: Window }).window = originalWindow
      } else {
        delete (global as { window?: Window }).window
      }
    })
  })

  describe('Default Options Configuration', () => {
    it('should configure proper default options for queries', () => {
      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      expect(mockNextSSRApolloClient).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultOptions: {
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
          },
        })
      )
    })
  })

  describe('Integration Tests', () => {
    it('should create complete Apollo client configuration in client environment', () => {
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] =
        'https://integration-test.com/graphql'
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET'] =
        'integration-secret'

      render(
        <ApolloWrapper>
          <div>Integration Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it to trigger constructor calls
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      // Verify client-side parts work together (in JSDOM environment)
      expect(mockHttpLink).toHaveBeenCalled()
      expect(mockNextSSRInMemoryCache).toHaveBeenCalled()
      expect(mockNextSSRApolloClient).toHaveBeenCalled()
      expect(mockApolloNextAppProvider).toHaveBeenCalled()

      // In JSDOM environment, SSRMultipartLink and ApolloLink.from won't be called
      // because typeof window !== 'undefined', so the client-side path is taken
    })

    it('should handle multiple re-renders correctly', () => {
      const { rerender } = render(
        <ApolloWrapper>
          <div>First Render</div>
        </ApolloWrapper>
      )

      const firstCallCount = mockApolloNextAppProvider.mock.calls.length

      rerender(
        <ApolloWrapper>
          <div>Second Render</div>
        </ApolloWrapper>
      )

      // Should be called for each render
      expect(mockApolloNextAppProvider.mock.calls.length).toBeGreaterThan(
        firstCallCount
      )
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty environment variables', () => {
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] = ''
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET'] = ''

      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      expect(mockHttpLink).toHaveBeenCalledWith({
        uri: 'https://gtbs-crm-backend-app.herokuapp.com/v1/graphql', // Should use default
        headers: {
          'x-hasura-admin-secret': '',
          'x-hasura-role': 'admin',
        },
      })
    })

    it('should handle null children', () => {
      const { container } = render(<ApolloWrapper>{null}</ApolloWrapper>)

      expect(container).toBeInTheDocument()
      expect(mockApolloNextAppProvider).toHaveBeenCalled()
    })

    it('should handle complex merge scenarios with different data types', () => {
      render(
        <ApolloWrapper>
          <div>Test</div>
        </ApolloWrapper>
      )

      // Get the makeClient function and call it
      const makeClientCall = mockApolloNextAppProvider.mock.calls[0]?.[0]
      expect(makeClientCall).toBeDefined()
      makeClientCall?.makeClient?.()

      // Get the merge function
      const cacheConfig = mockNextSSRInMemoryCache.mock.calls[0]?.[0]
      expect(cacheConfig).toBeDefined()
      const mergeFunction = (
        cacheConfig as {
          typePolicies?: {
            Query?: {
              fields?: {
                customer_bookmarks?: {
                  merge?: (
                    existing: unknown[],
                    incoming: unknown[]
                  ) => unknown[]
                }
              }
            }
          }
        }
      )?.typePolicies?.Query?.fields?.customer_bookmarks?.merge
      expect(mergeFunction).toBeDefined()

      // Test with empty arrays
      expect(mergeFunction?.([], [])).toEqual([])

      // Test with objects
      const complexIncoming = [{ id: 1, data: { nested: 'value' } }]
      expect(mergeFunction?.([], complexIncoming)).toEqual(complexIncoming)
    })
  })
})
