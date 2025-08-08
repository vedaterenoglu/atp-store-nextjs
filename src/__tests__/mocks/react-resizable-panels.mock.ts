/**
 * Mock for react-resizable-panels
 * Resolves Jest ESM parsing errors by providing CommonJS-compatible mocks
 */

import React from 'react'

export const Panel = ({ children }: { children: React.ReactNode }) => children
export const PanelGroup = ({ children }: { children: React.ReactNode }) =>
  children
export const PanelResizeHandle = () => null
