'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const hours = [
  { day: 'Lunes', time: '12:00 – 23:30', open: true },
  { day: 'Martes', time: '12:00 – 23:30', open: true },
  { day: 'Miércoles', time: '12:00 – 23:30', open: true },
  { day: 'Jueves', time: '12:00 – 23:30', open: true },
  { day: 'Viernes', time: '12:00 – 23:30', open: true },
  { day: 'Sábado', time: '12:00 – 23:30', open: true },
  { day: 'Domingo', time: '12:00 – 23:30', open: true },
]

const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' }).replace(/^\w/, (c) => c.toUpperCase())

export default function Location() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={sectionRef} className="section-padding relative overflow-hidden bg-carbon">
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-light to-carbon" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <span className="section-tag">Ubicación & Horario</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hueso text-center font-bold mb-4 leading-tight"
        >
          Encuéntranos en<br />
          <span className="italic text-oro">San José, Almería</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-raleway text-hueso-muted text-center text-base max-w-xl mx-auto mb-14"
        >
          En el corazón del Parque Natural Cabo de Gata-Níjar, te esperamos todos los días para ofrecerte la mejor experiencia gastronómica de Almería.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map - 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 h-[240px] sm:h-[340px] lg:h-[480px] rounded-sm overflow-hidden border border-oro/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3128.0!2d-2.1115869!3d36.7632162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7af3b5f1e46f67%3A0xebb8432f94c93379!2sLa%20Calavera!5e0!3m2!1ses!2ses!4v1716825600000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de La Calavera - San José, Almería"
            />
          </motion.div>

          {/* Info - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Address */}
            <div className="glass rounded-sm p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-sm bg-oro/10 border border-oro/20 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-raleway font-bold text-oro text-xs uppercase tracking-widest mb-1">Dirección</h3>
                  <p className="font-raleway text-sm text-hueso leading-relaxed">
                    C. Correo, 37<br />
                    04118 San José<br />
                    Almería, Andalucía
                  </p>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/RnfGjs72peqifZXQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-raleway text-xs text-oro hover:text-oro-light transition-colors uppercase tracking-widest"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
                Cómo llegar
              </a>
            </div>

            {/* Phone */}
            <div className="glass rounded-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-sm bg-oro/10 border border-oro/20 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 11.68 19.79 19.79 0 01.88 3.05 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-raleway font-bold text-oro text-xs uppercase tracking-widest mb-1">Teléfono</h3>
                  <a href="tel:+34610091689" className="font-raleway text-sm text-hueso hover:text-oro transition-colors">
                    +34 610 091 689
                  </a>
                </div>
              </div>
              <p className="font-raleway text-xs text-hueso-muted">
                También disponible por WhatsApp
              </p>
            </div>

            {/* Hours */}
            <div className="glass rounded-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-sm bg-oro/10 border border-oro/20 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-raleway font-bold text-oro text-xs uppercase tracking-widest">Horario</h3>
                  <span className="inline-flex items-center gap-1 font-raleway text-xs text-green-400 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Abierto ahora
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className={`flex justify-between items-center font-raleway text-xs py-1 border-b border-white/5 last:border-0 ${
                      h.day === today ? 'text-oro font-semibold' : 'text-hueso-muted'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {h.day === today && <span className="w-1 h-1 rounded-full bg-oro inline-block" />}
                      {h.day}
                    </span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby note */}
            <div className="glass rounded-sm p-4 border-l-2 border-oro/30">
              <p className="font-raleway text-xs text-hueso-muted leading-relaxed">
                🌿 Situado en{' '}
                <span className="text-oro font-semibold">San José</span>, a pocos minutos de las playas vírgenes del Parque Natural Cabo de Gata-Níjar, declarado Reserva de la Biosfera por la UNESCO.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
