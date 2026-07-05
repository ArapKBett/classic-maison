'use client'

import { useRef } from 'react'
import Image from 'next/image'
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
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
    caption: 'Luxury living redefined. This stunning Karen villa is now on the market. DM for details. #ClassicMaison #LuxuryRealEstate #Nairobi',
    likes: 342,
    comments: 28,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    caption: 'Your dream home awaits in Westlands. 3-bed apartment with panoramic city views. #NairobiRealEstate #Westlands',
    likes: 218,
    comments: 15,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    caption: 'Premium office space in Upper Hill. For the business that demands excellence. #CommercialProperty #UpperHill',
    likes: 189,
    comments: 11,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    caption: 'Prime plots in Ruiru — invest in the future. Title deed ready. 📞 +254 700 200 658',
    likes: 275,
    comments: 33,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    caption: 'Maison Royale Runda — 24 ultra-luxury villas now launching. Early bird pricing available. #NewDevelopment',
    likes: 512,
    comments: 47,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    caption: 'Penthouse living in the heart of Nairobi. Breathtaking 360° views. One-of-a-kind. #Penthouse #ClassicMaison',
    likes: 631,
    comments: 54,
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
    caption: 'Fully furnished 2-bedroom in Kilimani — available immediately. Contact us today! #Kilimani #Rental',
    likes: 156,
    comments: 9,
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    caption: 'The Classic Towers — redefining the Nairobi skyline. Registrations open now. #ClassicTowers',
    likes: 408,
    comments: 62,
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
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
                  <Image
                    src={post.image}
                    alt={post.caption.slice(0, 60)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="280px"
                  />
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
