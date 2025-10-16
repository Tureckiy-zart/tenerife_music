
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Очищаем существующие данные
  await prisma.article.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.event.deleteMany()

  console.log('✅ Cleared existing data')

  // События
  const events = await prisma.event.createMany({
    data: [
      {
        title: 'Sunset Techno Session',
        date: 'Nov 15, 2024',
        venue: 'Papagayo Beach Club',
        genre: 'Techno',
        image: 'https://i.ytimg.com/vi/BPc7JErNdHI/maxresdefault.jpg',
        description: 'Experience the ultimate sunset techno session with international DJs'
      },
      {
        title: 'Carnival Beats Festival',
        date: 'Dec 20, 2024',
        venue: 'Plaza del Adelantado',
        genre: 'Folk',
        image: 'https://www.opodo.co.uk/blog/wp-content/uploads/sites/12/2024/02/carnaval_tenerife.jpg',
        description: 'Traditional Canarian music meets modern beats in this cultural celebration'
      },
      {
        title: 'Electronic Waves',
        date: 'Jan 10, 2025',
        venue: 'Tramps Tenerife',
        genre: 'Electronic',
        image: 'https://i3.wp.com/estaticos-cdn.prensaiberica.es/clip/51955172-575c-4b21-aa6b-e262d7a072a0_16-9-discover-aspect-ratio_default_0.jpg',
        description: 'Underground electronic music showcase featuring local and international artists'
      },
      {
        title: 'Jazz Under the Stars',
        date: 'Feb 5, 2025',
        venue: 'Auditorio de Tenerife',
        genre: 'Jazz',
        image: 'https://www.auditoriodetenerife.com/wp-content/uploads/2025/02/20241205132043_(c)%20Auditorio%20de%20Tenerife-Efra%C3%ADn%20Pinto-scaled.jpg',
        description: 'An elegant evening of jazz music in Tenerife\'s premier concert hall'
      },
      {
        title: 'Beach House Vibes',
        date: 'Feb 20, 2025',
        venue: 'Monkey Beach Club',
        genre: 'House',
        image: 'https://i.ytimg.com/vi/cpwBoLvNQIM/maxresdefault.jpg',
        description: 'House music party right on the beach with ocean views and sunset vibes'
      },
      {
        title: 'Underground Pulse',
        date: 'Mar 8, 2025',
        venue: 'NRG Club',
        genre: 'Techno',
        image: 'https://canaryvip.com/wp-content/uploads/2024/03/24673.jpg',
        description: 'Deep techno sounds in Tenerife\'s hottest underground venue'
      },
      {
        title: 'Canarian Folk Night',
        date: 'Mar 25, 2025',
        venue: 'Casa de la Cultura',
        genre: 'Folk',
        image: 'https://i.ytimg.com/vi/jVrUwebo2NY/maxresdefault.jpg',
        description: 'Celebrate traditional Canarian music with authentic instruments and performances'
      },
      {
        title: 'Ocean House Festival',
        date: 'Apr 12, 2025',
        venue: 'Costa Adeje',
        genre: 'House',
        image: 'https://whenincanarias.wordpress.com/wp-content/uploads/2024/03/tenerife-music-festivals.jpg',
        description: 'Multi-day house music festival on the beautiful Costa Adeje coastline'
      }
    ]
  })

  console.log(`✅ Created ${events.count} events`)

  // Площадки
  const venues = await prisma.venue.createMany({
    data: [
      {
        name: 'Auditorio de Tenerife',
        location: 'Santa Cruz de Tenerife',
        type: 'Concert Hall',
        capacity: '1,600',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Auditorio_de_Tenerife_2015_%2850MP%29.jpg',
        description: 'Iconic architectural masterpiece hosting world-class performances',
        genres: ['Classical', 'Jazz', 'Opera', 'Contemporary'],
        address: 'Av. de la Constitución, 1, 38003 Santa Cruz de Tenerife',
        phone: '+34 922 568 600',
        website: 'auditoriodetenerife.com',
        hours: 'Mon-Sat: 10:00-20:00, Sun: Closed',
        features: ['World-class acoustics', 'Santiago Calatrava design', 'Premium seating', 'Full orchestra capabilities']
      },
      {
        name: 'Papagayo Beach Club',
        location: 'Playa de las Américas',
        type: 'Beach Club',
        capacity: '500',
        image: 'https://welikecanarias.com/wp-content/uploads/2025/05/Papagayo-Beach-Club-tenerife-1024x768.jpeg',
        description: 'Spectacular beachfront venue with sunset views and electronic vibes',
        genres: ['House', 'Electronic', 'Chill-out', 'Techno'],
        address: 'Playa de Las Vistas, 38650 Arona',
        phone: '+34 922 787 549',
        website: 'papagayobeachclub.com',
        hours: 'Daily: 10:00-02:00',
        features: ['Oceanfront location', 'Sunset sessions', 'Premium sound system', 'VIP areas']
      },
      {
        name: 'Tramps Tenerife',
        location: 'Playa de las Américas',
        type: 'Nightclub',
        capacity: '800',
        image: 'https://mindtrip.ai/cdn-cgi/image/format=webp,w=720/https://tcdn.mindtrip.ai/images/317571/1jpo5c4.png',
        description: 'Underground electronic music temple with cutting-edge sound system',
        genres: ['Techno', 'Electronic', 'Underground', 'Progressive'],
        address: 'Av. Rafael Puig Lluvina, 38660 Playa de las Américas',
        phone: '+34 922 796 234',
        website: 'trampstenerife.com',
        hours: 'Thu-Sat: 23:00-06:00',
        features: ['International DJs', 'State-of-the-art lighting', 'Multiple dance floors', 'VIP bottle service']
      },
      {
        name: 'Monkey Beach Club',
        location: 'Playa de Troya',
        type: 'Beach Club',
        capacity: '400',
        image: 'https://c8.alamy.com/comp/2PF86K5/monkey-beach-club-from-playa-de-troya-public-beach-playa-de-las-amrcias-tenerife-canary-islands-kingdom-of-spain-2PF86K5.jpg',
        description: 'Relaxed beachfront atmosphere with premium dining and live music',
        genres: ['House', 'Jazz', 'Acoustic', 'Chill-out'],
        address: 'Playa de Troya, 38660 Adeje',
        phone: '+34 922 715 888',
        website: 'monkeybeachclub.com',
        hours: 'Daily: 09:00-01:00',
        features: ['Beachfront dining', 'Live music nights', 'Premium cocktails', 'Sunset views']
      },
      {
        name: 'NRG Club',
        location: 'Costa Adeje',
        type: 'Nightclub',
        capacity: '300',
        image: 'https://a.storyblok.com/f/116532/853x568/2c359b60f3/nrg-atl-atlanta.webp',
        description: 'Intimate club setting for underground electronic music experiences',
        genres: ['Techno', 'House', 'Electronic', 'Deep House'],
        address: 'Calle Alcalde Walter Paetzmann, 38670 Adeje',
        phone: '+34 922 712 456',
        website: 'nrgclub.es',
        hours: 'Fri-Sat: 22:00-05:00',
        features: ['Intimate atmosphere', 'Underground sound', 'Local and international DJs', 'Late-night sessions']
      },
      {
        name: 'Casa de la Cultura',
        location: 'La Laguna',
        type: 'Cultural Center',
        capacity: '200',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Casa_Quintana.png/330px-Casa_Quintana.png',
        description: 'Historic venue celebrating traditional Canarian arts and music',
        genres: ['Folk', 'Traditional', 'Acoustic', 'World Music'],
        address: 'Calle Obispo Rey Redondo, 38201 La Laguna',
        phone: '+34 922 259 056',
        website: 'casadelacultura-lalaguna.com',
        hours: 'Mon-Fri: 10:00-22:00, Sat: 10:00-14:00',
        features: ['Historic building', 'Traditional atmosphere', 'Cultural events', 'Art exhibitions']
      }
    ]
  })

  console.log(`✅ Created ${venues.count} venues`)

  // Статьи
  const articles = await prisma.article.createMany({
    data: [
      {
        title: 'Top Music Festivals in Tenerife',
        excerpt: 'Discover the island\'s most spectacular music festivals that attract thousands of music lovers from around the world.',
        image: 'https://www.canarianweekly.com/img/media/articles/27567/c0a35d0108369b02-800.webp',
        date: 'Oct 20, 2024',
        readTime: '5 min read',
        icon: 'Music',
        content: `Tenerife's music festival scene is nothing short of spectacular. From intimate jazz gatherings to massive electronic dance festivals, the island offers a diverse range of musical experiences that cater to every taste.

## The Festival Landscape

The island's unique geography creates perfect venues for outdoor festivals. Beach locations provide stunning backdrops for summer events, while the mountains offer intimate settings for acoustic performances. The year-round pleasant climate means festivals happen throughout all seasons.

## Major Festivals to Watch

**Arona Summer Festival** - This multi-genre festival brings together international artists and local talent. The oceanfront location in Los Cristianos creates an magical atmosphere as the sun sets behind the stage.

**Canarias Jazz Festival** - Held at various venues across the island, this prestigious jazz festival attracts world-renowned musicians and jazz enthusiasts from across Europe.

**Heineken Jazzaldia Tenerife** - A branch of the famous San Sebastián festival, featuring cutting-edge jazz performances in intimate settings.

## Emerging Electronic Scene

Tenerife's electronic music scene is rapidly growing, with underground venues hosting international DJs and local electronic artists gaining recognition beyond the island. Beach clubs have become epicenters for house and techno events.

## Local Cultural Integration

What makes Tenerife's festivals unique is the integration of traditional Canarian music with modern genres. Many festivals feature folk performances alongside contemporary acts, creating a rich cultural tapestry that reflects the island's diverse heritage.`
      },
      {
        title: 'The Rhythms of Canarian Folk and Modern Sound',
        excerpt: 'Explore how traditional Canarian music influences the contemporary sound of the islands and shapes its unique musical identity.',
        image: 'https://cdn.abacus.ai/images/60dfb9a3-5893-4fe7-aaf7-7ef9ee464d5a.png',
        date: 'Oct 18, 2024',
        readTime: '4 min read',
        icon: 'Users',
        content: `The Canary Islands possess a rich musical heritage that spans centuries, blending Spanish, African, and Latin American influences into a unique sound that continues to evolve in the modern era.

## Traditional Instruments and Sounds

The **timple**, a small four-stringed instrument similar to a ukulele, is perhaps the most iconic of Canarian instruments. Its distinctive sound can be heard in traditional folk performances and increasingly in contemporary fusion projects.

**Bandurria** and **laúd** provide the harmonic foundation for many traditional ensembles, while percussion instruments like the **chácaras** (wooden clappers) and various drums maintain the rhythmic pulse of Canarian music.

## Isa and Folía Traditions

Traditional dance forms like the **Isa** and **Folía** are not merely historical artifacts but living traditions that influence modern compositions. These dance rhythms provide templates that contemporary musicians build upon.

## Modern Fusion Movement

Today's Canarian musicians are creating exciting fusions that honor tradition while embracing innovation. Electronic producers are sampling timple melodies, rock bands are incorporating folk rhythms, and jazz musicians are exploring Canarian scales and harmonies.

## Cultural Events and Festivals

The island's numerous folk festivals keep these traditions alive while providing platforms for modern interpretations. The contrast between a traditional folk group and a contemporary fusion band on the same stage creates magical moments of cultural dialogue.

## Preserving Heritage Through Innovation

Rather than being preserved in museums, Canarian music lives and breathes through constant reinterpretation. Young musicians learn traditional forms while adding their own contemporary expressions, ensuring the music remains relevant for new generations.`
      },
      {
        title: 'From Beach Clubs to Auditorio: Where Music Meets the Ocean',
        excerpt: 'A comprehensive guide to Tenerife\'s diverse music venues, from intimate beach clubs to world-class concert halls.',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/90/83/af/seen-beach-club-night.jpg',
        date: 'Oct 15, 2024',
        readTime: '6 min read',
        icon: 'Building',
        content: `Tenerife's music venues are as diverse as its musical offerings, ranging from intimate beachside clubs to internationally acclaimed concert halls. Each venue contributes its own character to the island's vibrant music scene.

## Iconic Concert Halls

**Auditorio de Tenerife Adán Martín** stands as a architectural masterpiece and acoustic marvel. Designed by Santiago Calatrava, this venue hosts everything from classical symphonies to contemporary performances. Its distinctive white curves have become a symbol of the island's cultural sophistication.

**Teatro Guimerá** in Santa Cruz offers a more traditional theater experience, perfect for intimate jazz performances and chamber music concerts.

## Beach Club Revolution

The island's beach clubs have revolutionized the outdoor music experience. **Papagayo Beach Club** offers sunset sessions where electronic music blends with ocean sounds. **Monkey Beach Club** provides a more relaxed atmosphere for house music and acoustic performances.

These venues capitalize on Tenerife's year-round mild climate, allowing for open-air events throughout the year. The combination of ocean breezes, stunning sunsets, and high-quality sound systems creates unforgettable experiences.

## Underground and Alternative Spaces

**Tramps Tenerife** has become the epicenter of the island's underground electronic scene. This venue regularly hosts international DJs and provides a platform for local electronic artists to showcase their talents.

Smaller venues like **NRG Club** cater to more intimate electronic events, creating spaces where music lovers can experience cutting-edge sounds in close-up settings.

## Outdoor Festivals and Natural Venues

The island's natural amphitheaters provide stunning backdrops for outdoor festivals. Volcanic landscapes, coastal cliffs, and forest clearings become temporary concert venues for special events.

## The Future of Music Venues

New venues are constantly emerging, with developers recognizing the island's potential as a music tourism destination. The integration of technology, sustainable practices, and unique architectural designs promises to keep Tenerife at the forefront of music venue innovation.`
      }
    ]
  })

  console.log(`✅ Created ${articles.count} articles`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
