
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Calendar, ArrowRight, Music, Users, Building, X } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  icon: string
}

// Маппинг иконок
const iconMap: { [key: string]: any } = {
  'Music': Music,
  'Users': Users,
  'Building': Building
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Загрузка статей из API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles')
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const ArticleModal = ({ article, onClose }: { article: Article | null, onClose: () => void }) => {
    useEffect(() => {
      if (article) {
        // Получаем ширину scrollbar
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        // Добавляем padding, чтобы компенсировать исчезновение scrollbar
        document.body.style.paddingRight = `${scrollbarWidth}px`
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.paddingRight = ''
        document.body.style.overflow = 'unset'
      }
      return () => {
        document.body.style.paddingRight = ''
        document.body.style.overflow = 'unset'
      }
    }, [article])

    if (!article) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 flex flex-col max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-200 transition-colors duration-200 bg-black/30 hover:bg-black/50 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Fixed Header with Image */}
          <div className="relative h-64 bg-gray-200 rounded-t-2xl overflow-hidden flex-shrink-0">
            <Image
              src={article.image || 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png'}
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
          
          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1">
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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A6A6]"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Music className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600">No articles found</p>
            </div>
          ) : (
            articles.map((article, index) => (
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
                  src={article.image || 'https://cdn.abacus.ai/images/38bd6fd6-e080-4a5c-a282-20b1344d6117.png'}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#00A6A6]/90 backdrop-blur-sm p-2 rounded-full">
                  {iconMap[article.icon] && React.createElement(iconMap[article.icon], { className: "w-5 h-5 text-white" })}
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
          ))
          )}
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
              <button className="bg-[#003A4D] hover:bg-[#00536B] text-white px-8 py-3 rounded-full font-poppins font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
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
