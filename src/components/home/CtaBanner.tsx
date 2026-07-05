'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'
import { whatsappUrl } from '@/lib/utils'

interface CtaBannerProps {
  locale: string
}

export default function CtaBanner({ locale }: CtaBannerProps) {
  const t = useTranslations('cta')
  const waUrl = whatsappUrl('Hello, I found your website and I am interested in your properties.')

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-elevated" />
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient opacity-30" />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-gold/10" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-gold/5" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Available Now</span>
          </div>

          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-4">
            {t('title')}
          </h2>
          <p className="text-ink-muted text-lg mb-10 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1da851] transition-colors text-base"
            >
              <MessageCircle className="w-5 h-5" />
              {t('whatsapp')}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 bg-gold text-bg font-bold px-8 py-4 rounded-xl hover:bg-gold-dark transition-colors text-base"
            >
              <Send className="w-5 h-5" />
              {t('contact')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
