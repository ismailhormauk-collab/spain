import type { Metadata } from 'next'
import { Playfair_Display, Raleway } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const RESTAURANT_NAME = 'La Calavera'
const CITY = 'San José'
const PROVINCE = 'Almería'
const SITE_URL = 'https://lacalavera-sanjose.es'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${RESTAURANT_NAME} | Restaurante Italiano y Mediterráneo en ${CITY}, ${PROVINCE}`,
    template: `%s | ${RESTAURANT_NAME} - ${CITY}, ${PROVINCE}`,
  },
  description:
    'La Calavera – el mejor restaurante italiano y mediterráneo en San José, Almería. Pizzas artesanales, pasta fresca y sabores del Mediterráneo en el Parque Natural Cabo de Gata. Reserva tu mesa hoy.',
  keywords: [
    'restaurante San José Almería',
    'mejor restaurante Almería',
    'pizzería San José',
    'restaurante Cabo de Gata',
    'cocina italiana Almería',
    'restaurante mediterráneo Almería',
    'La Calavera restaurante',
    'pizzas artesanales Almería',
    'restaurante cerca de mí Almería',
    'fine dining Almería',
    'restaurante gastronómico Almería',
    'reservar mesa San José Almería',
    'restaurante familiar Almería',
    'comida italiana Almería',
    'gastronomía Cabo de Gata',
  ],
  authors: [{ name: RESTAURANT_NAME }],
  creator: RESTAURANT_NAME,
  publisher: RESTAURANT_NAME,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: RESTAURANT_NAME,
    title: `${RESTAURANT_NAME} | Restaurante Italiano y Mediterráneo en ${CITY}, ${PROVINCE}`,
    description:
      'Descubre La Calavera, el restaurante italiano y mediterráneo en el corazón del Parque Natural Cabo de Gata. Pizzas artesanales, pasta fresca y experiencias gastronómicas únicas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La Calavera - Restaurante en San José, Almería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${RESTAURANT_NAME} | Restaurante en ${CITY}, ${PROVINCE}`,
    description:
      'Cocina italiana y mediterránea en San José, Almería. Pizzas artesanales y pasta fresca en el Cabo de Gata.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'La Calavera',
  image: `${SITE_URL}/og-image.jpg`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: '+34610091689',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C. Correo, 37',
    addressLocality: 'San José',
    postalCode: '04118',
    addressCountry: 'ES',
    addressRegion: 'Almería',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.7632162,
    longitude: -2.10937,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
      ],
      opens: '12:00',
      closes: '23:30',
    },
  ],
  servesCuisine: ['Italian', 'Mediterranean', 'Pizza'],
  priceRange: '€€',
  description:
    'Restaurante de cocina italiana y mediterránea en San José, Almería. Pizzas artesanales, pasta fresca y los mejores sabores del Mediterráneo en el Parque Natural Cabo de Gata.',
  hasMap: 'https://goo.gl/maps/RnfGjs72peqifZXQ7',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.3',
    reviewCount: '58',
    bestRating: '5',
    worstRating: '1',
  },
  menu: `${SITE_URL}#menu`,
  reservationUrl: `${SITE_URL}#reservas`,
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Acceso para sillas de ruedas', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Reservas', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Servicio a domicilio', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Para llevar', value: true },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es el horario de La Calavera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Calavera abre todos los días de 12:00 a 23:30, incluidos fines de semana y festivos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde está ubicado el restaurante La Calavera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Calavera se encuentra en C. Correo, 37, 04118 San José, Almería, en el corazón del Parque Natural Cabo de Gata-Níjar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo reservar mesa en La Calavera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puedes reservar mesa llamando al +34 610 091 689 o a través del formulario de reservas en nuestra web.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de cocina ofrece La Calavera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Calavera ofrece cocina italiana y mediterránea, especializada en pizzas artesanales de masa fina, pastas frescas y platos de temporada con ingredientes locales.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${raleway.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${raleway.className} bg-carbon text-hueso antialiased`}>
        {children}
      </body>
    </html>
  )
}
