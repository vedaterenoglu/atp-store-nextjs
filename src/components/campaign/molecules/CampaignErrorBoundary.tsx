/**
 * CampaignErrorBoundary - Error boundary for campaign components
 * SOLID Principles: SRP - Single responsibility for error catching
 * Design Patterns: Error Boundary Pattern
 * Dependencies: React
 */

'use client'

import React, { Component, type ReactNode } from 'react'
import { CampaignGridError } from './CampaignGridError'

interface Props {
  children: ReactNode
  onRetry?: () => void
}

interface State {
  hasError: boolean
  error: Error | undefined
}

export class CampaignErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Campaign Error Boundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <CampaignGridError
          error={this.state.error!}
          onRetry={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}
