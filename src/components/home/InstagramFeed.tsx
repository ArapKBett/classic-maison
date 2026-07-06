'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Instagram, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const PLACEHOLDER_POSTS = [
  {
    id: '1',
    gradient: 'linear-gradient(135deg, #1e1a0f 0%, #2d2516 60%, #1a1a1a 100%)',
    caption: 'Luxury living redefined. This stunning Karen villa is now on the market. DM for details. #ClassicMaison #LuxuryRealEstate #Nairobi',
    likes: 342,
    comments: 28,
  },
  {
    id: '2',
    gradient: 'linear-gradient(135deg, #0f1e1a 0%, #0e2820 60%, #1a1a1a 100%)',
    caption: 'Your dream home awaits in Westlands. 3-bed apartment with panoramic city views. #NairobiRealEstate #Westlands',
    likes: 218,
    comments: 15,
  },
  {
    id: '3',
    gradient: 'linear-gradient(135deg, #1a1a10 0%, #28260e 60%, #1a1a1a 100%)',
    caption: 'Premium office space in Upper Hill. For the business that demands excellence. #CommercialProperty #UpperHill',
    likes: 189,
    comments: 11,
  },
  {
    id: '4',
    gradient: 'linear-gradient(135deg, #0f1a0f 0%, #0e2812 60%, #1a1a1a 100%)',
    caption: 'Prime plots in Ruiru — invest in the future. Title deed ready. 📞 +254 700 200 658',
    likes: 275,
    comments: 33,
  },
  {
    id: '5',
    gradient: 'linear-gradient(135deg, #1a0f1e 0%, #241026 60%, #1a1a1a 100%)',
    caption: 'Maison Royale Runda — 24 ultra-luxury villas now launching. Early bird pricing available. #NewDevelopment',
    likes: 512,
    comments: 47,
  },
  {
    id: '6',
    gradient: 'linear-gradient(135deg, #1e0f0f 0%, #2a1010 60%, #1a1a1a 100%)',
    caption: 'Penthouse living in the heart of Nairobi. Breathtaking 360° views. One-of-a-kind. #Penthouse #ClassicMaison',
    likes: 631,
    comments: 54,
  },
  {
    id: '7',
    gradient: 'linear-gradient(135deg, #0f1a1e 0%, #10242a 60%, #1a1a1a 100%)',
    caption: 'Fully furnished 2-bedroom in Kilimani — available immediately. Contact us today! #Kilimani #Rental',
    likes: 156,
    comments: 9,
  },
  {
    id: '8',
    gradient: 'linear-gradient(135deg, #1e1a0a 0%, #2a2410 60%, #1a1a1a 100%)',
    caption: 'The Classic Towers — redefining the Nairobi skyline. Registrations open now. #ClassicTowers',
    likes: 408,
    comments: 62,
  },
  {
    id: '9',
    gradient: 'linear-gradient(135deg, #1a0a1e 0%, #24102a 60%, #1a1a1a 100%)',
    caption: 'Lavington townhouse — 4 beds, rooftop terrace, private garden. Elegance at every corner. #Lavington',
    likes: 293,
    comments: 21,
  },
]

export default function InstagramFeed() {
  const t = useTranslations('instagram')
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="py-20 bg-bg-surface border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3"
            >
              <Instagram className="w-5 h-5 text-gold" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">Instagram</span>
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

          <div className="flex items-center gap-3">
            <button ref={prevRef} className="instagram-prev w-10 h-10 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-bg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button ref={nextRef} className="instagram-next w-10 h-10 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-bg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
          loop
          className="!overflow-visible"
        >
          {PLACEHOLDER_POSTS.map((post) => (
            <SwiperSlide key={post.id}>
              <a
                href="https://instagram.com/classicmaison"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-bg-elevated border border-border rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <div
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    style={{ background: post.gradient }}
                  >
                    <svg className="absolute inset-0 m-auto w-10 h-10 opacity-20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                    <span className="flex items-center gap-1.5 text-white font-semibold text-sm">
                      <Heart className="w-5 h-5 fill-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5 text-white font-semibold text-sm">
                      <MessageCircle className="w-5 h-5 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-ink-muted text-xs line-clamp-2 leading-relaxed">{post.caption}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <a
          href="https://instagram.com/classicmaison"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-gold/40 text-gold px-6 py-2.5 rounded-lg hover:bg-gold/10 transition-colors text-sm font-semibold"
        >
          <Instagram className="w-4 h-4" />
          {t('follow')}
        </a>
      </div>
    </section>
  )
}
