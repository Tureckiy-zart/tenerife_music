import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import venues from '@/data/venues_tenerife.json'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import PageHeader from '@/components/page-header-fixed'
import BackNavigation from '@/components/back-navigation'

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
        <PageHeader
          icon={<MapPin className="w-10 h-10 text-white" />}
          title="Venues"
          description="Explore Tenerife's best music venues. From intimate clubs to grand concert halls."
        />

        {/* Venues Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <BackNavigation />

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
                Music Venues Directory
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Directory powered by real data (MVP). Details and maps will follow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((v) => (
                <article key={v.venue_id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group border border-gray-100 hover:border-[#00A6A6]/20">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-montserrat font-bold text-[#003A4D] group-hover:text-[#00A6A6] transition-colors duration-200 flex-1">{v.name}</h3>
                    <div className="bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white px-3 py-1 rounded-full text-xs font-semibold ml-2 shadow-sm">
                      {v.events_count || 0}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4 font-medium">{v.address}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {v.type && (
                      <span className="bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        {v.type}
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                      {v.events_count || 0} events
                    </span>
                  </div>
                  {v.website && (
                    <a href={v.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#003A4D] hover:text-[#00A6A6] font-medium text-sm transition-colors duration-200 group/link">
                      <span className="group-hover/link:underline">Visit Website</span>
                      <span className="ml-1 group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
    </main>
    <Footer />
    </>
  )
}


