import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import PropertyCard from '@/components/ui/PropertyCard'
import PropertyFilter from '@/components/listings/PropertyFilter'
import type { Property } from '@/types'

export default async function ResidentialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const properties = await prisma.property.findMany({
    where: { type: 'RESIDENTIAL' },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <TypeListingsPage
      locale={locale}
      title={t('nav.residential')}
      properties={properties as unknown as Property[]}
      description="Discover our curated selection of residential properties — from elegant apartments to family homes."
    />
  )
}

function TypeListingsPage({ locale, title, description, properties }: { locale: string; title: string; description: string; properties: Property[] }) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-gradient" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Listings</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-2">{title}</h1>
          <p className="text-ink-muted">{description}</p>
        </div>
        <Suspense fallback={<div className="h-20 bg-bg-surface rounded-2xl animate-pulse mb-8" />}>
          <PropertyFilter hideTypeFilter />
        </Suspense>
        {properties.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <p className="text-lg">No properties in this category yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => <PropertyCard key={p.id} property={p} locale={locale} />)}
          </div>
        )}
      </div>
    </div>
  )
}
