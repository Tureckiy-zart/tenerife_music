
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Calendar, MapPin, Music, X, Bell, Ticket, Tag } from 'lucide-react'
import { useUniversalFilter, FilterConfig } from '@/components/ui/universal-filter'

// ============================================================
// TYPE DEFINITIONS
// ============================================================

interface Event {
  id: string
  title: string
  date: string
  startDate: string
  endDate: string
  venue: string
  venueId: string
  location: string
  coordinates: { lat?: number; lng?: number }
  genre: string
  genres: string[]
  tags: string[]
  image: string
  description: string
  time: string
  ticketPrice: string
  priceMin: number
  priceMax: number
  currency: string
  ticketUrl: string
  performers: string[]
  source: string
  featured: boolean
}

// ============================================================
// FILTER CONFIGURATION
// ============================================================

const filterConfigs: FilterConfig[] = [
  {
    id: 'genres',
    label: 'Genre',
    type: 'tags',
    options: [
      { value: 'classical', label: 'Classical' },
      { value: 'opera', label: 'Opera' },
      { value: 'electronic', label: 'Electronic' },
      { value: 'jazz', label: 'Jazz' },
      { value: 'house', label: 'House' },
      { value: 'techno', label: 'Techno' },
      { value: 'latin', label: 'Latin' },
      { value: 'folk', label: 'Folk' },
      { value: 'symphonic', label: 'Symphonic' },
      { value: 'baroque', label: 'Baroque' },
    ],
    defaultValue: [],
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'tags',
    options: [
      { value: 'indoor', label: 'Indoor' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'beach', label: 'Beach' },
      { value: 'club', label: 'Club' },
      { value: 'festival', label: 'Festival' },
      { value: 'free-entry', label: 'Free' },
      { value: 'family', label: 'Family' },
    ],
    defaultValue: [],
  },
  {
    id: 'priceMin',
    label: 'Price Range',
    type: 'range',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: [0, 100],
    filterFn: (item: Event, value: number[]) => {
      const [min, max] = value
      return item.priceMin >= min && item.priceMax <= max
    },
  },
]

// ============================================================
// EVENTS COMPONENT
// ============================================================

export default function EventsRefactored() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showComingSoon, setShowComingSoon] = useState(false)

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Загрузка событий из API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Использование универсального фильтра
  const {
    filteredData: filteredEvents,
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    resetFilters,
    activeFilterCount,
  } = useUniversalFilter<Event>(events, filterConfigs, {
    enabled: true,
    placeholder: 'Search events, venues, performers...',
    searchKeys: ['title', 'venue', 'description', 'performers'],
  })

  // ============================================================
  // MODALS
  // ============================================================

  const EventDetailsModal = ({ event }: { event: Event }) => {
    useEffect(() => {
      if (event) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.paddingRight = `${scrollbarWidth}px`
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.paddingRight = ''
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.paddingRight = ''
        document.body.style.overflow = 'unset'
      }
    }, [event])

    if (!event) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setSelectedEvent(null)}
            className="sticky top-4 float-right mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white rounded-full shadow-lg z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Event Image */}
          <div className="relative aspect-video bg-gray-200">
            <Image src={event.image || 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png'} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {(event.genres || []).slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="bg-[#003A4D] text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white">
                {event.title}
              </h3>
            </div>
          </div>

          <div className="p-6">
            {/* Event Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-3 text-[#00A6A6] flex-shrink-0" />
                <div>
                  <div className="font-medium">{event.date}</div>
                  <div className="text-sm text-gray-500">{event.time}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-[#00A6A6] flex-shrink-0" />
                <div>
                  <div className="font-medium">{event.venue}</div>
                  <div className="text-sm text-gray-500">{event.location}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Ticket className="w-5 h-5 mr-3 text-[#00A6A6] flex-shrink-0" />
                <div className="font-medium">{event.ticketPrice}</div>
              </div>
              {event.tags.length > 0 && (
                <div className="flex items-start text-gray-700">
                  <Tag className="w-5 h-5 mr-3 text-[#00A6A6] flex-shrink-0 mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="font-montserrat font-bold text-gray-900 mb-2">
                About this event
              </h4>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Performers */}
            {event.performers.length > 0 && (
              <div className="mb-6">
                <h4 className="font-montserrat font-bold text-gray-900 mb-2">
                  Performers
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {event.performers.map((performer, i) => (
                    <li key={i}>{performer}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedEvent(null)
                  setShowComingSoon(true)
                }}
                className="flex-1 bg-gradient-to-r from-[#003A4D] to-[#00536B] text-white py-3 rounded-lg font-poppins font-medium hover:shadow-lg transition-all duration-300"
              >
                Get Tickets
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-poppins font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ComingSoonModal = () => {
    useEffect(() => {
      if (showComingSoon) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.paddingRight = `${scrollbarWidth}px`
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.paddingRight = ''
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.paddingRight = ''
        document.body.style.overflow = 'unset'
      }
    }, [showComingSoon])

    if (!showComingSoon) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowComingSoon(false)}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 pb-10 max-w-md w-full">
          <button
            onClick={() => setShowComingSoon(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="bg-[#00A6A6] p-3 rounded-full w-fit mx-auto mb-4">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">
              Tickets Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              We're working with event organizers to bring you seamless ticket purchasing.
              Subscribe to get notified when tickets become available!
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="bg-[#00A6A6] hover:bg-[#00C4C4] text-white px-6 py-3 rounded-full font-poppins font-semibold transition-colors duration-200 w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[#003A4D] mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover {events.length}+ music events happening across Tenerife
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search events, venues, performers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-[#00A6A6] focus:outline-none text-gray-700 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 justify-center">
            {/* Genre Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filterConfigs[0].options?.map((option) => {
                const isActive =
                  Array.isArray(activeFilters.genres) &&
                  activeFilters.genres.includes(option.value)
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      const current = Array.isArray(activeFilters.genres)
                        ? activeFilters.genres
                        : []
                      const updated = isActive
                        ? current.filter((v) => v !== option.value)
                        : [...current, option.value]
                      updateFilter('genres', updated)
                    }}
                    className={`px-4 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#006666] text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#00A6A6] shadow-sm'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filterConfigs[1].options?.slice(0, 5).map((option) => {
                const isActive =
                  Array.isArray(activeFilters.tags) &&
                  activeFilters.tags.includes(option.value)
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      const current = Array.isArray(activeFilters.tags)
                        ? activeFilters.tags
                        : []
                      const updated = isActive
                        ? current.filter((v) => v !== option.value)
                        : [...current, option.value]
                      updateFilter('tags', updated)
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#B45309] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium hover:bg-red-100 transition-colors duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reset ({activeFilterCount})
              </button>
            )}
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A6A6]"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Music className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600 mb-2">No events found</p>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer h-[480px] flex flex-col"
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image || 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png'}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-[#00A6A6] text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {event.genre}
                    </span>
                    {event.priceMin === 0 && (
                      <span className="bg-[#B45309] text-white px-3 py-1 rounded-full text-xs font-medium font-bold">
                        Free
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-montserrat font-bold text-[#003A4D] mb-3 line-clamp-2 min-h-[3.5rem]">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-[#00A6A6]" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-[#00A6A6]" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {event.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedEvent(event)
                    }}
                    className="w-full bg-gradient-to-r from-[#003A4D] to-[#00536B] text-white py-2.5 rounded-lg font-poppins font-medium hover:shadow-lg transition-all duration-300 hover:from-[#00536B] hover:to-[#00A6A6] mt-auto"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Results Count */}
        {!loading && filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-gray-600"
          >
            Showing {filteredEvents.length} of {events.length} events
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {selectedEvent && <EventDetailsModal event={selectedEvent} />}
      <ComingSoonModal />
    </section>
  )
}
