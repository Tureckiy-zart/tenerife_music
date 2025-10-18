
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import ContactForm from '@/components/contact-form'
import { Mail, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Tenerife.Music',
  description: "Have questions or want to promote your event? Contact Tenerife.Music.",
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#003A4D] to-[#00536B] text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Have questions about Tenerife's music scene? Want to promote your event? 
                We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-montserrat font-bold text-[#003A4D] mb-6">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Ready to launch soon! Reach out to us and be part of Tenerife's 
                    music revolution.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#00A6A6] p-3 rounded-full">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003A4D]">Email</h3>
                      <p className="text-gray-600">info@tenerife.music</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-[#00A6A6] p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003A4D]">Location</h3>
                      <p className="text-gray-600">Tenerife, Canary Islands</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-[#00A6A6] p-3 rounded-full">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003A4D]">Response Time</h3>
                      <p className="text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h3 className="font-semibold text-[#003A4D] mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      aria-label="Instagram"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#00A6A6] hover:text-white group"
                    >
                      <svg className="w-5 h-5 text-[#003A4D] group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.164-1.507-.701-2.449-2.893-2.449-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      aria-label="TikTok"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#00A6A6] hover:text-white group"
                    >
                      <svg className="w-5 h-5 text-[#003A4D] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.9 2.4c-1.6 0-2.9.6-3.8 1.5S7.6 6.1 7.6 7.7v1.5H5.5c-.4 0-.8.3-.8.8s.3.8.8.8h2.1v6.6c0 .4.3.8.8.8s.8-.3.8-.8v-6.6h1.8c.4 0 .7-.3.8-.7l.2-1.6c.1-.4-.3-.9-.8-.9H9.2V7.7c0-.9.2-1.5.6-1.9.4-.4 1-.6 1.9-.6h1.3c.4 0 .8-.3.8-.8s-.3-.8-.8-.8l-1.1-.2z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      aria-label="Twitter/X"
                      className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#00A6A6] hover:text-white group"
                    >
                      <svg className="w-5 h-5 text-[#003A4D] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-6">
                  Send us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
