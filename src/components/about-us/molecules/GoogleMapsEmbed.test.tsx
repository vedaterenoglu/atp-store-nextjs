/**
 * Unit tests for GoogleMapsEmbed Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { GoogleMapsEmbed } from './GoogleMapsEmbed'

describe('GoogleMapsEmbed', () => {
  describe('Component Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<GoogleMapsEmbed />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render iframe element', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toBeInTheDocument()
      expect(iframe.tagName).toBe('IFRAME')
    })
  })

  describe('Iframe Attributes', () => {
    it('should have correct src URL', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      const expectedUrl =
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.891!2d13.1901!3d55.7170!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMaskinv%C3%A4gen+1%2C+227+30+Lund%2C+Sweden!5e0!3m2!1sen!2sus!4v1234567890'

      expect(iframe).toHaveAttribute('src', expectedUrl)
    })

    it('should have width and height set to 100%', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveAttribute('width', '100%')
      expect(iframe).toHaveAttribute('height', '100%')
    })

    it('should have allowFullScreen attribute', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveAttribute('allowFullScreen')
    })

    it('should have lazy loading enabled', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveAttribute('loading', 'lazy')
    })

    it('should have correct referrer policy', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveAttribute(
        'referrerPolicy',
        'no-referrer-when-downgrade'
      )
    })

    it('should have accessible title', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveAttribute('title', 'ATP Store Location')
    })

    it('should have border style set to 0', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveStyle({ border: 0 })
    })
  })

  describe('Styling and Layout', () => {
    it('should render Card wrapper with overflow-hidden class', () => {
      const { container } = render(<GoogleMapsEmbed />)

      const card = container.firstChild
      expect(card).toHaveClass('overflow-hidden')
    })

    it('should have container with correct height classes', () => {
      const { container } = render(<GoogleMapsEmbed />)

      const mapContainer = container.querySelector(
        '.h-\\[400px\\].md\\:h-\\[500px\\]'
      )
      expect(mapContainer).toBeInTheDocument()
    })

    it('should have container with relative positioning', () => {
      const { container } = render(<GoogleMapsEmbed />)

      const mapContainer = container.querySelector('.relative')
      expect(mapContainer).toBeInTheDocument()
    })

    it('should have container with full width', () => {
      const { container } = render(<GoogleMapsEmbed />)

      const mapContainer = container.querySelector('.w-full')
      expect(mapContainer).toBeInTheDocument()
    })

    it('should apply absolute positioning to iframe', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toHaveClass('absolute', 'inset-0')
    })

    it('should have responsive height classes', () => {
      const { container } = render(<GoogleMapsEmbed />)

      const mapContainer = container.querySelector('div.relative')
      expect(mapContainer).toHaveClass('h-[400px]', 'md:h-[500px]')
    })
  })

  describe('Map URL Configuration', () => {
    it('should contain location coordinates for Lund, Sweden', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      const src = iframe.getAttribute('src')

      // Check for Lund coordinates
      expect(src).toContain('55.7170') // Latitude
      expect(src).toContain('13.1901') // Longitude
    })

    it('should contain address information in URL', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      const src = iframe.getAttribute('src')

      expect(src).toContain('Maskinv%C3%A4gen+1')
      expect(src).toContain('Lund')
      expect(src).toContain('Sweden')
    })

    it('should have Google Maps embed base URL', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      const src = iframe.getAttribute('src')

      expect(src).toContain('https://www.google.com/maps/embed')
    })

    it('should have zoom and display parameters', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      const src = iframe.getAttribute('src')

      // Check for map parameters
      expect(src).toContain('1i1024') // Width parameter
      expect(src).toContain('2i768') // Height parameter
      expect(src).toContain('4f13.1') // Map type
    })
  })

  describe('Component Structure', () => {
    it('should have correct DOM hierarchy', () => {
      const { container } = render(<GoogleMapsEmbed />)

      // Card > div.relative > iframe
      const card = container.firstChild
      expect(card).toBeInTheDocument()

      const divWrapper = card?.firstChild
      expect(divWrapper).toHaveClass('relative', 'w-full')

      const iframe = divWrapper?.firstChild as HTMLElement | null
      expect(iframe?.tagName).toBe('IFRAME')
    })

    it('should only render one iframe', () => {
      const { container } = render(<GoogleMapsEmbed />)

      const iframes = container.querySelectorAll('iframe')
      expect(iframes).toHaveLength(1)
    })

    it('should not have any loading text or placeholder', () => {
      const { container } = render(<GoogleMapsEmbed />)

      // Should only contain the iframe, no loading states
      const textContent = container.textContent
      expect(textContent).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('should have descriptive title for screen readers', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe.getAttribute('title')).toBe('ATP Store Location')
    })

    it('should be findable by title', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe).toBeInTheDocument()
    })
  })

  describe('Performance Optimizations', () => {
    it('should use lazy loading', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe.getAttribute('loading')).toBe('lazy')
    })

    it('should have referrer policy for privacy', () => {
      render(<GoogleMapsEmbed />)

      const iframe = screen.getByTitle('ATP Store Location')
      expect(iframe.getAttribute('referrerPolicy')).toBe(
        'no-referrer-when-downgrade'
      )
    })
  })
})
