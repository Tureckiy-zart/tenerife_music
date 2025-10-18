
import Link from 'next/link'
import { Music, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#003A4D] text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#00A6A6] p-3 rounded-lg">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-2xl text-white">
                  TENERIFE.MUSIC
                </h3>
                <p className="text-gray-300 text-sm">Your Music Guide to Tenerife</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              The island's premier music hub, connecting you with the best festivals, 
              venues, and artists across Tenerife. Coming soon with full event listings 
              and ticket integration.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#00A6A6]" />
                <a href="mailto:info@tenerife.music" className="text-gray-300 underline-offset-4 hover:underline">
                  info@tenerife.music
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#00A6A6]" />
                <span className="text-gray-300">Tenerife, Canary Islands</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#events" 
                  className="text-gray-300 hover:text-[#00A6A6] transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="#venues" 
                  className="text-gray-300 hover:text-[#00A6A6] transition-colors duration-300"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link 
                  href="#articles" 
                  className="text-gray-300 hover:text-[#00A6A6] transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-[#00A6A6] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-montserrat font-bold text-lg mb-6 text-white">
              Connect
            </h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-[#00A6A6] p-3 rounded-full transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-[#00A6A6] p-3 rounded-full transition-colors duration-300 group"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-[#00A6A6] p-3 rounded-full transition-colors duration-300 group"
                aria-label="Telegram"
              >
                <MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="space-y-2">
              <Link 
                href="#" 
                className="block text-gray-400 hover:text-gray-200 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="block text-gray-400 hover:text-gray-200 text-sm transition-colors duration-300"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#002A3B] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Tenerife.Music. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Made with ❤️ for the music lovers of Tenerife
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
