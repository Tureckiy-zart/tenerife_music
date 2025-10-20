'use client'

import { ReactNode } from 'react'

interface PageHeaderProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export default function PageHeader({ icon, title, description, className = '' }: PageHeaderProps) {
  return (
    <section className={`relative bg-gradient-to-br from-[#003A4D] via-[#004A5D] to-[#00A6A6] text-white overflow-hidden h-[70vh] min-h-[600px] flex items-center justify-center ${className}`}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 w-full">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full">
              {icon}
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold">
              {title}
            </h1>
          </div>
          
          {/* Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
