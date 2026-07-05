import { prisma } from '@/lib/prisma'
import Hero from '@/components/home/Hero'
import StatsBanner from '@/components/home/StatsBanner'
import FeaturedListings from '@/components/home/FeaturedListings'
import InstagramFeed from '@/components/home/InstagramFeed'
import CtaBanner from '@/components/home/CtaBanner'
import ProjectCard from '@/components/ui/ProjectCard'
import OfferCard from '@/components/ui/OfferCard'
import type { Property, Project, Offer } from '@/types'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HomePageProps {
  params: { locale: string }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const [featuredProperties, projects, offers] = await Promise.all([
    prisma.property.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.offer.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ])

  return (
    <>
      <Hero locale={locale} />
      <StatsBanner />
      <FeaturedListings
        properties={featuredProperties as unknown as Property[]}
        locale={locale}
      />

      {/* Upcoming Projects */}
      {projects.length > 0 && (
        <section className="py-20 bg-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-gold-gradient" />
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase">Development</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-ink">
                  {t('projects_home.title')}
                </h2>
                <p className="text-ink-muted mt-2">{t('projects_home.subtitle')}</p>
              </div>
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
              >
                {t('projects_home.view_all')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project as unknown as Project}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Active Offers */}
      {offers.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-gold-gradient" />
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase">Exclusive</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-ink">
                  {t('offers_home.title')}
                </h2>
                <p className="text-ink-muted mt-2">{t('offers_home.subtitle')}</p>
              </div>
              <Link
                href={`/${locale}/offers`}
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
              >
                {t('offers_home.view_all')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer as unknown as Offer} />
              ))}
            </div>
          </div>
        </section>
      )}

      <InstagramFeed />
      <CtaBanner locale={locale} />
    </>
  )
}
