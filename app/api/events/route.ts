
import { NextRequest, NextResponse } from 'next/server'
import eventsData from '@/data/events_tenerife.json'

export const dynamic = 'force-dynamic'

// Интерфейс события из JSON
interface TenerifeEvent {
  event_id: string
  name: string
  type: string
  genres: string[]
  tags: string[]
  start_date: string
  end_date: string
  timezone: string
  venue: {
    venue_id: string
    name: string
    address: string
    coordinates: {
      lat?: number
      lng?: number
    }
  }
  price_min: number
  price_max: number
  currency: string
  description: string
  performers: string[]
  image_url: string
  ticket_url: string
  source: string
  source_url: string
  created_at: string
  metadata: {
    region: string
    data_version: string
    quality_score: number
  }
}

// Функция форматирования даты
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  } catch {
    return dateString
  }
}

// Функция для получения placeholder изображения
function getPlaceholderImage(genre: string): string {
  const placeholders: Record<string, string> = {
    'classical': 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png',
    'opera': 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png',
    'electronic': 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png',
    'house': 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png',
    'techno': 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png',
    'jazz': 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png',
  }
  
  // Проверяем первый жанр в массиве
  const firstGenre = genre.toLowerCase()
  return placeholders[firstGenre] || 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png'
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const genre = searchParams.get('genre')
    const tag = searchParams.get('tag')
    const venue = searchParams.get('venue')
    const featured = searchParams.get('featured')

    let events = eventsData as TenerifeEvent[]

    // Фильтрация по жанру
    if (genre && genre !== 'all') {
      events = events.filter((event) =>
        event.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }

    // Фильтрация по тегу
    if (tag && tag !== 'all') {
      events = events.filter((event) =>
        event.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
    }

    // Фильтрация по площадке
    if (venue) {
      events = events.filter((event) =>
        event.venue.name.toLowerCase().includes(venue.toLowerCase())
      )
    }

    // Фильтрация избранных событий
    if (featured === 'true') {
      // Берем первые 8 событий как featured
      events = events.slice(0, 8)
    }

    // Сортировка по дате (ближайшие первыми)
    events.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

    // Преобразование в формат для фронтенда
    const formattedEvents = events.map((event) => ({
      id: event.event_id,
      title: event.name,
      date: formatDate(event.start_date),
      startDate: event.start_date,
      endDate: event.end_date,
      venue: event.venue.name,
      venueId: event.venue.venue_id,
      location: event.venue.address,
      coordinates: event.venue.coordinates,
      genre: event.genres[0] || 'Concert',
      genres: event.genres,
      tags: event.tags,
      image: event.image_url || getPlaceholderImage(event.genres[0] || 'classical'),
      description: event.description,
      time: new Date(event.start_date).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      ticketPrice: event.price_min > 0 
        ? `${event.currency} ${event.price_min} - ${event.price_max}` 
        : 'Free',
      priceMin: event.price_min,
      priceMax: event.price_max,
      currency: event.currency,
      ticketUrl: event.ticket_url,
      performers: event.performers,
      source: event.source,
      featured: false, // Можно добавить логику для featured событий
    }))

    return NextResponse.json(formattedEvents, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
