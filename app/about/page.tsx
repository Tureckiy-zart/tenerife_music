import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Tenerife.Music',
  description: 'Learn about Tenerife.Music and our mission to connect the island through music.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">About Tenerife.Music</h1>
        <p className="text-gray-600 max-w-3xl">Tenerife.Music is building the island’s music hub: events, venues, and culture in one place. This page will be expanded with team and roadmap details.</p>
      </section>
    </main>
  )
}


