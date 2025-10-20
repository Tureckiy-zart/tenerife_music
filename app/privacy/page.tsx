import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Lock, Database, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Privacy Policy — Tenerife.Music',
  description: 'Privacy policy describing how Tenerife.Music handles your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>


      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A6A6]/10 rounded-full mb-6">
                  <Shield className="w-8 h-8 text-[#00A6A6]" />
                </div>
                <h2 className="text-3xl font-bold text-[#003A4D] mb-4">Our Commitment to Privacy</h2>
                <p className="text-gray-600 text-lg">
                  At Tenerife.Music, we are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
              </div>

              <div className="space-y-8">
                {/* Information We Collect */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    Information We Collect
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Name and contact information (email, phone number)</li>
                        <li>Location data (when you search for events by area)</li>
                        <li>Preferences and interests in music genres</li>
                        <li>Event attendance history and favorites</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Usage Information</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Website usage patterns and interactions</li>
                        <li>Device information and browser type</li>
                        <li>IP address and general location data</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How We Use Information */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    How We Use Your Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3">Service Delivery</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Provide event recommendations</li>
                        <li>• Send event updates and notifications</li>
                        <li>• Process ticket purchases</li>
                        <li>• Improve user experience</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3">Communication</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Send newsletters and updates</li>
                        <li>• Respond to inquiries</li>
                        <li>• Provide customer support</li>
                        <li>• Share important service changes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Protection */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    Data Protection & Security
                  </h3>
                  <div className="bg-gradient-to-r from-[#00A6A6]/10 to-[#003A4D]/10 p-6 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      We implement industry-standard security measures to protect your personal information:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>SSL encryption for data transmission</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Secure data storage and processing</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Regular security audits and updates</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Limited access to authorized personnel only</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Your Rights */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4">Your Rights</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="w-6 h-6 text-[#00A6A6]" />
                      </div>
                      <h4 className="font-semibold text-[#003A4D] mb-2">Access</h4>
                      <p className="text-sm text-gray-600">Request a copy of your personal data</p>
                    </div>
                    <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Database className="w-6 h-6 text-[#00A6A6]" />
                      </div>
                      <h4 className="font-semibold text-[#003A4D] mb-2">Correction</h4>
                      <p className="text-sm text-gray-600">Update or correct your information</p>
                    </div>
                    <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-6 h-6 text-[#00A6A6]" />
                      </div>
                      <h4 className="font-semibold text-[#003A4D] mb-2">Deletion</h4>
                      <p className="text-sm text-gray-600">Request deletion of your data</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Questions About Your Privacy?</h3>
                  <p className="text-white/90 mb-6">
                    If you have any questions about this Privacy Policy or how we handle your personal information, 
                    please don't hesitate to contact us.
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
                    This privacy policy may be updated from time to time. 
                    We will notify you of any significant changes via email or website notice.
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


