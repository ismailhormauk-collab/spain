'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { value: '4.3', label: 'Valoración Media', suffix: '/5' },
  { value: '+58', label: 'Reseñas Google', suffix: '' },
  { value: '7', label: 'Días a la Semana', suffix: '' },
]

function AnimatedStat({ value, label, suffix, index }: { value: string; label: string; suffix: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center sm:border-r border-b sm:border-b-0 border-oro/20 last:border-0 px-6 py-5 sm:py-0 first:pt-0 last:pb-0 first:pl-0 last:pr-0"
    >
      <div className="font-playfair text-3xl md:text-4xl font-bold text-gradient-gold">
        {value}<span className="text-xl">{suffix}</span>
      </div>
      <div className="font-raleway text-xs text-hueso-muted uppercase tracking-widest mt-1">
        {label}
      </div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="nosotros" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-carbon-light to-carbon" />

      <div className="container-custom relative z-10">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <span className="section-tag">Nuestra Historia</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hueso text-center font-bold mb-10 lg:mb-16 leading-tight"
        >
          Pasión, Autenticidad<br />
          <span className="italic text-oro">y Sabor Mediterráneo</span>
        </motion.h2>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 lg:mb-20">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative h-[260px] sm:h-[380px] md:h-[480px] rounded-sm overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Interior del Restaurante La Calavera en San José, Almería"
                fill
                quality={75}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/50 to-transparent" />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden sm:block absolute -bottom-6 -right-6 glass rounded-sm p-5 max-w-[200px]"
            >
              <div className="font-playfair italic text-oro text-sm leading-relaxed">
                &ldquo;El mejor sabor es el que se comparte&rdquo;
              </div>
              <div className="divider-gold mt-3 mb-2" />
              <div className="font-raleway text-xs text-hueso-muted uppercase tracking-widest">
                La Calavera
              </div>
            </motion.div>
            {/* Gold border accent */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t border-l border-oro/30 rounded-tl-sm pointer-events-none" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-5 font-raleway text-hueso-dark leading-relaxed">
              <p className="text-base md:text-lg">
                En el corazón del{' '}
                <span className="text-oro font-semibold">
                  Parque Natural Cabo de Gata-Níjar
                </span>
                , donde las aguas cristalinas del Mediterráneo besan las costas vírgenes de Almería, nació <strong className="text-hueso">La Calavera</strong>.
              </p>
              <p className="text-base">
                Más que un restaurante, somos una experiencia: un encuentro entre la rica tradición culinaria italiana y los sabores más auténticos del Mediterráneo español. Cada ingrediente que llega a nuestra cocina es elegido con pasión y respeto, desde las harinas seleccionadas para nuestras masas artesanales hasta los productos frescos de la tierra andaluza.
              </p>
              <p className="text-base">
                Nuestras pizzas se hornean en el instante en que las pides, con masas fermentadas durante 48 horas para lograr esa textura crujiente y ese sabor inconfundible que nos distingue. La pasta, elaborada con técnica italiana y alma mediterránea, es un viaje de ida y vuelta entre dos culturas que se abrazan en cada bocado.
              </p>
            </div>

            {/* Philosophy */}
            <div className="border-l-2 border-oro pl-4 sm:pl-6 py-2 mt-2">
              <p className="font-playfair italic text-base sm:text-lg text-oro leading-relaxed">
                &ldquo;Memento Vivere — Recuerda Vivir. En La Calavera, creemos que la buena mesa es el arte de reunir a las personas que amamos alrededor de los sabores que nos emocionan.&rdquo;
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { icon: '🌿', text: 'Ingredientes frescos de temporada' },
                { icon: '🔥', text: 'Masa fermentada 48 horas' },
                { icon: '🌊', text: 'En el Parque Natural Cabo de Gata' },
                { icon: '🍷', text: 'Selección de vinos y bebidas' },
              ].map((feat) => (
                <div key={feat.text} className="flex items-start gap-2">
                  <span className="text-base">{feat.icon}</span>
                  <span className="font-raleway text-xs text-hueso-muted leading-tight">{feat.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={() => document.querySelector('#reservas')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold"
              >
                <span>Reservar Mesa</span>
              </button>
              <button
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                Ver Menú
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="glass rounded-sm py-8 px-6"
        >
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-0">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Location banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 lg:mt-16 text-center px-4"
        >
          <div className="flex items-center justify-center gap-3 font-raleway text-[10px] sm:text-xs text-hueso-muted uppercase tracking-[0.12em] sm:tracking-[0.2em]">
            <div className="hidden sm:block divider-gold flex-shrink-0" />
            <span className="leading-relaxed">C. Correo, 37 · San José · 04118 Almería · Andalucía</span>
            <div className="hidden sm:block divider-gold flex-shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
