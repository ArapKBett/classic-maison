import Link from 'next/link'
import Image from 'next/image'
import { BedDouble, Bath, Maximize2, MapPin, Star } from 'lucide-react'
import { formatPrice, parseImages, statusColor, propertyTypeLabel } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  locale: string
}

export default function PropertyCard({ property, locale }: PropertyCardProps) {
  const images = parseImages(property.images)
  const img = images[0] || '/placeholder-property.jpg'
  const isRental = property.type === 'RENTAL'

  return (
    <Link
      href={`/${locale}/listings/${property.slug}`}
      className="group block bg-bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={img}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-dark-gradient" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <span className="flex items-center gap-1 bg-gold text-bg text-xs font-bold px-2 py-1 rounded-full">
              <Star className="w-3 h-3" /> Featured
            </span>
          )}
          <span
            className={cn(
              'text-xs font-semibold px-2.5 py-1 rounded-full border',
              statusColor(property.status)
            )}
          >
            {property.status.replace('_', ' ')}
          </span>
        </div>

        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-bg/80 backdrop-blur-sm text-gold text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/30">
            {propertyTypeLabel(property.type)}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-lg leading-tight">
            {formatPrice(property.price, property.currency)}
            {isRental && <span className="text-sm font-normal text-white/70">/mo</span>}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-ink text-base mb-1 group-hover:text-gold transition-colors line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-ink-muted text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span className="truncate">{property.location}, {property.city}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-ink-muted border-t border-border/60 pt-3">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-gold" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gold" />
              {property.bathrooms}
            </span>
          )}
          {property.area != null && (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-gold" />
              {property.area.toLocaleString()} {property.areaUnit}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
