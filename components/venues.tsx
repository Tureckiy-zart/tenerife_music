
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { MapPin, Music, Users, Star, Navigation, X, Clock, Phone, Globe } from 'lucide-react'

interface Venue {
  id: number
  name: string
  location: string
  type: string
  capacity: string
  image: string
  description: string
  genres: string[]
  details: {
    address: string
    phone: string
    website: string
    hours: string
    features: string[]
  }
}

const mockVenues: Venue[] = [
  {
    id: 1,
    name: 'Auditorio de Tenerife',
    location: 'Santa Cruz de Tenerife',
    type: 'Concert Hall',
    capacity: '1,600',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Auditorio_de_Tenerife_2015_%2850MP%29.jpg',
    description: 'Iconic architectural masterpiece hosting world-class performances',
    genres: ['Classical', 'Jazz', 'Opera', 'Contemporary'],
    details: {
      address: 'Av. de la Constitución, 1, 38003 Santa Cruz de Tenerife',
      phone: '+34 922 568 600',
      website: 'auditoriodetenerife.com',
      hours: 'Mon-Sat: 10:00-20:00, Sun: Closed',
      features: ['World-class acoustics', 'Santiago Calatrava design', 'Premium seating', 'Full orchestra capabilities']
    }
  },
  {
    id: 2,
    name: 'Papagayo Beach Club',
    location: 'Playa de las Américas',
    type: 'Beach Club',
    capacity: '500',
    image: 'https://welikecanarias.com/wp-content/uploads/2025/05/Papagayo-Beach-Club-tenerife-1024x768.jpeg',
    description: 'Spectacular beachfront venue with sunset views and electronic vibes',
    genres: ['House', 'Electronic', 'Chill-out', 'Techno'],
    details: {
      address: 'Playa de Las Vistas, 38650 Arona',
      phone: '+34 922 787 549',
      website: 'papagayobeachclub.com',
      hours: 'Daily: 10:00-02:00',
      features: ['Oceanfront location', 'Sunset sessions', 'Premium sound system', 'VIP areas']
    }
  },
  {
    id: 3,
    name: 'Tramps Tenerife',
    location: 'Playa de las Américas',
    type: 'Nightclub',
    capacity: '800',
    image: 'https://mindtrip.ai/cdn-cgi/image/format=webp,w=720/https://tcdn.mindtrip.ai/images/317571/1jpo5c4.png',
    description: 'Underground electronic music temple with cutting-edge sound system',
    genres: ['Techno', 'Electronic', 'Underground', 'Progressive'],
    details: {
      address: 'Av. Rafael Puig Lluvina, 38660 Playa de las Américas',
      phone: '+34 922 796 234',
      website: 'trampstenerife.com',
      hours: 'Thu-Sat: 23:00-06:00',
      features: ['International DJs', 'State-of-the-art lighting', 'Multiple dance floors', 'VIP bottle service']
    }
  },
  {
    id: 4,
    name: 'Monkey Beach Club',
    location: 'Playa de Troya',
    type: 'Beach Club',
    capacity: '400',
    image: 'https://c8.alamy.com/comp/2PF86K5/monkey-beach-club-from-playa-de-troya-public-beach-playa-de-las-amrcias-tenerife-canary-islands-kingdom-of-spain-2PF86K5.jpg',
    description: 'Relaxed beachfront atmosphere with premium dining and live music',
    genres: ['House', 'Jazz', 'Acoustic', 'Chill-out'],
    details: {
      address: 'Playa de Troya, 38660 Adeje',
      phone: '+34 922 715 888',
      website: 'monkeybeachclub.com',
      hours: 'Daily: 09:00-01:00',
      features: ['Beachfront dining', 'Live music nights', 'Premium cocktails', 'Sunset views']
    }
  },
  {
    id: 5,
    name: 'NRG Club',
    location: 'Costa Adeje',
    type: 'Nightclub',
    capacity: '300',
    image: 'https://a.storyblok.com/f/116532/853x568/2c359b60f3/nrg-atl-atlanta.webp',
    description: 'Intimate club setting for underground electronic music experiences',
    genres: ['Techno', 'House', 'Electronic', 'Deep House'],
    details: {
      address: 'Calle Alcalde Walter Paetzmann, 38670 Adeje',
      phone: '+34 922 712 456',
      website: 'nrgclub.es',
      hours: 'Fri-Sat: 22:00-05:00',
      features: ['Intimate setting', 'Underground vibes', 'Quality sound system', 'Resident DJs']
    }
  }
]

export default function Venues() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)

  const VenueModal = ({ venue, onClose }: { venue: Venue | null, onClose: () => void }) => {
    if (!venue) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white/80 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative aspect-[4/3] bg-gray-200">
            <Image
              src={venue.image}
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
          
          <div className="p-6 pb-8 max-h-96 overflow-y-auto">
            <p className="text-gray-600 mb-6 leading-relaxed">{venue.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-[#00A6A6] mr-3" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Address</div>
                  <div className="text-gray-600 text-sm">{venue.details.address}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#00A6A6] mr-3" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Phone</div>
                  <div className="text-gray-600 text-sm">{venue.details.phone}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#00A6A6] mr-3" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Hours</div>
                  <div className="text-gray-600 text-sm">{venue.details.hours}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-[#00A6A6] mr-3" />
                <div>
                  <div className="font-semibold text-[#003A4D]">Website</div>
                  <div className="text-gray-600 text-sm">{venue.details.website}</div>
                </div>
              </div>
            </div>
            
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
            
            <div className="mt-6 mb-4">
              <h4 className="font-montserrat font-bold text-[#003A4D] mb-3">Features</h4>
              <ul className="space-y-2">
                {venue.details.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600 text-sm">
                    <Star className="w-4 h-4 text-[#00A6A6] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
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
          {mockVenues.map((venue, index) => (
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
                  src={venue.image}
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
                  {venue.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="bg-[#00A6A6]/10 text-[#003A4D] px-2 py-1 rounded-full text-xs font-medium h-fit"
                    >
                      {genre}
                    </span>
                  ))}
                  {venue.genres.length > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{venue.genres.length - 3} more
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
          ))}
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
