import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Events — Tenerife.Music',
  description: 'Discover music events across Tenerife. Full listings coming soon.',
  alternates: { canonical: '/events' },
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <StructuredData events={[]} />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Events</h1>
        <p className="text-gray-600">Events directory will soon list concerts, festivals, and club nights. Explore venues and news in the meantime.</p>
      </section>
    </main>
  )
}


