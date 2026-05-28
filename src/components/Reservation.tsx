'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const WA_NUMBER = '34610091689'

type FormData = {
  name: string
  phone: string
  email: string
  guests: string
  date: string
  time: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00',
]

const guestOptions = ['1 persona', '2 personas', '3 personas', '4 personas', '5 personas', '6 personas', '7 personas', '8+ personas']

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function buildWhatsAppMessage(form: FormData): string {
  const lines: string[] = [
    'Nueva Reserva 🍽️',
    '',
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
  ]
  if (form.email.trim()) lines.push(`Correo: ${form.email}`)
  lines.push(
    `Personas: ${form.guests}`,
    `Fecha: ${formatDate(form.date)}`,
    `Hora: ${form.time}`,
  )
  if (form.message.trim()) {
    lines.push('', 'Mensaje:', form.message.trim())
  }
  return lines.join('\n')
}

const EMPTY_FORM: FormData = { name: '', phone: '', email: '', guests: '', date: '', time: '', message: '' }

export default function Reservation() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): Errors => {
    const e: Errors = {}
    if (!form.name.trim())   e.name   = 'El nombre es obligatorio'
    if (!form.phone.trim())  e.phone  = 'El teléfono es obligatorio'
    if (!form.guests)        e.guests = 'Selecciona el número de comensales'
    if (!form.date)          e.date   = 'La fecha es obligatoria'
    if (!form.time)          e.time   = 'La hora es obligatoria'
    return e
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0]
      document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    const message = buildWhatsAppMessage(form)
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
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
                  <div className="w-16 h-16 rounded-full bg-[#25d366]/10 border border-[#25d366]/30 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#25d366">
                      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652C8.07 23.29 10.04 23.78 12 23.782h.008c6.573 0 11.924-5.335 11.928-11.895.002-3.178-1.24-6.165-3.417-8.438zm-8.482 18.307h-.006a9.867 9.867 0 01-5.03-1.378l-.361-.214-3.741.977.997-3.648-.235-.374a9.786 9.786 0 01-1.502-5.26c.002-5.45 4.436-9.884 9.893-9.884 2.64 0 5.122 1.03 6.988 2.899a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.896 9.885zm5.43-7.403c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-hueso font-bold">
                    ¡WhatsApp Abierto!
                  </h3>
                  <p className="font-raleway text-hueso-muted text-sm leading-relaxed max-w-xs">
                    Tu mensaje de reserva está listo en WhatsApp. Envíalo para confirmar tu mesa en La Calavera.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm(EMPTY_FORM); setErrors({}) }}
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
                        className={`input-gold ${errors.name ? 'border-red-500/60' : ''}`}
                      />
                      {errors.name && (
                        <p className="font-raleway text-[11px] text-red-400 mt-1">{errors.name}</p>
                      )}
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
                        className={`input-gold ${errors.phone ? 'border-red-500/60' : ''}`}
                      />
                      {errors.phone && (
                        <p className="font-raleway text-[11px] text-red-400 mt-1">{errors.phone}</p>
                      )}
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
                        className={`input-gold appearance-none ${errors.guests ? 'border-red-500/60' : ''}`}
                      >
                        <option value="">Nº personas</option>
                        {guestOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      {errors.guests && (
                        <p className="font-raleway text-[11px] text-red-400 mt-1">{errors.guests}</p>
                      )}
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
                        className={`input-gold ${errors.date ? 'border-red-500/60' : ''}`}
                      />
                      {errors.date && (
                        <p className="font-raleway text-[11px] text-red-400 mt-1">{errors.date}</p>
                      )}
                    </div>
                    <div>
                      <label className="block font-raleway text-xs text-hueso-muted uppercase tracking-widest mb-1.5">
                        Hora *
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className={`input-gold appearance-none ${errors.time ? 'border-red-500/60' : ''}`}
                      >
                        <option value="">Seleccionar</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="font-raleway text-[11px] text-red-400 mt-1">{errors.time}</p>
                      )}
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
                    className="btn-gold w-full flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Confirmar Reserva por WhatsApp</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652C8.07 23.29 10.04 23.78 12 23.782h.008c6.573 0 11.924-5.335 11.928-11.895.002-3.178-1.24-6.165-3.417-8.438zm-8.482 18.307h-.006a9.867 9.867 0 01-5.03-1.378l-.361-.214-3.741.977.997-3.648-.235-.374a9.786 9.786 0 01-1.502-5.26c.002-5.45 4.436-9.884 9.893-9.884 2.64 0 5.122 1.03 6.988 2.899a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.896 9.885zm5.43-7.403c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
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
