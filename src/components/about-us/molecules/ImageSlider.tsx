/**
 * ImageSlider Molecule - Image carousel for hero section
 * SOLID Principles: SRP - Manages image carousel display
 * Design Patterns: Molecule Pattern
 * Dependencies: shadcn Carousel, embla-carousel-autoplay, i18next
 */

'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { useTranslation } from 'react-i18next'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/schadcn/carousel'

// Company images from Cloudinary
const slideImages = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-2-trust_uhgmpj.png',
    alt: 'Trust and Reliability',
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-3-order_iiiou5.png',
    alt: 'Order Management',
  },
  {
    id: 3,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-4-office_uwqia2.png',
    alt: 'Modern Office Solutions',
  },
  {
    id: 4,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1693161838/stockhouse_fdlllz.png',
    alt: 'Warehouse Facilities',
  },
  {
    id: 5,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-6-filo_ouagv3.png',
    alt: 'Fleet Management',
  },
  {
    id: 6,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-7-loading_rki8pi.png',
    alt: 'Loading Operations',
  },
  {
    id: 7,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386632/alfe-customer/slide-8-dispatch_r35qyr.png',
    alt: 'Dispatch Center',
  },
  {
    id: 8,
    image:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386632/alfe-customer/slide-9-dispatch-2_rlwcfw.png',
    alt: 'Dispatch Operations',
  },
]

export function ImageSlider() {
  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true })
  const { t, ready } = useTranslation('aboutUs')

  // Get slide translations
  const slidesRaw = t('slider.slides', { returnObjects: true })
  const slideTranslations = Array.isArray(slidesRaw) ? slidesRaw : []

  // Combine images with translations
  const slides = slideImages.map((img, index) => ({
    ...img,
    title: slideTranslations[index]?.title || '',
    subtitle: slideTranslations[index]?.subtitle || '',
  }))

  if (!ready) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full pb-[33.33%]">
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Container with 3:1 aspect ratio */}
      <div className="relative w-full pb-[33.33%]">
        {' '}
        {/* 33.33% = 1/3 for 3:1 ratio */}
        <div className="absolute inset-0">
          <Carousel
            className="w-full h-full"
            plugins={[plugin]}
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              dragFree: false,
            }}
          >
            <CarouselContent className="h-full">
              {slides.map(slide => (
                <CarouselItem key={slide.id} className="basis-full">
                  <div className="relative w-full h-full aspect-[3/1]">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      width={900}
                      height={300}
                      className="w-full h-full object-contain bg-gray-100"
                      priority={slide.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
                      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">
                        {slide.title}
                      </h1>
                      <p className="text-xs md:text-sm lg:text-base opacity-90 max-w-2xl">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:h-10 md:w-10 bg-white/80 hover:bg-white" />
            <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:h-10 md:w-10 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
