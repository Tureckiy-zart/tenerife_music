import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import events from '@/data/events_tenerife.json'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import EventsFilter from '@/components/events-filter'
import BackNavigation from '@/components/back-navigation'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Events — Tenerife.Music',
  description: 'Discover music events across Tenerife: concerts, festivals, club nights.',
  alternates: { canonical: '/events' },
}


export default async function EventsPage() {
  const allEvents = (events as any[]).slice(0, 36)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#003A4D] via-[#004A5D] to-[#00A6A6] text-white overflow-hidden h-[60vh] min-h-[500px] flex items-center">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 w-full">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
                Events
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Discover the best music events across Tenerife. From classical concerts to beach parties.
              </p>
            </div>
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

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
              Discover Tenerife's Music Scene
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From intimate classical concerts to vibrant beach parties, explore the island's diverse music calendar. 
              Find your perfect event and immerse yourself in Tenerife's rich cultural landscape.
            </p>
          </div>

          {/* Events List with Filter */}
          <EventsFilter allEvents={allEvents} />
        </section>
      </main>
      <Footer />
    </>
  )
}
