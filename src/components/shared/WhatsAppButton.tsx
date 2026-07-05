'use client'

import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/utils'

interface WhatsAppButtonProps {
  message?: string
  variant?: 'floating' | 'inline' | 'block'
  label?: string
}

export default function WhatsAppButton({
  message = 'Hello, I am interested in a property at Classic Maison.',
  variant = 'floating',
  label = 'WhatsApp',
}: WhatsAppButtonProps) {
  const url = whatsappUrl(message)

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-2xl px-4 py-3 font-semibold text-sm hover:bg-[#1da851] transition-all duration-200 hover:scale-105 group"
      >
        <MessageCircle className="w-5 h-5 flex-shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </a>
    )
  }

  if (variant === 'block') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#1da851] transition-colors duration-200"
      >
        <MessageCircle className="w-5 h-5" />
        {label}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-lg px-4 py-2 font-semibold text-sm hover:bg-[#1da851] transition-colors duration-200"
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  )
}
