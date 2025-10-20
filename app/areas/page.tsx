import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Music, Users, Calendar, ArrowRight, Star, Clock } from 'lucide-react'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Areas — Tenerife.Music',
  description: 'Explore events by area across Tenerife.',
  alternates: { canonical: '/areas' },
}

const areas = [
  {
    name: 'Santa Cruz de Tenerife',
    description: 'The capital city with a vibrant nightlife and cultural scene',
    image: '/images/hero-auditorio.jpg',
    events: 45,
    venues: 12,
    genres: ['Jazz', 'Classical', 'Electronic', 'Rock'],
    highlights: ['Auditorio de Tenerife', 'Plaza de España', 'Carnival celebrations'],
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Costa Adeje',
    description: 'Luxury resorts and beach clubs with international DJs',
    image: '/images/hero-dj-beach-club.jpg',
    events: 38,
    venues: 8,
    genres: ['House', 'Techno', 'Electronic', 'Chillout'],
    highlights: ['Beach clubs', 'Sunset sessions', 'International acts'],
    color: 'from-orange-500 to-red-600'
  },
  {
    name: 'La Laguna',
    description: 'Historic university town with indie and alternative music',
    image: '/images/hero-festival.jpg',
    events: 28,
    venues: 6,
    genres: ['Indie', 'Alternative', 'Folk', 'Rock'],
    highlights: ['University scene', 'Cultural venues', 'Local bands'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Puerto de la Cruz',
    description: 'Traditional Canarian culture meets modern music venues',
    image: '/images/hero-coastal-nightlife.jpg',
    events: 32,
    venues: 10,
    genres: ['Folk', 'Traditional', 'Jazz', 'Blues'],
    highlights: ['Traditional music', 'Historic venues', 'Cultural festivals'],
    color: 'from-purple-500 to-indigo-600'
  },
  {
    name: 'Los Cristianos',
    description: 'Tourist hotspot with diverse music offerings',
    image: '/images/hero-ocean-night.jpg',
    events: 25,
    venues: 7,
    genres: ['Pop', 'Rock', 'Electronic', 'Latin'],
    highlights: ['Tourist venues', 'Beach bars', 'International music'],
    color: 'from-pink-500 to-rose-600'
  },
  {
    name: 'La Orotava',
    description: 'Mountain town with intimate venues and local talent',
    image: '/images/hero-festival.jpg',
    events: 18,
    venues: 4,
    genres: ['Folk', 'Acoustic', 'Traditional', 'World'],
    highlights: ['Intimate venues', 'Local artists', 'Cultural heritage'],
    color: 'from-teal-500 to-cyan-600'
  }
]

export default function AreasPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#003A4D] via-[#004A5D] to-[#00A6A6] text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              Explore by Area
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Discover Tenerife's diverse music scenes across different areas. 
              From the bustling capital to serene mountain towns, each area offers its own unique musical character.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
              Music Areas Across Tenerife
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each area of Tenerife has its own musical identity. Explore the unique sounds and venues that define each location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Area Image */}
                <div className={`relative h-48 bg-gradient-to-br ${area.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                      {area.events} events
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{area.name}</h3>
                    <p className="text-white/90 text-sm">{area.description}</p>
                  </div>
                </div>

                {/* Area Content */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-[#00A6A6] mb-1">
                        <Music className="w-4 h-4" />
                        <span className="text-sm font-medium">Venues</span>
                      </div>
                      <div className="text-2xl font-bold text-[#003A4D]">{area.venues}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-[#00A6A6] mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">This Month</span>
                      </div>
                      <div className="text-2xl font-bold text-[#003A4D]">{area.events}</div>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Genres</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.genres.map((genre, genreIndex) => (
                        <span 
                          key={genreIndex}
                          className="px-3 py-1 bg-[#00A6A6]/10 text-[#00A6A6] rounded-full text-sm font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Highlights</h4>
                    <ul className="space-y-1">
                      {area.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <Star className="w-3 h-3 text-[#00A6A6] flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={`/events?area=${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#00A6A6] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#008A8A] transition-colors duration-300 group-hover:shadow-lg"
                  >
                    <span>Explore Events</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Can't Decide on an Area?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Browse all events across Tenerife or explore our venue guide to discover the perfect spot for your musical taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-[#003A4D] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>All Events</span>
            </Link>
            <Link 
              href="/venues" 
              className="inline-flex items-center justify-center space-x-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
            >
              <MapPin className="w-5 h-5" />
              <span>All Venues</span>
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}


