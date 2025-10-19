import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Areas — Tenerife.Music',
  description: 'Explore events by area across Tenerife.',
  alternates: { canonical: '/areas' },
}

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Areas</h1>
        <p className="text-gray-600">Santa Cruz, La Laguna, Costa Adeje and more — area pages will provide local lineups.</p>
      </section>
    </main>
  )
}


