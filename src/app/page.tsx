/**
 * Home Page Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility as the home page entry point
 * - OCP: Open for extension through composition of sections
 * - DIP: Depends on abstractions (section components)
 *
 * Design Patterns:
 * - Composite Pattern: Composes multiple section components
 * - Template Method: Defines page structure for sections
 * - Server Component Pattern: Fetches data on server
 *
 * Architecture: Server component with data fetching
 */

import { CampaignSection } from '@/components/home/CampaignSection'
import { getCampaignProducts } from '@/services/campaign.service'
import HeroSection from '@/components/sections/home/hero-section'
import FeaturesSection from '@/components/sections/home/features-section'

export default async function Home() {
  // Fetch campaign products on the server
  // Use company ID from environment or default to 'alfe'
  const customerId = process.env['COMPANY_ID'] || 'alfe'

  let campaignProducts: Awaited<ReturnType<typeof getCampaignProducts>> = []
  try {
    campaignProducts = await getCampaignProducts(customerId)
  } catch (error) {
    console.error('Failed to fetch campaign products:', error)
    // Fail silently - just don't show campaigns
  }

  return (
    <div className="flex flex-col">
      {/* Campaign Section - Only renders if products exist */}
      <CampaignSection products={campaignProducts} companyId={customerId} />

      {/* Hero and Features Sections - Always visible */}
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}
