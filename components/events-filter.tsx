'use client'

import { useState } from 'react'
import Image from 'next/image'
import FilterPanel from './filter-panel'

interface EventsFilterProps {
  allEvents: any[]
}

function formatDateRange(startISO?: string, endISO?: string) {
  if (!startISO) return ''
  const start = new Date(startISO)
  const end = endISO ? new Date(endISO) : undefined
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const startStr = start.toLocaleDateString('en-GB', opts)
  const endStr = end ? end.toLocaleDateString('en-GB', opts) : undefined
  return endStr && endStr !== startStr ? `${startStr} – ${endStr}` : startStr
}

export default function EventsFilter({ allEvents }: EventsFilterProps) {
  const [filteredEvents, setFilteredEvents] = useState(allEvents)

  return (
    <>
      {/* Filter Section */}
      <FilterPanel
        allItems={allEvents}
        searchFields={['name', 'venue.name']}
        genreField="genres"
        onFilteredItems={setFilteredEvents}
        searchPlaceholder="Search events by name or venue..."
        title="Filter by Genre"
      />

      {/* Events Grid */}
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
    </>
  )
}