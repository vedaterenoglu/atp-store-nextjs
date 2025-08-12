/**
 * CampaignSlider - Main carousel slider for campaign products
 * SOLID Principles: SRP - Orchestrates campaign product slider
 * Design Patterns: Organism Component Pattern, Composition
 * Dependencies: React, shadcn/ui Carousel, campaign molecules, i18n
 */

'use client'

import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/schadcn/carousel'
import { SliderSlide, SliderControls } from '../molecules'
import type { CampaignProduct } from '@/types/campaign'
import { toast } from '@/lib/utils/toast'
import { useTranslation } from 'react-i18next'

interface CampaignSliderProps {
  products: CampaignProduct[]
  autoPlay?: boolean
  autoPlayInterval?: number
  onProductClick?: (product: CampaignProduct) => void
  className?: string
}

export function CampaignSlider({
  products,
  autoPlay = true,
  autoPlayInterval = 5000,
  onProductClick,
  className = '',
}: CampaignSliderProps) {
  const { t } = useTranslation('campaign')
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    const updateState = () => {
      setCurrent(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateState()
    api.on('select', updateState)

    return () => {
      api.off('select', updateState)
    }
  }, [api])

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !api) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Loop back to start
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, autoPlay, autoPlayInterval])

  const handleProductClick = (product: CampaignProduct) => {
    if (onProductClick) {
      onProductClick(product)
    } else {
      toast.info(t('messages.viewingDetails', { product: product.stock_name }))
    }
  }

  const handleSelect = (index: number) => {
    api?.scrollTo(index)
  }

  if (!products || products.length === 0) {
    return (
      <div
        className={`w-full aspect-[3/2] flex items-center justify-center bg-muted/10 rounded-lg ${className}`}
      >
        <p className="text-muted-foreground">{t('messages.noCampaigns')}</p>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${className}`}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-4">
          {products.map(product => (
            <CarouselItem
              key={product.stock_id}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                <SliderSlide
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <SliderControls
          total={products.length}
          current={current}
          onPrevious={() => api?.scrollPrev()}
          onNext={() => api?.scrollNext()}
          onSelect={handleSelect}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
      </Carousel>
    </div>
  )
}
