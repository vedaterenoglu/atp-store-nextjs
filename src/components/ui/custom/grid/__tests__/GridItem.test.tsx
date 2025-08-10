/**
 * GridItem Component Unit Tests
 * SOLID Principles: Single Responsibility - Test GridItem component behavior
 * Design Patterns: Test Pattern - Unit tests with comprehensive coverage
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { GridItem } from '../GridItem'

describe('GridItem', () => {
  describe('Basic Rendering', () => {
    it('should render children correctly', () => {
      render(
        <GridItem>
          <div>Test content</div>
        </GridItem>
      )

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('should render as div when onClick is not provided', () => {
      const { container } = render(
        <GridItem>
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild
      expect(element?.nodeName).toBe('DIV')
    })

    it('should render as button when onClick is provided', () => {
      const onClick = jest.fn()
      const { container } = render(
        <GridItem onClick={onClick}>
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild
      expect(element?.nodeName).toBe('BUTTON')
    })
  })

  describe('Styling', () => {
    it('should apply default transition classes', () => {
      const { container } = render(
        <GridItem>
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('transition-all')
      expect(element).toHaveClass('duration-200')
    })

    it('should apply custom className', () => {
      const { container } = render(
        <GridItem className="custom-class">
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('custom-class')
      expect(element).toHaveClass('transition-all') // Should still have default classes
    })

    it('should apply interactive styles when onClick is provided', () => {
      const onClick = jest.fn()
      const { container } = render(
        <GridItem onClick={onClick}>
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('cursor-pointer')
      expect(element).toHaveClass('focus:outline-none')
      expect(element).toHaveClass('focus:ring-2')
      expect(element).toHaveClass('focus:ring-primary')
    })

    it('should not apply interactive styles when onClick is not provided', () => {
      const { container } = render(
        <GridItem>
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild as HTMLElement
      expect(element).not.toHaveClass('cursor-pointer')
      expect(element).not.toHaveClass('focus:outline-none')
      expect(element).not.toHaveClass('focus:ring-2')
      expect(element).not.toHaveClass('focus:ring-primary')
    })
  })

  describe('Interaction', () => {
    it('should handle onClick event', () => {
      const onClick = jest.fn()
      render(
        <GridItem onClick={onClick}>
          <div>Click me</div>
        </GridItem>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw error when clicked without onClick handler', () => {
      const { container } = render(
        <GridItem>
          <div>Content</div>
        </GridItem>
      )

      const element = container.firstChild as HTMLElement
      expect(() => fireEvent.click(element)).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should apply role attribute', () => {
      render(
        <GridItem role="article">
          <div>Content</div>
        </GridItem>
      )

      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('should apply aria-label attribute', () => {
      render(
        <GridItem aria-label="Grid item label">
          <div>Content</div>
        </GridItem>
      )

      expect(screen.getByLabelText('Grid item label')).toBeInTheDocument()
    })

    it('should handle both role and aria-label together', () => {
      render(
        <GridItem role="article" aria-label="Article item">
          <div>Content</div>
        </GridItem>
      )

      const element = screen.getByRole('article')
      expect(element).toHaveAttribute('aria-label', 'Article item')
    })

    it('should have implicit button role when onClick is provided', () => {
      const onClick = jest.fn()
      render(
        <GridItem onClick={onClick}>
          <div>Click me</div>
        </GridItem>
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should override button role when custom role is provided', () => {
      const onClick = jest.fn()
      render(
        <GridItem onClick={onClick} role="link">
          <div>Click me</div>
        </GridItem>
      )

      expect(screen.getByRole('link')).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const { container } = render(<GridItem>{''}</GridItem>)

      const element = container.firstChild as HTMLElement
      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe('')
    })

    it('should render with null children', () => {
      const { container } = render(<GridItem>{null}</GridItem>)

      const element = container.firstChild as HTMLElement
      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe('')
    })

    it('should render with multiple children', () => {
      render(
        <GridItem>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </GridItem>
      )

      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByText('Third')).toBeInTheDocument()
    })

    it('should handle complex nested children', () => {
      render(
        <GridItem>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </GridItem>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('should maintain all props when switching from div to button', () => {
      const { rerender, container } = render(
        <GridItem className="test-class" role="article" aria-label="Test label">
          <div>Content</div>
        </GridItem>
      )

      let element = container.firstChild as HTMLElement
      expect(element.nodeName).toBe('DIV')
      expect(element).toHaveClass('test-class')
      expect(element).toHaveAttribute('role', 'article')
      expect(element).toHaveAttribute('aria-label', 'Test label')

      // Add onClick to switch to button
      const onClick = jest.fn()
      rerender(
        <GridItem
          className="test-class"
          role="article"
          aria-label="Test label"
          onClick={onClick}
        >
          <div>Content</div>
        </GridItem>
      )

      element = container.firstChild as HTMLElement
      expect(element.nodeName).toBe('BUTTON')
      expect(element).toHaveClass('test-class')
      expect(element).toHaveAttribute('role', 'article')
      expect(element).toHaveAttribute('aria-label', 'Test label')
    })
  })

  describe('Component Composition', () => {
    it('should work with other grid components', () => {
      render(
        <div role="grid">
          <GridItem>
            <div>Item 1</div>
          </GridItem>
          <GridItem>
            <div>Item 2</div>
          </GridItem>
        </div>
      )

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('should handle conditional rendering of children', () => {
      const ShowContent = ({ show }: { show: boolean }) => (
        <GridItem>{show ? <div>Visible</div> : null}</GridItem>
      )

      const { rerender } = render(<ShowContent show={true} />)
      expect(screen.getByText('Visible')).toBeInTheDocument()

      rerender(<ShowContent show={false} />)
      expect(screen.queryByText('Visible')).not.toBeInTheDocument()
    })
  })
})
