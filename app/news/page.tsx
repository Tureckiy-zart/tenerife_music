import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News — Tenerife.Music',
  description: 'Latest news and articles about Tenerife music scene.',
  alternates: { canonical: '/news' },
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">News</h1>
        <p className="text-gray-600">Starter posts will appear here soon. For now, explore Events and Venues.</p>
      </section>
    </main>
  )
}


