import { getTranslations } from 'next-intl/server'
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/utils'

interface ContactPageProps {
  params: { locale: string }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const waUrl = whatsappUrl('Hello, I would like to get in touch with Classic Maison regarding a property.')

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-gradient" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Let's Talk</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-3">{t('contact.title')}</h1>
          <p className="text-ink-muted text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div>
            <form action="/api/inquiries" method="POST" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-ink-muted mb-2">{t('contact.name')} *</label>
                  <input
                    name="name"
                    required
                    className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink-muted mb-2">{t('contact.email')} *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-ink-muted mb-2">{t('contact.phone')}</label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-ink-muted mb-2">{t('contact.message')} *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-bg font-bold py-4 rounded-xl hover:bg-gold-dark transition-colors"
              >
                {t('contact.send')}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div className="bg-bg-surface border border-border rounded-2xl p-8">
              <h2 className="font-serif text-xl font-bold text-ink mb-6">Contact Details</h2>

              <div className="space-y-5">
                <a
                  href="tel:+254700200658"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">{t('contact.phone_label')}</p>
                    <p className="text-ink font-medium group-hover:text-gold transition-colors">+254 700 200 658</p>
                  </div>
                </a>

                <a
                  href="mailto:info@classicmaison.co.ke"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">{t('contact.email_label')}</p>
                    <p className="text-ink font-medium group-hover:text-gold transition-colors">info@classicmaison.co.ke</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">{t('contact.address_label')}</p>
                    <p className="text-ink font-medium">{t('contact.address')}</p>
                  </div>
                </div>

                <a
                  href="https://instagram.com/classicmaison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Instagram className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-faint mb-0.5">Instagram</p>
                    <p className="text-ink font-medium group-hover:text-gold transition-colors">@classicmaison</p>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-[#075E54]/30 to-[#128C7E]/10 border border-[#25D366]/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                <h3 className="font-semibold text-ink">{t('contact.whatsapp_line')}</h3>
              </div>
              <p className="text-ink-muted text-sm mb-4">
                Get instant responses to your property enquiries. We typically reply within minutes.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
