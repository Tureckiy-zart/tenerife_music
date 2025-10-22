interface TicketmasterEvent {
  id: string;
  name: string;
  info?: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime: string;
    };
    end?: {
      localDate: string;
      localTime?: string;
      dateTime: string;
    };
  };
  url: string;
  images?: Array<{
    url: string;
    width: number;
    height: number;
    ratio: string;
  }>;
  _embedded?: {
    venues?: Array<{
      name: string;
      address?: {
        line1: string;
        city: string;
        state?: string;
        country: string;
        postalCode?: string;
      };
      location?: {
        latitude: string;
        longitude: string;
      };
    }>;
  };
}

interface TicketmasterResponse {
  _embedded: {
    events: TicketmasterEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
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
  affiliate_source: 'ticketmaster';
  affiliate_code: string;
  affiliate_commission: number;
}

export class TicketmasterService {
  private apiKey: string;
  private baseUrl = 'https://app.ticketmaster.com/discovery/v2';
  private affiliateCode = 'tenerife_music';
  private commissionRate = 0.1;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchEvents(options: {
    city?: string;
    countryCode?: string;
    classificationName?: string;
    size?: number;
    page?: number;
  } = {}): Promise<ProcessedEvent[]> {
    try {
      const params = new URLSearchParams({
        apikey: this.apiKey,
        city: options.city || 'Tenerife',
        countryCode: options.countryCode || 'ES',
        size: (options.size || 50).toString(),
        page: (options.page || 0).toString(),
        sort: 'date,asc',
        'startDateTime': new Date().toISOString(),
      });

      if (options.classificationName) {
        params.append('classificationName', options.classificationName);
      }

      const response = await fetch(`${this.baseUrl}/events.json?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ticketmaster API error: ${response.status} ${response.statusText}`);
      }

      const data: TicketmasterResponse = await response.json();
      return this.processEvents(data._embedded?.events || []);

    } catch (error) {
      console.error('Ticketmaster API error:', error);
      throw error;
    }
  }

  private processEvents(events: TicketmasterEvent[]): ProcessedEvent[] {
    return events.map(event => {
      const venue = event._embedded?.venues?.[0];
      const startDate = new Date(event.dates.start.dateTime);
      const endDate = event.dates.end ? 
        new Date(event.dates.end.dateTime) : 
        new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // Default 3 hours duration

      return {
        id: `ticketmaster_${event.id}`,
        name: event.name,
        description: event.info,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        venue: {
          name: venue?.name || 'TBD',
          address: venue?.address ? 
            `${venue.address.line1}, ${venue.address.city}${venue.address.state ? `, ${venue.address.state}` : ''}, ${venue.address.country}` :
            'Tenerife, Spain',
          coordinates: venue?.location ? {
            lat: parseFloat(venue.location.latitude),
            lng: parseFloat(venue.location.longitude)
          } : undefined
        },
        image_url: event.images?.[0]?.url,
        ticket_url: event.url,
        affiliate_source: 'ticketmaster' as const,
        affiliate_code: this.affiliateCode,
        affiliate_commission: this.commissionRate
      };
    });
  }

  async getEventById(eventId: string): Promise<ProcessedEvent | null> {
    try {
      const response = await fetch(`${this.baseUrl}/events/${eventId}.json?apikey=${this.apiKey}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Ticketmaster API error: ${response.status} ${response.statusText}`);
      }

      const event: TicketmasterEvent = await response.json();
      const processedEvents = this.processEvents([event]);
      return processedEvents[0] || null;

    } catch (error) {
      console.error('Ticketmaster API error:', error);
      throw error;
    }
  }

  // Method to append affiliate code to ticket URL
  appendAffiliateCode(ticketUrl: string): string {
    const separator = ticketUrl.includes('?') ? '&' : '?';
    return `${ticketUrl}${separator}aff=${this.affiliateCode}`;
  }
}

export default TicketmasterService;
