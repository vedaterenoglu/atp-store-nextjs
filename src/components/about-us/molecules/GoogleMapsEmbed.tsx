/**
 * GoogleMapsEmbed Molecule - Google Maps embed component
 * SOLID Principles: SRP - Manages map display
 * Design Patterns: Molecule Pattern
 * Dependencies: shadcn Card
 */

'use client'

import { Card } from '@/components/ui/schadcn/card'

export function GoogleMapsEmbed() {
  // Alfe Tissue Paper AB location - Maskinvägen 1, Lund, Sweden
  const mapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.891!2d13.1901!3d55.7170!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMaskinv%C3%A4gen+1%2C+227+30+Lund%2C+Sweden!5e0!3m2!1sen!2sus!4v1234567890'

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ATP Store Location"
          className="absolute inset-0"
        />
      </div>
    </Card>
  )
}
