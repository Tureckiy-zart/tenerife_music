import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Users, MapPin, Calendar, Heart, ArrowRight, Star, Globe, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/navigation'
import BackNavigation from '@/components/back-navigation'

export const metadata: Metadata = {
  title: 'About — Tenerife.Music',
  description: 'Learn about Tenerife.Music and our mission to connect the island through music.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
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
              About Tenerife.Music
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Connecting the island through music — your gateway to Tenerife's vibrant music scene, 
              from intimate jazz clubs to spectacular festivals under the stars.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
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

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tenerife.Music is building the island's premier music hub, bringing together 
                events, venues, artists, and music lovers in one comprehensive platform. 
                We believe music is the universal language that connects us all.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From the bustling streets of Santa Cruz to the serene beaches of Costa Adeje, 
                we're creating a community where every music lover can discover their next 
                favorite venue, artist, or unforgettable experience.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center space-x-2 bg-[#00A6A6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#008A8A] transition-colors duration-300"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00A6A6] to-[#003A4D] rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm text-white/80">Events Listed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm text-white/80">Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-sm text-white/80">Music Genres</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm text-white/80">Music Scene</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover everything Tenerife's music scene has to offer through our comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003A4D] mb-4">Event Discovery</h3>
              <p className="text-gray-600 leading-relaxed">
                Find concerts, festivals, and music events happening across Tenerife. 
                From intimate jazz sessions to massive outdoor festivals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003A4D] mb-4">Venue Guide</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore the best music venues on the island. From beach clubs to 
                historic theaters, discover where music comes alive.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-lg flex items-center justify-center mb-6">
                <Music className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003A4D] mb-4">Genre Exploration</h3>
              <p className="text-gray-600 leading-relaxed">
                Dive into different music styles. From traditional Canarian folk 
                to cutting-edge electronic music and everything in between.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003A4D] mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow music lovers, share experiences, and become 
                part of Tenerife's vibrant music community.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003A4D] mb-4">Local Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Get insider tips and recommendations from locals who know 
                Tenerife's music scene best.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-[#00A6A6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003A4D] mb-4">Curated Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Hand-picked recommendations and editorial content to help you 
                discover the best of Tenerife's music culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Ready to Explore Tenerife's Music Scene?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of music lovers discovering the best events, venues, and experiences across the island.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center space-x-2 bg-white text-[#003A4D] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Browse Events</span>
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


