/**
 * GridErrorBoundary Component - Error boundary for grid components
 * SOLID Principles: Single Responsibility - Handles grid errors
 * Design Patterns: Error Boundary Pattern - Catches and displays errors
 * Dependencies: React ErrorBoundary
 */

'use client'

import React, { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/schadcn'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  className?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class GridErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('GridErrorBoundary caught error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      return (
        <div
          className={cn(
            'flex min-h-[200px] w-full flex-col items-center justify-center',
            'rounded-lg border border-destructive/20 bg-destructive/5 p-6',
            'text-center',
            this.props.className
          )}
        >
          <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
          <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {this.state.error?.message ||
              'An error occurred while loading this content'}
          </p>
          <Button
            onClick={this.handleReset}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
