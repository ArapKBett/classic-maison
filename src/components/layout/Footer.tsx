import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations()
  const base = `/${locale}`

  return (
    <footer className="bg-bg-surface border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-3">
              Classic Maison
            </p>
            <p className="text-ink-muted text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/classicmaison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254700200658"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@classicmaison.co.ke"
                className="text-ink-muted hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-5">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: t('nav.home'), href: base },
                { label: t('nav.listings'), href: `${base}/listings` },
                { label: t('nav.projects'), href: `${base}/projects` },
                { label: t('nav.offers'), href: `${base}/offers` },
                { label: t('nav.about'), href: `${base}/about` },
                { label: t('nav.contact'), href: `${base}/contact` },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-muted hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-5">
              {t('footer.property_types')}
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: t('nav.residential'), href: `${base}/listings/residential` },
                { label: t('nav.commercial'), href: `${base}/listings/commercial` },
                { label: t('nav.land'), href: `${base}/listings/land` },
                { label: t('nav.luxury'), href: `${base}/listings/luxury` },
                { label: t('nav.rentals'), href: `${base}/listings/rentals` },
                { label: t('nav.industrial'), href: `${base}/listings/industrial` },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-muted hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-wider mb-5">
              {t('contact.title')}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-ink-muted">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{t('contact.address')}</span>
              </li>
              <li>
                <a
                  href="tel:+254700200658"
                  className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  +254 700 200 658
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@classicmaison.co.ke"
                  className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  info@classicmaison.co.ke
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/classicmaison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-muted hover:text-gold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-gold flex-shrink-0" />
                  @classicmaison
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
          <p>© {new Date().getFullYear()} Classic Maison. {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <Link href={`${base}/privacy`} className="hover:text-gold transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href={`${base}/terms`} className="hover:text-gold transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
