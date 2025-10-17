/**
 * Events Domain - Service (Use Cases)
 * Business logic for event management
 */

import type { EventRepository, EventWithRelations, EventFilters } from './repository';
import type { OrganizationRepository } from '../orgs/repository';
import type { UserRepository } from '../users/repository';
import type {
  CreateEventInput,
  UpdateEventInput,
  EventFilter,
  EventOutput,
} from '@tenerife.music/db';
import {
  DomainError,
  BusinessRuleViolationError,
  NotFoundError,
  ForbiddenError,
  QuotaExceededError,
  ValidationError,
  encodeGeohash,
  geohashPrefixesForBoundingBox,
  type PaginatedResult,
} from '@tenerife.music/shared';
import { EventStatus, UserRole, OrgRole } from '@prisma/client';

export interface EventsServiceDependencies {
  eventRepository: EventRepository;
  organizationRepository: OrganizationRepository;
  userRepository: UserRepository;
}

export class EventsService {
  constructor(private deps: EventsServiceDependencies) {}

  /**
   * Create a new event
   * Business rules:
   * - User must have ORG_ADMIN or ORG_EDITOR role in the organization
   * - Organization must not exceed event quota based on plan
   * - Event title + startAt must be unique per organization
   * - Geohash must be calculated if lat/lng provided
   */
  async createEvent(
    data: CreateEventInput,
    userId: string
  ): Promise<EventWithRelations> {
    // 1. Validate user has permission to create event for this org
    const membership = await this.deps.organizationRepository.findMembership(
      userId,
      data.orgId
    );

    if (!membership) {
      throw new ForbiddenError(
        'User is not a member of this organization',
        { userId, orgId: data.orgId }
      );
    }

    if (!['ORG_ADMIN', 'ORG_EDITOR'].includes(membership.role)) {
      throw new ForbiddenError(
        'Insufficient permissions. ORG_ADMIN or ORG_EDITOR role required.',
        { userId, orgId: data.orgId, userRole: membership.role }
      );
    }

    // 2. Check organization quota
    const organization = await this.deps.organizationRepository.findById(data.orgId);
    if (!organization) {
      throw new NotFoundError('Organization', data.orgId);
    }

    const quotas = organization.quotas as any;
    const maxEvents = quotas?.maxEvents || 10; // Default FREE plan quota

    const currentEventCount = await this.deps.eventRepository.countByOrg(
      data.orgId,
      { status: 'APPROVED' } // Only count approved events toward quota
    );

    if (currentEventCount >= maxEvents) {
      throw new QuotaExceededError('events', maxEvents, currentEventCount);
    }

    // 3. Check for duplicate event
    const exists = await this.deps.eventRepository.existsForOrg(
      data.orgId,
      data.title,
      data.startAt
    );

    if (exists) {
      throw new BusinessRuleViolationError(
        'An event with the same title and start time already exists for this organization',
        { title: data.title, startAt: data.startAt }
      );
    }

    // 4. Calculate geohash if coordinates provided
    let geoHash: string | undefined;
    if (data.lat && data.lng) {
      geoHash = encodeGeohash(data.lat, data.lng, 7); // 7 chars = ~76m precision
    }

    // 5. Create event
    const event = await this.deps.eventRepository.create({
      orgId: data.orgId,
      title: data.title,
      description: data.description,
      dayNight: data.dayNight,
      startAt: data.startAt,
      endAt: data.endAt,
      venueId: data.venueId,
      address: data.address,
      city: data.city,
      island: data.island || 'Tenerife',
      lat: data.lat,
      lng: data.lng,
      geoHash,
      priceFrom: data.priceFrom,
      currency: data.currency || 'EUR',
      ticketUrl: data.ticketUrl,
      coverUrl: data.coverUrl,
      status: data.status || EventStatus.DRAFT,
      visibility: data.visibility || 'PUBLIC',
      featured: data.featured || false,
    });

    // 6. Link related entities
    if (data.genreIds && data.genreIds.length > 0) {
      await this.deps.eventRepository.linkGenres(event.id, data.genreIds);
    }

    if (data.tagIds && data.tagIds.length > 0) {
      await this.deps.eventRepository.linkTags(event.id, data.tagIds);
    }

    if (data.artistIds && data.artistIds.length > 0) {
      await this.deps.eventRepository.linkArtists(event.id, data.artistIds);
    }

    // 7. Fetch and return complete event with relations
    const createdEvent = await this.deps.eventRepository.findById(event.id, true);
    if (!createdEvent) {
      throw new DomainError('Failed to retrieve created event');
    }

    return createdEvent;
  }

  /**
   * Approve event (moderator action)
   * Business rules:
   * - User must be MODERATOR or ADMIN
   * - Event must be in PENDING status
   * - Logs moderation action
   */
  async approveEvent(
    eventId: string,
    moderatorId: string,
    reason?: string
  ): Promise<EventWithRelations> {
    // 1. Validate moderator permissions
    const moderator = await this.deps.userRepository.findById(moderatorId);
    if (!moderator) {
      throw new NotFoundError('User', moderatorId);
    }

    if (!['MODERATOR', 'ADMIN'].includes(moderator.role)) {
      throw new ForbiddenError(
        'Only moderators and admins can approve events',
        { userId: moderatorId, userRole: moderator.role }
      );
    }

    // 2. Fetch event
    const event = await this.deps.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError('Event', eventId);
    }

    // 3. Validate status transition
    if (event.status !== EventStatus.PENDING) {
      throw new BusinessRuleViolationError(
        `Cannot approve event in ${event.status} status. Event must be PENDING.`,
        { currentStatus: event.status, targetStatus: 'APPROVED' }
      );
    }

    // 4. Update status
    const updatedEvent = await this.deps.eventRepository.updateStatus(
      eventId,
      EventStatus.APPROVED,
      moderatorId
    );

    // 5. Fetch complete event with relations
    const result = await this.deps.eventRepository.findById(eventId, true);
    if (!result) {
      throw new DomainError('Failed to retrieve approved event');
    }

    // 6. TODO: Send notification to organization
    // await this.notificationService.notifyEventApproved(event.orgId, eventId);

    return result;
  }

  /**
   * List approved events with filters
   * Business rules:
   * - Public endpoint, returns only APPROVED + PUBLIC events
   * - Supports filtering by city, dayNight, date range, genres, tags, artists
   * - Supports geo bounding box queries using geohash
   * - Featured events can be boosted in sort
   */
  async listApprovedEvents(
    filters: EventFilter
  ): Promise<PaginatedResult<EventWithRelations>> {
    // 1. Build repository filters
    const repoFilters: EventFilters = {
      status: EventStatus.APPROVED,
      visibility: 'PUBLIC',
      city: filters.city,
      island: filters.island,
      dayNight: filters.dayNight,
      featured: filters.featured,
      startFrom: filters.startFrom,
      startTo: filters.startTo,
      genreIds: filters.genreIds,
      tagIds: filters.tagIds,
      artistIds: filters.artistIds,
      search: filters.search,
    };

    // 2. Handle geo bounding box with geohash prefixes
    if (filters.geoBox) {
      const { minLat, maxLat, minLng, maxLng } = filters.geoBox;

      // Validate bounding box
      if (minLat > maxLat || minLng > maxLng) {
        throw new ValidationError('Invalid bounding box coordinates');
      }

      repoFilters.geoBoundingBox = {
        minLat,
        maxLat,
        minLng,
        maxLng,
      };

      // Generate geohash prefixes for efficient filtering
      const geohashPrefixes = geohashPrefixesForBoundingBox(
        { minLat, maxLat, minLng, maxLng },
        5 // Use precision 5 for broader coverage
      );

      // Repository will use these for initial filter, then exact bbox check
      repoFilters.geoHashPrefix = geohashPrefixes[0]; // Primary prefix
    }

    // 3. Determine sort strategy
    const sort = {
      field: filters.featured ? 'featured' : ('startAt' as const),
      order: 'asc' as const,
    };

    // 4. Fetch events
    const result = await this.deps.eventRepository.findMany(
      repoFilters,
      {
        page: filters.page || 1,
        limit: filters.limit || 20,
      },
      sort
    );

    return result;
  }

  /**
   * Update event
   * Business rules:
   * - User must be ORG_ADMIN or ORG_EDITOR
   * - Cannot change status via this method (use approveEvent, rejectEvent)
   * - Optimistic locking via version field
   */
  async updateEvent(
    eventId: string,
    data: UpdateEventInput,
    userId: string
  ): Promise<EventWithRelations> {
    // 1. Fetch event
    const event = await this.deps.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError('Event', eventId);
    }

    // 2. Check permission
    const membership = await this.deps.organizationRepository.findMembership(
      userId,
      event.orgId
    );

    if (!membership || !['ORG_ADMIN', 'ORG_EDITOR'].includes(membership.role)) {
      throw new ForbiddenError('Insufficient permissions to update this event');
    }

    // 3. Calculate geohash if coordinates changed
    let geoHash: string | undefined;
    if (data.lat && data.lng) {
      geoHash = encodeGeohash(data.lat, data.lng, 7);
    }

    // 4. Update event
    const updated = await this.deps.eventRepository.update(eventId, {
      ...data,
      ...(geoHash && { geoHash }),
      status: undefined, // Prevent status change via update
    });

    // 5. Update relations if provided
    if (data.genreIds) {
      await this.deps.eventRepository.linkGenres(eventId, data.genreIds);
    }
    if (data.tagIds) {
      await this.deps.eventRepository.linkTags(eventId, data.tagIds);
    }
    if (data.artistIds) {
      await this.deps.eventRepository.linkArtists(eventId, data.artistIds);
    }

    // 6. Fetch complete event
    const result = await this.deps.eventRepository.findById(eventId, true);
    if (!result) {
      throw new DomainError('Failed to retrieve updated event');
    }

    return result;
  }

  /**
   * Reject event (moderator action)
   */
  async rejectEvent(
    eventId: string,
    moderatorId: string,
    reason: string
  ): Promise<EventWithRelations> {
    // Validate moderator
    const moderator = await this.deps.userRepository.findById(moderatorId);
    if (!moderator || !['MODERATOR', 'ADMIN'].includes(moderator.role)) {
      throw new ForbiddenError('Only moderators and admins can reject events');
    }

    // Fetch event
    const event = await this.deps.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError('Event', eventId);
    }

    if (event.status !== EventStatus.PENDING) {
      throw new BusinessRuleViolationError(
        `Cannot reject event in ${event.status} status`,
        { currentStatus: event.status }
      );
    }

    // Update status
    await this.deps.eventRepository.updateStatus(
      eventId,
      EventStatus.REJECTED,
      moderatorId
    );

    const result = await this.deps.eventRepository.findById(eventId, true);
    if (!result) {
      throw new DomainError('Failed to retrieve rejected event');
    }

    // TODO: Notify organization
    return result;
  }

  /**
   * Delete event (soft delete)
   */
  async deleteEvent(eventId: string, userId: string): Promise<void> {
    const event = await this.deps.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError('Event', eventId);
    }

    // Check permission
    const membership = await this.deps.organizationRepository.findMembership(
      userId,
      event.orgId
    );

    if (!membership || membership.role !== 'ORG_ADMIN') {
      throw new ForbiddenError('Only ORG_ADMIN can delete events');
    }

    await this.deps.eventRepository.softDelete(eventId);
  }

  /**
   * Get event by ID (public)
   * Increments view counter
   */
  async getEventById(
    eventId: string,
    incrementView = true
  ): Promise<EventWithRelations> {
    const event = await this.deps.eventRepository.findById(eventId, true);
    if (!event) {
      throw new NotFoundError('Event', eventId);
    }

    // Only show public approved events to non-authenticated users
    if (event.status !== EventStatus.APPROVED || event.visibility !== 'PUBLIC') {
      throw new NotFoundError('Event', eventId); // Hide existence
    }

    if (incrementView) {
      await this.deps.eventRepository.incrementViews(eventId);
    }

    return event;
  }

  /**
   * Track click (e.g., ticket link)
   */
  async trackClick(eventId: string): Promise<void> {
    await this.deps.eventRepository.incrementClicks(eventId);
  }
}
