import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Music, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Calendar — Tenerife.Music',
  description: 'Monthly music calendar for Tenerife (coming soon).',
  alternates: { canonical: '/calendar' },
}

// Sample events data for demonstration
const sampleEvents = [
  {
    id: 1,
    title: 'Jazz Night at Blue Note',
    date: '2024-01-15',
    time: '21:00',
    venue: 'Blue Note Tenerife',
    genre: 'Jazz',
    area: 'Santa Cruz',
    price: '€25'
  },
  {
    id: 2,
    title: 'Electronic Beach Party',
    date: '2024-01-16',
    time: '18:00',
    venue: 'Papagayo Beach Club',
    genre: 'Electronic',
    area: 'Costa Adeje',
    price: '€35'
  },
  {
    id: 3,
    title: 'Rock Festival',
    date: '2024-01-20',
    time: '19:00',
    venue: 'Auditorio de Tenerife',
    genre: 'Rock',
    area: 'Santa Cruz',
    price: '€45'
  },
  {
    id: 4,
    title: 'Folk Music Evening',
    date: '2024-01-22',
    time: '20:00',
    venue: 'Casa de la Cultura',
    genre: 'Folk',
    area: 'La Laguna',
    price: '€15'
  },
  {
    id: 5,
    title: 'Classical Concert',
    date: '2024-01-25',
    time: '19:30',
    venue: 'Teatro Leal',
    genre: 'Classical',
    area: 'Puerto de la Cruz',
    price: '€30'
  }
]

// Generate calendar days for current month
const generateCalendarDays = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const currentDate = new Date(startDate)
  
  for (let i = 0; i < 42; i++) {
    const dayEvents = sampleEvents.filter(event => 
      event.date === currentDate.toISOString().split('T')[0]
    )
    
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: currentDate.toDateString() === today.toDateString(),
      events: dayEvents
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return days
}

export default function CalendarPage() {
  const calendarDays = generateCalendarDays()
  const today = new Date()
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

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
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              Music Calendar
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Plan your musical journey across Tenerife. Discover events, festivals, and concerts 
              happening throughout the month with our comprehensive calendar view.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Calendar Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#003A4D] mb-2">
                  {monthNames[today.getMonth()]} {today.getFullYear()}
                </h2>
                <p className="text-gray-600">Plan your musical adventures this month</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
                <button className="inline-flex items-center space-x-2 bg-[#00A6A6] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#008A8A] transition-colors duration-300">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`min-h-[120px] p-2 border rounded-lg transition-colors duration-200 ${
                    day.isCurrentMonth 
                      ? 'bg-white hover:bg-gray-50' 
                      : 'bg-gray-50 text-gray-400'
                  } ${
                    day.isToday 
                      ? 'ring-2 ring-[#00A6A6] bg-[#00A6A6]/5' 
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      day.isToday ? 'text-[#00A6A6]' : 'text-gray-700'
                    }`}>
                      {day.date.getDate()}
                    </span>
                    {day.events.length > 0 && (
                      <span className="w-2 h-2 bg-[#00A6A6] rounded-full"></span>
                    )}
                  </div>
                  
                  {/* Events for this day */}
                  <div className="space-y-1">
                    {day.events.slice(0, 2).map((event) => (
                      <div 
                        key={event.id}
                        className="text-xs p-1 bg-[#00A6A6]/10 text-[#00A6A6] rounded truncate hover:bg-[#00A6A6]/20 transition-colors duration-200 cursor-pointer"
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{day.events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* This Week's Highlights */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#003A4D] mb-6">This Week's Highlights</h3>
                <div className="space-y-4">
                  {sampleEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00A6A6] to-[#003A4D] rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#003A4D] truncate">{event.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Music className="w-4 h-4" />
                            <span>{event.genre}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-lg font-bold text-[#00A6A6]">{event.price}</div>
                        <div className="text-sm text-gray-500">{event.area}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link 
                    href="/events"
                    className="inline-flex items-center space-x-2 bg-[#00A6A6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#008A8A] transition-colors duration-300"
                  >
                    <span>View All Events</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#003A4D] mb-4">This Month</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Events</span>
                    <span className="text-2xl font-bold text-[#00A6A6]">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Venues</span>
                    <span className="text-2xl font-bold text-[#00A6A6]">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Genres</span>
                    <span className="text-2xl font-bold text-[#00A6A6]">8</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#003A4D] mb-4">Popular Genres</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Electronic', count: 45, color: 'bg-purple-500' },
                    { name: 'Rock', count: 32, color: 'bg-red-500' },
                    { name: 'Jazz', count: 28, color: 'bg-blue-500' },
                    { name: 'Pop', count: 22, color: 'bg-pink-500' }
                  ].map((genre, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${genre.color}`}></div>
                        <span className="text-gray-700">{genre.name}</span>
                      </div>
                      <span className="font-semibold text-[#003A4D]">{genre.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#003A4D] to-[#00A6A6] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Get Notifications</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Stay updated with the latest events and never miss your favorite artists.
                </p>
                <button className="w-full bg-white text-[#003A4D] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Never Miss a Beat
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Subscribe to our newsletter and get personalized event recommendations delivered to your inbox.
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
              href="/contact" 
              className="inline-flex items-center justify-center space-x-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
            >
              <Music className="w-5 h-5" />
              <span>Get Updates</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}


