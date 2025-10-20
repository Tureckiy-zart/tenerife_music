import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Calendar, MapPin, Users, ArrowRight, Star, Headphones, Mic, Disc3, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Genres — Tenerife.Music',
  description: 'Browse events by genre. Filters coming soon.',
  alternates: { canonical: '/genres' },
}

const genres = [
  {
    name: 'Electronic',
    description: 'Techno, House, Trance, and Electronic Dance Music',
    icon: Disc3,
    events: 85,
    venues: 15,
    color: 'from-purple-500 to-pink-600',
    subgenres: ['Techno', 'House', 'Trance', 'Ambient', 'Dubstep'],
    highlights: ['Beach clubs', 'Underground venues', 'International DJs'],
    popularVenues: ['Ushuaïa Beach Club', 'Hard Rock Hotel', 'Papagayo Beach Club']
  },
  {
    name: 'Jazz',
    description: 'Traditional and contemporary jazz performances',
    icon: Music,
    events: 42,
    venues: 8,
    color: 'from-blue-500 to-indigo-600',
    subgenres: ['Traditional Jazz', 'Smooth Jazz', 'Fusion', 'Blues', 'Bebop'],
    highlights: ['Intimate venues', 'Acoustic sessions', 'Local legends'],
    popularVenues: ['Jazz Corner', 'Blue Note Tenerife', 'Auditorio de Tenerife']
  },
  {
    name: 'Rock',
    description: 'Alternative, Indie, and Classic Rock',
    icon: Headphones,
    events: 68,
    venues: 12,
    color: 'from-red-500 to-orange-600',
    subgenres: ['Alternative', 'Indie', 'Classic Rock', 'Punk', 'Metal'],
    highlights: ['Live bands', 'Festival stages', 'Local talent'],
    popularVenues: ['Rock Palace', 'The Garage', 'Underground Club']
  },
  {
    name: 'Folk & Traditional',
    description: 'Canarian folk music and traditional sounds',
    icon: Mic,
    events: 35,
    venues: 6,
    color: 'from-green-500 to-emerald-600',
    subgenres: ['Canarian Folk', 'Flamenco', 'Traditional', 'World Music', 'Acoustic'],
    highlights: ['Cultural heritage', 'Traditional instruments', 'Local artists'],
    popularVenues: ['Casa de la Cultura', 'Plaza del Adelantado', 'Teatro Guimerá']
  },
  {
    name: 'Pop',
    description: 'Mainstream pop and contemporary hits',
    icon: Star,
    events: 52,
    venues: 10,
    color: 'from-pink-500 to-rose-600',
    subgenres: ['Pop', 'Indie Pop', 'Electropop', 'Synthpop', 'K-Pop'],
    highlights: ['Chart hits', 'International acts', 'Mainstream venues'],
    popularVenues: ['Plaza de España', 'Centro Comercial', 'Beach Bars']
  },
  {
    name: 'Classical',
    description: 'Orchestral, chamber music, and classical performances',
    icon: Music,
    events: 28,
    venues: 4,
    color: 'from-indigo-500 to-purple-600',
    subgenres: ['Orchestral', 'Chamber Music', 'Opera', 'Symphony', 'Choral'],
    highlights: ['Concert halls', 'Professional orchestras', 'Cultural events'],
    popularVenues: ['Auditorio de Tenerife', 'Teatro Leal', 'Iglesia de la Concepción']
  },
  {
    name: 'Latin',
    description: 'Salsa, Reggaeton, and Latin American music',
    icon: Music,
    events: 45,
    venues: 9,
    color: 'from-yellow-500 to-orange-600',
    subgenres: ['Salsa', 'Reggaeton', 'Bachata', 'Merengue', 'Cumbia'],
    highlights: ['Dance floors', 'Latin clubs', 'International artists'],
    popularVenues: ['Salsa Club', 'Latin Quarter', 'Tropical Beach']
  },
  {
    name: 'Blues & Soul',
    description: 'Blues, Soul, and R&B performances',
    icon: Mic,
    events: 22,
    venues: 5,
    color: 'from-gray-600 to-blue-800',
    subgenres: ['Blues', 'Soul', 'R&B', 'Gospel', 'Funk'],
    highlights: ['Intimate venues', 'Late night sessions', 'Local legends'],
    popularVenues: ['Blues Corner', 'Soul Kitchen', 'The Basement']
  }
]

export default function GenresPage() {
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
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              Explore by Genre
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Dive into Tenerife's diverse music scene. From electronic beats to traditional folk, 
              discover the sounds that define the island's musical identity.
            </p>
          </div>
        </div>
      </section>

      {/* Genres Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
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
              Music Genres on Tenerife
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each genre tells a story of Tenerife's musical diversity. Explore the sounds that 
              bring the island to life, from traditional Canarian folk to cutting-edge electronic music.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {genres.map((genre, index) => {
              const IconComponent = genre.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
                  {/* Genre Header */}
                  <div className={`relative h-32 bg-gradient-to-br ${genre.color} overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                        {genre.events} events
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{genre.name}</h3>
                          <p className="text-white/90 text-sm">{genre.events} events this month</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Genre Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{genre.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-[#00A6A6] mb-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs font-medium">Events</span>
                        </div>
                        <div className="text-lg font-bold text-[#003A4D]">{genre.events}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-[#00A6A6] mb-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs font-medium">Venues</span>
                        </div>
                        <div className="text-lg font-bold text-[#003A4D]">{genre.venues}</div>
                      </div>
                    </div>

                    {/* Subgenres */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Subgenres</h4>
                      <div className="flex flex-wrap gap-1">
                        {genre.subgenres.slice(0, 3).map((subgenre, subIndex) => (
                          <span 
                            key={subIndex}
                            className="px-2 py-1 bg-[#00A6A6]/10 text-[#00A6A6] rounded text-xs font-medium"
                          >
                            {subgenre}
                          </span>
                        ))}
                        {genre.subgenres.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{genre.subgenres.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Highlights</h4>
                      <ul className="space-y-1">
                        {genre.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-center space-x-2 text-xs text-gray-600">
                            <Star className="w-3 h-3 text-[#00A6A6] flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button - Always at bottom */}
                    <div className="mt-auto">
                      <Link 
                        href={`/events?genre=${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full inline-flex items-center justify-center space-x-2 bg-[#00A6A6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#008A8A] transition-colors duration-300 group-hover:shadow-lg"
                      >
                        <span>Explore {genre.name}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Genre Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
              Popular This Month
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the most active genres and trending sounds across Tenerife's music scene.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Disc3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003A4D] mb-2">Electronic</h3>
              <p className="text-gray-600 mb-4">85 events this month</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003A4D] mb-2">Rock</h3>
              <p className="text-gray-600 mb-4">68 events this month</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full" style={{width: '68%'}}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003A4D] mb-2">Pop</h3>
              <p className="text-gray-600 mb-4">52 events this month</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-rose-600 h-2 rounded-full" style={{width: '52%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Ready to Discover Your Sound?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Browse all events by genre or explore our comprehensive venue guide to find the perfect musical experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-[#003A4D] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Browse All Events</span>
            </Link>
            <Link 
              href="/venues" 
              className="inline-flex items-center justify-center space-x-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
            >
              <MapPin className="w-5 h-5" />
              <span>Explore Venues</span>
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}


