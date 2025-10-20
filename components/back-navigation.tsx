'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackNavigationProps {
  href?: string
  text?: string
  className?: string
}

export default function BackNavigation({ 
  href = '/', 
  text = 'Back to Home',
  className = ''
}: BackNavigationProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <Link 
        href={href}
        className="inline-flex items-center space-x-2 text-[#003A4D] hover:text-[#00A6A6] transition-colors duration-300 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{text}</span>
      </Link>
    </div>
  )
}