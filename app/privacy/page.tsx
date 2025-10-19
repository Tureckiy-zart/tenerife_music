import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Tenerife.Music',
  description: 'Privacy policy describing how Tenerife.Music handles your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-4">Privacy Policy</h1>
        <p className="text-gray-600">This is a placeholder privacy policy for MVP. Final legal text will be added before launch.</p>
      </section>
    </main>
  )
}


