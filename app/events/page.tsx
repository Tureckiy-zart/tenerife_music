import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <BackNavigation />
        </div>
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
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Events</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Discover the best music events across Tenerife. From classical concerts to beach parties.
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

          <div className="text-center mb-8">
            <h2 className="text-3xl font-montserrat font-bold text-[#003A4D] mb-4">Discover Tenerife's Music Scene</h2>
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
