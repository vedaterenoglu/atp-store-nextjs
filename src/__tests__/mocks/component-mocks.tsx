/**
 * Centralized Component Mocks
 * SOLID Principles: SRP - Single source of truth for component mocks
 * Design Patterns: Factory Pattern for creating mock components
 * Dependencies: React
 */

import React from 'react'

/**
 * Create a mock icon component for testing
 */
export function createMockIconComponent(testId: string = 'test-icon') {
  return function MockIcon() {
    return <div data-testid={testId} />
  }
}

/**
 * Create a mock button component for testing
 */
export function createMockButtonComponent(testId: string = 'test-button') {
  return React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >(function MockButton(props, ref) {
    return <button ref={ref} data-testid={testId} {...props} />
  })
}

/**
 * Create a mock theme menu item content module for testing
 */
export function createMockThemeToggleModule() {
  return {
    ThemeMenuItemContent: function MockThemeMenuItemContent({
      option,
      isSelected,
    }: {
      option: {
        value: 'light' | 'dark' | 'system'
        icon: React.ComponentType
        label: string
      }
      isSelected: boolean
    }) {
      const Icon = option.icon
      return (
        <>
          <Icon />
          <span className={isSelected ? 'opacity-100' : 'opacity-0'}>✓</span>
        </>
      )
    },
  }
}
