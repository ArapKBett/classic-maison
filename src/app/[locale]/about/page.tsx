import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PropertyImage from '@/components/ui/PropertyImage'
import { Instagram, Award, Target, Eye, Users } from 'lucide-react'

interface AboutPageProps {
  params: { locale: string }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const values = t.raw('about.values') as string[]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-gradient" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">Our Story</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-6">
              {t('about.title')}
            </h1>
            <p className="text-ink-muted text-lg leading-relaxed mb-8">
              {t('about.story')}
            </p>
            <div className="flex gap-4">
              <Link
                href={`/${locale}/listings`}
                className="inline-flex items-center px-6 py-3 bg-gold text-bg font-bold rounded-xl hover:bg-gold-dark transition-colors text-sm"
              >
                Browse Properties
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 border border-gold/40 text-gold font-bold rounded-xl hover:bg-gold/10 transition-colors text-sm"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <PropertyImage
                src={undefined}
                alt="Classic Maison luxury property"
                gradientIndex={3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
            </div>
            {/* Gold border accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 rounded-2xl -z-10" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-bg-surface border border-border rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-ink mb-4">{t('about.mission_title')}</h2>
            <p className="text-ink-muted leading-relaxed">{t('about.mission')}</p>
          </div>

          <div className="bg-bg-surface border border-border rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-ink mb-4">{t('about.values_title')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-ink-muted text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Award, value: '12+', label: 'Years of Excellence' },
            { icon: Users, value: '2,400+', label: 'Happy Clients' },
            { icon: Target, value: '850+', label: 'Properties Sold' },
            { icon: Eye, value: '45', label: 'Projects Delivered' },
          ].map((stat, i) => (
            <div key={i} className="bg-bg-surface border border-border rounded-2xl p-6 text-center">
              <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="font-serif text-3xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-ink-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Instagram section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-bg-surface border border-border rounded-2xl px-8 py-6">
            <Instagram className="w-8 h-8 text-gold" />
            <div className="text-left">
              <p className="font-bold text-ink">Follow us on Instagram</p>
              <a
                href="https://instagram.com/classicmaison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-sm hover:underline"
              >
                @classicmaison
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
