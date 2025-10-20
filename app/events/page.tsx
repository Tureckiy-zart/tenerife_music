'use client'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { useState, useMemo } from 'react'
import events from '@/data/events_tenerife.json'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

// Note: Metadata moved to layout.tsx for client components

function formatDateRange(startISO?: string, endISO?: string) {
  if (!startISO) return ''
  const start = new Date(startISO)
  const end = endISO ? new Date(endISO) : undefined
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const startStr = start.toLocaleDateString('en-GB', opts)
  const endStr = end ? end.toLocaleDateString('en-GB', opts) : undefined
  return endStr && endStr !== startStr ? `${startStr} – ${endStr}` : startStr
}

export default function EventsPage() {
  const allEvents = (events as any[]).slice(0, 36)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  // Get all unique genres from events
  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    allEvents.forEach(event => {
      if (event.genres) {
        event.genres.forEach((genre: string) => genres.add(genre))
      }
    })
    return Array.from(genres).sort()
  }, [allEvents])

  // Filter events based on selected genres
  const filteredEvents = useMemo(() => {
    if (selectedGenres.length === 0) return allEvents
    return allEvents.filter(event => 
      event.genres && event.genres.some((genre: string) => selectedGenres.includes(genre))
    )
  }, [allEvents, selectedGenres])

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
  }

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
            <h2 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-2">Upcoming Events</h2>
            <p className="text-gray-600">Real data from Tenerife events (MVP). Filters and detail pages will follow.</p>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-[#003A4D]">Filter by Genre:</h3>
              {selectedGenres.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-[#00A6A6] transition-colors duration-200"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear all
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedGenres.includes(genre)
                      ? 'bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white shadow-lg'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-[#00A6A6] hover:text-[#00A6A6]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {selectedGenres.length > 0 && (
              <div className="text-sm text-gray-600">
                Showing {filteredEvents.length} of {allEvents.length} events
                {selectedGenres.length > 0 && (
                  <span className="ml-2">
                    filtered by: <span className="font-semibold text-[#00A6A6]">{selectedGenres.join(', ')}</span>
                  </span>
                )}
              </div>
            )}
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((e) => {
            const img = e.image_url && e.image_url.length > 0 ? e.image_url : '/images/hero-festival.jpg'
            return (
              <article key={e.event_id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 hover:border-[#00A6A6]/20">
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <Image src={img} alt={e.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#003A4D]">Live</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <h3 className="text-lg font-montserrat font-bold text-[#003A4D] group-hover:text-[#00A6A6] transition-colors duration-200">{e.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{formatDateRange(e.start_date, e.end_date)}</span>
                  </div>
                  <div className="text-sm text-gray-700 flex items-center">
                    <span className="truncate font-medium">{e.venue?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(e.genres || []).slice(0, 3).map((g: string) => (
                      <button
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 ${
                          selectedGenres.includes(g)
                            ? 'bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white'
                            : 'bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white hover:from-[#00C4C4] hover:to-[#00A6A6]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-3">
                    {e.ticket_url && (
                      <a href={e.ticket_url} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-white bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] hover:from-[#00C4C4] hover:to-[#00A6A6] px-4 py-3 rounded-lg text-sm font-poppins font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                        Get Tickets
                      </a>
                    )}
                    {e.source_url && (
                      <a href={e.source_url} target="_blank" rel="noopener noreferrer" className="text-[#003A4D] hover:text-[#00A6A6] underline text-sm font-medium transition-colors duration-200 flex items-center">
                        Source →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}


