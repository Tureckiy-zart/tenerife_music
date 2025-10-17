# Tenerife.music Database Package

> DDD-aligned PostgreSQL schema with Prisma, supporting Day/Night events, ratings, CMS, radio, ads, moderation, i18n, and geo search.

## Overview

This package contains the Prisma schema, migrations, seed data, and Zod validation schemas for the Tenerife.music platform. The schema is designed following Domain-Driven Design (DDD) principles with clear bounded contexts and supports all core features including:

- 🌅 **Day/Night Event Split** - Events categorized by daytime (concerts/lifestyle) or nighttime (clubs/parties)
- ⭐ **Multi-Entity Ratings** - Users can rate events, organizations, artists, and articles
- 📝 **CMS with i18n** - Articles with per-locale slugs for SEO (en/es/ru)
- 📻 **Radio Streaming** - Radio stations, shows, episodes, and track history
- 📢 **Ad Placements** - Sponsored content across multiple slots
- 👮 **Moderation System** - Approval workflows with audit logs
- 🌍 **Geo Search** - Geohash-based proximity and bounding box queries
- 🔍 **Search Integration** - Metadata for Typesense sync

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local or Neon)
- pnpm (or npm/yarn)

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env and set DATABASE_URL

# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database with test data
pnpm db:seed

# Open Prisma Studio to explore data
pnpm db:studio
```

## Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ OrgMember : "has"
    User ||--o{ Notification : "receives"
    User ||--o{ Favorite : "creates"
    User ||--o{ Rating : "gives"
    User ||--o{ Article : "writes"
    User ||--o{ AuditLog : "performs"
    User ||--o{ ModerationLog : "moderates"
    
    Organization ||--o{ OrgMember : "has"
    Organization ||--o{ Event : "organizes"
    Organization ||--o{ Article : "publishes"
    Organization ||--o{ AdPlacement : "runs"
    Organization ||--o| BillingCustomer : "has"
    Organization ||--o{ BillingSubscription : "subscribes"
    Organization ||--o{ BillingInvoice : "receives"
    
    Event ||--o{ EventGenre : "has"
    Event ||--o{ EventTag : "has"
    Event ||--o{ EventArtist : "features"
    Event }o--|| Venue : "held_at"
    Event ||--o{ Media : "has"
    Event ||--o{ ModerationLog : "logged"
    Event ||--o{ MetricsEventDaily : "tracks"
    
    Genre ||--o{ EventGenre : "categorizes"
    Genre ||--o{ ArtistGenre : "categorizes"
    
    Tag ||--o{ EventTag : "tags"
    Tag ||--o{ ArticleTag : "tags"
    
    Artist ||--o{ ArtistGenre : "has"
    Artist ||--o{ EventArtist : "performs"
    Artist ||--o{ Media : "has"
    
    Venue ||--o{ Event : "hosts"
    Venue ||--o{ Media : "has"
    
    Article ||--o{ ArticleI18n : "translates"
    Article ||--o{ ArticleCategory : "categorizes"
    Article ||--o{ ArticleTag : "tags"
    Article ||--o{ Media : "has"
    
    Category ||--o{ ArticleCategory : "groups"
    Category ||--o| Category : "parent"
    
    RadioStation ||--o{ RadioShow : "broadcasts"
    RadioStation ||--o{ RadioTrack : "plays"
    RadioStation ||--o| RadioNowPlaying : "currently"
    RadioStation ||--o{ RadioStatsDaily : "tracks"
    
    RadioShow ||--o{ RadioEpisode : "produces"
    RadioEpisode ||--o{ RadioTrack : "includes"
```

## Domain Map (Bounded Contexts)

### 1. Users Domain
**Purpose:** User authentication, profiles, notifications, preferences

**Entities:**
- `User` - Core user account with role (USER, MODERATOR, ADMIN)
- `Notification` - In-app notifications with severity levels
- `Favorite` - User favorites (events, artists, orgs, articles)
- `Rating` - User ratings (1-5 stars) with optional reviews
- `AuditLog` - System-wide audit trail

**Key Rules:**
- Users can have multiple roles across organizations via `OrgMember`
- User preferences (locale, dayNight preference) stored in JSONB `settings`
- Soft delete support for GDPR compliance

### 2. Organizations Domain
**Purpose:** Event organizers, promoters, venues management

**Entities:**
- `Organization` - Companies, clubs, promoters
- `OrgMember` - Membership with roles (ORG_ADMIN, ORG_EDITOR, ORG_VIEWER)
- `BillingCustomer` - Stripe customer mirror
- `BillingSubscription` - Active subscriptions (FREE, PRO, VIP plans)
- `BillingInvoice` - Payment history

**Key Rules:**
- Each org has plan-based quotas (maxEvents, maxArticles, featuredSlots)
- Location stored as JSONB with geohash for proximity search
- Billing entities mirror Stripe data for offline access

### 3. Events Domain
**Purpose:** Core event management with Day/Night categorization

**Entities:**
- `Event` - Main event entity with status workflow
- `EventGenre` - M2M: Event ↔ Genre
- `EventTag` - M2M: Event ↔ Tag
- `EventArtist` - M2M: Event ↔ Artist (with order)
- `Genre` - Music genres with i18n names
- `Tag` - Event tags/features (underground, rooftop, free-entry)
- `Artist` - Performers with bio, links, ratings
- `Venue` - Physical locations with capacity, coordinates
- `Media` - Polymorphic media (images, videos) for events/artists/venues
- `ModerationLog` - Status change history
- `MetricsEventDaily` - Daily view/click aggregates

**Key Rules:**
- Events must be APPROVED + PUBLIC to show in public listings
- `dayNight` field distinguishes daytime vs nighttime events
- Geohash stored at precision 7 (~76m) for fast geo queries
- Soft delete + versioning for audit trail
- Rating aggregates (ratingAvg, ratingCount) on Event, Artist

**Status Workflow:**
```
DRAFT → PENDING → APPROVED ✓
                 ↘ REJECTED ✗
```

### 4. Content Domain (CMS)
**Purpose:** Blog/magazine articles with multi-language support

**Entities:**
- `Article` - Article metadata
- `ArticleI18n` - Per-locale content (slug, title, summary, body)
- `Category` - Hierarchical categories with i18n names
- `ArticleCategory` - M2M: Article ↔ Category
- `ArticleTag` - M2M: Article ↔ Tag

**Key Rules:**
- Per-locale slugs in `ArticleI18n` for SEO (e.g., `/en/articles/best-clubs`, `/es/articulos/mejores-clubes`)
- Status workflow: DRAFT → PENDING → PUBLISHED
- Rating aggregates on Article
- Soft delete support

### 5. Radio Domain
**Purpose:** 24/7 streaming radio with show scheduling

**Entities:**
- `RadioStation` - Radio streams with status
- `RadioShow` - Recurring shows with schedule (JSONB)
- `RadioEpisode` - Individual show instances
- `RadioTrack` - Track play history
- `RadioNowPlaying` - Current track + listener count
- `RadioStatsDaily` - Daily listener metrics

**Key Rules:**
- One `RadioNowPlaying` per station (1:1 relation)
- Track history logged in `RadioTrack`
- Shows have schedule: `{dayOfWeek: 5, startTime: "18:00", endTime: "20:00"}`

### 6. Ads Domain
**Purpose:** Sponsored content and advertising campaigns

**Entities:**
- `AdPlacement` - Ad campaigns with budget, slot, targeting

**Key Rules:**
- Slots: HOME_HERO, LIST_SPONSORED, EVENT_INLINE, SIDEBAR_BANNER, RADIO_PRE_ROLL
- Active ads: `status = ACTIVE` AND `startAt <= NOW() <= endAt`
- Targeting criteria in JSONB `meta`: `{targeting: {city, dayNight, genres}}`
- Impressions/clicks tracked per placement

### 7. Moderation Domain
**Purpose:** Content approval workflows and audit

**Entities:**
- `ModerationLog` - Records all status changes

**Key Rules:**
- Logs reference targetType + targetId (polymorphic)
- Moderators (USER.role = MODERATOR or ADMIN) can approve/reject
- Reason field for rejections

### 8. Search Domain
**Purpose:** Typesense integration metadata

**Entities:**
- `SearchIndexMeta` - Tracks sync status per collection

**Key Rules:**
- Collections: events, articles, artists, venues
- `lastSyncAt` for incremental updates

## i18n Strategy

### Supported Locales
- `en` - English (default)
- `es` - Spanish (primary for Tenerife)
- `ru` - Russian (tourist demographic)

### Implementation Approaches

#### 1. JSONB for Simple Fields
Used for: Genre names, Tag names, short descriptions

```json
{
  "en": "Techno",
  "es": "Techno",
  "ru": "Техно"
}
```

**Pros:** Fast queries, simpler schema
**Cons:** No per-locale slugs, harder full-text search

#### 2. Translation Tables for SEO-Critical Content
Used for: Articles (ArticleI18n)

```sql
-- ArticleI18n table
articleId | locale | slug                  | title
----------|--------|----------------------|------------------
abc123    | en     | best-beach-clubs     | Best Beach Clubs
abc123    | es     | mejores-clubes-playa | Mejores Clubes
```

**Pros:** Per-locale slugs for SEO, better full-text search
**Cons:** More joins, complex queries

### Future Considerations
- Event i18n: For now, events use single language title/description. Can add `EventI18n` table later if needed.
- Automatic translation pipelines via DeepL/Google Translate API

## Rating Aggregates Update Strategy

### Approach: Background Worker (Recommended)

**Why not triggers?**
- Postgres triggers work but add latency to user requests
- Harder to test and debug
- Vendor lock-in (Neon may have limited trigger support)

**Worker Implementation:**
1. On Rating create/update/delete, enqueue job: `{type: 'UPDATE_RATING', targetType: 'EVENT', targetId: '...'}`
2. Worker (BullMQ + Redis) processes job:
   ```sql
   UPDATE events
   SET ratingAvg = (SELECT AVG(score) FROM ratings WHERE targetType = 'EVENT' AND targetId = $1),
       ratingCount = (SELECT COUNT(*) FROM ratings WHERE targetType = 'EVENT' AND targetId = $1)
   WHERE id = $1;
   ```
3. Eventual consistency: ratings update within ~1-5 seconds

**Alternative: Scheduled Job**
- Recalculate all rating aggregates hourly
- Simpler but less real-time

## Query Optimization Tips

### Event Listing (Most Common Query)

**Use case:** User visits site, selects DAY or NIGHT, filters by city

```sql
-- Optimized query (uses composite index)
SELECT * FROM events
WHERE city = 'Santa Cruz'
  AND dayNight = 'NIGHT'
  AND startAt >= NOW()
  AND status = 'APPROVED'
  AND visibility = 'PUBLIC'
ORDER BY startAt ASC
LIMIT 20;
```

**Index:** `(city, dayNight, startAt)` ✅

### Geo Bounding Box Query

**Use case:** Map view showing events in visible area

```sql
-- Step 1: Filter by geohash prefix (fast)
SELECT * FROM events
WHERE geoHash LIKE 'eyh7%'  -- Santa Cruz area
  AND status = 'APPROVED';

-- Step 2: Exact bounding box check (in application layer)
-- Filter results where lat BETWEEN minLat AND maxLat
--                  AND lng BETWEEN minLng AND maxLng
```

**Index:** `(geoHash)` ✅

### Search by Genres/Tags (M2M)

```sql
-- Find events with genre "Techno" OR "House"
SELECT DISTINCT e.*
FROM events e
JOIN event_genres eg ON e.id = eg.eventId
WHERE eg.genreId IN ('genre1', 'genre2')
  AND e.status = 'APPROVED';
```

**Index:** `(eventId, genreId)` on `event_genres` ✅

## Geohash Reference

| Precision | Cell Size | Use Case |
|-----------|-----------|----------|
| 4 | ~20 km | Island-level |
| 5 | ~2.4 km | City-level (recommended for filters) |
| 6 | ~610 m | Neighborhood |
| 7 | ~76 m | **Event/venue storage (recommended)** |
| 8 | ~19 m | Precise location |

**Tenerife Example:**
- Santa Cruz center: `eyh7e2pg` (precision 8)
- Prefix `eyh7` covers most of Santa Cruz area

## Environment Variables

Required in `.env`:

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/tenerife_music?schema=public"

# Optional: External Services
STRIPE_SECRET_KEY="sk_test_..."
TYPESENSE_API_KEY="xyz..."
TYPESENSE_HOST="localhost:8108"
MAPBOX_TOKEN="pk.ey..."
REDIS_URL="redis://localhost:6379"
UPSTASH_REDIS_URL="https://..."
```

## Scripts

```bash
# Generate Prisma Client
pnpm db:generate

# Create migration
pnpm db:migrate -- --name add_user_preferences

# Deploy migrations (production)
pnpm db:migrate:deploy

# Seed database
pnpm db:seed

# Validate schema
pnpm db:validate

# Format schema
pnpm db:format

# Open Prisma Studio
pnpm db:studio
```

## Testing Seed Data

After running seed:

```sql
-- Count by day/night
SELECT dayNight, COUNT(*) FROM events GROUP BY dayNight;
-- Result: DAY: 10, NIGHT: 20

-- Featured events
SELECT id, title, featured FROM events WHERE featured = true;

-- Events by status
SELECT status, COUNT(*) FROM events GROUP BY status;
-- Result: APPROVED: 25, PENDING: 3, DRAFT: 2

-- Check ratings
SELECT targetType, COUNT(*), AVG(score) FROM ratings GROUP BY targetType;

-- Radio now playing
SELECT * FROM radio_now_playing;
```

## Migration Best Practices

1. **Never edit existing migrations** - Always create new ones
2. **Test migrations on staging** before production
3. **Backup before migrating** production
4. **Use transactions** (Prisma does this by default)
5. **Monitor migration time** - Large tables may lock

## Schema Evolution Examples

### Adding a new field to Event

```prisma
model Event {
  // ... existing fields
  streamUrl String? // Add virtual event support
}
```

Then run:
```bash
pnpm db:migrate -- --name add_event_stream_url
```

### Adding a new bounded context

1. Create models in `schema.prisma`
2. Run migration
3. Create repository interface in `packages/domain/src/my-context/`
4. Implement service with business rules
5. Update API controllers to use service

## FAQ

**Q: Why JSONB for i18n instead of translation tables everywhere?**
A: Balance between simplicity and SEO. Articles need per-locale slugs for `/en/articles/slug` vs `/es/articulos/slug`. Genres/tags don't need SEO slugs, so JSONB is faster.

**Q: Why geohash instead of PostGIS?**
A: Simpler setup (no extensions), portable across Postgres providers (Neon, Supabase, RDS). For most use cases, geohash + bounding box queries are sufficient. Can add PostGIS later if needed.

**Q: How to handle timezone for events?**
A: Store `startAt` and `endAt` as UTC in database. Frontend converts to user's timezone. Tenerife is UTC+0 (WET) or UTC+1 (WEST in summer).

**Q: Can I change event status directly via Prisma?**
A: No! Use domain services (`EventsService.approveEvent()`) which enforce business rules and create audit logs. Direct Prisma calls bypass validation.

**Q: What's the difference between soft delete (isDeleted) and status (REJECTED)?**
A: Status is workflow state. Soft delete is permanent removal (e.g., GDPR request). Rejected events can be edited and resubmitted.

## Performance Benchmarks

On local Postgres with seed data (30 events, 10 artists, 6 venues):

- Event listing query: ~2ms
- Event with relations: ~5ms
- Geo bounding box (5 prefixes): ~8ms
- Full-text search (via Typesense): ~15ms (network included)

On Neon (serverless cold start): add ~200-500ms for connection warmup.

## Next Steps

1. ✅ Schema complete
2. ✅ Seeds ready
3. ⏭️ Implement repository adapters (Prisma → interface)
4. ⏭️ Build NestJS API modules consuming domain services
5. ⏭️ Set up Typesense sync worker
6. ⏭️ Add authentication (NextAuth.js or Clerk)
7. ⏭️ Deploy to Neon + Vercel

## Contributing

When adding new entities:
1. Update `schema.prisma`
2. Add Zod schemas in `src/zod.ts`
3. Create migration
4. Update seed with realistic data
5. Add repository interface in domain package
6. Update this README with ERD changes

## License

Private - Tenerife.music

---

Built with ❤️ in the Canary Islands 🌴
