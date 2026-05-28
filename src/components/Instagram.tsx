'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

type Post = {
  id: number
  src: string
  fallback: string
  alt: string
  caption: string
  likes: number
  comments: number
  gradient: string
}

const PEX = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop`

const UNS = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=700&h=700&q=85`

const POSTS: Post[] = [
  {
    id: 1,
    src:      PEX(315755),
    fallback: UNS('1565299624946-b28f40a0ae38'),
    alt:      'Pizza Especial de la Casa – La Calavera, San José',
    caption:  'Nuestra Especial de la Casa 🍕 Masa fermentada 48 horas. ¿Ya la has probado?',
    likes: 247, comments: 31,
    gradient: 'linear-gradient(145deg,#3d1a06 0%,#1a0800 55%,#0a0a0a 100%)',
  },
  {
    id: 2,
    src:      PEX(1279330),
    fallback: UNS('1504674900247-0877df9cc836'),
    alt:      'Gastronomía mediterránea – La Calavera',
    caption:  'Los sabores del Mediterráneo en cada plato 🌊 Ingredientes frescos de temporada.',
    likes: 189, comments: 24,
    gradient: 'linear-gradient(145deg,#1a2600 0%,#0d1200 55%,#0a0a0a 100%)',
  },
  {
    id: 3,
    src:      PEX(291528),
    fallback: UNS('1571877227200-a0d98ea607e9'),
    alt:      'Tiramisú della Casa – La Calavera',
    caption:  'Tiramisú della Casa 🍮 Elaborado cada mañana con la receta original italiana.',
    likes: 312, comments: 43,
    gradient: 'linear-gradient(145deg,#200810 0%,#100408 55%,#0a0a0a 100%)',
  },
  {
    id: 4,
    src:      PEX(941861),
    fallback: UNS('1414235077428-338989a2e8c0'),
    alt:      'Interior del Restaurante La Calavera, San José Almería',
    caption:  'Nuestra sala os espera ✨ Reservas disponibles todos los días de 12:00 a 23:30.',
    likes: 156, comments: 19,
    gradient: 'linear-gradient(145deg,#2a1a08 0%,#140c04 55%,#0a0a0a 100%)',
  },
  {
    id: 5,
    src:      PEX(696218),
    fallback: UNS('1510812431401-41d2bd2722f3'),
    alt:      'Selección de vinos – La Calavera',
    caption:  'Una bodega cuidadosamente seleccionada 🍷 Vinos españoles para cada ocasión.',
    likes: 134, comments: 15,
    gradient: 'linear-gradient(145deg,#0e0a1e 0%,#07050f 55%,#0a0a0a 100%)',
  },
  {
    id: 6,
    src:      PEX(3655916),
    fallback: UNS('1512621776951-a57141f2eefd'),
    alt:      'Del Mediterráneo – La Calavera',
    caption:  'Frescura mediterránea en cada bocado 🥗 Verduras de temporada, ingredientes locales.',
    likes: 198, comments: 28,
    gradient: 'linear-gradient(145deg,#0a1e06 0%,#051002 55%,#0a0a0a 100%)',
  },
]

function IgIcon({ size = 16 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg flex-shrink-0"
      style={{
        width: size + 4, height: size + 4,
        background: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.8" fill="white"/>
      </svg>
    </div>
  )
}

function PostTile({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const [loaded, setLoaded] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const currentSrc = useFallback ? post.fallback : post.src

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
    >
      {/* Gradient base */}
      <div className="absolute inset-0" style={{ background: post.gradient }} />

      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px,rgba(201,169,110,1) 1px,transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Photo */}
      {!imgFailed && (
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.07] origin-center">
          <Image
            key={currentSrc}
            src={currentSrc}
            alt={post.alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ filter: 'brightness(0.9) saturate(1.13) contrast(1.03)' }}
            onLoad={() => setLoaded(true)}
            onError={() => {
              if (!useFallback) {
                setUseFallback(true)
                setLoaded(false)
              } else {
                setImgFailed(true)
              }
            }}
          />
        </div>
      )}

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/58 transition-colors duration-400 pointer-events-none" />

      {/* Hover stats */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
        <div className="flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-1.5 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="font-raleway text-sm font-bold">{post.likes.toLocaleString('es-ES')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <span className="font-raleway text-sm font-bold">{post.comments}</span>
          </div>
        </div>
      </div>

      {/* Instagram badge on hover */}
      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
        <IgIcon size={12} />
      </div>
    </motion.div>
  )
}

export default function Instagram() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-[#111111] to-carbon" />

      <div className="container-custom relative z-10">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <span className="section-tag">Redes Sociales</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center mb-5"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hueso font-bold leading-tight">
            Síguenos en<br />
            <span className="italic" style={{ color: '#c9a96e' }}>Instagram</span>
          </h2>
        </motion.div>

        {/* Handle */}
        <motion.a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="flex items-center justify-center gap-2.5 mb-10 sm:mb-12 group"
        >
          <IgIcon size={16} />
          <span
            className="font-raleway text-sm font-semibold tracking-wide transition-colors duration-300"
            style={{ color: '#c9a96e' }}
          >
            @lacalavera_sanjose
          </span>
        </motion.a>

        {/* Grid — 3 cols × 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
          {POSTS.map((post, i) => (
            <PostTile key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-10 sm:mt-12"
        >
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2.5"
          >
            <IgIcon size={11} />
            Seguir en Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
