import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

// Below-fold components split into separate JS chunks.
// SSR is kept (default) so HTML still renders on the server for SEO.
const About      = dynamic(() => import('@/components/About'))
const Menu       = dynamic(() => import('@/components/Menu'))
const Gallery    = dynamic(() => import('@/components/Gallery'))
const Reviews    = dynamic(() => import('@/components/Reviews'))
const Location   = dynamic(() => import('@/components/Location'))
const Reservation = dynamic(() => import('@/components/Reservation'))
const Instagram  = dynamic(() => import('@/components/Instagram'))
const Footer     = dynamic(() => import('@/components/Footer'))
const WhatsApp   = dynamic(() => import('@/components/WhatsApp'))

export default function Home() {
  return (
    <main className="bg-carbon overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reviews />
      <Location />
      <Reservation />
      <Instagram />
      <Footer />
      <WhatsApp />
    </main>
  )
}
