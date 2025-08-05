/**
 * Products Route Page
 * SOLID Principles: Single Responsibility - Route handler for products
 * Design Patterns: Page Pattern - Next.js App Router page
 * Dependencies: ProductsPage template, products service
 */

import { ProductsPage } from '@/components/products'
import { getProducts } from '@/services'

export const metadata = {
  title: 'Products | ATP Store',
  description: 'Browse our product catalog',
}

export default async function Page() {
  try {
    // Fetch products from GraphQL API
    const products = await getProducts()

    // Transform products to include imageUrl with fallback
    const productsWithImages = products.map(product => ({
      ...product,
      imageUrl:
        product.imageUrl ||
        'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    }))

    return <ProductsPage products={productsWithImages} />
  } catch (error) {
    // TODO: Implement proper error handling
    console.error('Failed to fetch products:', error)

    // Return empty products list for now
    return <ProductsPage products={[]} />
  }
}
