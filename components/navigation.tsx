
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Music } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '#events' },
    { name: 'Venues', href: '#venues' },
    { name: 'Blog', href: '#articles' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-[#003A4D]/30 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#00A6A6] p-2 rounded-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span
              className={`font-montserrat font-bold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-[#003A4D]' : 'text-white'
              }`}
            >
              TENERIFE.MUSIC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-poppins font-medium transition-all duration-300 hover:text-white hover:scale-105 ${
                  isScrolled ? 'text-[#003A4D]' : 'text-white/90'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 backdrop-blur-sm border-2 ${
              isScrolled 
                ? 'text-[#003A4D] bg-white/80 border-[#003A4D]/20' 
                : 'text-white bg-[#003A4D]/50 border-white/30'
            }`}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu content */}
            <div className="relative z-50 md:hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
              <div className="py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-[#003A4D] font-poppins font-medium hover:bg-[#00A6A6]/10 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
