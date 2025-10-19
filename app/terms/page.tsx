import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Tenerife.Music',
  description: 'Terms and conditions for using Tenerife.Music.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Terms of Service</h1>
        <p className="text-gray-600">Placeholder terms for MVP. Final legal copy will be provided before public release.</p>
      </section>
    </main>
  )
}


