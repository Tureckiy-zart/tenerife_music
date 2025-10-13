
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Music2, Users, MapPin, Calendar } from 'lucide-react'

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const features = [
    {
      icon: Music2,
      title: 'All Music Genres',
      description: 'From carnival bands to techno events, discover every style of music on the island.',
    },
    {
      icon: Calendar,
      title: 'Complete Events',
      description: 'Never miss a concert, festival, or underground party happening in Tenerife.',
    },
    {
      icon: MapPin,
      title: 'Local Venues',
      description: 'Explore the best music venues from beach clubs to concert halls.',
    },
    {
      icon: Users,
      title: 'Artist Hub',
      description: 'Connect with local artists and discover emerging talent on the island.',
    },
  ]

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[#003A4D] mb-6">
            Your Island Music Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tenerife.Music — the island's music hub covering everything from carnival bands to techno events. 
            Explore concerts, festivals and local artists in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-[#00A6A6] to-[#00C4C4] p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-montserrat font-bold text-[#003A4D] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-[#003A4D] to-[#00536B] text-white rounded-3xl p-8 mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-montserrat font-bold mb-4">
            Launching Soon
          </h3>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
            We're working hard to bring you the most comprehensive music platform Tenerife has ever seen. 
            Stay tuned for something amazing.
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00A6A6]">Q1 2025</div>
              <div className="text-sm text-gray-300">Launch Date</div>
            </div>
            <div className="w-px h-12 bg-gray-500"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00A6A6]">Free</div>
              <div className="text-sm text-gray-300">For Everyone</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
