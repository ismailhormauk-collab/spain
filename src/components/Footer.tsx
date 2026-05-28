'use client'

import { motion } from 'framer-motion'
import { LogoStacked } from '@/components/Logo'

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Menú', href: '#menu' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Reservas', href: '#reservas' },
  { label: 'Contacto', href: '#contacto' },
]

const hours = [
  'Lunes – Domingo',
  '12:00 – 23:30',
]


export default function Footer() {
  const scroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="container-custom">
        {/* Top CTA bar */}
        <div className="glass rounded-sm p-5 sm:p-8 mb-10 sm:mb-16 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <h3 className="font-playfair text-2xl md:text-3xl text-hueso font-bold mb-1">
              ¿Tienes hambre?
            </h3>
            <p className="font-raleway text-hueso-muted text-sm">
              Reserva tu mesa hoy y vive la experiencia La Calavera.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={() => scroll('#reservas')} className="btn-gold">
              <span>Reservar Mesa</span>
            </button>
            <a href="tel:+34610091689" className="btn-outline">
              Llamar
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <LogoStacked theme="dark" width={140} />
            </div>
            <p className="font-raleway text-xs text-hueso-muted leading-relaxed mb-6">
              Restaurante de cocina italiana y mediterránea en el corazón del Parque Natural Cabo de Gata-Níjar. Sabores auténticos, ambiente inconfundible.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-raleway font-bold text-xs text-oro uppercase tracking-[0.2em] mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scroll(link.href)}
                    className="font-raleway text-sm text-hueso-muted hover:text-oro transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-oro transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-raleway font-bold text-xs text-oro uppercase tracking-[0.2em] mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-0.5">Dirección</p>
                <p className="font-raleway text-sm text-hueso leading-relaxed">
                  C. Correo, 37<br />
                  04118 San José, Almería
                </p>
              </li>
              <li>
                <p className="font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-0.5">Teléfono</p>
                <a href="tel:+34610091689" className="font-raleway text-sm text-hueso hover:text-oro transition-colors">
                  +34 610 091 689
                </a>
              </li>
              <li>
                <p className="font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-0.5">Google Maps</p>
                <a
                  href="https://maps.app.goo.gl/RnfGjs72peqifZXQ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-raleway text-sm text-oro hover:text-oro-light transition-colors"
                >
                  Ver en el mapa →
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-raleway font-bold text-xs text-oro uppercase tracking-[0.2em] mb-5">
              Horario
            </h4>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="font-raleway text-xs text-green-400 uppercase tracking-widest font-semibold">
                  Abierto ahora
                </span>
              </div>
              {[
                ['Lunes – Viernes', '12:00 – 23:30'],
                ['Sábado – Domingo', '12:00 – 23:30'],
                ['Festivos', '12:00 – 23:30'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between gap-2">
                  <span className="font-raleway text-xs text-hueso-muted">{day}</span>
                  <span className="font-raleway text-xs text-hueso">{time}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll('#reservas')}
              className="btn-gold w-full"
            >
              <span>Reservar</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-oro/20 to-transparent mb-7" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 text-center sm:text-left">
          <p className="font-raleway text-xs text-hueso-muted">
            © {new Date().getFullYear()} La Calavera – Restaurante San José, Almería. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {['Política de Privacidad', 'Aviso Legal', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-raleway text-xs text-hueso-muted hover:text-oro transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="flex justify-center mt-8">
          <p className="font-playfair italic text-xs text-hueso-muted opacity-50">
            &ldquo;Memento Vivere — Recuerda Vivir&rdquo;
          </p>
        </div>
      </div>
    </footer>
  )
}
