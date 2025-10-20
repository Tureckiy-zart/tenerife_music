'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackNavigationProps {
  className?: string
}

export default function BackNavigation({ 
  className = ""
}: BackNavigationProps) {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div className={`py-6 bg-white border-b border-gray-100 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-[#00A6A6] hover:text-[#008A8A] transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Назад к главной</span>
        </Link>
      </div>
    </div>
  )
}
