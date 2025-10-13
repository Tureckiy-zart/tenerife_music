
'use client'

import { useState } from 'react'
import { X, Mail, CheckCircle } from 'lucide-react'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
        }, 2000)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="text-center mb-6">
              <div className="bg-[#00A6A6] p-3 rounded-full w-fit mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-2">
                Join the Movement
              </h2>
              <p className="text-gray-600">
                Be the first to know when Tenerife.Music launches and get exclusive access to events.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6] transition-colors duration-200"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00A6A6] hover:bg-[#00C4C4] disabled:bg-gray-400 text-white py-3 rounded-lg font-poppins font-semibold transition-colors duration-200"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              We'll never spam you. Unsubscribe at any time.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600">
              We'll notify you when we launch. Get ready for the ultimate music experience in Tenerife!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
