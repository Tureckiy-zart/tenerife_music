/**
 * Seed script for Tenerife.music
 * Creates realistic test data for all domains
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple geohash encoder (precision 7 for ~150m accuracy)
function encodeGeohash(lat: number, lng: number, precision = 7): string {
  const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  let idx = 0;
  let bit = 0;
  let evenBit = true;
  let geohash = '';
  
  let latMin = -90, latMax = 90;
  let lngMin = -180, lngMax = 180;
  
  while (geohash.length < precision) {
    if (evenBit) {
      const lngMid = (lngMin + lngMax) / 2;
      if (lng > lngMid) {
        idx = (idx << 1) + 1;
        lngMin = lngMid;
      } else {
        idx = idx << 1;
        lngMax = lngMid;
      }
    } else {
      const latMid = (latMin + latMax) / 2;
      if (lat > latMid) {
        idx = (idx << 1) + 1;
        latMin = latMid;
      } else {
        idx = idx << 1;
        latMax = latMid;
      }
    }
    evenBit = !evenBit;
    
    if (++bit === 5) {
      geohash += base32[idx];
      bit = 0;
      idx = 0;
    }
  }
  
  return geohash;
}

async function main() {
  console.log('🌴 Starting Tenerife.music seed...');

  // Clear existing data (in reverse order of dependencies)
  console.log('Clearing existing data...');
  await prisma.radioNowPlaying.deleteMany();
  await prisma.radioStatsDaily.deleteMany();
  await prisma.radioTrack.deleteMany();
  await prisma.radioEpisode.deleteMany();
  await prisma.radioShow.deleteMany();
  await prisma.radioStation.deleteMany();
  
  await prisma.adPlacement.deleteMany();
  await prisma.searchIndexMeta.deleteMany();
  
  await prisma.articleTag.deleteMany();
  await prisma.articleCategory.deleteMany();
  await prisma.articleI18n.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  
  await prisma.metricsEventDaily.deleteMany();
  await prisma.moderationLog.deleteMany();
  await prisma.media.deleteMany();
  await prisma.eventArtist.deleteMany();
  await prisma.eventTag.deleteMany();
  await prisma.eventGenre.deleteMany();
  await prisma.event.deleteMany();
  
  await prisma.artistGenre.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.genre.deleteMany();
  
  await prisma.billingInvoice.deleteMany();
  await prisma.billingSubscription.deleteMany();
  await prisma.billingCustomer.deleteMany();
  await prisma.orgMember.deleteMany();
  await prisma.organization.deleteMany();
  
  await prisma.auditLog.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();

  // ============================================================================
  // USERS
  // ============================================================================
  console.log('Creating users...');
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tenerife.music',
      name: 'Admin User',
      password: '$2a$10$fakehashedforseed', // In production, properly hash with bcrypt
      role: 'ADMIN',
      profile: {
        bio: 'Platform administrator',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      },
      settings: {
        preferredLocale: 'en',
        emailNotifications: true,
      },
    },
  });

  const moderator = await prisma.user.create({
    data: {
      email: 'mod@tenerife.music',
      name: 'María González',
      password: '$2a$10$fakehashedforseed',
      role: 'MODERATOR',
      profile: {
        bio: 'Event moderator and community manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=moderator',
      },
      settings: {
        preferredLocale: 'es',
        preferredDayNight: 'NIGHT',
        emailNotifications: true,
      },
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@tenerife.music',
      name: 'Carlos Rodríguez',
      password: '$2a$10$fakehashedforseed',
      role: 'USER',
      profile: {
        bio: 'Music lover from Tenerife',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        socials: {
          instagram: 'https://instagram.com/carlos.tnf',
        },
      },
      settings: {
        preferredLocale: 'es',
        preferredDayNight: 'DAY',
        emailNotifications: true,
      },
    },
  });

  console.log(`✓ Created ${[admin, moderator, user].length} users`);

  // ============================================================================
  // ORGANIZATIONS
  // ============================================================================
  console.log('Creating organizations...');

  const orgFree = await prisma.organization.create({
    data: {
      name: 'Tenerife Music Events',
      slug: 'tenerife-music-events',
      plan: 'FREE',
      contact: {
        email: 'info@tenerife-music.com',
        phone: '+34 922 123 456',
        website: 'https://tenerife-music.com',
      },
      location: {
        city: 'Santa Cruz',
        island: 'Tenerife',
        address: 'Calle Marina 15',
        postalCode: '38001',
        lat: 28.4636296,
        lng: -16.2518467,
        geoHash: encodeGeohash(28.4636296, -16.2518467),
      },
      about: 'Organizing amazing music events across Tenerife',
      logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=org1',
      quotas: {
        maxEvents: 10,
        maxArticles: 5,
        featuredSlots: 0,
      },
    },
  });

  const orgPro = await prisma.organization.create({
    data: {
      name: 'Papagayo Beach Club',
      slug: 'papagayo-beach-club',
      plan: 'VIP',
      contact: {
        email: 'events@papagayo.club',
        phone: '+34 922 789 012',
        website: 'https://papagayo.club',
      },
      location: {
        city: 'Playa de las Américas',
        island: 'Tenerife',
        address: 'Avenida Rafael Puig Lluvina',
        postalCode: '38660',
        lat: 28.0594294,
        lng: -16.7346256,
        geoHash: encodeGeohash(28.0594294, -16.7346256),
      },
      about: 'Premium beach club & nightlife destination in South Tenerife',
      logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=org2',
      quotas: {
        maxEvents: 100,
        maxArticles: 50,
        featuredSlots: 5,
      },
    },
  });

  // Add org members
  await prisma.orgMember.createMany({
    data: [
      { userId: admin.id, orgId: orgFree.id, role: 'ORG_ADMIN' },
      { userId: moderator.id, orgId: orgPro.id, role: 'ORG_ADMIN' },
      { userId: user.id, orgId: orgFree.id, role: 'ORG_EDITOR' },
    ],
  });

  // Billing for PRO org
  const billingCustomer = await prisma.billingCustomer.create({
    data: {
      orgId: orgPro.id,
      stripeCustomerId: 'cus_seed_papagayo123',
    },
  });

  await prisma.billingSubscription.create({
    data: {
      orgId: orgPro.id,
      stripeSubId: 'sub_seed_papagayo123',
      plan: 'VIP',
      status: 'ACTIVE',
      currentPeriodStart: new Date('2025-10-01'),
      currentPeriodEnd: new Date('2025-11-01'),
    },
  });

  console.log(`✓ Created ${[orgFree, orgPro].length} organizations`);

  // ============================================================================
  // GENRES
  // ============================================================================
  console.log('Creating genres...');

  const genresData = [
    { slug: 'techno', name: { en: 'Techno', es: 'Techno', ru: 'Техно' } },
    { slug: 'house', name: { en: 'House', es: 'House', ru: 'Хаус' } },
    { slug: 'trance', name: { en: 'Trance', es: 'Trance', ru: 'Транс' } },
    { slug: 'progressive', name: { en: 'Progressive', es: 'Progresivo', ru: 'Прогрессив' } },
    { slug: 'techhouse', name: { en: 'Tech House', es: 'Tech House', ru: 'Тек-хаус' } },
    { slug: 'deep-house', name: { en: 'Deep House', es: 'Deep House', ru: 'Дип-хаус' } },
    { slug: 'jazz', name: { en: 'Jazz', es: 'Jazz', ru: 'Джаз' } },
    { slug: 'funk', name: { en: 'Funk', es: 'Funk', ru: 'Фанк' } },
    { slug: 'reggaeton', name: { en: 'Reggaeton', es: 'Reggaetón', ru: 'Реггетон' } },
    { slug: 'latin', name: { en: 'Latin', es: 'Latino', ru: 'Латино' } },
    { slug: 'indie', name: { en: 'Indie', es: 'Indie', ru: 'Инди' } },
    { slug: 'rock', name: { en: 'Rock', es: 'Rock', ru: 'Рок' } },
  ];

  const genres = await Promise.all(
    genresData.map((g) => prisma.genre.create({ data: g }))
  );

  console.log(`✓ Created ${genres.length} genres`);

  // ============================================================================
  // TAGS
  // ============================================================================
  console.log('Creating tags...');

  const tagsData = [
    { slug: 'underground', name: { en: 'Underground', es: 'Subterráneo', ru: 'Андеграунд' } },
    { slug: 'beachclub', name: { en: 'Beach Club', es: 'Club de Playa', ru: 'Пляжный клуб' } },
    { slug: 'rooftop', name: { en: 'Rooftop', es: 'Azotea', ru: 'На крыше' } },
    { slug: 'all-night', name: { en: 'All Night', es: 'Toda la Noche', ru: 'Всю ночь' } },
    { slug: 'free-entry', name: { en: 'Free Entry', es: 'Entrada Gratuita', ru: 'Бесплатный вход' } },
    { slug: 'live', name: { en: 'Live', es: 'En Vivo', ru: 'Живое выступление' } },
    { slug: 'festival', name: { en: 'Festival', es: 'Festival', ru: 'Фестиваль' } },
    { slug: 'sunset', name: { en: 'Sunset', es: 'Atardecer', ru: 'Закат' } },
  ];

  const tags = await Promise.all(
    tagsData.map((t) => prisma.tag.create({ data: t }))
  );

  console.log(`✓ Created ${tags.length} tags`);

  // ============================================================================
  // ARTISTS
  // ============================================================================
  console.log('Creating artists...');

  const artistsData = [
    { name: 'DJ Solomun', slug: 'dj-solomun', bio: 'Internationally renowned DJ and producer', genres: ['techno', 'house'] },
    { name: 'Amelie Lens', slug: 'amelie-lens', bio: 'Belgian techno DJ and producer', genres: ['techno'] },
    { name: 'Tale Of Us', slug: 'tale-of-us', bio: 'Italian DJ duo from Milan', genres: ['techno', 'progressive'] },
    { name: 'Black Coffee', slug: 'black-coffee', bio: 'South African DJ and producer', genres: ['house', 'deep-house'] },
    { name: 'Hernan Cattaneo', slug: 'hernan-cattaneo', bio: 'Argentine progressive house DJ', genres: ['progressive', 'house'] },
    { name: 'Carlita', slug: 'carlita', bio: 'London-based DJ and producer', genres: ['techhouse', 'house'] },
    { name: 'Los Sabandeños', slug: 'los-sabandenos', bio: 'Traditional Canarian folk group', genres: ['latin'] },
    { name: 'Tinguaro Blues Band', slug: 'tinguaro-blues-band', bio: 'Local Tenerife blues band', genres: ['rock', 'jazz'] },
    { name: 'DJ Nano', slug: 'dj-nano', bio: 'Spanish trance legend', genres: ['trance'] },
    { name: 'Rosalía', slug: 'rosalia', bio: 'Spanish flamenco pop star', genres: ['latin', 'reggaeton'] },
  ];

  const artists = await Promise.all(
    artistsData.map(async (a) => {
      const artist = await prisma.artist.create({
        data: {
          name: a.name,
          slug: a.slug,
          bio: a.bio,
          links: {
            instagram: `https://instagram.com/${a.slug}`,
            spotify: `https://spotify.com/artist/${a.slug}`,
          },
        },
      });

      // Link genres
      const genreIds = genres.filter(g => 
        a.genres.includes(g.slug)
      ).map(g => g.id);

      await prisma.artistGenre.createMany({
        data: genreIds.map(genreId => ({
          artistId: artist.id,
          genreId,
        })),
      });

      return artist;
    })
  );

  console.log(`✓ Created ${artists.length} artists`);

  // ============================================================================
  // VENUES
  // ============================================================================
  console.log('Creating venues...');

  const venuesData = [
    { name: 'Auditorio de Tenerife', slug: 'auditorio-tenerife', city: 'Santa Cruz', lat: 28.4655, lng: -16.2382, capacity: 1616 },
    { name: 'Papagayo Beach Club', slug: 'papagayo', city: 'Playa de las Américas', lat: 28.0594, lng: -16.7346, capacity: 800 },
    { name: 'Fábrica La Isleta', slug: 'fabrica-la-isleta', city: 'Santa Cruz', lat: 28.4619, lng: -16.2400, capacity: 1200 },
    { name: 'Hard Rock Café Tenerife', slug: 'hard-rock-tenerife', city: 'Playa de las Américas', lat: 28.0612, lng: -16.7288, capacity: 400 },
    { name: 'Monkey Beach Club', slug: 'monkey-beach-club', city: 'Los Cristianos', lat: 28.0517, lng: -16.7198, capacity: 600 },
    { name: 'Nui Beach', slug: 'nui-beach', city: 'Costa Adeje', lat: 28.0889, lng: -16.7463, capacity: 350 },
  ];

  const venues = await Promise.all(
    venuesData.map((v) =>
      prisma.venue.create({
        data: {
          name: v.name,
          slug: v.slug,
          city: v.city,
          island: 'Tenerife',
          address: `${v.name} Address`,
          lat: v.lat,
          lng: v.lng,
          geoHash: encodeGeohash(v.lat, v.lng),
          capacity: v.capacity,
          website: `https://${v.slug}.com`,
        },
      })
    )
  );

  console.log(`✓ Created ${venues.length} venues`);

  // ============================================================================
  // EVENTS
  // ============================================================================
  console.log('Creating events...');

  const now = new Date();
  const eventsData = [
    // DAY events
    { title: 'Jazz on the Beach', dayNight: 'DAY', venueIdx: 5, startDays: 2, orgIdx: 0, artistIdxs: [7], genreIdxs: [6], tagIdxs: [5, 7], city: 'Costa Adeje', price: 15 },
    { title: 'Sunset Sessions', dayNight: 'DAY', venueIdx: 1, startDays: 3, orgIdx: 1, artistIdxs: [3, 5], genreIdxs: [1, 5], tagIdxs: [1, 7], city: 'Playa de las Américas', price: 20 },
    { title: 'Indie Rock Festival', dayNight: 'DAY', venueIdx: 0, startDays: 5, orgIdx: 0, artistIdxs: [7], genreIdxs: [10, 11], tagIdxs: [6], city: 'Santa Cruz', price: 25 },
    { title: 'Latin Vibes', dayNight: 'DAY', venueIdx: 3, startDays: 7, orgIdx: 0, artistIdxs: [9], genreIdxs: [8, 9], tagIdxs: [5], city: 'Playa de las Américas', price: 12 },
    { title: 'Acoustic Sunday', dayNight: 'DAY', venueIdx: 4, startDays: 8, orgIdx: 1, artistIdxs: [6], genreIdxs: [9], tagIdxs: [5], city: 'Los Cristianos', price: 0 },
    { title: 'Beach Club Opening', dayNight: 'DAY', venueIdx: 1, startDays: 10, orgIdx: 1, artistIdxs: [5], genreIdxs: [1, 4], tagIdxs: [1], city: 'Playa de las Américas', price: 30 },
    { title: 'Funk & Soul Night', dayNight: 'DAY', venueIdx: 3, startDays: 12, orgIdx: 0, artistIdxs: [7], genreIdxs: [7], tagIdxs: [5], city: 'Playa de las Américas', price: 15 },
    { title: 'Sunset Rooftop Party', dayNight: 'DAY', venueIdx: 5, startDays: 14, orgIdx: 1, artistIdxs: [5], genreIdxs: [1], tagIdxs: [2, 7], city: 'Costa Adeje', price: 25 },
    { title: 'Jazz Brunch', dayNight: 'DAY', venueIdx: 0, startDays: 15, orgIdx: 0, artistIdxs: [7], genreIdxs: [6], tagIdxs: [5], city: 'Santa Cruz', price: 20 },
    { title: 'World Music Festival', dayNight: 'DAY', venueIdx: 2, startDays: 20, orgIdx: 0, artistIdxs: [6, 9], genreIdxs: [9], tagIdxs: [6], city: 'Santa Cruz', price: 18 },
    
    // NIGHT events
    { title: 'Techno Underground', dayNight: 'NIGHT', venueIdx: 2, startDays: 1, orgIdx: 1, artistIdxs: [0, 1], genreIdxs: [0], tagIdxs: [0, 3], city: 'Santa Cruz', price: 20 },
    { title: 'House Music Marathon', dayNight: 'NIGHT', venueIdx: 1, startDays: 2, orgIdx: 1, artistIdxs: [3, 5], genreIdxs: [1, 5], tagIdxs: [3], city: 'Playa de las Américas', price: 25 },
    { title: 'Solomun +1', dayNight: 'NIGHT', venueIdx: 1, startDays: 4, orgIdx: 1, artistIdxs: [0], genreIdxs: [0, 1], tagIdxs: [1, 3], city: 'Playa de las Américas', price: 40 },
    { title: 'Tale Of Us Afterlife', dayNight: 'NIGHT', venueIdx: 2, startDays: 6, orgIdx: 1, artistIdxs: [2], genreIdxs: [0, 3], tagIdxs: [0, 3], city: 'Santa Cruz', price: 35 },
    { title: 'Trance Nation', dayNight: 'NIGHT', venueIdx: 3, startDays: 7, orgIdx: 0, artistIdxs: [8], genreIdxs: [2], tagIdxs: [3], city: 'Playa de las Américas', price: 22 },
    { title: 'Deep House Sessions', dayNight: 'NIGHT', venueIdx: 4, startDays: 9, orgIdx: 1, artistIdxs: [3], genreIdxs: [5], tagIdxs: [1], city: 'Los Cristianos', price: 18 },
    { title: 'Tech House Friday', dayNight: 'NIGHT', venueIdx: 1, startDays: 11, orgIdx: 1, artistIdxs: [5], genreIdxs: [4], tagIdxs: [1], city: 'Playa de las Américas', price: 20 },
    { title: 'Amelie Lens Presents', dayNight: 'NIGHT', venueIdx: 2, startDays: 13, orgIdx: 1, artistIdxs: [1], genreIdxs: [0], tagIdxs: [0, 3], city: 'Santa Cruz', price: 30 },
    { title: 'Reggaeton Night', dayNight: 'NIGHT', venueIdx: 3, startDays: 14, orgIdx: 0, artistIdxs: [9], genreIdxs: [8], tagIdxs: [4], city: 'Playa de las Américas', price: 15 },
    { title: 'Progressive Odyssey', dayNight: 'NIGHT', venueIdx: 2, startDays: 16, orgIdx: 1, artistIdxs: [4], genreIdxs: [3], tagIdxs: [3], city: 'Santa Cruz', price: 25 },
    { title: 'Black Coffee Night', dayNight: 'NIGHT', venueIdx: 1, startDays: 18, orgIdx: 1, artistIdxs: [3], genreIdxs: [1, 5], tagIdxs: [1, 3], city: 'Playa de las Américas', price: 45 },
    { title: 'Techno Warehouse', dayNight: 'NIGHT', venueIdx: 2, startDays: 19, orgIdx: 1, artistIdxs: [0, 1], genreIdxs: [0], tagIdxs: [0, 3], city: 'Santa Cruz', price: 28 },
    { title: 'Carlita & Friends', dayNight: 'NIGHT', venueIdx: 4, startDays: 21, orgIdx: 1, artistIdxs: [5], genreIdxs: [4, 1], tagIdxs: [1], city: 'Los Cristianos', price: 22 },
    { title: 'Midnight House', dayNight: 'NIGHT', venueIdx: 1, startDays: 22, orgIdx: 1, artistIdxs: [3, 5], genreIdxs: [1], tagIdxs: [3], city: 'Playa de las Américas', price: 20 },
    { title: 'Underground Techno', dayNight: 'NIGHT', venueIdx: 2, startDays: 24, orgIdx: 1, artistIdxs: [1], genreIdxs: [0], tagIdxs: [0], city: 'Santa Cruz', price: 18 },
    { title: 'Beach Club All-Nighter', dayNight: 'NIGHT', venueIdx: 1, startDays: 25, orgIdx: 1, artistIdxs: [0, 5], genreIdxs: [0, 4], tagIdxs: [1, 3], city: 'Playa de las Américas', price: 35 },
    { title: 'Tech House Marathon', dayNight: 'NIGHT', venueIdx: 4, startDays: 27, orgIdx: 1, artistIdxs: [5], genreIdxs: [4], tagIdxs: [3], city: 'Los Cristianos', price: 20 },
    { title: 'Trance Energy', dayNight: 'NIGHT', venueIdx: 3, startDays: 28, orgIdx: 0, artistIdxs: [8], genreIdxs: [2], tagIdxs: [3], city: 'Playa de las Américas', price: 25 },
    { title: 'House Classics', dayNight: 'NIGHT', venueIdx: 1, startDays: 29, orgIdx: 1, artistIdxs: [3], genreIdxs: [1, 5], tagIdxs: [1], city: 'Playa de las Américas', price: 22 },
    { title: 'Halloween Techno Special', dayNight: 'NIGHT', venueIdx: 2, startDays: 30, orgIdx: 1, artistIdxs: [0, 1, 2], genreIdxs: [0], tagIdxs: [0, 3, 6], city: 'Santa Cruz', price: 50 },
  ];

  const events = await Promise.all(
    eventsData.map(async (e, idx) => {
      const venue = venues[e.venueIdx];
      const org = [orgFree, orgPro][e.orgIdx];
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() + e.startDays);
      startDate.setHours(e.dayNight === 'DAY' ? 18 : 23, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + (e.dayNight === 'DAY' ? 4 : 6));

      const status = idx < 25 ? 'APPROVED' : (idx < 28 ? 'PENDING' : 'DRAFT');
      
      const event = await prisma.event.create({
        data: {
          orgId: org.id,
          title: e.title,
          description: `Join us for an amazing ${e.dayNight === 'DAY' ? 'daytime' : 'nighttime'} event featuring the best of ${e.title}. ${venue.name} in ${e.city}.`,
          dayNight: e.dayNight as any,
          startAt: startDate,
          endAt: endDate,
          venueId: venue.id,
          address: venue.address || undefined,
          city: e.city,
          island: 'Tenerife',
          lat: venue.lat,
          lng: venue.lng,
          geoHash: venue.geoHash,
          priceFrom: e.price,
          currency: 'EUR',
          ticketUrl: `https://tickets.tenerife.music/event/${idx + 1}`,
          coverUrl: `https://picsum.photos/seed/event${idx}/800/600`,
          status: status as any,
          visibility: 'PUBLIC',
          featured: idx < 5,
          views: Math.floor(Math.random() * 1000),
          clicks: Math.floor(Math.random() * 200),
        },
      });

      // Link artists
      await prisma.eventArtist.createMany({
        data: e.artistIdxs.map((artistIdx, order) => ({
          eventId: event.id,
          artistId: artists[artistIdx].id,
          order,
        })),
      });

      // Link genres
      await prisma.eventGenre.createMany({
        data: e.genreIdxs.map((genreIdx) => ({
          eventId: event.id,
          genreId: genres[genreIdx].id,
        })),
      });

      // Link tags
      await prisma.eventTag.createMany({
        data: e.tagIdxs.map((tagIdx) => ({
          eventId: event.id,
          tagId: tags[tagIdx].id,
        })),
      });

      return event;
    })
  );

  console.log(`✓ Created ${events.length} events`);

  // ============================================================================
  // CATEGORIES & ARTICLES
  // ============================================================================
  console.log('Creating articles...');

  const categoriesData = [
    { slug: 'news', name: { en: 'News', es: 'Noticias', ru: 'Новости' } },
    { slug: 'reviews', name: { en: 'Reviews', es: 'Reseñas', ru: 'Обзоры' } },
    { slug: 'interviews', name: { en: 'Interviews', es: 'Entrevistas', ru: 'Интервью' } },
    { slug: 'guides', name: { en: 'Guides', es: 'Guías', ru: 'Гиды' } },
  ];

  const categories = await Promise.all(
    categoriesData.map((c) => prisma.category.create({ data: c }))
  );

  const articlesData = [
    { title: 'Best Beach Clubs in Tenerife 2025', catIdx: 3, authorIdx: 0, locale: 'en', slug: 'best-beach-clubs-tenerife-2025' },
    { title: 'Los Mejores Clubes de Playa en Tenerife 2025', catIdx: 3, authorIdx: 0, locale: 'es', slug: 'mejores-clubes-playa-tenerife-2025' },
    { title: 'Interview with DJ Solomun', catIdx: 2, authorIdx: 1, locale: 'en', slug: 'interview-dj-solomun' },
    { title: 'Techno Scene in Canary Islands', catIdx: 0, authorIdx: 1, locale: 'en', slug: 'techno-scene-canary-islands' },
    { title: 'Event Review: Tale Of Us at Fábrica', catIdx: 1, authorIdx: 2, locale: 'en', slug: 'review-tale-of-us-fabrica' },
    { title: 'Guide to Tenerife Nightlife', catIdx: 3, authorIdx: 0, locale: 'en', slug: 'guide-tenerife-nightlife' },
    { title: 'Top 10 Events This Month', catIdx: 0, authorIdx: 1, locale: 'en', slug: 'top-10-events-this-month' },
    { title: 'Music Festivals Coming to Tenerife', catIdx: 0, authorIdx: 0, locale: 'en', slug: 'music-festivals-tenerife' },
  ];

  const articles = await Promise.all(
    articlesData.map(async (a, idx) => {
      const author = [admin, moderator, user][a.authorIdx];
      const article = await prisma.article.create({
        data: {
          authorId: author.id,
          orgId: idx < 4 ? orgPro.id : undefined,
          status: idx < 6 ? 'PUBLISHED' : 'DRAFT',
          coverUrl: `https://picsum.photos/seed/article${idx}/1200/630`,
          publishedAt: idx < 6 ? new Date(now.getTime() - idx * 24 * 60 * 60 * 1000) : undefined,
        },
      });

      await prisma.articleI18n.create({
        data: {
          articleId: article.id,
          locale: a.locale,
          slug: a.slug,
          title: a.title,
          summary: `${a.title.substring(0, 100)}...`,
          body: `# ${a.title}\n\nThis is a detailed article about ${a.title.toLowerCase()}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n## Key Points\n\n- Point 1\n- Point 2\n- Point 3\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
        },
      });

      await prisma.articleCategory.create({
        data: {
          articleId: article.id,
          categoryId: categories[a.catIdx].id,
        },
      });

      // Add random tags
      const randomTagIds = tags.slice(0, 2 + (idx % 3)).map(t => t.id);
      await prisma.articleTag.createMany({
        data: randomTagIds.map(tagId => ({
          articleId: article.id,
          tagId,
        })),
      });

      return article;
    })
  );

  console.log(`✓ Created ${articles.length} articles`);

  // ============================================================================
  // RATINGS & FAVORITES
  // ============================================================================
  console.log('Creating ratings and favorites...');

  // User rates some events
  await prisma.rating.createMany({
    data: [
      { userId: user.id, targetType: 'EVENT', targetId: events[0].id, score: 5, review: 'Amazing event!' },
      { userId: user.id, targetType: 'EVENT', targetId: events[10].id, score: 4, review: 'Great music and atmosphere' },
      { userId: moderator.id, targetType: 'EVENT', targetId: events[12].id, score: 5, review: 'Best night ever!' },
      { userId: user.id, targetType: 'ARTIST', targetId: artists[0].id, score: 5, review: 'Legend!' },
      { userId: user.id, targetType: 'ORG', targetId: orgPro.id, score: 5, review: 'Best venue in Tenerife' },
      { userId: moderator.id, targetType: 'ARTICLE', targetId: articles[0].id, score: 4, review: 'Very helpful guide' },
    ],
  });

  // Update rating aggregates for events
  await prisma.event.update({
    where: { id: events[0].id },
    data: { ratingAvg: 5.0, ratingCount: 1 },
  });
  await prisma.event.update({
    where: { id: events[10].id },
    data: { ratingAvg: 4.0, ratingCount: 1 },
  });
  await prisma.event.update({
    where: { id: events[12].id },
    data: { ratingAvg: 5.0, ratingCount: 1 },
  });
  await prisma.artist.update({
    where: { id: artists[0].id },
    data: { ratingAvg: 5.0, ratingCount: 1 },
  });
  await prisma.organization.update({
    where: { id: orgPro.id },
    data: { about: orgPro.about || 'Premium venue' }, // Simulate aggregate update
  });
  await prisma.article.update({
    where: { id: articles[0].id },
    data: { ratingAvg: 4.0, ratingCount: 1 },
  });

  // Favorites
  await prisma.favorite.createMany({
    data: [
      { userId: user.id, targetType: 'EVENT', targetId: events[0].id },
      { userId: user.id, targetType: 'EVENT', targetId: events[12].id },
      { userId: user.id, targetType: 'ARTIST', targetId: artists[0].id },
      { userId: user.id, targetType: 'ARTIST', targetId: artists[1].id },
      { userId: moderator.id, targetType: 'EVENT', targetId: events[10].id },
    ],
  });

  console.log('✓ Created ratings and favorites');

  // ============================================================================
  // MODERATION LOGS
  // ============================================================================
  console.log('Creating moderation logs...');

  await prisma.moderationLog.createMany({
    data: [
      {
        targetType: 'EVENT',
        targetId: events[0].id,
        moderatorId: moderator.id,
        fromStatus: 'PENDING',
        toStatus: 'APPROVED',
        reason: 'All requirements met',
      },
      {
        targetType: 'EVENT',
        targetId: events[27].id,
        moderatorId: moderator.id,
        fromStatus: 'DRAFT',
        toStatus: 'PENDING',
        reason: 'Submitted for review',
      },
    ],
  });

  console.log('✓ Created moderation logs');

  // ============================================================================
  // AD PLACEMENTS
  // ============================================================================
  console.log('Creating ad placements...');

  await prisma.adPlacement.create({
    data: {
      slot: 'HOME_HERO',
      ownerType: 'EVENT',
      ownerId: events[12].id, // Solomun +1
      orgId: orgPro.id,
      startAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      endAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      budget: 500,
      currency: 'EUR',
      status: 'ACTIVE',
      meta: {
        targeting: { city: 'Playa de las Américas', dayNight: 'NIGHT' },
        creativeUrl: events[12].coverUrl,
        clickUrl: `https://tenerife.music/events/${events[12].id}`,
      },
      impressions: 5420,
      clicks: 234,
    },
  });

  console.log('✓ Created ad placements');

  // ============================================================================
  // RADIO
  // ============================================================================
  console.log('Creating radio station...');

  const radioStation = await prisma.radioStation.create({
    data: {
      name: 'Tenerife Electronic Radio',
      slug: 'tenerife-electronic',
      streamUrl: 'https://stream.tenerife.music/live',
      logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=radio',
      description: '24/7 electronic music from the Canary Islands',
      status: 'ACTIVE',
    },
  });

  const radioShow = await prisma.radioShow.create({
    data: {
      stationId: radioStation.id,
      name: 'Sunset Sessions',
      slug: 'sunset-sessions',
      description: 'Deep house and melodic techno for sunset',
      schedule: {
        dayOfWeek: 5, // Friday
        startTime: '18:00',
        endTime: '20:00',
      },
    },
  });

  const currentTrack = await prisma.radioTrack.create({
    data: {
      stationId: radioStation.id,
      artist: 'Black Coffee',
      title: 'Drive',
      album: 'Subconsciously',
      durationMs: 420000,
      playedAt: new Date(),
    },
  });

  await prisma.radioNowPlaying.create({
    data: {
      stationId: radioStation.id,
      trackId: currentTrack.id,
      artist: currentTrack.artist,
      title: currentTrack.title,
      startedAt: new Date(),
      listeners: 127,
    },
  });

  await prisma.radioStatsDaily.create({
    data: {
      stationId: radioStation.id,
      date: new Date(),
      listeners: 450,
      playTimeMs: BigInt(3600000 * 12), // 12 hours
    },
  });

  console.log('✓ Created radio station with data');

  // ============================================================================
  // SEARCH INDEX META
  // ============================================================================
  console.log('Creating search index metadata...');

  await prisma.searchIndexMeta.createMany({
    data: [
      { collection: 'events', version: 1, lastSyncAt: new Date() },
      { collection: 'artists', version: 1, lastSyncAt: new Date() },
      { collection: 'venues', version: 1, lastSyncAt: new Date() },
      { collection: 'articles', version: 1, lastSyncAt: new Date() },
    ],
  });

  console.log('✓ Created search index metadata');

  // ============================================================================
  // NOTIFICATIONS
  // ============================================================================
  console.log('Creating notifications...');

  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        type: 'EVENT_APPROVED',
        severity: 'SUCCESS',
        payload: {
          title: 'Event Approved',
          message: 'Your event "Jazz on the Beach" has been approved!',
          link: `/events/${events[0].id}`,
          entityType: 'EVENT',
          entityId: events[0].id,
        },
      },
      {
        userId: moderator.id,
        type: 'RATING_RECEIVED',
        severity: 'INFO',
        payload: {
          title: 'New Rating',
          message: 'Someone rated your event',
          link: `/events/${events[12].id}`,
          entityType: 'EVENT',
          entityId: events[12].id,
        },
        isRead: true,
        readAt: new Date(),
      },
    ],
  });

  console.log('✓ Created notifications');

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n✅ Seed completed successfully!\n');
  console.log('Summary:');
  console.log(`  Users: 3 (1 admin, 1 moderator, 1 user)`);
  console.log(`  Organizations: 2 (1 FREE, 1 VIP)`);
  console.log(`  Genres: ${genres.length}`);
  console.log(`  Tags: ${tags.length}`);
  console.log(`  Artists: ${artists.length}`);
  console.log(`  Venues: ${venues.length}`);
  console.log(`  Events: ${events.length} (${eventsData.filter(e => e.dayNight === 'DAY').length} DAY, ${eventsData.filter(e => e.dayNight === 'NIGHT').length} NIGHT)`);
  console.log(`  Articles: ${articles.length}`);
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Ratings: 6`);
  console.log(`  Favorites: 5`);
  console.log(`  Radio Stations: 1`);
  console.log(`  Ad Placements: 1 (ACTIVE)`);
  console.log('\n🌴 Tenerife.music database is ready!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
