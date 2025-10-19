import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookies Policy — Tenerife.Music',
  description: 'Information about cookies used by Tenerife.Music.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Cookies Policy</h1>
        <p className="text-gray-600">Placeholder cookies policy for MVP. We’ll add details about essential and analytics cookies.</p>
      </section>
    </main>
  )
}


