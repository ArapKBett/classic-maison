import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import {
  BedDouble, Bath, Maximize2, MapPin, ArrowLeft,
  CheckCircle2, Phone, Mail, Star,
} from 'lucide-react'
import {
  formatFullPrice, parseImages, parseFeatures,
  statusColor, propertyTypeLabel, whatsappUrl,
} from '@/lib/utils'
import PropertyCard from '@/components/ui/PropertyCard'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import type { Property } from '@/types'

interface PropertyDetailProps {
  params: { locale: string; slug: string }
}

export default async function PropertyDetailPage({ params }: PropertyDetailProps) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })

  const property = await prisma.property.findUnique({ where: { slug } })
  if (!property) notFound()

  const images = parseImages(property.images)
  const features = parseFeatures(property.features)

  const related = await prisma.property.findMany({
    where: { type: property.type, id: { not: property.id } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  const waMessage = `Hi, I am interested in: ${property.title} (${property.location}). Please send me more details.`

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href={`/${locale}/listings`}
          className="inline-flex items-center gap-2 text-ink-muted hover:text-gold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t('common.back')} to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image gallery */}
            <div className="rounded-2xl overflow-hidden mb-8">
              {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 relative h-72 sm:h-96">
                    <Image src={images[0]} alt={property.title} fill className="object-cover" />
                  </div>
                  {images.slice(1, 3).map((img, i) => (
                    <div key={i} className="relative h-40 sm:h-52">
                      <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-72 bg-bg-elevated flex items-center justify-center text-ink-faint rounded-2xl">
                  No images available
                </div>
              )}
            </div>

            {/* Title & status */}
            <div className="flex flex-wrap items-start gap-3 mb-4">
              <div className="flex-1">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-ink">{property.title}</h1>
                <div className="flex items-center gap-2 mt-2 text-ink-muted text-sm">
                  <MapPin className="w-4 h-4 text-gold" />
                  {property.address}, {property.city}, {property.country}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {property.featured && (
                  <span className="flex items-center gap-1 bg-gold/15 text-gold border border-gold/30 text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Featured
                  </span>
                )}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor(property.status)}`}>
                  {property.status.replace('_', ' ')}
                </span>
                <span className="bg-bg-elevated text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
                  {propertyTypeLabel(property.type)}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="font-serif text-3xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                {formatFullPrice(property.price, property.currency)}
                {property.type === 'RENTAL' && <span className="text-ink-muted text-lg font-normal">/month</span>}
              </p>
            </div>

            {/* Specs bar */}
            <div className="flex flex-wrap gap-6 py-5 px-6 bg-bg-surface border border-border rounded-xl mb-8">
              {property.bedrooms != null && (
                <div className="flex items-center gap-2 text-ink">
                  <BedDouble className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-bold">{property.bedrooms}</p>
                    <p className="text-xs text-ink-muted">Bedrooms</p>
                  </div>
                </div>
              )}
              {property.bathrooms != null && (
                <div className="flex items-center gap-2 text-ink">
                  <Bath className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-bold">{property.bathrooms}</p>
                    <p className="text-xs text-ink-muted">Bathrooms</p>
                  </div>
                </div>
              )}
              {property.area != null && (
                <div className="flex items-center gap-2 text-ink">
                  <Maximize2 className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-bold">{property.area.toLocaleString()} {property.areaUnit}</p>
                    <p className="text-xs text-ink-muted">Area</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">{t('property.overview')}</h2>
              <p className="text-ink-muted leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">{t('property.features')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-ink-muted">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — Inquiry + Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact card */}
              <div className="bg-bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-serif text-xl font-bold text-ink mb-1">{t('property.enquire_title')}</h3>
                <p className="text-ink-muted text-sm mb-5">{t('property.enquire_sub')}</p>

                <WhatsAppButton
                  variant="block"
                  message={waMessage}
                  label="Enquire via WhatsApp"
                />

                <div className="mt-4 space-y-3">
                  <a
                    href="tel:+254700200658"
                    className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    +254 700 200 658
                  </a>
                  <a
                    href="mailto:info@classicmaison.co.ke"
                    className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-gold" />
                    info@classicmaison.co.ke
                  </a>
                </div>
              </div>

              {/* Inquiry Form */}
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-ink mb-8">{t('property.related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p as unknown as Property} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InquiryForm({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-6">
      <h3 className="font-semibold text-ink mb-4">Send Enquiry</h3>
      <form action="/api/inquiries" method="POST" className="space-y-3">
        <input type="hidden" name="propertyId" value={propertyId} />
        <input
          name="name"
          placeholder="Your name"
          required
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors"
        />
        <input
          name="phone"
          placeholder="Phone number"
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors"
        />
        <textarea
          name="message"
          placeholder={`I am interested in: ${propertyTitle}`}
          rows={3}
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors resize-none"
        />
        <button
          type="submit"
          className="w-full bg-gold text-bg font-bold py-3 rounded-lg hover:bg-gold-dark transition-colors text-sm"
        >
          Send Enquiry
        </button>
      </form>
    </div>
  )
}
