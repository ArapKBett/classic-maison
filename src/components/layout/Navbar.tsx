'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'

const PROPERTY_TYPES = [
  { key: 'residential', href: 'residential' },
  { key: 'commercial', href: 'commercial' },
  { key: 'land', href: 'land' },
  { key: 'luxury', href: 'luxury' },
  { key: 'rentals', href: 'rentals' },
  { key: 'industrial', href: 'industrial' },
]

interface NavbarProps {
  locale: string
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [listingsOpen, setListingsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const base = `/${locale}`

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-border shadow-xl'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={base} className="flex items-center gap-2 group">
            <span className="font-serif text-xl lg:text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent">
              Classic Maison
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href={base} className="text-ink-muted hover:text-gold transition-colors">
              {t('home')}
            </Link>

            {/* Listings dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setListingsOpen(true)}
              onMouseLeave={() => setListingsOpen(false)}
            >
              <button className="flex items-center gap-1 text-ink-muted hover:text-gold transition-colors">
                {t('listings')}
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', listingsOpen && 'rotate-180')} />
              </button>

              {listingsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-bg-elevated border border-border rounded-xl shadow-2xl py-2 z-50">
                  <Link
                    href={`${base}/listings`}
                    className="block px-4 py-2.5 text-sm text-gold font-semibold hover:bg-gold/10 transition-colors"
                  >
                    {t('listings')} (All)
                  </Link>
                  <div className="border-t border-border my-1" />
                  {PROPERTY_TYPES.map((type) => (
                    <Link
                      key={type.key}
                      href={`${base}/listings/${type.href}`}
                      className="block px-4 py-2.5 text-sm text-ink hover:text-gold hover:bg-gold/5 transition-colors"
                    >
                      {t(type.key as keyof typeof t)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={`${base}/projects`} className="text-ink-muted hover:text-gold transition-colors">
              {t('projects')}
            </Link>
            <Link href={`${base}/offers`} className="text-ink-muted hover:text-gold transition-colors">
              {t('offers')}
            </Link>
            <Link href={`${base}/about`} className="text-ink-muted hover:text-gold transition-colors">
              {t('about')}
            </Link>
            <Link href={`${base}/contact`} className="text-ink-muted hover:text-gold transition-colors">
              {t('contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />

            <Link
              href={`${base}/contact`}
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg bg-gold text-bg font-semibold text-sm hover:bg-gold-dark transition-colors"
            >
              {t('contact')}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-ink p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-elevated border-b border-border px-4 pb-6 pt-2 space-y-1">
          <Link href={base} onClick={() => setMobileOpen(false)} className="block py-2.5 text-ink hover:text-gold transition-colors">
            {t('home')}
          </Link>
          <div className="py-2">
            <p className="text-xs text-ink-faint uppercase tracking-widest mb-2">{t('listings')}</p>
            <Link href={`${base}/listings`} onClick={() => setMobileOpen(false)} className="block py-2 text-gold font-medium pl-2">
              All Listings
            </Link>
            {PROPERTY_TYPES.map((type) => (
              <Link
                key={type.key}
                href={`${base}/listings/${type.href}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-ink hover:text-gold transition-colors pl-2"
              >
                {t(type.key as keyof typeof t)}
              </Link>
            ))}
          </div>
          <Link href={`${base}/projects`} onClick={() => setMobileOpen(false)} className="block py-2.5 text-ink hover:text-gold transition-colors">
            {t('projects')}
          </Link>
          <Link href={`${base}/offers`} onClick={() => setMobileOpen(false)} className="block py-2.5 text-ink hover:text-gold transition-colors">
            {t('offers')}
          </Link>
          <Link href={`${base}/about`} onClick={() => setMobileOpen(false)} className="block py-2.5 text-ink hover:text-gold transition-colors">
            {t('about')}
          </Link>
          <Link href={`${base}/contact`} onClick={() => setMobileOpen(false)} className="block py-2.5 text-ink hover:text-gold transition-colors">
            {t('contact')}
          </Link>
        </div>
      )}
    </header>
  )
}
