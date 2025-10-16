
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { MapPin, Music, Users, Star, Navigation, X, Clock, Phone, Globe } from 'lucide-react'

interface Venue {
  id: string
  name: string
  location: string
  type: string
  capacity: string
  image: string
  description: string
  genres: string[]
  address: string
  phone: string | null
  website: string | null
  hours: string | null
  features: string[]
}

export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Загрузка площадок из API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('/api/venues')
        const data = await response.json()
        setVenues(data)
      } catch (error) {
        console.error('Error fetching venues:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVenues()
  }, [])
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)

  const VenueModal = ({ venue, onClose }: { venue: Venue | null, onClose: () => void }) => {
    useEffect(() => {
      if (venue) {
        // Получаем ширину scrollbar
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        // Добавляем padding, чтобы компенсировать исчезновение scrollbar
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
    }, [venue])

    if (!venue) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 flex flex-col max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-200 transition-colors duration-200 bg-black/30 hover:bg-black/50 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Fixed Header with Image */}
          <div className="relative h-64 bg-gray-200 rounded-t-2xl overflow-hidden flex-shrink-0">
            <Image
              src={venue.image || 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png'}
              alt={venue.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="bg-[#00A6A6]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-2 w-fit">
                {venue.type}
              </div>
              <h2 className="text-3xl font-montserrat font-bold mb-1">{venue.name}</h2>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {venue.location}
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <p className="text-gray-600 mb-6 leading-relaxed">{venue.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#00A6A6] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Address</div>
                  <div className="text-gray-600 text-sm">{venue.address}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-[#00A6A6] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Phone</div>
                  <div className="text-gray-600 text-sm">{venue.phone}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-[#00A6A6] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Hours</div>
                  <div className="text-gray-600 text-sm">{venue.hours}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-[#00A6A6] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Website</div>
                  <div className="text-gray-600 text-sm">{venue.website}</div>
                </div>
              </div>
            </div>
            
            {Array.isArray(venue.genres) && venue.genres.length > 0 && (
              <div className="mt-6">
                <h4 className="font-montserrat font-bold text-[#003A4D] mb-3">Music Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {venue.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-[#00A6A6]/10 text-[#003A4D] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {Array.isArray(venue.features) && venue.features.length > 0 && (
              <div className="mt-6 pb-4">
                <h4 className="font-montserrat font-bold text-[#003A4D] mb-3">Features</h4>
                <ul className="space-y-2">
                  {venue.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600 text-sm">
                      <Star className="w-4 h-4 text-[#00A6A6] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="venues" className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[#003A4D] mb-6">
            Music Venues
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From world-class concert halls to intimate beach clubs, discover where music comes alive in Tenerife
          </p>
        </motion.div>

        {/* Interactive Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#003A4D] to-[#00536B] rounded-3xl p-8 mb-16 text-white text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
            <Navigation className="w-16 h-16 text-[#00A6A6] mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-montserrat font-bold mb-4">
              Interactive Map Coming Soon
            </h3>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Explore all music venues across Tenerife with our interactive map featuring real-time event information, 
              directions, and venue details.
            </p>
          </div>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A6A6]"></div>
              <p className="mt-4 text-gray-600">Loading venues...</p>
            </div>
          ) : venues.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600">No venues found</p>
            </div>
          ) : (
            venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedVenue(venue)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer h-[580px] flex flex-col"
            >
              {/* Venue Image */}
              <div className="relative aspect-[4/3] bg-gray-200 flex-shrink-0">
                <Image
                  src={venue.image || 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png'}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Venue Type Badge */}
                <div className="absolute top-4 right-4 bg-[#00A6A6]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {venue.type}
                </div>

                {/* Capacity Badge */}
                <div className="absolute bottom-4 left-4 flex items-center bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {venue.capacity}
                </div>
              </div>

              {/* Venue Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-montserrat font-bold text-[#003A4D] mb-2 min-h-[3.5rem]">
                  {venue.name}
                </h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-[#00A6A6]" />
                  {venue.location}
                </div>

                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {venue.description}
                </p>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                  {venue.genres?.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="bg-[#00A6A6]/10 text-[#003A4D] px-2 py-1 rounded-full text-xs font-medium h-fit"
                    >
                      {genre}
                    </span>
                  ))}
                  {(venue.genres?.length ?? 0) > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{(venue.genres?.length ?? 0) - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">Featured Venue</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedVenue(venue)
                    }}
                    className="text-[#00A6A6] hover:text-[#003A4D] font-medium text-sm transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))
          )}
        </div>

        {/* Quick Venue Access */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Music className="w-12 h-12 text-[#00A6A6] mx-auto mb-4" />
            <h3 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">
              Find Your Perfect Venue
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Whether you're planning an intimate acoustic session or a massive electronic event, 
              we'll help you find the perfect venue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="bg-[#00A6A6]/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h4 className="font-montserrat font-bold text-[#003A4D] mb-2">Capacity Matching</h4>
              <p className="text-sm text-gray-600">Find venues that match your event size</p>
            </div>
            <div className="p-4">
              <div className="bg-[#00A6A6]/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Music className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h4 className="font-montserrat font-bold text-[#003A4D] mb-2">Genre Expertise</h4>
              <p className="text-sm text-gray-600">Venues specialized in your music style</p>
            </div>
            <div className="p-4">
              <div className="bg-[#00A6A6]/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h4 className="font-montserrat font-bold text-[#003A4D] mb-2">Location Perfect</h4>
              <p className="text-sm text-gray-600">Choose the ideal location for your audience</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Venue Modal */}
      <VenueModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
    </section>
  )
}
