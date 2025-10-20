import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Scale, AlertTriangle, Users, Shield, ArrowLeft, Mail, MapPin } from 'lucide-react'
import Navigation from '@/components/navigation'
import BackNavigation from '@/components/back-navigation'

export const metadata: Metadata = {
  title: 'Terms of Service — Tenerife.Music',
  description: 'Terms and conditions for using Tenerife.Music.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
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
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Please read these terms carefully before using our service. By using Tenerife.Music, you agree to these terms.
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
                  <Scale className="w-8 h-8 text-[#00A6A6]" />
                </div>
                <h2 className="text-3xl font-bold text-[#003A4D] mb-4">Terms and Conditions</h2>
                <p className="text-gray-600 text-lg">
                  These terms govern your use of Tenerife.Music and our services.
                </p>
              </div>

              <div className="space-y-8">
                {/* Acceptance of Terms */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    Acceptance of Terms
                  </h3>
                  <p className="text-gray-700 mb-4">
                    By accessing and using Tenerife.Music, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>You must be at least 18 years old to use our service</li>
                    <li>You agree to provide accurate and complete information</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>You agree to use the service only for lawful purposes</li>
                  </ul>
                </div>

                {/* Service Description */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    Service Description
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      Tenerife.Music provides a platform for discovering music events, venues, and artists across Tenerife. Our services include:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Event listings and information</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Venue guides and recommendations</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Music genre exploration</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                        <span>Community features and reviews</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* User Responsibilities */}
                <div className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-[#00A6A6]" />
                    User Responsibilities
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3">Prohibited Activities</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Posting false or misleading information</li>
                        <li>• Violating any applicable laws or regulations</li>
                        <li>• Attempting to gain unauthorized access</li>
                        <li>• Interfering with service operations</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#003A4D] mb-3">Content Guidelines</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Respect other users and their opinions</li>
                        <li>• Provide constructive feedback</li>
                        <li>• Report inappropriate content</li>
                        <li>• Follow community guidelines</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Limitation of Liability */}
                <div className="bg-gradient-to-r from-[#00A6A6]/10 to-[#003A4D]/10 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-[#003A4D] mb-4">Limitation of Liability</h3>
                  <p className="text-gray-700 mb-4">
                    Tenerife.Music provides information about events and venues as a service. We are not responsible for:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                      <span>Event cancellations or changes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                      <span>Venue availability or quality</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                      <span>Third-party ticket sales</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#00A6A6] rounded-full"></div>
                      <span>Travel or accommodation arrangements</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-[#003A4D] to-[#00A6A6] text-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Questions About These Terms?</h3>
                  <p className="text-white/90 mb-6">
                    If you have any questions about these Terms of Service, please contact us.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-white/80" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-white/80 text-sm">legal@tenerife.music</div>
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
                    These terms may be updated from time to time. Continued use of the service constitutes acceptance of any changes.
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


