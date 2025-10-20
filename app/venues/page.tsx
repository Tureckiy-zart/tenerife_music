import type { Metadata } from 'next'
import venues from '@/data/venues_tenerife.json'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Venues — Tenerife.Music',
  description: 'Find music venues across Tenerife: clubs, concert halls, beach clubs.',
  alternates: { canonical: '/venues' },
}

export default async function VenuesPage() {
  const list = (venues as any[]).sort((a, b) => (b.events_count || 0) - (a.events_count || 0))

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#003A4D] to-[#00536B] text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Venues</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Explore Tenerife's best music venues. From intimate clubs to grand concert halls.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-2">Music Venues Directory</h2>
            <p className="text-gray-600">Directory powered by real data (MVP). Details and maps will follow.</p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v) => (
            <article key={v.venue_id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-montserrat font-bold text-[#003A4D] group-hover:text-[#00A6A6] transition-colors duration-200 flex-1">{v.name}</h3>
                <div className="bg-[#00A6A6]/10 text-[#003A4D] px-2 py-1 rounded-full text-xs font-semibold ml-2">
                  {v.events_count || 0}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4 font-medium">{v.address}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {v.type && (
                  <span className="bg-[#00A6A6]/10 text-[#003A4D] px-3 py-1 rounded-full text-xs font-medium hover:bg-[#00A6A6]/20 transition-colors duration-200">
                    {v.type}
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {v.events_count || 0} events
                </span>
              </div>
              {v.website && (
                <a href={v.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#003A4D] hover:text-[#00A6A6] font-medium text-sm transition-colors duration-200">
                  Visit Website →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}


