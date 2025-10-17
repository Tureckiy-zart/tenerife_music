# Tenerife.music Backend Foundation

> Clean, DDD-aligned backend foundation with Prisma/PostgreSQL: domains, schema, services, and seeds ready for API and frontend integration.

## 🎯 Project Overview

Tenerife.music is a music portal for the Canary Islands (starting with Tenerife) featuring:

- **🌅 Day/Night Split** - First screen lets users choose DAY (concerts/lifestyle) or NIGHT (clubs/parties)
- **🎵 Events** - Concerts, club nights, festivals with geo search and filters
- **⭐ Ratings** - Users rate events, organizations, artists, and articles
- **📝 CMS** - Articles with multi-language support (en/es/ru) and SEO-friendly slugs
- **📻 Radio** - 24/7 streaming with track history and show scheduling
- **📢 Ads** - Sponsored placements across multiple slots
- **👮 Moderation** - Approval workflows for user-generated content
- **🌍 i18n** - Spanish (primary), English, Russian support
- **🗺️ Geo Search** - Geohash-based proximity and bounding box queries

## 📁 Repository Structure

```
/workspace
├── packages/
│   ├── db/                 # Prisma schema, migrations, seeds, Zod types
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── seed.ts
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── zod.ts     # Validation schemas
│   │   ├── README.md       # ERD, domain map, query tips
│   │   └── package.json
│   │
│   ├── domain/            # Domain services (use-cases) by bounded context
│   │   ├── src/
│   │   │   ├── events/    # EventsService with createEvent, approveEvent, listApprovedEvents
│   │   │   ├── users/     # UsersService (stub)
│   │   │   ├── orgs/      # OrgsService (stub)
│   │   │   ├── content/   # ContentService (stub)
│   │   │   ├── radio/     # RadioService (stub)
│   │   │   ├── ads/       # AdsService (stub)
│   │   │   └── moderation/# ModerationService (stub)
│   │   └── package.json
│   │
│   └── shared/            # Common utilities, errors, types
│       ├── src/
│       │   ├── errors.ts   # DomainError, ValidationError, etc.
│       │   ├── geohash.ts  # Geohash encoding/decoding, bounding box
│       │   ├── i18n.ts     # Locale helpers, translation utilities
│       │   └── types.ts    # Common types (PaginatedResult, etc.)
│       └── package.json
│
├── apps/                  # (Future) Applications
│   ├── api/               # NestJS API server
│   └── web/               # Next.js frontend
│
├── .env.example           # Environment variables template
└── BACKEND_FOUNDATION_README.md (this file)
```

## 🏗️ Architecture

### DDD Principles

This project follows **Domain-Driven Design** with clear bounded contexts:

1. **UsersDomain** - Authentication, profiles, notifications, favorites, ratings
2. **OrgsDomain** - Organizations, memberships, billing (Stripe mirror)
3. **EventsDomain** - Events with Day/Night split, genres, tags, artists, venues
4. **ContentDomain** - CMS articles with per-locale slugs
5. **RadioDomain** - Radio stations, shows, episodes, tracks, now-playing
6. **AdsDomain** - Ad placements with targeting and metrics
7. **ModerationDomain** - Approval workflows and audit logs

### Clean Architecture Layers

```
┌─────────────────────────────────────┐
│  API Layer (apps/api)               │  ← NestJS controllers
│  - REST/GraphQL endpoints            │
│  - Request validation                │
│  - Authentication/Authorization      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Domain Layer (packages/domain)     │  ← Business logic
│  - Services (use-cases)              │
│  - Repository interfaces (ports)    │
│  - Domain events                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Infrastructure Layer               │
│  - Repository implementations        │  ← Prisma adapters
│  - External service adapters         │  ← Stripe, Typesense, etc.
│  - Database (packages/db)            │
└─────────────────────────────────────┘
```

**Key Benefits:**
- ✅ Business logic isolated from frameworks
- ✅ Easy to test (mock repositories)
- ✅ Portable (swap Prisma for TypeORM without changing domain)
- ✅ Clear dependency direction (domain → infrastructure, never reverse)

## 🗄️ Database Schema Highlights

### Core Entities

- **User** - role: USER | MODERATOR | ADMIN, profile (JSONB), settings (locale, dayNight preference)
- **Organization** - plan: FREE | PRO | VIP, quotas, location with geohash
- **Event** - dayNight: DAY | NIGHT, status workflow (DRAFT → PENDING → APPROVED), lat/lng/geoHash for geo queries
- **Genre, Tag, Artist, Venue** - M2M relations with events
- **Article** - ArticleI18n for per-locale slugs (`/en/articles/best-clubs` vs `/es/articulos/mejores-clubes`)
- **Rating** - Polymorphic (targetType + targetId) for events/orgs/artists/articles
- **Media** - Polymorphic for images/videos across entities
- **RadioStation** - 24/7 streaming with RadioNowPlaying (1:1)
- **AdPlacement** - Slot-based with targeting (city, dayNight, genres)

### Key Indexes

```sql
-- Fast event listing by city + dayNight + date
CREATE INDEX events_city_daynight_start ON events(city, dayNight, startAt);

-- Geo search
CREATE INDEX events_geohash ON events(geoHash);

-- User favorites lookup
CREATE INDEX favorites_user_target ON favorites(userId, targetType, targetId);
```

See **[packages/db/README.md](packages/db/README.md)** for full ERD and query optimization tips.

## 🌱 Seed Data

Run `pnpm --filter @tenerife.music/db db:seed` to populate with realistic test data:

- **3 users** - admin@tenerife.music (ADMIN), mod@tenerife.music (MODERATOR), user@tenerife.music (USER)
- **2 organizations** - "Tenerife Music Events" (FREE), "Papagayo Beach Club" (VIP)
- **12 genres** - Techno, House, Trance, Jazz, Reggaeton, etc.
- **8 tags** - Underground, Beach Club, Rooftop, Free Entry, etc.
- **10 artists** - DJ Solomun, Amelie Lens, Black Coffee, etc.
- **6 venues** - Auditorio de Tenerife, Papagayo, Fábrica La Isleta, etc.
- **30 events** - 10 DAY events (Jazz on the Beach, Sunset Sessions) + 20 NIGHT events (Techno Underground, Solomun +1)
- **8 articles** - "Best Beach Clubs in Tenerife 2025", "Interview with DJ Solomun", etc.
- **6 ratings** - Sample ratings for events, artists, orgs, articles
- **5 favorites** - User favorites
- **1 radio station** - "Tenerife Electronic Radio" with now-playing track
- **1 active ad** - HOME_HERO ad for Solomun +1 event

### Example Queries After Seed

```sql
-- Events by Day/Night
SELECT dayNight, COUNT(*) FROM events GROUP BY dayNight;
-- Result: DAY: 10, NIGHT: 20

-- Approved events in Santa Cruz starting this week
SELECT title, startAt FROM events
WHERE city = 'Santa Cruz'
  AND status = 'APPROVED'
  AND startAt >= NOW()
ORDER BY startAt;

-- Top rated events
SELECT e.title, e.ratingAvg, e.ratingCount
FROM events e
WHERE e.ratingCount > 0
ORDER BY e.ratingAvg DESC, e.ratingCount DESC;
```

## 💼 Example: EventsService Usage

The **EventsService** implements three key use-cases with full business rule enforcement:

### 1. Create Event (with quota checks)

```typescript
import { EventsService } from '@tenerife.music/domain';

const event = await eventsService.createEvent(
  {
    orgId: 'org_papagayo',
    title: 'Techno Underground',
    dayNight: 'NIGHT',
    startAt: new Date('2025-10-20T23:00:00Z'),
    city: 'Santa Cruz',
    island: 'Tenerife',
    lat: 28.4636,
    lng: -16.2518,
    priceFrom: 20,
    genreIds: ['genre_techno'],
    tagIds: ['tag_underground'],
    artistIds: ['artist_solomun'],
  },
  'user_id' // Must be ORG_ADMIN or ORG_EDITOR
);

// Business rules enforced:
// ✅ User has ORG_ADMIN/ORG_EDITOR role
// ✅ Organization hasn't exceeded event quota
// ✅ No duplicate event (title + startAt)
// ✅ Geohash calculated automatically
```

### 2. Approve Event (moderator action)

```typescript
const approvedEvent = await eventsService.approveEvent(
  'event_id',
  'moderator_id', // Must be MODERATOR or ADMIN
  'Looks great!'
);

// Business rules enforced:
// ✅ Moderator has MODERATOR/ADMIN role
// ✅ Event is in PENDING status
// ✅ ModerationLog created
// ✅ Organization notified (TODO)
```

### 3. List Approved Events (public)

```typescript
const result = await eventsService.listApprovedEvents({
  city: 'Santa Cruz',
  dayNight: 'NIGHT',
  startFrom: new Date(),
  genreIds: ['genre_techno', 'genre_house'],
  geoBox: {
    minLat: 28.4,
    maxLat: 28.5,
    minLng: -16.3,
    maxLng: -16.2,
  },
  page: 1,
  limit: 20,
});

// Returns PaginatedResult<EventWithRelations>
// Only APPROVED + PUBLIC events
// Geohash-optimized queries
// Includes genres, tags, artists, venue
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- PostgreSQL 14+ (or Neon account)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment
cp .env.example .env
# Edit .env and set DATABASE_URL

# 3. Generate Prisma Client
pnpm --filter @tenerife.music/db db:generate

# 4. Run migrations
pnpm --filter @tenerife.music/db db:migrate

# 5. Seed database
pnpm --filter @tenerife.music/db db:seed

# 6. Explore data
pnpm --filter @tenerife.music/db db:studio
```

### Validation

```bash
# Validate Prisma schema
cd packages/db && pnpm db:validate
# ✅ The schema at prisma/schema.prisma is valid 🚀

# Check seed data
psql $DATABASE_URL -c "SELECT dayNight, COUNT(*) FROM events GROUP BY dayNight;"
#  daynight | count
# ----------+-------
#  DAY      |    10
#  NIGHT    |    20
```

## 📚 Documentation

- **[packages/db/README.md](packages/db/README.md)** - Complete ERD, domain map, i18n strategy, rating aggregates, query tips
- **[.env.example](.env.example)** - All environment variables with descriptions
- **[packages/shared/src/errors.ts](packages/shared/src/errors.ts)** - Domain error types
- **[packages/shared/src/geohash.ts](packages/shared/src/geohash.ts)** - Geo utilities
- **[packages/shared/src/i18n.ts](packages/shared/src/i18n.ts)** - i18n helpers

## 🔜 Next Steps

### Phase 1: API Implementation (apps/api)
1. ✅ **Repository Implementations** - Prisma adapters for each repository interface
2. ✅ **NestJS Modules** - Events, Users, Orgs, Content, Radio, Ads modules
3. ✅ **Authentication** - JWT + NextAuth.js integration
4. ✅ **Authorization Guards** - Role-based access control
5. ✅ **API Documentation** - Swagger/OpenAPI

### Phase 2: Search & Cache
1. ✅ **Typesense Sync** - Worker to sync events/articles/artists/venues
2. ✅ **Redis Cache** - Hot data caching with Upstash
3. ✅ **Rate Limiting** - Per-user/IP limits

### Phase 3: Frontend (apps/web)
1. ✅ **Day/Night Selection Screen** - First-time user choice (persisted in cookies + profile)
2. ✅ **Event Listings** - Infinite scroll, filters, map view
3. ✅ **Event Detail** - Gallery, lineup, venue map, ratings
4. ✅ **CMS Pages** - Article listing and detail with per-locale routing

### Phase 4: Advanced Features
1. ✅ **Rating Aggregates Worker** - BullMQ job to recompute on rating changes
2. ✅ **Email Notifications** - Event approved/rejected, reminders
3. ✅ **Stripe Webhooks** - Subscription lifecycle handling
4. ✅ **Media Upload** - Cloudinary integration for images/videos
5. ✅ **Admin Dashboard** - Moderation queue, analytics

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Database** | PostgreSQL (Neon) + Prisma ORM |
| **API** | NestJS (TypeScript) |
| **Frontend** | Next.js 15 (App Router, RSC) |
| **Validation** | Zod |
| **Search** | Typesense |
| **Cache** | Redis (Upstash) |
| **Auth** | NextAuth.js |
| **Payments** | Stripe |
| **Storage** | Cloudinary / S3 |
| **Maps** | Leaflet + Mapbox tiles |
| **i18n** | next-intl |
| **Deployment** | Vercel (web + api) + Neon (db) |

## 🧪 Testing Strategy (Future)

```typescript
// Example: EventsService unit test
describe('EventsService', () => {
  it('should create event when user has ORG_EDITOR role', async () => {
    // Arrange
    const mockEventRepo = createMockEventRepository();
    const mockOrgRepo = createMockOrgRepository({
      findMembership: () => ({ role: 'ORG_EDITOR' }),
    });
    const service = new EventsService({
      eventRepository: mockEventRepo,
      organizationRepository: mockOrgRepo,
      userRepository: mockUserRepo,
    });

    // Act
    const event = await service.createEvent(validEventData, 'user_id');

    // Assert
    expect(event.title).toBe(validEventData.title);
    expect(mockEventRepo.create).toHaveBeenCalled();
  });

  it('should throw ForbiddenError when user lacks permission', async () => {
    // ... test forbidden case
  });
});
```

## 📊 Performance Targets

- Event listing query: **< 50ms** (indexed)
- Event detail with relations: **< 100ms**
- Geo bounding box (20 events): **< 150ms**
- Full-text search (Typesense): **< 30ms**
- API p95 latency: **< 300ms**

## 🤝 Contributing

This is the foundational layer. When extending:

1. **New Entity?** → Add to `packages/db/prisma/schema.prisma` → Run migration → Update seed
2. **New Domain?** → Create `packages/domain/src/my-domain/` with repository interface + service
3. **New Use Case?** → Add method to existing service in domain layer
4. **New Validation?** → Add Zod schema to `packages/db/src/zod.ts`

## 📝 License

Private - Tenerife.music

---

**Status:** ✅ Backend foundation complete and ready for API implementation

**Last Updated:** 2025-10-16

**Built with ❤️ in the Canary Islands** 🌴
