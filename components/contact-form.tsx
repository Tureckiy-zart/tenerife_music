
'use client'

import { useState } from 'react'
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Save to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Open Gmail compose
        const gmailUrl = `mailto:ev.zhdanov@gmail.com?subject=${encodeURIComponent(
          'Contact from Tenerife.Music'
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`
        
        window.open(gmailUrl, '_blank')
        
        setIsSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        
        setTimeout(() => setIsSuccess(false), 3000)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-montserrat font-bold text-[#003A4D] mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-600">
          Thank you for contacting us. We've opened your email client and saved your message. 
          We'll get back to you soon!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-poppins font-medium text-[#003A4D] mb-2">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6] transition-colors duration-200"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-poppins font-medium text-[#003A4D] mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6] transition-colors duration-200"
          />
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-poppins font-medium text-[#003A4D] mb-2">
          Your Message *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Tell us about your project, event, or inquiry..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6] transition-colors duration-200 resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#00A6A6] hover:bg-[#00C4C4] disabled:bg-gray-400 text-white py-3 rounded-lg font-poppins font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our data storage policy. 
        Your information will be saved securely and used only to respond to your inquiry.
      </p>
    </form>
  )
}
