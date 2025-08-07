/**
 * Placeholder Image API Route
 * SOLID Principles: SRP - Generates placeholder images
 * Design Patterns: API Route Pattern
 * Dependencies: None
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  const { width, height } = params
  const w = parseInt(width) || 800
  const h = parseInt(height) || 600

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#e5e7eb"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="#6b7280" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${w} x ${h}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
