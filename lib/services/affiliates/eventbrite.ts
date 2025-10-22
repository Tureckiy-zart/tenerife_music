interface EventbriteEvent {
  id: string;
  name: { text: string };
  description?: { text: string };
  start: { utc: string };
  end: { utc: string };
  url: string;
  logo?: { url: string };
  venue?: {
    name: string;
    address: {
      address_1: string;
      city: string;
      region: string;
      country: string;
    };
    latitude?: string;
    longitude?: string;
  };
}

interface EventbriteResponse {
  events: EventbriteEvent[];
  pagination: {
    has_more_items: boolean;
    page_count: number;
    page_number: number;
    page_size: number;
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
  affiliate_source: 'eventbrite';
  affiliate_code: string;
  affiliate_commission: number;
}

export class EventbriteService {
  private apiKey: string;
  private baseUrl = 'https://www.eventbriteapi.com/v3';
  private affiliateCode = 'tenerife_music';
  private commissionRate = 0.1;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchEvents(options: {
    location?: string;
    categories?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<ProcessedEvent[]> {
    try {
      const params = new URLSearchParams({
        token: this.apiKey,
        'location.address': options.location || 'Tenerife, Spain',
        expand: 'venue',
        'time_filter': 'current_future',
        'sort_by': 'date',
        'page_size': (options.limit || 50).toString(),
        'page': ((options.offset || 0) / (options.limit || 50) + 1).toString(),
      });

      if (options.categories) {
        params.append('categories', options.categories);
      }

      const response = await fetch(`${this.baseUrl}/events/search/?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Eventbrite API error: ${response.status} ${response.statusText}`);
      }

      const data: EventbriteResponse = await response.json();
      return this.processEvents(data.events);

    } catch (error) {
      console.error('Eventbrite API error:', error);
      throw error;
    }
  }

  private processEvents(events: EventbriteEvent[]): ProcessedEvent[] {
    return events.map(event => ({
      id: `eventbrite_${event.id}`,
      name: event.name.text,
      description: event.description?.text,
      start_date: event.start.utc,
      end_date: event.end.utc,
      venue: {
        name: event.venue?.name || 'TBD',
        address: event.venue ? 
          `${event.venue.address.address_1}, ${event.venue.address.city}, ${event.venue.address.region}, ${event.venue.address.country}` :
          'Tenerife, Spain',
        coordinates: event.venue?.latitude && event.venue?.longitude ? {
          lat: parseFloat(event.venue.latitude),
          lng: parseFloat(event.venue.longitude)
        } : undefined
      },
      image_url: event.logo?.url,
      ticket_url: event.url,
      affiliate_source: 'eventbrite' as const,
      affiliate_code: this.affiliateCode,
      affiliate_commission: this.commissionRate
    }));
  }

  async getEventById(eventId: string): Promise<ProcessedEvent | null> {
    try {
      const response = await fetch(`${this.baseUrl}/events/${eventId}/`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Eventbrite API error: ${response.status} ${response.statusText}`);
      }

      const event: EventbriteEvent = await response.json();
      const processedEvents = this.processEvents([event]);
      return processedEvents[0] || null;

    } catch (error) {
      console.error('Eventbrite API error:', error);
      throw error;
    }
  }

  // Method to append affiliate code to ticket URL
  appendAffiliateCode(ticketUrl: string): string {
    const separator = ticketUrl.includes('?') ? '&' : '?';
    return `${ticketUrl}${separator}aff=${this.affiliateCode}`;
  }
}

export default EventbriteService;
