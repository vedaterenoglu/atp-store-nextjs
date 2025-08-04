/**
 * GraphQLProvider - App-level GraphQL client context provider
 *
 * Features:
 * - Provides urql GraphQL client to entire component tree
 * - Supports client injection for testing
 * - Exposes both urql Provider and custom context for direct client access
 *
 * Props: Optional client for dependency injection
 * State: None (uses singleton client instance)
 */
'use client'

import React, { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Provider as UrqlProvider } from 'urql'
import type { Client } from 'urql'
import { getGraphQLClient } from '@/lib/graphql/client'

// Context for direct client access when needed
interface GraphQLContextValue {
  client: Client
}

const GraphQLContext = createContext<GraphQLContextValue | undefined>(undefined)

// Main provider component
interface GraphQLProviderProps {
  children: ReactNode
  client?: Client // Allow client injection for testing
}

export function GraphQLProvider({ children, client }: GraphQLProviderProps) {
  // Get or create singleton client instance
  const graphqlClient = useMemo(() => client || getGraphQLClient(), [client])

  return (
    <GraphQLProviderContainer client={graphqlClient}>
      <GraphQLProviderContent>{children}</GraphQLProviderContent>
    </GraphQLProviderContainer>
  )
}

// Container component for client context
function GraphQLProviderContainer({
  children,
  client,
}: {
  children: ReactNode
  client: Client
}) {
  const contextValue = useMemo(() => ({ client }), [client])

  return (
    <GraphQLContext.Provider value={contextValue}>
      <UrqlProvider value={client}>{children}</UrqlProvider>
    </GraphQLContext.Provider>
  )
}

// Content wrapper for children
function GraphQLProviderContent({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Hook to access GraphQL client directly
export function useGraphQLClient(): Client {
  const context = useContext(GraphQLContext)

  if (!context) {
    throw new Error('useGraphQLClient must be used within GraphQLProvider')
  }

  return context.client
}

// Hook to check if GraphQL provider is available
export function useGraphQLProviderCheck(): boolean {
  const context = useContext(GraphQLContext)
  return context !== undefined
}

// Error boundary specific to GraphQL operations
interface GraphQLErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export function GraphQLErrorBoundary({
  children,
  fallback,
}: GraphQLErrorBoundaryProps) {
  return (
    <GraphQLErrorBoundaryContainer fallback={fallback}>
      {children}
    </GraphQLErrorBoundaryContainer>
  )
}

// Error boundary container implementation
class GraphQLErrorBoundaryContainer extends React.Component<
  GraphQLErrorBoundaryProps,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: GraphQLErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error('GraphQL Error Boundary caught:', error, errorInfo)
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || <GraphQLErrorFallback error={this.state.error} />
      )
    }

    return this.props.children
  }
}

// Default error fallback UI
function GraphQLErrorFallback({ error }: { error: Error | null }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center p-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-destructive">
          GraphQL Error
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {error?.message || 'An unexpected error occurred'}
        </p>
      </div>
    </div>
  )
}

// Re-export for convenience
export { Client } from 'urql'
