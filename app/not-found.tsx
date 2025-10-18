import Link from 'next/link'
import { Music } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <div className="inline-flex items-center justify-center bg-[#00A6A6] p-4 rounded-2xl mb-6">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-[#003A4D] mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist or has moved.</p>
        <Link href="/" aria-label="Go back to home">
          <span className="inline-block bg-[#003A4D] text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-[#00536B] transition-colors">
            Back to Home
          </span>
        </Link>
      </div>
    </main>
  )
}


