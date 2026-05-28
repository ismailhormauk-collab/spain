'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type GItem = {
  id: number
  src: string
  fallback: string
  label: string
  desc: string
  cat: string
  gradient: string
}

const PEX = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

const UNS = (photoId: string, w = 1200) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=88`

const G: GItem[] = [
  {
    id: 1,
    src:      PEX(941861),
    fallback: UNS('1414235077428-338989a2e8c0'),
    label: 'Nuestra Atmósfera',
    desc:  'Un espacio íntimo en el corazón de San José',
    cat:   'Ambiente',
    gradient: 'linear-gradient(145deg,#3d2008 0%,#1e0f04 45%,#0a0a0a 100%)',
  },
  {
    id: 2,
    src:      PEX(696218, 900),
    fallback: UNS('1510812431401-41d2bd2722f3', 900),
    label: 'Nuestra Bodega',
    desc:  'Vinos españoles elegidos con cuidado y pasión',
    cat:   'Bodega',
    gradient: 'linear-gradient(145deg,#0e0a1e 0%,#06040e 45%,#0a0a0a 100%)',
  },
  {
    id: 3,
    src:      PEX(315755, 900),
    fallback: UNS('1565299624946-b28f40a0ae38', 900),
    label: 'Pizzas Artesanales',
    desc:  'Masa fermentada 48 horas, horneada al instante',
    cat:   'Cocina',
    gradient: 'linear-gradient(145deg,#4a1e06 0%,#261000 45%,#0a0a0a 100%)',
  },
  {
    id: 4,
    src:      PEX(1279330, 900),
    fallback: UNS('1504674900247-0877df9cc836', 900),
    label: 'Pasta Fresca',
    desc:  'Elaborada a diario con tradición italiana auténtica',
    cat:   'Cocina',
    gradient: 'linear-gradient(145deg,#3a2200 0%,#1e1200 45%,#0a0a0a 100%)',
  },
  {
    id: 5,
    src:      PEX(3655916, 900),
    fallback: UNS('1559339352-11d035aa65de', 900),
    label: 'Del Mediterráneo',
    desc:  'Pescados y mariscos frescos traídos del mar cada día',
    cat:   'Mar',
    gradient: 'linear-gradient(145deg,#06101e 0%,#03080e 45%,#0a0a0a 100%)',
  },
  {
    id: 6,
    src:      PEX(291528, 900),
    fallback: UNS('1571877227200-a0d98ea607e9', 900),
    label: 'Tiramisú della Casa',
    desc:  'La receta original italiana, elaborada cada mañana',
    cat:   'Postres',
    gradient: 'linear-gradient(145deg,#200a14 0%,#100408 45%,#0a0a0a 100%)',
  },
  {
    id: 7,
    src:      PEX(2233729, 900),
    fallback: UNS('1558030006-450675393462', 900),
    label: 'A la Plancha',
    desc:  'Carnes y pescados a la plancha con ingredientes de temporada',
    cat:   'Cocina',
    gradient: 'linear-gradient(145deg,#280808 0%,#140404 45%,#0a0a0a 100%)',
  },
  {
    id: 8,
    src:      PEX(958545),
    fallback: UNS('1517248135467-4c7edcad34c4'),
    label: 'La Sala',
    desc:  'Diseñada para el disfrute, la intimidad y la convivencia',
    cat:   'Ambiente',
    gradient: 'linear-gradient(145deg,#1e1208 0%,#0e0904 45%,#0a0a0a 100%)',
  },
]

// ────────────────────────────────────────────
// Gallery Cell — uses next/image (proxied through Next.js server,
// bypasses browser hot-link restrictions) with Pexels primary + Unsplash fallback
// ────────────────────────────────────────────
function GCell({
  item,
  onOpen,
  delay = 0,
}: {
  item: GItem
  onOpen: (item: GItem) => void
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const [loaded, setLoaded] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const currentSrc = useFallback ? item.fallback : item.src

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full w-full overflow-hidden cursor-pointer group"
      onClick={() => onOpen(item)}
    >
      {/* Always-visible gradient base */}
      <div className="absolute inset-0" style={{ background: item.gradient }} />

      {/* Subtle premium texture on the gradient */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Photo — fades in over gradient once loaded */}
      {!imgFailed && (
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] origin-center">
          <Image
            key={currentSrc}
            src={currentSrc}
            alt={item.label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ filter: 'brightness(0.87) saturate(1.14) contrast(1.04)' }}
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

      {/* Permanent vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent pointer-events-none" />

      {/* Hover colour tint */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />

      {/* SVG corner accents on hover */}
      <svg
        className="absolute top-3 left-3 w-7 h-7 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        viewBox="0 0 28 28" fill="none"
      >
        <path d="M1 10 L1 1 L10 1" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity="0.55" />
      </svg>
      <svg
        className="absolute bottom-3 right-3 w-7 h-7 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        viewBox="0 0 28 28" fill="none"
      >
        <path d="M27 18 L27 27 L18 27" stroke="#c9a96e" strokeWidth="0.7" strokeOpacity="0.55" />
      </svg>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 pointer-events-none">
        <div className="mb-1.5 flex items-center gap-2 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <div className="w-4 h-px bg-[#c9a96e]" />
          <span className="font-raleway text-[8px] uppercase tracking-[0.3em] font-bold text-[#c9a96e]">
            {item.cat}
          </span>
        </div>
        <h3 className="font-playfair text-sm md:text-[15px] font-medium leading-tight text-white translate-y-0.5 group-hover:translate-y-0 transition-transform duration-400">
          {item.label}
        </h3>
        <p className="font-raleway text-[10px] text-white/55 mt-1 max-w-[220px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
          {item.desc}
        </p>
      </div>

      {/* Expand icon */}
      <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/45 border border-white/0 group-hover:border-white/18 transition-all duration-400 pointer-events-none">
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="1.5"
          className="opacity-0 group-hover:opacity-60 transition-opacity duration-400"
        >
          <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6L10 14" />
        </svg>
      </div>
    </motion.div>
  )
}

// ────────────────────────────────────────────
// Lightbox
// ────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: GItem; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  const currentSrc = useFallback ? item.fallback : item.src

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(5,5,5,0.97)',
        backdropFilter: 'blur(28px) saturate(0.5)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div
          className="relative w-full rounded-sm overflow-hidden"
          style={{ aspectRatio: '16/10', background: item.gradient }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px,rgba(201,169,110,1) 1px,transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          <Image
            key={currentSrc}
            src={currentSrc}
            alt={item.label}
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: 'brightness(0.9) saturate(1.12)' }}
            onLoad={() => setLoaded(true)}
            onError={() => {
              if (!useFallback) {
                setUseFallback(true)
                setLoaded(false)
              }
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
        </div>

        {/* Caption + close */}
        <div className="flex items-start justify-between mt-5 px-1">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-px bg-[#c9a96e]" />
              <span className="font-raleway text-[8.5px] uppercase tracking-[0.3em] font-bold text-[#c9a96e]">
                {item.cat}
              </span>
            </div>
            <h3 className="font-playfair text-lg md:text-2xl font-medium text-white leading-tight">
              {item.label}
            </h3>
            <p className="font-raleway text-xs text-white/45 mt-1.5 max-w-lg leading-relaxed">
              {item.desc}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex-shrink-0 ml-6 mt-1 w-10 h-10 rounded-full border border-white/12 hover:border-white/30 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-center font-raleway text-[9px] text-white/15 mt-5 uppercase tracking-[0.35em]">
          La Calavera · San José, Almería · Parque Natural Cabo de Gata
        </p>
      </motion.div>
    </motion.div>
  )
}

// ────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────
export default function Gallery() {
  const [lightbox, setLightbox] = useState<GItem | null>(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="galeria" ref={sectionRef} className="section-padding bg-carbon overflow-hidden">
      {/* Heading */}
      <div className="container-custom mb-8 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-5"
        >
          <span className="section-tag">Galería</span>
        </motion.div>

        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair font-bold leading-none text-hueso"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4.8rem)' }}
          >
            Momentos que
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="font-playfair font-bold italic leading-none"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4.8rem)', color: '#c9a96e' }}
          >
            Despiertan los Sentidos
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.38 }}
            className="mx-auto mt-6 mb-5"
            style={{
              width: 80, height: '0.5px',
              background:
                'linear-gradient(90deg,transparent,#c9a96e 40%,#e8c97a 50%,#c9a96e 60%,transparent)',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="font-raleway text-hueso-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed"
          >
            La atmósfera, los sabores y el alma de La Calavera, capturados en imágenes.
          </motion.p>
        </div>
      </div>

      {/* Gallery editorial grid */}
      <div className="container-custom">
        <div className="flex flex-col gap-2 md:gap-[10px]">

          {/* Row 1 — large left + 2 stacked right */}
          <div className="flex flex-col lg:flex-row gap-2 md:gap-[10px]">
            <div className="h-56 sm:h-72 lg:h-[490px] lg:flex-[2.2]">
              <GCell item={G[0]} onOpen={setLightbox} delay={0.1} />
            </div>
            <div className="flex flex-row lg:flex-col gap-2 md:gap-[10px] lg:flex-1">
              <div className="h-36 sm:h-44 lg:h-full flex-1">
                <GCell item={G[1]} onOpen={setLightbox} delay={0.2} />
              </div>
              <div className="h-36 sm:h-44 lg:h-full flex-1">
                <GCell item={G[2]} onOpen={setLightbox} delay={0.3} />
              </div>
            </div>
          </div>

          {/* Row 2 — three equal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-[10px]">
            <div className="h-48 sm:h-56 md:h-72">
              <GCell item={G[3]} onOpen={setLightbox} delay={0.10} />
            </div>
            <div className="h-48 sm:h-56 md:h-72">
              <GCell item={G[4]} onOpen={setLightbox} delay={0.17} />
            </div>
            <div className="h-48 sm:h-56 md:h-72">
              <GCell item={G[5]} onOpen={setLightbox} delay={0.24} />
            </div>
          </div>

          {/* Row 3 — small left + large right */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-[10px]">
            <div className="h-48 sm:h-56 lg:h-[340px] sm:flex-1">
              <GCell item={G[6]} onOpen={setLightbox} delay={0.1} />
            </div>
            <div className="h-48 sm:h-56 lg:h-[340px] sm:flex-[2.2]">
              <GCell item={G[7]} onOpen={setLightbox} delay={0.18} />
            </div>
          </div>

        </div>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-3 mt-10"
        >
          <div style={{
            width: '100%', height: '0.5px',
            background:
              'linear-gradient(90deg,transparent,rgba(201,169,110,0.22),transparent)',
          }} />
          <p className="font-raleway text-[9px] uppercase tracking-[0.35em] text-hueso-muted/40">
            San José · Almería · Parque Natural Cabo de Gata-Níjar
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  )
}
