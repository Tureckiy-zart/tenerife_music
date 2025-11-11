
import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
  other: {
    'impact-site-verification': [
      '38b54250-bae6-45bf-aa41-cb8336c84d6d',
      'b0930766-c41f-4b67-8796-0b2a58429806',
    ],
  },
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
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Tenerife.Music',
            url: 'https://tenerife.music',
            logo: 'https://tenerife.music/og.jpg',
            sameAs: [
              'https://instagram.com/',
              'https://tiktok.com/',
              'https://twitter.com/'
            ]
          })}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://tenerife.music',
            name: 'Tenerife.Music',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://tenerife.music/?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })}
        </Script>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3NJ3YXE0T5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3NJ3YXE0T5');
          `}
        </Script>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
