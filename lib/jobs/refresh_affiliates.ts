import EventbriteService from '../services/affiliates/eventbrite';
import TicketmasterService from '../services/affiliates/ticketmaster';
import DiceService from '../services/affiliates/dice';

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

export class AffiliateRefreshJob {
  private eventbriteService: EventbriteService;
  private ticketmasterService: TicketmasterService;
  private diceService: DiceService;

  constructor() {
    // Initialize services with API keys from environment variables
    this.eventbriteService = new EventbriteService(
      process.env.EVENTBRITE_TOKEN || ''
    );
    this.ticketmasterService = new TicketmasterService(
      process.env.TICKETMASTER_API_KEY || ''
    );
    this.diceService = new DiceService(
      process.env.DICE_API_KEY || ''
    );
  }

  async refreshAllAffiliateData(): Promise<{
    success: boolean;
    results: {
      eventbrite: { count: number; error?: string };
      ticketmaster: { count: number; error?: string };
      dice: { count: number; error?: string };
    };
  }> {
    console.log('Starting affiliate data refresh...');
    const results = {
      eventbrite: { count: 0, error: undefined as string | undefined },
      ticketmaster: { count: 0, error: undefined as string | undefined },
      dice: { count: 0, error: undefined as string | undefined },
    };

    // Refresh Eventbrite events
    try {
      console.log('Fetching Eventbrite events...');
      const eventbriteEvents = await this.eventbriteService.fetchEvents({
        location: 'Tenerife, Spain',
        limit: 100,
      });
      results.eventbrite.count = eventbriteEvents.length;
      console.log(`Fetched ${eventbriteEvents.length} Eventbrite events`);
      
      // In a real implementation, save to database
      await this.saveEventsToDatabase(eventbriteEvents, 'eventbrite');
    } catch (error) {
      console.error('Error fetching Eventbrite events:', error);
      results.eventbrite.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Refresh Ticketmaster events
    try {
      console.log('Fetching Ticketmaster events...');
      const ticketmasterEvents = await this.ticketmasterService.fetchEvents({
        city: 'Tenerife',
        countryCode: 'ES',
        size: 100,
      });
      results.ticketmaster.count = ticketmasterEvents.length;
      console.log(`Fetched ${ticketmasterEvents.length} Ticketmaster events`);
      
      // In a real implementation, save to database
      await this.saveEventsToDatabase(ticketmasterEvents, 'ticketmaster');
    } catch (error) {
      console.error('Error fetching Ticketmaster events:', error);
      results.ticketmaster.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Refresh DICE events
    try {
      console.log('Fetching DICE events...');
      const diceEvents = await this.diceService.fetchEvents({
        city: 'Tenerife',
        country: 'Spain',
        limit: 100,
      });
      results.dice.count = diceEvents.length;
      console.log(`Fetched ${diceEvents.length} DICE events`);
      
      // In a real implementation, save to database
      await this.saveEventsToDatabase(diceEvents, 'dice');
    } catch (error) {
      console.error('Error fetching DICE events:', error);
      results.dice.error = error instanceof Error ? error.message : 'Unknown error';
    }

    const success = !results.eventbrite.error && !results.ticketmaster.error && !results.dice.error;
    
    console.log('Affiliate data refresh completed:', {
      success,
      totalEvents: results.eventbrite.count + results.ticketmaster.count + results.dice.count,
      results
    });

    return { success, results };
  }

  private async saveEventsToDatabase(events: AffiliateEvent[], source: string): Promise<void> {
    // In a real implementation, this would:
    // 1. Connect to the database
    // 2. Upsert events (update existing, insert new)
    // 3. Handle conflicts and duplicates
    // 4. Log the operation
    
    console.log(`Saving ${events.length} ${source} events to database...`);
    
    // Mock database operation
    for (const event of events) {
      console.log(`Saving event: ${event.name} (${event.id})`);
      // await prisma.event.upsert({
      //   where: { event_id: event.id },
      //   update: {
      //     name: event.name,
      //     description: event.description,
      //     start_date: new Date(event.start_date),
      //     end_date: new Date(event.end_date),
      //     venue_id: event.venue.name,
      //     venue_name: event.venue.name,
      //     venue_address: event.venue.address,
      //     venue_coordinates: event.venue.coordinates,
      //     image_url: event.image_url,
      //     ticket_url: event.ticket_url,
      //     affiliate_source: event.affiliate_source,
      //     affiliate_code: event.affiliate_code,
      //     affiliate_commission: event.affiliate_commission,
      //     updated_at: new Date(),
      //   },
      //   create: {
      //     event_id: event.id,
      //     name: event.name,
      //     description: event.description,
      //     start_date: new Date(event.start_date),
      //     end_date: new Date(event.end_date),
      //     venue_id: event.venue.name,
      //     venue_name: event.venue.name,
      //     venue_address: event.venue.address,
      //     venue_coordinates: event.venue.coordinates,
      //     image_url: event.image_url,
      //     ticket_url: event.ticket_url,
      //     affiliate_source: event.affiliate_source,
      //     affiliate_code: event.affiliate_code,
      //     affiliate_commission: event.affiliate_commission,
      //   },
      // });
    }
  }

  // Method to run the job manually (for testing)
  async runManualRefresh(): Promise<void> {
    console.log('Running manual affiliate refresh...');
    const result = await this.refreshAllAffiliateData();
    
    if (result.success) {
      console.log('Manual refresh completed successfully');
    } else {
      console.error('Manual refresh failed:', result.results);
    }
  }
}

// Export a function that can be called by cron or manually
export async function runAffiliateRefresh(): Promise<void> {
  const job = new AffiliateRefreshJob();
  await job.runManualRefresh();
}

// For cron job usage
export default AffiliateRefreshJob;
