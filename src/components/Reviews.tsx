'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    id: 1,
    name: 'María García',
    avatar: 'MG',
    rating: 5,
    date: 'Hace 2 semanas',
    comment:
      'Las pizzas son increíbles, enormes y con una masa perfecta. El ambiente es muy acogedor y el servicio muy amable. Sin duda el mejor restaurante de San José. Volveremos seguro en nuestra próxima visita al Cabo de Gata.',
    highlight: 'Mejor restaurante de San José',
  },
  {
    id: 2,
    name: 'Carlos Martínez',
    avatar: 'CM',
    rating: 5,
    date: 'Hace 1 mes',
    comment:
      'Visitamos La Calavera en verano y fue una experiencia maravillosa. Los ñoquis al pesto estaban deliciosos y las raciones son muy generosas. La pizza especial de la casa es simplemente espectacular. Altamente recomendado.',
    highlight: 'Ñoquis espectaculares',
  },
  {
    id: 3,
    name: 'Laura Sánchez',
    avatar: 'LS',
    rating: 4,
    date: 'Hace 3 semanas',
    comment:
      'Muy buena relación calidad-precio. La pizza margarita era enorme incluso en talla mediana, y muy sabrosa. El lugar es acogedor e informal, perfecto para cenas en familia. Sitio muy recomendable en San José.',
    highlight: 'Excelente relación calidad-precio',
  },
  {
    id: 4,
    name: 'Javier López',
    avatar: 'JL',
    rating: 5,
    date: 'Hace 2 meses',
    comment:
      'Auténtica cocina italiana en el corazón del Parque Natural Cabo de Gata. Los ñoquis son los mejores que he probado en toda Almería. No es el típico sitio para turistas; es un restaurante genuino con mucho carácter.',
    highlight: 'Auténtica cocina italiana',
  },
  {
    id: 5,
    name: 'Elena Fernández',
    avatar: 'EF',
    rating: 5,
    date: 'Hace 1 semana',
    comment:
      'Un lugar especial con mucha personalidad. La atmósfera es perfecta para una cena romántica. La pasta y las pizzas son de primera calidad, y el tiramisú de la casa es de los mejores que he probado.',
    highlight: 'Tiramisú de los mejores',
  },
  {
    id: 6,
    name: 'Roberto Gómez',
    avatar: 'RG',
    rating: 4,
    date: 'Hace 3 meses',
    comment:
      'Muy buen restaurante italiano en San José. Las pizzas son enormes y muy sabrosas, con una masa fina y bien horneada. El trato del personal es excelente y la relación calidad-precio es muy buena.',
    highlight: 'Personal excepcional',
  },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? '#f5a623' : 'none'}
          stroke="#f5a623"
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

const VISIBLE = 3

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const maxIndex = Math.max(0, reviews.length - VISIBLE)

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1))

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section id="resenas" ref={sectionRef} className="section-padding relative overflow-hidden bg-carbon-light">
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-carbon-light to-carbon" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <span className="section-tag">Reseñas</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hueso text-center font-bold mb-4 leading-tight"
        >
          Lo Que Dicen<br />
          <span className="italic text-oro">Nuestros Clientes</span>
        </motion.h2>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-2 mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="font-playfair text-5xl font-bold text-gradient-gold">{avgRating}</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={s <= 4 ? '#f5a623' : 'none'} stroke="#f5a623" strokeWidth="1.5">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span className="font-raleway text-xs text-hueso-muted uppercase tracking-widest">
                58 reseñas en Google
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mobile: horizontal scroll-snap carousel */}
        <div
          className="md:hidden -mx-6 px-6 overflow-x-auto pb-3 flex gap-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              className="glass rounded-sm p-5 flex flex-col gap-3 flex-shrink-0"
              style={{ scrollSnapAlign: 'start', width: 'min(300px, 83vw)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oro to-oro-dark flex items-center justify-center flex-shrink-0">
                  <span className="font-raleway font-bold text-carbon text-xs">{review.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-raleway font-semibold text-hueso text-sm truncate">{review.name}</p>
                  <p className="font-raleway text-xs text-hueso-muted">{review.date}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-60">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <StarRow rating={review.rating} />
              <div className="bg-oro/8 border border-oro/15 rounded-sm px-3 py-1.5">
                <span className="font-raleway text-xs text-oro font-semibold">&ldquo;{review.highlight}&rdquo;</span>
              </div>
              <p className="font-raleway text-sm text-hueso-muted leading-relaxed line-clamp-4 flex-1">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Desktop: sliding carousel + controls */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `calc(-${current * (100 / VISIBLE)}%)` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-5"
              style={{ width: `${(reviews.length / VISIBLE) * 100}%` }}
            >
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-sm p-6 flex flex-col gap-4 group hover:border-oro/25 transition-all duration-400"
                  style={{ width: `${100 / reviews.length}%` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-oro to-oro-dark flex items-center justify-center flex-shrink-0">
                      <span className="font-raleway font-bold text-carbon text-xs">{review.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-raleway font-semibold text-hueso text-sm truncate">{review.name}</p>
                      <p className="font-raleway text-xs text-hueso-muted">{review.date}</p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-60">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <StarRow rating={review.rating} />
                  <div className="bg-oro/8 border border-oro/15 rounded-sm px-3 py-1.5">
                    <span className="font-raleway text-xs text-oro font-semibold">&ldquo;{review.highlight}&rdquo;</span>
                  </div>
                  <p className="font-raleway text-sm text-hueso-muted leading-relaxed line-clamp-4 flex-1">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-oro/40 flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-oro/5"
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    current === i ? 'bg-oro w-6 h-1.5' : 'bg-white/20 w-1.5 h-1.5 hover:bg-white/40'
                  }`}
                  aria-label={`Ir a reseña ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={current === maxIndex}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-oro/40 flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-oro/5"
              aria-label="Siguiente"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Google CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://maps.app.goo.gl/RnfGjs72peqifZXQ7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Ver Todas las Reseñas en Google
          </a>
        </motion.div>
      </div>
    </section>
  )
}
