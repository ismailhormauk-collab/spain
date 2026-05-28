'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85'

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={star <= Math.floor(value) ? '#f5a623' : star - 0.5 <= value ? 'url(#half)' : 'none'}
          stroke="#f5a623"
          strokeWidth="1.5"
        >
          <defs>
            <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="#f5a623" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

const titleLetters = 'La Calavera'.split('')

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Parallax disabled when user prefers reduced motion (accessibility + perf)
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '14%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.04])

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
      aria-label="La Calavera - Restaurante en San José, Almería"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale, willChange: 'transform' }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Restaurante La Calavera - San José, Almería"
          fill
          priority
          quality={80}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-carbon via-carbon/70 to-carbon/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-carbon/60 via-transparent to-carbon/30" />

      {/* Content */}
      <motion.div
        className="relative z-20 container-custom text-center flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-tag mb-6"
        >
          San José · Almería
        </motion.div>

        {/* Title - letter by letter */}
        <h1 className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-hueso leading-none tracking-tight mb-6 overflow-hidden">
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${letter === ' ' ? 'w-3 sm:w-5 md:w-8' : ''}`}
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </h1>

        {/* Gold line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="h-px bg-gradient-to-r from-transparent via-oro to-transparent mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="font-raleway text-hueso-dark text-sm md:text-lg tracking-[0.15em] md:tracking-widest uppercase font-light max-w-xs sm:max-w-lg px-2 sm:px-0 mb-8 sm:mb-10"
        >
          Cocina Italiana & Mediterránea
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          className="font-playfair italic text-hueso-muted text-base md:text-xl max-w-xs sm:max-w-xl px-2 sm:px-0 mb-10 sm:mb-12 leading-relaxed"
        >
          Donde la tradición italiana se funde con el alma del Mediterráneo
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            onClick={() => handleScroll('#reservas')}
            className="btn-gold animate-pulse-gold"
          >
            <span>Reservar Mesa</span>
          </button>
          <button
            onClick={() => handleScroll('#menu')}
            className="btn-outline"
          >
            Ver Menú
          </button>
        </motion.div>
      </motion.div>

      {/* Google Rating Badge */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute bottom-20 right-4 md:right-10 z-20 glass rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2.5 md:gap-3"
      >
        <div className="flex flex-col items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <div>
          <p className="font-raleway text-xs text-hueso-muted uppercase tracking-widest leading-none mb-1">
            Google
          </p>
          <div className="flex items-center gap-1.5">
            <StarRating value={4.3} />
            <span className="font-raleway font-bold text-hueso text-sm">4.3</span>
          </div>
          <p className="font-raleway text-xs text-hueso-muted mt-0.5">58 reseñas</p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleScroll('#nosotros')}
      >
        <span className="font-raleway text-xs text-hueso-muted uppercase tracking-[0.2em]">
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-oro to-transparent"
        />
      </motion.div>
    </section>
  )
}
