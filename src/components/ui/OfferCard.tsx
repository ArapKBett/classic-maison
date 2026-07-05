'use client'

import { Tag, Clock, AlertCircle } from 'lucide-react'
import { daysUntil, whatsappUrl } from '@/lib/utils'
import type { Offer } from '@/types'

interface OfferCardProps {
  offer: Offer
}

export default function OfferCard({ offer }: OfferCardProps) {
  const days = daysUntil(offer.expiresAt ? new Date(offer.expiresAt) : null)
  const isExpired = days !== null && days <= 0
  const isUrgent = days !== null && days <= 7 && days > 0

  const waMessage = `Hi, I'd like to claim the offer: "${offer.title}"`

  return (
    <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 group">
      {/* Header gradient */}
      <div className="h-1.5 bg-gold-gradient" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gold flex-shrink-0" />
            {offer.discount && (
              <span className="bg-gold/15 text-gold border border-gold/30 text-sm font-bold px-2.5 py-1 rounded-full">
                {offer.discount}% OFF
              </span>
            )}
          </div>
          {days !== null && (
            <div className={`flex items-center gap-1 text-xs font-medium ${isExpired ? 'text-red-400' : isUrgent ? 'text-amber-400' : 'text-ink-muted'}`}>
              <Clock className="w-3.5 h-3.5" />
              {isExpired ? 'Expired' : `${days} days left`}
            </div>
          )}
        </div>

        <h3 className="text-ink font-bold text-lg mb-2 group-hover:text-gold transition-colors">
          {offer.title}
        </h3>
        <p className="text-ink-muted text-sm mb-4 leading-relaxed">{offer.description}</p>

        {offer.terms && (
          <div className="flex items-start gap-2 text-xs text-ink-faint bg-bg-elevated rounded-lg p-3 mb-4">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <p>{offer.terms}</p>
          </div>
        )}

        {!isExpired && (
          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gold text-bg font-semibold px-4 py-2.5 rounded-lg hover:bg-gold-dark transition-colors text-sm"
          >
            Claim This Offer
          </a>
        )}
        {isExpired && (
          <div className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-zinc-800 text-ink-faint text-sm font-medium">
            Offer Expired
          </div>
        )}
      </div>
    </div>
  )
}
