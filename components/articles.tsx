
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Calendar, ArrowRight, Music, Users, Building, X } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  icon: any
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Top Music Festivals in Tenerife',
    excerpt: 'Discover the island\'s most spectacular music festivals that attract thousands of music lovers from around the world.',
    image: 'https://www.canarianweekly.com/img/media/articles/27567/c0a35d0108369b02-800.webp',
    date: 'Oct 20, 2024',
    readTime: '5 min read',
    icon: Music,
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
    id: 2,
    title: 'The Rhythms of Canarian Folk and Modern Sound',
    excerpt: 'Explore how traditional Canarian music influences the contemporary sound of the islands and shapes its unique musical identity.',
    image: 'https://cdn.abacus.ai/images/60dfb9a3-5893-4fe7-aaf7-7ef9ee464d5a.png',
    date: 'Oct 18, 2024',
    readTime: '4 min read',
    icon: Users,
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
    id: 3,
    title: 'From Beach Clubs to Auditorio: Where Music Meets the Ocean',
    excerpt: 'A comprehensive guide to Tenerife\'s diverse music venues, from intimate beach clubs to world-class concert halls.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/90/83/af/seen-beach-club-night.jpg',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    icon: Building,
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

export default function Articles() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const ArticleModal = ({ article, onClose }: { article: Article | null, onClose: () => void }) => {
    if (!article) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white/80 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative aspect-[21/9] bg-gray-200">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date} • {article.readTime}
              </div>
              <h2 className="text-3xl font-montserrat font-bold">{article.title}</h2>
            </div>
          </div>
          
          <div className="p-6 pb-8 max-h-96 overflow-y-auto">
            <div className="prose max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <div key={index} className="mb-4">
                  {paragraph.startsWith('## ') ? (
                    <h3 className="text-xl font-montserrat font-bold text-[#003A4D] mb-3">
                      {paragraph.replace('## ', '')}
                    </h3>
                  ) : paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                    <p className="font-semibold text-gray-800 mb-2">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="articles" className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[#003A4D] mb-6">
            Discover Tenerife's Music Scene
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive deep into the island's rich musical culture and vibrant contemporary scene
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {mockArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              {/* Article Image */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#00A6A6]/90 backdrop-blur-sm p-2 rounded-full">
                  <article.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-700 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2 text-[#00A6A6]" />
                  {article.date}
                  <span className="mx-2">•</span>
                  {article.readTime}
                </div>

                <h3 className="text-xl font-montserrat font-bold text-[#003A4D] mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-700 mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedArticle(article)
                  }}
                  className="flex items-center text-[#00A6A6] hover:text-[#003A4D] font-poppins font-semibold transition-colors duration-300 group-hover:translate-x-2 transition-transform"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#003A4D] to-[#00536B] text-white rounded-3xl p-8">
            <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">
              Want to Write for Us?
            </h3>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Share your knowledge of Tenerife's music scene. We're always looking for passionate writers 
              to contribute to our blog.
            </p>
            <Link href="/contact">
              <button className="bg-[#00A6A6] hover:bg-[#00C4C4] text-white px-8 py-3 rounded-full font-poppins font-semibold transition-colors duration-300">
                Get in Touch
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </section>
  )
}
