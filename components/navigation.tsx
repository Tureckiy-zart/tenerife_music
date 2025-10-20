
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Music } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on Escape, outside click, and trap focus in mobile menu
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        toggleButtonRef.current?.focus()
      }

      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey) {
          if (active === first || !mobileMenuRef.current.contains(active)) {
            last.focus()
            e.preventDefault()
          }
        } else {
          if (active === last) {
            first.focus()
            e.preventDefault()
          }
        }
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !toggleButtonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Move focus to first link when opened
    const timer = window.setTimeout(() => {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>('a, button')
      firstLink?.focus()
    }, 0)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Venues', href: '/venues' },
    { name: 'Areas', href: '/areas' },
    { name: 'Genres', href: '/genres' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Blog', href: '/news' },
    { name: 'About', href: '/about' },
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
                className={`font-poppins font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled ? 'text-[#003A4D] hover:text-[#00A6A6]' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            ref={toggleButtonRef}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 backdrop-blur-sm border-2 ${
              isScrolled 
                ? 'text-[#003A4D] bg-white/80 border-[#003A4D]/20' 
                : 'text-white bg-[#003A4D]/50 border-white/30'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
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
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            className="md:hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg"
          >
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
        )}
      </div>
    </nav>
  )
}
