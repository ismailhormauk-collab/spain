'use client'

import { useState } from 'react'
import Image from 'next/image'

// ── Per-category fallback gradient + icon when image fails / slow to load ──
const FALLBACKS: Record<string, { bg: string; icon: string }> = {
  pizzas:      { bg: 'radial-gradient(ellipse at 60% 40%, #3d1a08 0%, #0a0a0a 75%)', icon: '🍕' },
  pasta:       { bg: 'radial-gradient(ellipse at 60% 40%, #2e1a06 0%, #0a0a0a 75%)', icon: '🍝' },
  pastafresca: { bg: 'radial-gradient(ellipse at 60% 40%, #12240e 0%, #0a0a0a 75%)', icon: '🥟' },
  entrantes:   { bg: 'radial-gradient(ellipse at 60% 40%, #281a08 0%, #0a0a0a 75%)', icon: '🥗' },
  risottos:    { bg: 'radial-gradient(ellipse at 60% 40%, #261e00 0%, #0a0a0a 75%)', icon: '🍚' },
  carne:       { bg: 'radial-gradient(ellipse at 60% 40%, #280808 0%, #0a0a0a 75%)', icon: '🥩' },
  pescado:     { bg: 'radial-gradient(ellipse at 60% 40%, #06101e 0%, #0a0a0a 75%)', icon: '🐟' },
  ensaladas:   { bg: 'radial-gradient(ellipse at 60% 40%, #0a1e06 0%, #0a0a0a 75%)', icon: '🥬' },
  postres:     { bg: 'radial-gradient(ellipse at 60% 40%, #200812 0%, #0a0a0a 75%)', icon: '🍮' },
}

const GOLD = '#c9a96e'

export default function FoodImage({
  src,
  alt,
  category = 'pasta',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: {
  src: string
  alt: string
  category?: string
  sizes?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const fb = FALLBACKS[category] ?? FALLBACKS.pasta

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ── Base gradient (always visible, fades out when image loads) ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${loaded && !error ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: fb.bg }}
      >
        {/* Decorative corner lines */}
        <div
          className="absolute top-3 left-3 w-6 h-6"
          style={{ borderTop: `0.5px solid ${GOLD}26`, borderLeft: `0.5px solid ${GOLD}26` }}
        />
        <div
          className="absolute bottom-3 right-3 w-6 h-6"
          style={{ borderBottom: `0.5px solid ${GOLD}26`, borderRight: `0.5px solid ${GOLD}26` }}
        />
        {/* Center icon — only shown on error, not during loading */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-3xl" style={{ opacity: 0.2 }}>{fb.icon}</span>
            <div style={{ width: 28, height: 0.5, background: GOLD, opacity: 0.3 }} />
          </div>
        )}
      </div>

      {/* ── Actual image (fades in over gradient) ── */}
      {!error && (
        <Image
          src={src}
          alt={alt}
          fill
          quality={75}
          className={`object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(false) }}
          sizes={sizes}
        />
      )}
    </div>
  )
}
