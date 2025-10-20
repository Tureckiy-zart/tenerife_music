import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import events from '@/data/events_tenerife.json'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import EventsFilter from '@/components/events-filter'
import PageHeader from '@/components/page-header-fixed'
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
        <PageHeader
          icon={<Calendar className="w-10 h-10 text-white" />}
          title="Events"
          description="Discover the best music events across Tenerife. From classical concerts to beach parties."
        />

        {/* Events Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <BackNavigation />

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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
