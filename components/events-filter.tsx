'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface EventsFilterProps {
  allEvents: any[]
  formatDateRange: (start?: string, end?: string) => string
}

export default function EventsFilter({ allEvents, formatDateRange }: EventsFilterProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [filterMode, setFilterMode] = useState<'OR' | 'AND'>('OR')
  const [searchQuery, setSearchQuery] = useState<string>('')

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

  // Filter events based on selected genres and search query
  const filteredEvents = useMemo(() => {
    let filtered = allEvents

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.venue?.name && event.venue.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply genre filter
    if (selectedGenres.length > 0) {
      if (filterMode === 'AND') {
        // Must contain ALL selected genres
        filtered = filtered.filter(event => 
          event.genres && selectedGenres.every((selectedGenre: string) => 
            event.genres.includes(selectedGenre)
          )
        )
      } else {
        // Must contain ANY selected genre (OR logic)
        filtered = filtered.filter(event => 
          event.genres && event.genres.some((genre: string) => selectedGenres.includes(genre))
        )
      }
    }

    return filtered
  }, [allEvents, selectedGenres, filterMode, searchQuery])

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSearchQuery('')
  }

  return (
    <>
      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search events by name or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6] transition-colors duration-200 text-lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <h3 className="text-xl font-bold text-[#003A4D]">Filter by Genre</h3>
          
          {/* Improved Filter Mode Toggle */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => setFilterMode('OR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filterMode === 'OR'
                  ? 'bg-[#00A6A6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#00A6A6]'
              }`}
            >
              Show any genre
            </button>
            <button
              onClick={() => setFilterMode('AND')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filterMode === 'AND'
                  ? 'bg-[#00A6A6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#00A6A6]'
              }`}
            >
              Show all genres
            </button>
          </div>

          {(selectedGenres.length > 0 || searchQuery.trim()) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#00A6A6] transition-colors duration-200 ml-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedGenres.includes(genre)
                  ? 'bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#00A6A6] hover:text-white hover:shadow-md'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {(selectedGenres.length > 0 || searchQuery.trim()) && (
          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            Showing {filteredEvents.length} of {allEvents.length} events
            {searchQuery.trim() && (
              <span className="ml-2">
                matching "<span className="font-semibold text-[#00A6A6]">{searchQuery}</span>"
              </span>
            )}
            {selectedGenres.length > 0 && (
              <span className="ml-2">
                filtered by: <span className="font-semibold text-[#00A6A6]">{selectedGenres.join(', ')}</span>
                <span className="ml-1 text-gray-500">
                  ({filterMode === 'AND' ? 'must contain ALL' : 'must contain ANY'})
                </span>
              </span>
            )}
          </div>
        )}
      </div>

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