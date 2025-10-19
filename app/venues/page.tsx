import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Venues — Tenerife.Music',
  description: 'Find music venues across Tenerife. Full directory coming soon.',
  alternates: { canonical: '/venues' },
}

export default function VenuesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Venues</h1>
        <p className="text-gray-600">Coming soon: search and filters for clubs, concert halls, and beach clubs.</p>
      </section>
    </main>
  )
}


