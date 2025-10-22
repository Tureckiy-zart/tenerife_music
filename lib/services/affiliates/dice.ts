interface DiceEvent {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  url: string;
  image_url?: string;
  venue: {
    name: string;
    address: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  artists?: Array<{
    name: string;
  }>;
}

interface DiceResponse {
  events: DiceEvent[];
  pagination: {
    has_more: boolean;
    page: number;
    per_page: number;
    total: number;
  };
}

interface ProcessedEvent {
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
  affiliate_source: 'dice';
  affiliate_code: string;
  affiliate_commission: number;
}

export class DiceService {
  private apiKey: string;
  private baseUrl = 'https://api.dice.fm/v1';
  private affiliateCode = 'tenerife_music';
  private commissionRate = 0.1;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchEvents(options: {
    city?: string;
    country?: string;
    genre?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<ProcessedEvent[]> {
    try {
      const params = new URLSearchParams({
        city: options.city || 'Tenerife',
        country: options.country || 'Spain',
        limit: (options.limit || 50).toString(),
        offset: (options.offset || 0).toString(),
        sort: 'date_asc',
      });

      if (options.genre) {
        params.append('genre', options.genre);
      }

      const response = await fetch(`${this.baseUrl}/events?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`DICE API error: ${response.status} ${response.statusText}`);
      }

      const data: DiceResponse = await response.json();
      return this.processEvents(data.events);

    } catch (error) {
      console.error('DICE API error:', error);
      throw error;
    }
  }

  private processEvents(events: DiceEvent[]): ProcessedEvent[] {
    return events.map(event => {
      const startDate = new Date(event.start_time);
      const endDate = event.end_time ? 
        new Date(event.end_time) : 
        new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // Default 3 hours duration

      return {
        id: `dice_${event.id}`,
        name: event.name,
        description: event.description,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        venue: {
          name: event.venue.name,
          address: `${event.venue.address}, ${event.venue.city}, ${event.venue.country}`,
          coordinates: event.venue.latitude && event.venue.longitude ? {
            lat: event.venue.latitude,
            lng: event.venue.longitude
          } : undefined
        },
        image_url: event.image_url,
        ticket_url: event.url,
        affiliate_source: 'dice' as const,
        affiliate_code: this.affiliateCode,
        affiliate_commission: this.commissionRate
      };
    });
  }

  async getEventById(eventId: string): Promise<ProcessedEvent | null> {
    try {
      const response = await fetch(`${this.baseUrl}/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`DICE API error: ${response.status} ${response.statusText}`);
      }

      const event: DiceEvent = await response.json();
      const processedEvents = this.processEvents([event]);
      return processedEvents[0] || null;

    } catch (error) {
      console.error('DICE API error:', error);
      throw error;
    }
  }

  // Method to append affiliate code to ticket URL
  appendAffiliateCode(ticketUrl: string): string {
    const separator = ticketUrl.includes('?') ? '&' : '?';
    return `${ticketUrl}${separator}aff=${this.affiliateCode}`;
  }
}

export default DiceService;
