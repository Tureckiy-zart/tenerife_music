/**
 * Events Domain - Repository Interface (Port)
 * Defines contracts for data access without Prisma coupling
 */

import type {
  Event,
  EventGenre,
  EventTag,
  EventArtist,
  Genre,
  Tag,
  Artist,
  Venue,
  EventStatus,
  DayNight,
  Visibility,
} from '@prisma/client';
import type { PaginatedResult } from '@tenerife.music/shared';

export interface EventWithRelations extends Event {
  genres?: (EventGenre & { genre: Genre })[];
  tags?: (EventTag & { tag: Tag })[];
  artists?: (EventArtist & { artist: Artist })[];
  venue?: Venue | null;
}

export interface EventFilters {
  city?: string;
  island?: string;
  dayNight?: DayNight;
  status?: EventStatus | EventStatus[];
  visibility?: Visibility;
  featured?: boolean;
  startFrom?: Date;
  startTo?: Date;
  genreIds?: string[];
  tagIds?: string[];
  artistIds?: string[];
  venueIds?: string[];
  search?: string;
  // Geo filters
  geoHash?: string;
  geoHashPrefix?: string;
  geoBoundingBox?: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

export interface EventSortOptions {
  field: 'startAt' | 'createdAt' | 'featured' | 'views' | 'ratingAvg';
  order: 'asc' | 'desc';
}

export interface CreateEventData {
  orgId: string;
  title: string;
  description?: string;
  dayNight: DayNight;
  startAt: Date;
  endAt?: Date;
  venueId?: string;
  address?: string;
  city: string;
  island: string;
  lat?: number;
  lng?: number;
  geoHash?: string;
  priceFrom?: number;
  currency: string;
  ticketUrl?: string;
  coverUrl?: string;
  status: EventStatus;
  visibility: Visibility;
  featured?: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  version?: number; // For optimistic locking
}

export interface EventRepository {
  /**
   * Find event by ID
   */
  findById(id: string, includeRelations?: boolean): Promise<EventWithRelations | null>;

  /**
   * Find events with filters and pagination
   */
  findMany(
    filters: EventFilters,
    pagination: { page: number; limit: number },
    sort?: EventSortOptions
  ): Promise<PaginatedResult<EventWithRelations>>;

  /**
   * Create new event
   */
  create(data: CreateEventData): Promise<Event>;

  /**
   * Update event
   */
  update(id: string, data: UpdateEventData): Promise<Event>;

  /**
   * Soft delete event
   */
  softDelete(id: string): Promise<void>;

  /**
   * Update event status
   */
  updateStatus(id: string, status: EventStatus, moderatorId?: string): Promise<Event>;

  /**
   * Increment views counter
   */
  incrementViews(id: string): Promise<void>;

  /**
   * Increment clicks counter
   */
  incrementClicks(id: string): Promise<void>;

  /**
   * Link genres to event
   */
  linkGenres(eventId: string, genreIds: string[]): Promise<void>;

  /**
   * Link tags to event
   */
  linkTags(eventId: string, tagIds: string[]): Promise<void>;

  /**
   * Link artists to event
   */
  linkArtists(eventId: string, artistIds: string[], order?: number[]): Promise<void>;

  /**
   * Check if event exists for organization
   */
  existsForOrg(orgId: string, title: string, startAt: Date): Promise<boolean>;

  /**
   * Count events by organization
   */
  countByOrg(orgId: string, filters?: Partial<EventFilters>): Promise<number>;

  /**
   * Get events by geohash prefix (for proximity search)
   */
  findByGeohashPrefix(prefix: string, limit: number): Promise<EventWithRelations[]>;
}
