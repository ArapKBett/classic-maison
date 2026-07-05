import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import PropertyCard from '@/components/ui/PropertyCard'
import PropertyFilter from '@/components/listings/PropertyFilter'
import type { Property } from '@/types'

export default async function LandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const properties = await prisma.property.findMany({
    where: { type: 'LAND' },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-gradient" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Listings</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-2">{t('nav.land')}</h1>
          <p className="text-ink-muted">Prime plots and land parcels across Kenya — title deed ready.</p>
        </div>
        <PropertyFilter hideTypeFilter />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => <PropertyCard key={p.id} property={p as unknown as Property} locale={locale} />)}
        </div>
      </div>
    </div>
  )
}
