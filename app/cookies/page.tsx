import type { Metadata } from 'next'
import Link from 'next/link'
import { Cookie, Settings, BarChart3, Shield, ArrowLeft, Mail, MapPin, CheckCircle } from 'lucide-react'
import Navigation from '@/components/navigation'
import BackNavigation from '@/components/back-navigation'

export const metadata: Metadata = {
  title: 'Cookies Policy — Tenerife.Music',
  description: 'Information about cookies used by Tenerife.Music.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#003A4D] via-[#004A5D] to-[#00A6A6] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              Cookies Policy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Learn about how we use cookies and similar technologies to enhance your experience on Tenerife.Music.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-[#00A6A6] hover:text-[#008A8A] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A6A6]/10 rounded-full mb-6">
                  <Cookie className="w-8 h-8 text-[#00A6A6]" />
                </div>
                <h2 className="text-3xl font-bold text-[#003A4D] mb-4">Our Cookie Policy</h2>
                <p className="text-gray-600 text-lg">
                  We use cookies to improve your experience, analyze site usage, and provide personalized content.
                </p>
              </div>

              <div className="space-y-8">
                {/* What Are Cookies */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    What Are Cookies?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
                  </p>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-[#003A4D] mb-3">Types of Cookies We Use</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00A6A6]" />
                        <span>Essential cookies (required)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00A6A6]" />
                        <span>Analytics cookies (optional)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00A6A6]" />
                        <span>Preference cookies (optional)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#00A6A6]" />
                        <span>Marketing cookies (optional)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookie Categories */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    Cookie Categories
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-[#00A6A6]" />
                        Essential Cookies
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        These cookies are necessary for the website to function properly and cannot be disabled.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Session management and security</li>
                        <li>• User authentication</li>
                        <li>• Basic website functionality</li>
                        <li>• Load balancing and performance</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-[#00A6A6]" />
                        Analytics Cookies
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        These cookies help us understand how visitors interact with our website.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Page views and user behavior</li>
                        <li>• Popular content and features</li>
                        <li>• Error tracking and debugging</li>
                        <li>• Performance monitoring</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3 flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-[#00A6A6]" />
                        Preference Cookies
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        These cookies remember your preferences and settings.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Language and region settings</li>
                        <li>• Theme preferences</li>
                        <li>• Filter and search preferences</li>
                        <li>• Notification settings</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Managing Cookies */}
                <div className="bg-gradient-to-r from-[#00A6A6]/10 to-[#003A4D]/10 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4">Managing Your Cookie Preferences</h3>
                  <p className="text-gray-700 mb-4">
                    You can control and manage cookies in several ways:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#003A4D] mb-3">Browser Settings</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
                        <li>• Firefox: Options &gt; Privacy &amp; Security &gt; Cookies</li>
                        <li>• Safari: Preferences &gt; Privacy &gt; Cookies</li>
                        <li>• Edge: Settings &gt; Cookies and Site Permissions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#003A4D] mb-3">Our Cookie Banner</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Accept all cookies</li>
                        <li>• Reject non-essential cookies</li>
                        <li>• Customize your preferences</li>
                        <li>• Change settings anytime</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Third-Party Cookies */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4">Third-Party Cookies</h3>
                  <p className="text-gray-700 mb-4">
                    We may use third-party services that set their own cookies:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="w-6 h-6 text-[#00A6A6]" />
                      </div>
                      <h4 className="font-semibold text-[#003A4D] mb-2">Google Analytics</h4>
                      <p className="text-sm text-gray-600">Website analytics and performance tracking</p>
                    </div>
                    <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6 text-[#00A6A6]" />
                      </div>
                      <h4 className="font-semibold text-[#003A4D] mb-2">Security Services</h4>
                      <p className="text-sm text-gray-600">Protection against spam and attacks</p>
                    </div>
                    <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Settings className="w-6 h-6 text-[#00A6A6]" />
                      </div>
                      <h4 className="font-semibold text-[#003A4D] mb-2">Social Media</h4>
                      <p className="text-sm text-gray-600">Social sharing and integration</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Questions About Cookies?</h3>
                  <p className="text-white/90 mb-6">
                    If you have any questions about our use of cookies, please contact us.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-white/80" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-white/80 text-sm">privacy@tenerife.music</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-white/80" />
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-white/80 text-sm">Tenerife, Canary Islands</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-center text-gray-500 text-sm border-t pt-6">
                  <p>Last updated: January 2024</p>
                  <p className="mt-2">
                    This cookie policy may be updated from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}


