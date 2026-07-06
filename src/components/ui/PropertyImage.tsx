'use client'

import { useState } from 'react'

const GRADIENTS = [
  'linear-gradient(135deg, #1e1a0f 0%, #2d2516 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #0f1e1a 0%, #0e2820 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #1a1a10 0%, #28260e 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #1a0f1e 0%, #241026 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #0f1a0f 0%, #0e2812 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #1e0f0f 0%, #2a1010 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #0f1a1e 0%, #10242a 60%, #1a1a1a 100%)',
  'linear-gradient(135deg, #1e1a0a 0%, #2a2410 60%, #1a1a1a 100%)',
]

interface PropertyImageProps {
  src?: string
  alt: string
  className?: string
  gradientIndex?: number
}

export default function PropertyImage({ src, alt, className = '', gradientIndex = 0 }: PropertyImageProps) {
  const [hasError, setHasError] = useState(false)
  const gradient = GRADIENTS[Math.abs(gradientIndex) % GRADIENTS.length]

  if (!src || hasError) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center ${className}`}
        style={{ background: gradient }}
        role="img"
        aria-label={alt}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      onError={() => setHasError(true)}
    />
  )
}
