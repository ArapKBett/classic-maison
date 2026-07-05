'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PropertyCard from '@/components/ui/PropertyCard'
import type { Property } from '@/types'

interface FeaturedListingsProps {
  properties: Property[]
  locale: string
}

export default function FeaturedListings({ properties, locale }: FeaturedListingsProps) {
  const t = useTranslations('featured')

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-px w-8 bg-gold-gradient" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl lg:text-4xl font-bold text-ink"
            >
              {t('title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-ink-muted mt-2"
            >
              {t('subtitle')}
            </motion.p>
          </div>

          <Link
            href={`/${locale}/listings`}
            className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
          >
            {t('view_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <PropertyCard property={property} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
