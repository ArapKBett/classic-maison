'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

interface HeroProps {
  locale: string
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero')
  const tNav = useTranslations('nav')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1e1a0f 25%, #1A1A1A 50%, #0f0f0f 75%, #1a1400 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/30" />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-gradient" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Classic Maison
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-ink mb-6 leading-tight"
          >
            {t('tagline').split(' ').slice(0, -2).join(' ')}{' '}
            <span className="bg-gold-gradient bg-clip-text text-transparent">
              {t('tagline').split(' ').slice(-2).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-ink-muted text-lg sm:text-xl mb-10 max-w-xl leading-relaxed"
          >
            {t('sub')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${locale}/listings`}
              className="inline-flex items-center justify-center gap-2 bg-gold text-bg font-bold px-8 py-4 rounded-xl hover:bg-gold-dark transition-colors text-base group"
            >
              {t('cta_listings')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 border border-gold/50 text-gold font-bold px-8 py-4 rounded-xl hover:bg-gold/10 transition-colors text-base"
            >
              {t('cta_contact')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted text-xs"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  )
}
