
import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tenerife.music'),
  title: 'Tenerife.Music - Your Music Guide to Tenerife',
  description: 'Your complete festival and party aggregator for Tenerife. Discover concerts, festivals, and local artists in one place.',
  keywords: 'Tenerife, music, festivals, concerts, events, parties, techno, house, folk, Canarian music',
  authors: [{ name: 'Tenerife.Music' }],
  creator: 'Tenerife.Music',
  publisher: 'Tenerife.Music',
  alternates: {
    canonical: 'https://tenerife.music',
  },
  openGraph: {
    title: 'Tenerife.Music - Your Music Guide to Tenerife',
    description: 'Your complete festival and party aggregator for Tenerife. Discover concerts, festivals, and local artists in one place.',
    url: 'https://tenerife.music',
    siteName: 'Tenerife.Music',
    images: [
      {
        url: 'https://tenerife.music/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Tenerife.Music — Your Music Guide to Tenerife',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenerife.Music - Your Music Guide to Tenerife',
    description: 'Your complete festival and party aggregator for Tenerife',
    images: ['https://tenerife.music/og.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gray-50 font-poppins antialiased">
        {children}
      </body>
    </html>
  )
}
