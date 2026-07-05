import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import '@/app/[locale]/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Classic Maison | Premium Real Estate in Kenya',
    template: '%s | Classic Maison',
  },
  description:
    'Classic Maison — Nairobi\'s premier real estate company. Luxury homes, commercial spaces, land, rentals, and more. Serving discerning clients across Kenya.',
  keywords: ['real estate', 'nairobi', 'kenya', 'luxury homes', 'property', 'classic maison'],
  openGraph: {
    type: 'website',
    siteName: 'Classic Maison',
    locale: 'en_KE',
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ink antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton variant="floating" />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
