import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Genres — Tenerife.Music',
  description: 'Browse events by genre. Filters coming soon.',
  alternates: { canonical: '/genres' },
}

export default function GenresPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Genres</h1>
        <p className="text-gray-600">Techno, House, Jazz, Folk and more — genre pages will host curated listings.</p>
      </section>
    </main>
  )
}


