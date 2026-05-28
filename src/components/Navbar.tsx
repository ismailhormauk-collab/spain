'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoIcon, LogoStacked } from '@/components/Logo'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Menú', href: '#menu' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Reservas', href: '#reservas' },
  { label: 'Contacto', href: '#contacto' },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-carbon/95 backdrop-blur-md sm:backdrop-blur-xl shadow-2xl border-b border-oro/10'
            : 'bg-transparent'
        }`}
        style={{ height: scrolled ? 70 : 88 }}
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#inicio')}
            className="flex items-center gap-2 group"
            aria-label="La Calavera - Inicio"
          >
            <motion.div
              animate={{ opacity: 1 }}
              className="transition-opacity duration-300 group-hover:opacity-85"
            >
              <LogoIcon theme="dark" size={scrolled ? 38 : 44} />
            </motion.div>
            <div className="flex flex-col ml-1">
              <span
                className="font-playfair text-hueso tracking-[0.22em] font-bold uppercase leading-none"
                style={{ fontSize: scrolled ? '0.72rem' : '0.85rem' }}
              >
                La Calavera
              </span>
              <span className="font-raleway text-hueso-muted tracking-[0.18em] uppercase leading-none mt-0.5"
                    style={{ fontSize: '0.48rem' }}>
                San José · Almería
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative font-raleway text-xs tracking-[0.12em] uppercase font-semibold transition-colors duration-300 group ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-oro'
                    : 'text-hueso-dark hover:text-hueso'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-oro transition-all duration-300 ${
                    activeSection === link.href.replace('#', '')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#reservas')}
              className="hidden md:block btn-gold text-xs"
            >
              <span>Reservar Mesa</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-[5px] p-2 group"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-hueso origin-center transition-colors duration-300"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-4 h-[1.5px] bg-hueso"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-hueso origin-center transition-colors duration-300"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-carbon flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              <div className="mb-4">
                <LogoStacked theme="dark" width={160} />
              </div>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-playfair text-2xl text-hueso hover:text-oro transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                onClick={() => handleNavClick('#reservas')}
                className="btn-gold mt-4"
              >
                <span>Reservar Mesa</span>
              </motion.button>
            </div>
            <div className="pb-8 text-center">
              <p className="font-raleway text-xs text-hueso-muted tracking-widest uppercase">
                C. Correo, 37 · San José, Almería
              </p>
              <a
                href="tel:+34610091689"
                className="font-raleway text-sm text-oro mt-1 block"
              >
                +34 610 091 689
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
