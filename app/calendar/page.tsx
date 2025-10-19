import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendar — Tenerife.Music',
  description: 'Monthly music calendar for Tenerife (coming soon).',
  alternates: { canonical: '/calendar' },
}

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Calendar</h1>
        <p className="text-gray-600">A full events calendar view will be available here soon.</p>
      </section>
    </main>
  )
}


