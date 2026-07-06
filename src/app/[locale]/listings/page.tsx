import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import PropertyCard from '@/components/ui/PropertyCard'
import PropertyFilter from '@/components/listings/PropertyFilter'
import type { Property } from '@/types'
import Link from 'next/link'

interface ListingsPageProps {
  params: { locale: string }
  searchParams: {
    q?: string
    status?: string
    price?: string
    sort?: string
    page?: string
  }
}

const TYPE_LINKS = [
  { label: 'All', href: '' },
  { label: 'Residential', href: 'residential' },
  { label: 'Commercial', href: 'commercial' },
  { label: 'Land', href: 'land' },
  { label: 'Luxury', href: 'luxury' },
  { label: 'Rentals', href: 'rentals' },
  { label: 'Industrial', href: 'industrial' },
]

const PAGE_SIZE = 12

export default async function ListingsPage({ params, searchParams }: ListingsPageProps) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale })

  const page = Math.max(1, Number(sp.page ?? 1))
  const q = sp.q ?? ''
  const status = sp.status ?? ''
  const price = sp.price ?? ''
  const sort = sp.sort ?? ''

  let priceMin: number | undefined
  let priceMax: number | undefined
  if (price) {
    const [min, max] = price.split('-').map(Number)
    priceMin = min
    priceMax = max
  }

  const where = {
    ...(q ? { OR: [{ title: { contains: q } }, { location: { contains: q } }, { city: { contains: q } }] } : {}),
    ...(status ? { status: status as never } : {}),
    ...(priceMin !== undefined ? { price: { gte: priceMin } } : {}),
    ...(priceMax !== undefined ? { price: { lte: priceMax } } : {}),
  }

  const orderBy =
    sort === 'price_asc' ? { price: 'asc' as const }
    : sort === 'price_desc' ? { price: 'desc' as const }
    : { createdAt: 'desc' as const }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({ where, orderBy, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    prisma.property.count({ where }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-gradient" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Properties</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-2">
            {t('listings.title')}
          </h1>
          <p className="text-ink-muted">{total} properties found</p>
        </div>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPE_LINKS.map((type) => (
            <Link
              key={type.label}
              href={type.href ? `/${locale}/listings/${type.href}` : `/${locale}/listings`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                !type.href
                  ? 'bg-gold text-bg border-gold'
                  : 'border-border text-ink-muted hover:border-gold/50 hover:text-gold'
              }`}
            >
              {type.label}
            </Link>
          ))}
        </div>

        <Suspense fallback={<div className="h-20 bg-bg-surface rounded-2xl animate-pulse mb-8" />}>
          <PropertyFilter />
        </Suspense>

        {/* Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">
            <p className="text-lg">{t('listings.no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property as unknown as Property} locale={locale} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/${locale}/listings?page=${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-gold text-bg'
                    : 'bg-bg-elevated border border-border text-ink-muted hover:border-gold/50 hover:text-gold'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
