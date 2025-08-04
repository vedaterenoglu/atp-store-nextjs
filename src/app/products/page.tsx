/**
 * Products Route Page
 * SOLID Principles: Single Responsibility - Route handler for products
 * Design Patterns: Page Pattern - Next.js App Router page
 * Dependencies: ProductsPage template, mock data (temporary)
 */

import { ProductsPage } from '@/components/products'

export const metadata = {
  title: 'Products | ATP Store',
  description: 'Browse our product catalog',
}

// Temporary mock data - will be replaced with GetProductsWithPriceListQuery
const mockProducts = [
  {
    id: '1',
    name: 'Pizza Box Medium',
    imageUrl:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    price: 15.99,
    unit: 'pcs',
  },
  {
    id: '2',
    name: 'Pizza Box Large',
    imageUrl:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    price: 19.99,
    unit: 'pcs',
  },
  {
    id: '3',
    name: 'Takeaway Container Small',
    imageUrl:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    price: 8.99,
    unit: 'pcs',
  },
  {
    id: '4',
    name: 'Takeaway Container Medium',
    imageUrl:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    price: 10.99,
    unit: 'pcs',
  },
]

export default function Page() {
  // TODO: Fetch products with GetProductsWithPriceListQuery
  // TODO: Get initial search from Zustand store

  return <ProductsPage products={mockProducts} />
}
