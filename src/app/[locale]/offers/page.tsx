import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import OfferCard from '@/components/ui/OfferCard'
import type { Offer } from '@/types'

interface OffersPageProps {
  params: { locale: string }
}

export default async function OffersPage({ params }: OffersPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const offers = await prisma.offer.findMany({
    orderBy: [{ active: 'desc' }, { createdAt: 'desc' }],
  })

  const active = offers.filter((o) => o.active)
  const inactive = offers.filter((o) => !o.active)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-gradient" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Exclusive</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-3">
            {t('offers.title')}
          </h1>
          <p className="text-ink-muted text-lg">{t('offers.subtitle')}</p>
        </div>

        {active.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-bg-surface border border-border flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏷️</span>
            </div>
            <p className="text-ink-muted">{t('offers.no_offers')}</p>
          </div>
        )}

        {active.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {active.map((offer) => (
              <OfferCard key={offer.id} offer={offer as unknown as Offer} />
            ))}
          </div>
        )}

        {inactive.length > 0 && (
          <div>
            <h2 className="font-serif text-xl font-bold text-ink-muted mb-6">Past Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
              {inactive.map((offer) => (
                <OfferCard key={offer.id} offer={offer as unknown as Offer} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
