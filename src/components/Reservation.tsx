'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

type FormData = {
  name: string
  phone: string
  email: string
  guests: string
  date: string
  time: string
  message: string
}

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00',
]

const guestOptions = ['1 persona', '2 personas', '3 personas', '4 personas', '5 personas', '6 personas', '7 personas', '8+ personas']

export default function Reservation() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', guests: '', date: '', time: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="reservas" ref={sectionRef} className="relative min-h-screen sm:min-h-screen flex items-start sm:items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Reserva tu mesa en La Calavera, San José Almería"
          fill
          quality={60}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-carbon/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/90 to-carbon/70" />
      </div>

      <div className="container-custom relative z-10 section-padding w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-tag mb-6 block">Reservaciones</span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hueso font-bold mb-5 sm:mb-6 leading-tight">
              Reserva Tu<br />
              <span className="italic text-oro">Mesa Especial</span>
            </h2>
            <p className="font-raleway text-hueso-muted text-base leading-relaxed mb-8 max-w-md">
              Reserva con antelación y asegura tu lugar en La Calavera. Te contactaremos para confirmar tu reserva y asegurarnos de que tengas una experiencia gastronómica inigualable.
            </p>

            {/* Info boxes */}
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  ),
                  title: 'Horario',
                  text: 'Todos los días · 12:00 – 23:30',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 11.68 19.79 19.79 0 01.88 3.05 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  ),
                  title: 'Teléfono',
                  text: '+34 610 091 689',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  ),
                  title: 'Dirección',
                  text: 'C. Correo, 37 · San José, Almería',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-oro/10 border border-oro/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-raleway text-xs text-oro uppercase tracking-widest font-semibold leading-none mb-0.5">
                      {item.title}
                    </p>
                    <p className="font-raleway text-sm text-hueso">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-sm p-5 sm:p-8 md:p-10">
              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-hueso font-bold">
                    ¡Reserva Recibida!
                  </h3>
                  <p className="font-raleway text-hueso-muted text-sm leading-relaxed max-w-xs">
                    Gracias por elegir La Calavera. Te contactaremos en breve para confirmar tu reserva.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name:'',phone:'',email:'',guests:'',date:'',time:'',message:'' }) }}
                    className="btn-outline mt-2"
                  >
                    Nueva Reserva
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <h3 className="font-playfair text-2xl text-hueso font-bold mb-6">
                    Solicitar Reserva
                  </h3>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        required
                        className="input-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                        required
                        className="input-gold"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      className="input-gold"
                    />
                  </div>

                  {/* Guests + Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                        Comensales *
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        required
                        className="input-gold appearance-none"
                      >
                        <option value="">Nº personas</option>
                        {guestOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                        Fecha *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={today}
                        required
                        className="input-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                        Hora *
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="input-gold appearance-none"
                      >
                        <option value="">Seleccionar</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                      Mensaje o Petición Especial
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Alergias, cumpleaños, preferencias de mesa..."
                      rows={3}
                      className="input-gold resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold w-full flex items-center justify-center gap-2 mt-2"
                  >
                    <span>
                      {status === 'sending' ? 'Enviando...' : 'Confirmar Reserva'}
                    </span>
                    {status !== 'sending' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>

                  <p className="font-raleway text-xs text-hueso-muted text-center">
                    También puedes llamar al{' '}
                    <a href="tel:+34610091689" className="text-oro hover:underline">
                      +34 610 091 689
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
