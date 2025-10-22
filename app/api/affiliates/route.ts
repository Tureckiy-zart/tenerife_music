import { NextRequest, NextResponse } from 'next/server';

// Types for affiliate API responses
interface AffiliateEvent {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  venue: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  image_url?: string;
  ticket_url: string;
  affiliate_source: 'eventbrite' | 'ticketmaster' | 'dice';
  affiliate_code: string;
  affiliate_commission: number;
}

interface AffiliateClickData {
  event_id: string;
  affiliate_code: string;
  user_agent?: string;
  ip_address?: string;
}

// Mock data for development - replace with actual API calls
const mockEvents: AffiliateEvent[] = [
  {
    id: 'eventbrite_001',
    name: 'Sunset Techno Session',
    description: 'Experience the ultimate sunset techno session with international DJs',
    start_date: '2025-11-15T18:00:00Z',
    end_date: '2025-11-15T23:00:00Z',
    venue: {
      name: 'Papagayo Beach Club',
      address: 'Costa Adeje, Tenerife, Spain',
      coordinates: { lat: 28.1000, lng: -16.7167 }
    },
    image_url: 'https://i.ytimg.com/vi/BPc7JErNdHI/maxresdefault.jpg',
    ticket_url: 'https://www.eventbrite.com/e/sunset-techno-session-tickets-123456',
    affiliate_source: 'eventbrite',
    affiliate_code: 'tenerife_music',
    affiliate_commission: 0.1
  },
  {
    id: 'ticketmaster_001',
    name: 'Carnival Beats Festival',
    description: 'Traditional Canarian music meets modern beats in this cultural celebration',
    start_date: '2025-12-20T19:00:00Z',
    end_date: '2025-12-20T23:30:00Z',
    venue: {
      name: 'Plaza del Adelantado',
      address: 'La Laguna, Tenerife, Spain',
      coordinates: { lat: 28.4886, lng: -16.3162 }
    },
    image_url: 'https://www.opodo.co.uk/blog/wp-content/uploads/sites/12/2024/02/carnaval_tenerife.jpg',
    ticket_url: 'https://www.ticketmaster.es/event/carnival-beats-festival-tickets/123456',
    affiliate_source: 'ticketmaster',
    affiliate_code: 'tenerife_music',
    affiliate_commission: 0.1
  }
];

// GET /api/affiliates - Fetch events from all affiliate sources
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let events = mockEvents;

    // Filter by source if specified
    if (source && ['eventbrite', 'ticketmaster', 'dice'].includes(source)) {
      events = events.filter(event => event.affiliate_source === source);
    }

    // Apply pagination
    const paginatedEvents = events.slice(offset, offset + limit);

    // Append affiliate codes to ticket URLs
    const eventsWithAffiliateUrls = paginatedEvents.map(event => ({
      ...event,
      ticket_url: `${event.ticket_url}?aff=${event.affiliate_code}`
    }));

    return NextResponse.json({
      success: true,
      data: eventsWithAffiliateUrls,
      pagination: {
        total: events.length,
        limit,
        offset,
        has_more: offset + limit < events.length
      }
    });

  } catch (error) {
    console.error('Affiliate API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch affiliate events' 
      },
      { status: 500 }
    );
  }
}

// POST /api/affiliates/track - Track affiliate clicks
export async function POST(request: NextRequest) {
  try {
    const body: AffiliateClickData = await request.json();
    const { event_id, affiliate_code, user_agent, ip_address } = body;

    // Validate required fields
    if (!event_id || !affiliate_code) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'event_id and affiliate_code are required' 
        },
        { status: 400 }
      );
    }

    // Get client IP if not provided
    const clientIP = ip_address || 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';

    // Get user agent if not provided
    const clientUserAgent = user_agent || 
      request.headers.get('user-agent') || 
      'unknown';

    // In a real implementation, this would save to database
    console.log('Affiliate click tracked:', {
      event_id,
      affiliate_code,
      clicked_at: new Date().toISOString(),
      user_agent: clientUserAgent,
      ip_address: clientIP
    });

    return NextResponse.json({
      success: true,
      message: 'Click tracked successfully',
      data: {
        event_id,
        affiliate_code,
        clicked_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Affiliate tracking error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track affiliate click' 
      },
      { status: 500 }
    );
  }
}
