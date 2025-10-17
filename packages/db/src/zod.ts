/**
 * Zod Validation Schemas for Tenerife.music
 * Mirrors Prisma models and provides DTOs for input/output validation
 */

import { z } from 'zod';

// ============================================================================
// ENUMS
// ============================================================================

export const UserRoleSchema = z.enum(['USER', 'MODERATOR', 'ADMIN']);
export const OrgRoleSchema = z.enum(['ORG_ADMIN', 'ORG_EDITOR', 'ORG_VIEWER']);
export const PlanSchema = z.enum(['FREE', 'PRO', 'VIP']);
export const EventStatusSchema = z.enum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED']);
export const DayNightSchema = z.enum(['DAY', 'NIGHT']);
export const VisibilitySchema = z.enum(['PUBLIC', 'UNLISTED', 'PRIVATE']);
export const AdStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'ENDED']);
export const OwnerTypeSchema = z.enum(['EVENT', 'ARTICLE', 'ARTIST', 'ORG', 'USER']);
export const MediaTypeSchema = z.enum(['IMAGE', 'VIDEO', 'AUDIO']);
export const MediaStorageSchema = z.enum(['LOCAL', 'S3', 'CLOUDINARY', 'CDN']);
export const ArticleStatusSchema = z.enum(['DRAFT', 'PENDING', 'PUBLISHED', 'ARCHIVED']);
export const RadioStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);
export const NotificationTypeSchema = z.enum([
  'EVENT_APPROVED',
  'EVENT_REJECTED',
  'EVENT_REMINDER',
  'ORG_INVITE',
  'RATING_RECEIVED',
  'SYSTEM',
]);
export const NotificationSeveritySchema = z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS']);
export const AdSlotSchema = z.enum([
  'HOME_HERO',
  'LIST_SPONSORED',
  'EVENT_INLINE',
  'SIDEBAR_BANNER',
  'RADIO_PRE_ROLL',
]);

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const I18nTextSchema = z.object({
  en: z.string().optional(),
  es: z.string().optional(),
  ru: z.string().optional(),
});

export const LocationSchema = z.object({
  city: z.string(),
  island: z.string().default('Tenerife'),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  geoHash: z.string(),
});

export const ContactSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
});

export const SocialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
  soundcloud: z.string().url().optional(),
  spotify: z.string().url().optional(),
  youtube: z.string().url().optional(),
  website: z.string().url().optional(),
});

export const UserProfileSchema = z.object({
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
  socials: SocialLinksSchema.optional(),
});

export const UserSettingsSchema = z.object({
  preferredLocale: z.enum(['en', 'es', 'ru']).default('en'),
  preferredDayNight: DayNightSchema.optional(),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
});

export const OrgQuotasSchema = z.object({
  maxEvents: z.number().int().positive(),
  maxArticles: z.number().int().positive(),
  featuredSlots: z.number().int().nonnegative(),
});

// ============================================================================
// USER INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8).optional(),
  role: UserRoleSchema.default('USER'),
  profile: UserProfileSchema.optional(),
  settings: UserSettingsSchema.optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserOutputSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleSchema,
  profile: z.record(z.any()).nullable(),
  settings: z.record(z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// ORGANIZATION INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateOrganizationSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  plan: PlanSchema.default('FREE'),
  contact: ContactSchema.optional(),
  location: LocationSchema.optional(),
  about: z.string().max(2000).optional(),
  logoUrl: z.string().url().optional(),
});

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

export const OrganizationOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  plan: PlanSchema,
  location: z.record(z.any()).nullable(),
  about: z.string().nullable(),
  logoUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// EVENT INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateEventSchema = z.object({
  orgId: z.string(),
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  dayNight: DayNightSchema,
  
  startAt: z.date(),
  endAt: z.date().optional(),
  
  venueId: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(2),
  island: z.string().default('Tenerife'),
  lat: z.number().optional(),
  lng: z.number().optional(),
  geoHash: z.string().optional(),
  
  priceFrom: z.number().nonnegative().optional(),
  currency: z.string().default('EUR'),
  ticketUrl: z.string().url().optional(),
  
  coverUrl: z.string().url().optional(),
  
  status: EventStatusSchema.default('DRAFT'),
  visibility: VisibilitySchema.default('PUBLIC'),
  featured: z.boolean().default(false),
  
  genreIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  artistIds: z.array(z.string()).optional(),
});

export const UpdateEventSchema = CreateEventSchema.partial();

export const EventFilterSchema = z.object({
  city: z.string().optional(),
  island: z.string().optional(),
  dayNight: DayNightSchema.optional(),
  status: EventStatusSchema.optional(),
  visibility: VisibilitySchema.optional(),
  featured: z.boolean().optional(),
  startFrom: z.date().optional(),
  startTo: z.date().optional(),
  genreIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  artistIds: z.array(z.string()).optional(),
  search: z.string().optional(),
  // Geo bounding box
  geoBox: z.object({
    minLat: z.number(),
    maxLat: z.number(),
    minLng: z.number(),
    maxLng: z.number(),
  }).optional(),
  // Pagination
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const EventOutputSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  dayNight: DayNightSchema,
  startAt: z.date(),
  endAt: z.date().nullable(),
  city: z.string(),
  island: z.string(),
  address: z.string().nullable(),
  priceFrom: z.number().nullable(),
  currency: z.string(),
  coverUrl: z.string().nullable(),
  status: EventStatusSchema,
  visibility: VisibilitySchema,
  featured: z.boolean(),
  ratingAvg: z.number().nullable(),
  ratingCount: z.number(),
  views: z.number(),
  clicks: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// GENRE & TAG INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateGenreSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: I18nTextSchema,
});

export const GenreOutputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.record(z.any()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTagSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: I18nTextSchema,
});

export const TagOutputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.record(z.any()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// ARTIST INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateArtistSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  bio: z.string().max(2000).optional(),
  links: SocialLinksSchema.optional(),
  genreIds: z.array(z.string()).optional(),
});

export const UpdateArtistSchema = CreateArtistSchema.partial();

export const ArtistOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  bio: z.string().nullable(),
  ratingAvg: z.number().nullable(),
  ratingCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// VENUE INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateVenueSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  address: z.string().optional(),
  city: z.string().min(2),
  island: z.string().default('Tenerife'),
  lat: z.number(),
  lng: z.number(),
  geoHash: z.string(),
  capacity: z.number().int().positive().optional(),
  website: z.string().url().optional(),
});

export const UpdateVenueSchema = CreateVenueSchema.partial();

export const VenueOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  city: z.string(),
  island: z.string(),
  address: z.string().nullable(),
  lat: z.number(),
  lng: z.number(),
  capacity: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// ARTICLE INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateArticleSchema = z.object({
  authorId: z.string(),
  orgId: z.string().optional(),
  status: ArticleStatusSchema.default('DRAFT'),
  coverUrl: z.string().url().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export const CreateArticleI18nSchema = z.object({
  locale: z.enum(['en', 'es', 'ru']),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(200),
  summary: z.string().max(500).optional(),
  body: z.string().min(10),
});

export const UpdateArticleSchema = CreateArticleSchema.partial();

export const ArticleOutputSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  orgId: z.string().nullable(),
  status: ArticleStatusSchema,
  coverUrl: z.string().nullable(),
  ratingAvg: z.number().nullable(),
  ratingCount: z.number(),
  publishedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// RATING INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateRatingSchema = z.object({
  userId: z.string(),
  targetType: OwnerTypeSchema,
  targetId: z.string(),
  score: z.number().int().min(1).max(5),
  review: z.string().max(1000).optional(),
});

export const UpdateRatingSchema = z.object({
  score: z.number().int().min(1).max(5).optional(),
  review: z.string().max(1000).optional(),
});

export const RatingOutputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  targetType: OwnerTypeSchema,
  targetId: z.string(),
  score: z.number(),
  review: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// FAVORITE INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateFavoriteSchema = z.object({
  userId: z.string(),
  targetType: OwnerTypeSchema,
  targetId: z.string(),
});

export const FavoriteOutputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  targetType: OwnerTypeSchema,
  targetId: z.string(),
  createdAt: z.date(),
});

// ============================================================================
// NOTIFICATION INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateNotificationSchema = z.object({
  userId: z.string(),
  type: NotificationTypeSchema,
  severity: NotificationSeveritySchema.default('INFO'),
  payload: z.record(z.any()),
});

export const NotificationOutputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: NotificationTypeSchema,
  severity: NotificationSeveritySchema,
  payload: z.record(z.any()),
  isRead: z.boolean(),
  readAt: z.date().nullable(),
  createdAt: z.date(),
});

// ============================================================================
// MEDIA INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateMediaSchema = z.object({
  ownerType: OwnerTypeSchema,
  ownerId: z.string(),
  url: z.string().url(),
  type: MediaTypeSchema,
  storage: MediaStorageSchema.default('CDN'),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: I18nTextSchema.optional(),
  isPrimary: z.boolean().default(false),
  sort: z.number().int().nonnegative().default(0),
});

export const MediaOutputSchema = z.object({
  id: z.string(),
  ownerType: OwnerTypeSchema,
  ownerId: z.string(),
  url: z.string(),
  type: MediaTypeSchema,
  width: z.number().nullable(),
  height: z.number().nullable(),
  isPrimary: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// AD PLACEMENT INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateAdPlacementSchema = z.object({
  slot: AdSlotSchema,
  ownerType: OwnerTypeSchema,
  ownerId: z.string(),
  orgId: z.string(),
  startAt: z.date(),
  endAt: z.date(),
  budget: z.number().nonnegative(),
  currency: z.string().default('EUR'),
  status: AdStatusSchema.default('DRAFT'),
  meta: z.record(z.any()).optional(),
});

export const UpdateAdPlacementSchema = CreateAdPlacementSchema.partial();

export const AdPlacementOutputSchema = z.object({
  id: z.string(),
  slot: AdSlotSchema,
  ownerType: OwnerTypeSchema,
  ownerId: z.string(),
  orgId: z.string(),
  startAt: z.date(),
  endAt: z.date(),
  budget: z.number(),
  status: AdStatusSchema,
  impressions: z.number(),
  clicks: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// RADIO INPUT/OUTPUT SCHEMAS
// ============================================================================

export const CreateRadioStationSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  streamUrl: z.string().url(),
  logoUrl: z.string().url().optional(),
  description: z.string().max(1000).optional(),
  status: RadioStatusSchema.default('ACTIVE'),
});

export const UpdateRadioStationSchema = CreateRadioStationSchema.partial();

export const RadioStationOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  streamUrl: z.string(),
  logoUrl: z.string().nullable(),
  status: RadioStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateRadioTrackSchema = z.object({
  stationId: z.string().optional(),
  episodeId: z.string().optional(),
  artist: z.string(),
  title: z.string(),
  album: z.string().optional(),
  durationMs: z.number().int().positive().optional(),
  playedAt: z.date(),
});

export const RadioTrackOutputSchema = z.object({
  id: z.string(),
  artist: z.string(),
  title: z.string(),
  album: z.string().nullable(),
  playedAt: z.date(),
  createdAt: z.date(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type UserRole = z.infer<typeof UserRoleSchema>;
export type OrgRole = z.infer<typeof OrgRoleSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type EventStatus = z.infer<typeof EventStatusSchema>;
export type DayNight = z.infer<typeof DayNightSchema>;
export type Visibility = z.infer<typeof VisibilitySchema>;
export type AdStatus = z.infer<typeof AdStatusSchema>;
export type OwnerType = z.infer<typeof OwnerTypeSchema>;
export type MediaType = z.infer<typeof MediaTypeSchema>;
export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;
export type RadioStatus = z.infer<typeof RadioStatusSchema>;
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type AdSlot = z.infer<typeof AdSlotSchema>;

export type I18nText = z.infer<typeof I18nTextSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type SocialLinks = z.infer<typeof SocialLinksSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type UserOutput = z.infer<typeof UserOutputSchema>;

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>;
export type OrganizationOutput = z.infer<typeof OrganizationOutputSchema>;

export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
export type EventFilter = z.infer<typeof EventFilterSchema>;
export type EventOutput = z.infer<typeof EventOutputSchema>;

export type CreateGenreInput = z.infer<typeof CreateGenreSchema>;
export type GenreOutput = z.infer<typeof GenreOutputSchema>;

export type CreateTagInput = z.infer<typeof CreateTagSchema>;
export type TagOutput = z.infer<typeof TagOutputSchema>;

export type CreateArtistInput = z.infer<typeof CreateArtistSchema>;
export type UpdateArtistInput = z.infer<typeof UpdateArtistSchema>;
export type ArtistOutput = z.infer<typeof ArtistOutputSchema>;

export type CreateVenueInput = z.infer<typeof CreateVenueSchema>;
export type UpdateVenueInput = z.infer<typeof UpdateVenueSchema>;
export type VenueOutput = z.infer<typeof VenueOutputSchema>;

export type CreateArticleInput = z.infer<typeof CreateArticleSchema>;
export type CreateArticleI18nInput = z.infer<typeof CreateArticleI18nSchema>;
export type UpdateArticleInput = z.infer<typeof UpdateArticleSchema>;
export type ArticleOutput = z.infer<typeof ArticleOutputSchema>;

export type CreateRatingInput = z.infer<typeof CreateRatingSchema>;
export type UpdateRatingInput = z.infer<typeof UpdateRatingSchema>;
export type RatingOutput = z.infer<typeof RatingOutputSchema>;

export type CreateFavoriteInput = z.infer<typeof CreateFavoriteSchema>;
export type FavoriteOutput = z.infer<typeof FavoriteOutputSchema>;

export type CreateNotificationInput = z.infer<typeof CreateNotificationSchema>;
export type NotificationOutput = z.infer<typeof NotificationOutputSchema>;

export type CreateMediaInput = z.infer<typeof CreateMediaSchema>;
export type MediaOutput = z.infer<typeof MediaOutputSchema>;

export type CreateAdPlacementInput = z.infer<typeof CreateAdPlacementSchema>;
export type UpdateAdPlacementInput = z.infer<typeof UpdateAdPlacementSchema>;
export type AdPlacementOutput = z.infer<typeof AdPlacementOutputSchema>;

export type CreateRadioStationInput = z.infer<typeof CreateRadioStationSchema>;
export type UpdateRadioStationInput = z.infer<typeof UpdateRadioStationSchema>;
export type RadioStationOutput = z.infer<typeof RadioStationOutputSchema>;

export type CreateRadioTrackInput = z.infer<typeof CreateRadioTrackSchema>;
export type RadioTrackOutput = z.infer<typeof RadioTrackOutputSchema>;
