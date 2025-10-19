import type { Metadata } from 'next'
import venues from '@/data/venues_tenerife.json'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Venues — Tenerife.Music',
  description: 'Find music venues across Tenerife: clubs, concert halls, beach clubs.',
  alternates: { canonical: '/venues' },
}

export default async function VenuesPage() {
  const list = (venues as any[]).sort((a, b) => (b.events_count || 0) - (a.events_count || 0))

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-2">Venues</h1>
        <p className="text-gray-600 mb-8">Directory powered by real data (MVP). Details and maps will follow.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v) => (
            <article key={v.venue_id} className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-montserrat font-bold text-[#003A4D] mb-1">{v.name}</h3>
              <div className="text-sm text-gray-600 mb-2">{v.address}</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {v.type && (
                  <span className="bg-[#00A6A6]/10 text-[#003A4D] px-2 py-1 rounded-full text-xs font-medium">{v.type}</span>
                )}
                <span className="bg-black/5 text-[#003A4D] px-2 py-1 rounded-full text-xs font-medium">{v.events_count || 0} events</span>
              </div>
              {v.website && (
                <a href={v.website} target="_blank" rel="noopener noreferrer" className="text-[#003A4D] hover:text-[#00536B] underline text-sm">
                  Website
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}


