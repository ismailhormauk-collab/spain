'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '34610091689'
const WA_MESSAGE = encodeURIComponent('¡Hola! Me gustaría reservar una mesa en La Calavera. ¿Podéis ayudarme?')

export default function WhatsApp() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowTooltip(true), 500)
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000)
      return () => { clearTimeout(timer); clearTimeout(hideTimer) }
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-sm px-4 py-2.5 pointer-events-none"
              >
                <p className="font-raleway text-xs text-hueso whitespace-nowrap font-semibold">
                  ¿Hablamos por WhatsApp?
                </p>
                <p className="font-raleway text-[10px] text-hueso-muted">
                  Reservas y consultas
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="relative w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-lg shadow-black/30 hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />
            {/* WhatsApp icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652C8.07 23.29 10.04 23.78 12 23.782h.008c6.573 0 11.924-5.335 11.928-11.895.002-3.178-1.24-6.165-3.417-8.438zm-8.482 18.307h-.006a9.867 9.867 0 01-5.03-1.378l-.361-.214-3.741.977.997-3.648-.235-.374a9.786 9.786 0 01-1.502-5.26c.002-5.45 4.436-9.884 9.893-9.884 2.64 0 5.122 1.03 6.988 2.899a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.896 9.885zm5.43-7.403c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
