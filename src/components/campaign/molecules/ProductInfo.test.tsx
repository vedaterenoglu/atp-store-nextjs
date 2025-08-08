/**
 * Unit tests for ProductInfo component
 * SOLID Principles: SRP - Single responsibility for product info display testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen } from '@testing-library/react'
import { ProductInfo } from './ProductInfo'

describe('ProductInfo', () => {
  const mockProps = {
    stock_name: 'Test Product Name',
    stock_group: 'Electronics',
    stock_id: 'PROD-123',
    stock_unit: 'pcs',
    className: '',
  }

  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders product name as heading', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Test Product Name')
      expect(heading).toHaveClass('font-semibold', 'line-clamp-2', 'text-base')
    })

    it('renders category information', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      expect(screen.getByText('Category:')).toBeInTheDocument()
      expect(screen.getByText('Electronics')).toBeInTheDocument()
    })

    it('renders ID information', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      expect(screen.getByText('ID:')).toBeInTheDocument()
      expect(screen.getByText('PROD-123')).toBeInTheDocument()
    })

    it('renders unit information', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      expect(screen.getByText('Unit:')).toBeInTheDocument()
      expect(screen.getByText('pcs')).toBeInTheDocument()
    })

    it('applies custom className to container', () => {
      // Arrange
      const customClassName = 'custom-product-info-class'

      // Act
      render(<ProductInfo {...mockProps} className={customClassName} />)

      // Assert
      const container = screen.getByRole('heading', { level: 3 }).parentElement
      expect(container).toHaveClass('space-y-2', customClassName)
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const { className, ...propsWithoutClassName } = mockProps
      void className // Intentionally unused - testing default behavior

      // Act
      render(<ProductInfo {...propsWithoutClassName} />)

      // Assert
      const container = screen.getByRole('heading', { level: 3 }).parentElement
      expect(container).toHaveClass('space-y-2')
    })
  })

  // Test product name variations
  describe('Product name variations', () => {
    it('handles long product names with line clamping', () => {
      // Arrange
      const longName =
        'This is a very long product name that should be clamped to two lines and show ellipsis when it exceeds the available space'

      // Act
      render(<ProductInfo {...mockProps} stock_name={longName} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent(longName)
      expect(heading).toHaveClass('line-clamp-2')
    })

    it('handles short product names', () => {
      // Arrange
      const shortName = 'iPhone'

      // Act
      render(<ProductInfo {...mockProps} stock_name={shortName} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent(shortName)
    })

    it('handles product names with special characters', () => {
      // Arrange
      const specialName = 'Product™ with åäö & <symbols>'

      // Act
      render(<ProductInfo {...mockProps} stock_name={specialName} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent(specialName)
    })

    it('handles empty product name', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} stock_name="" />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('')
    })
  })

  // Test category variations
  describe('Category variations', () => {
    it('handles different category names', () => {
      // Arrange
      const categories = [
        'Electronics',
        'Food & Beverage',
        'Home & Garden',
        'Sports & Outdoor',
        'Books & Media',
      ]

      categories.forEach(category => {
        const { unmount } = render(
          <ProductInfo {...mockProps} stock_group={category} />
        )

        // Assert
        expect(screen.getByText('Category:')).toBeInTheDocument()
        expect(screen.getByText(category)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles empty category', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} stock_group="" />)

      // Assert
      expect(screen.getByText('Category:')).toBeInTheDocument()
      // The empty category value is still in the same paragraph but after the span
      const categoryParagraph = screen.getByText('Category:').parentElement
      expect(categoryParagraph).toHaveTextContent('Category:')
    })

    it('handles category with special characters', () => {
      // Arrange
      const specialCategory = 'Toys & Games (åäö)'

      // Act
      render(<ProductInfo {...mockProps} stock_group={specialCategory} />)

      // Assert
      expect(screen.getByText(specialCategory)).toBeInTheDocument()
    })
  })

  // Test stock ID variations
  describe('Stock ID variations', () => {
    it('handles different ID formats', () => {
      // Arrange
      const stockIds = [
        'PROD-123',
        'SKU123456',
        '2023-001',
        'ABC-DEF-123',
        '123',
      ]

      stockIds.forEach(stockId => {
        const { unmount } = render(
          <ProductInfo {...mockProps} stock_id={stockId} />
        )

        // Assert
        expect(screen.getByText('ID:')).toBeInTheDocument()
        expect(screen.getByText(stockId)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles empty stock ID', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} stock_id="" />)

      // Assert
      expect(screen.getByText('ID:')).toBeInTheDocument()
      const idParagraph = screen.getByText('ID:').parentElement
      expect(idParagraph).toHaveTextContent('ID:')
    })

    it('handles very long stock ID', () => {
      // Arrange
      const longId =
        'VERY-LONG-STOCK-ID-WITH-MANY-SEGMENTS-AND-NUMBERS-123456789'

      // Act
      render(<ProductInfo {...mockProps} stock_id={longId} />)

      // Assert
      expect(screen.getByText(longId)).toBeInTheDocument()
    })
  })

  // Test unit variations
  describe('Unit variations', () => {
    it('handles different unit types', () => {
      // Arrange
      const units = ['pcs', 'kg', 'liters', 'm²', 'boxes', 'pairs', 'sets']

      units.forEach(unit => {
        const { unmount } = render(
          <ProductInfo {...mockProps} stock_unit={unit} />
        )

        // Assert
        expect(screen.getByText('Unit:')).toBeInTheDocument()
        expect(screen.getByText(unit)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles empty unit', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} stock_unit="" />)

      // Assert
      expect(screen.getByText('Unit:')).toBeInTheDocument()
      const unitParagraph = screen.getByText('Unit:').parentElement
      expect(unitParagraph).toHaveTextContent('Unit:')
    })

    it('handles unit with special characters', () => {
      // Arrange
      const specialUnit = 'm³/kg'

      // Act
      render(<ProductInfo {...mockProps} stock_unit={specialUnit} />)

      // Assert
      expect(screen.getByText(specialUnit)).toBeInTheDocument()
    })
  })

  // Test component structure and styling
  describe('Component structure and styling', () => {
    it('has correct container structure', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      const container = screen.getByRole('heading', { level: 3 }).parentElement
      expect(container).toHaveClass('space-y-2')
    })

    it('has correct details container structure', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      const categoryElement = screen.getByText('Category:').parentElement
      const detailsContainer = categoryElement?.parentElement
      expect(detailsContainer).toHaveClass('space-y-1')
    })

    it('applies correct styling to detail labels', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      const categoryParagraph = screen.getByText('Category:').parentElement
      const idParagraph = screen.getByText('ID:').parentElement
      const unitParagraph = screen.getByText('Unit:').parentElement

      expect(categoryParagraph).toHaveClass('text-xs', 'text-muted-foreground')
      expect(idParagraph).toHaveClass('text-xs', 'text-muted-foreground')
      expect(unitParagraph).toHaveClass('text-xs', 'text-muted-foreground')
    })

    it('applies correct styling to label spans', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      const categoryLabel = screen.getByText('Category:')
      const idLabel = screen.getByText('ID:')
      const unitLabel = screen.getByText('Unit:')

      expect(categoryLabel).toHaveClass('font-medium')
      expect(idLabel).toHaveClass('font-medium')
      expect(unitLabel).toHaveClass('font-medium')
    })
  })

  // Test all prop combinations
  describe('Prop combinations', () => {
    it('renders correctly with all props provided', () => {
      // Arrange
      const allProps = {
        stock_name: 'Complete Product Name',
        stock_group: 'Test Category',
        stock_id: 'TEST-123',
        stock_unit: 'items',
        className: 'test-class',
      }

      // Act
      render(<ProductInfo {...allProps} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Complete Product Name'
      )
      expect(screen.getByText('Test Category')).toBeInTheDocument()
      expect(screen.getByText('TEST-123')).toBeInTheDocument()
      expect(screen.getByText('items')).toBeInTheDocument()

      const container = screen.getByRole('heading', { level: 3 }).parentElement
      expect(container).toHaveClass('space-y-2', 'test-class')
    })

    it('renders correctly with minimal required props', () => {
      // Arrange
      const minimalProps = {
        stock_name: 'Min Product',
        stock_group: 'Min Category',
        stock_id: 'MIN-1',
        stock_unit: 'pc',
      }

      // Act
      render(<ProductInfo {...minimalProps} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Min Product'
      )
      expect(screen.getByText('Min Category')).toBeInTheDocument()
      expect(screen.getByText('MIN-1')).toBeInTheDocument()
      expect(screen.getByText('pc')).toBeInTheDocument()
    })
  })

  // Test accessibility
  describe('Accessibility', () => {
    it('uses proper heading hierarchy', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Product Name')
    })

    it('provides semantic structure for product details', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      // All detail items should be in paragraph elements
      const paragraphs = screen.getAllByText(/^(Category|ID|Unit):/)
      expect(paragraphs).toHaveLength(3)

      paragraphs.forEach(p => {
        expect(p.tagName).toBe('SPAN') // Labels are spans within paragraphs
      })
    })

    it('maintains proper text hierarchy', () => {
      // Arrange & Act
      render(<ProductInfo {...mockProps} />)

      // Assert
      // Main heading should be larger than detail text
      const heading = screen.getByRole('heading', { level: 3 })
      const detailParagraph = screen.getByText('Category:').parentElement

      expect(heading).toHaveClass('text-base')
      expect(detailParagraph).toHaveClass('text-xs')
    })
  })

  // Test edge cases and error handling
  describe('Edge cases', () => {
    it('handles undefined values gracefully', () => {
      // Note: TypeScript should prevent this, but testing runtime behavior
      // Arrange & Act
      const { unmount } = render(
        <ProductInfo
          stock_name={undefined as unknown as string}
          stock_group={undefined as unknown as string}
          stock_id={undefined as unknown as string}
          stock_unit={undefined as unknown as string}
        />
      )

      // Assert - Component should not crash
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
      unmount()
    })

    it('handles null values gracefully', () => {
      // Note: TypeScript should prevent this, but testing runtime behavior
      // Arrange & Act
      render(
        <ProductInfo
          stock_name={null as unknown as string}
          stock_group={null as unknown as string}
          stock_id={null as unknown as string}
          stock_unit={null as unknown as string}
        />
      )

      // Assert - Component should not crash
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })

    it('handles whitespace-only values', () => {
      // Arrange & Act
      render(
        <ProductInfo
          stock_name="   "
          stock_group="   "
          stock_id="   "
          stock_unit="   "
        />
      )

      // Assert
      // HTML normalizes whitespace, so three spaces becomes one space in text content
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading.textContent).toContain(' ') // Contains whitespace
      const categoryParagraph = screen.getByText('Category:').parentElement
      expect(categoryParagraph?.textContent).toContain('Category: ') // Contains space after colon
    })
  })
})
