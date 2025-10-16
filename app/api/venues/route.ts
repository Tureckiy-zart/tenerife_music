
import { NextRequest, NextResponse } from 'next/server'
import venuesData from '@/data/venues_tenerife.json'

export const dynamic = 'force-dynamic'

interface TenerifeVenue {
  venue_id: string
  name: string
  address: string
  coordinates: {
    lat?: number
    lng?: number
  }
  type: string
  website: string
  events_count: number
}

// Функция для получения placeholder изображения
function getVenuePlaceholderImage(type: string): string {
  const placeholders: Record<string, string> = {
    'concert_hall': 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png',
    'beach_club': 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png',
    'nightclub': 'https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png',
    'venue': 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png',
  }
  
  return placeholders[type] || 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png'
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const type = searchParams.get('type')

    let venues = venuesData as TenerifeVenue[]

    // Фильтрация по типу
    if (type && type !== 'all') {
      venues = venues.filter((venue) => venue.type === type)
    }

    // Фильтрация избранных площадок
    if (featured === 'true') {
      // Берем топ-6 площадок по количеству событий
      venues = venues
        .sort((a, b) => b.events_count - a.events_count)
        .slice(0, 6)
    }

    // Сортировка по количеству событий
    venues.sort((a, b) => b.events_count - a.events_count)

    // Преобразование в формат для фронтенда
    const formattedVenues = venues.map((venue) => ({
      id: venue.venue_id,
      name: venue.name,
      description: `${venue.type.replace('_', ' ')} in ${venue.address.split(',').pop()?.trim()}`,
      image: getVenuePlaceholderImage(venue.type),
      location: venue.address.split(',').slice(-2).join(',').trim() || 'Spain',
      address: venue.address,
      coordinates: venue.coordinates,
      capacity: venue.events_count > 0 ? `${venue.events_count}+ events` : 'New venue',
      website: venue.website || null,
      phone: null,
      hours: 'Hours vary by event',
      featured: venue.events_count > 10,
      type: venue.type.replace('_', ' '),
      eventsCount: venue.events_count,
      genres: [],
      features: [],
    }))

    return NextResponse.json(formattedVenues, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching venues:', error)
    return NextResponse.json(
      { error: 'Failed to fetch venues' },
      { status: 500 }
    )
  }
}
