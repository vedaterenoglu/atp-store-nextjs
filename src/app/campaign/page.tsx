/**
 * Campaign Page - Display promotional campaigns and special offers
 * SOLID Principles: SRP - Single responsibility for campaign display
 * Design Patterns: Page Component Pattern, Server Component Pattern
 * Dependencies: React, Next.js, Campaign components
 */

import { redirect } from 'next/navigation'
import { getCampaignProducts } from '@/services/campaign.service'
import { CampaignPageContent } from '@/components/campaign/templates/CampaignPageContent'

export default async function CampaignPage() {
  // Fetch campaign products on the server
  // Use company ID from environment or default to 'alfe'
  const customerId = process.env['COMPANY_ID'] || 'alfe'

  let campaignProducts: Awaited<ReturnType<typeof getCampaignProducts>> = []
  try {
    campaignProducts = await getCampaignProducts(customerId)
  } catch (error) {
    console.error('Failed to fetch campaign products:', error)
  }

  // If no campaign products, redirect to home page
  if (campaignProducts.length === 0) {
    redirect('/')
  }

  return <CampaignPageContent products={campaignProducts} />
}
