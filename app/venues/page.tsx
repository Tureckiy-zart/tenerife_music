import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import venues from '@/data/venues_tenerife.json'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#003A4D] to-[#00536B] text-white py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A6A6]/10 to-transparent"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#00A6A6]/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#00C4C4]/20 rounded-full blur-xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
              <div className="w-4 h-4 bg-[#00A6A6] rounded-full"></div>
              <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Venues</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Explore Tenerife's best music venues. From intimate clubs to grand concert halls.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-[#003A4D] hover:text-[#00A6A6] transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-2">Music Venues Directory</h2>
            <p className="text-gray-600">Directory powered by real data (MVP). Details and maps will follow.</p>
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
      </section>
    </main>
    <Footer />
    </>
  )
}


