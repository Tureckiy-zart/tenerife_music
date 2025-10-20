import type { Metadata } from 'next'
import Link from 'next/link'
import posts from '@/data/news.json'
import Navigation from '@/components/navigation'
import BackNavigation from '@/components/back-navigation'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'News — Tenerife.Music',
  description: 'Latest news and articles about Tenerife music scene.',
  alternates: { canonical: '/news' },
}

export default async function NewsPage() {
  const list = (posts as any[])
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <BackNavigation />
        </div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#003A4D] via-[#004A5D] to-[#00A6A6] text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 py-24">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
                News & Blog
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Editorial highlights, venue guides, and festival tips. 
                Stay updated with the latest from Tenerife's music scene.
              </p>
            </div>
          </div>
        </section>

        {/* News Articles */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-6">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover insights, guides, and stories from Tenerife's vibrant music community. 
                Also see <Link href="/events" className="text-[#00A6A6] hover:text-[#003A4D] underline">events</Link> and <Link href="/venues" className="text-[#00A6A6] hover:text-[#003A4D] underline">venues</Link>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {list.map((p) => (
                <article key={p.slug} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col group">
                  <div className="text-sm text-gray-500 mb-3 font-medium">
                    {new Date(p.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })} • {p.readTime}
                  </div>
                  <h2 className="text-xl font-montserrat font-bold text-[#003A4D] mb-4 group-hover:text-[#00A6A6] transition-colors duration-300">
                    {p.title}
                  </h2>
                  <p className="text-gray-700 flex-1 leading-relaxed mb-6">
                    {p.excerpt}
                  </p>
                  <Link 
                    href={`/news/${p.slug}`} 
                    className="inline-flex items-center space-x-2 text-[#00A6A6] hover:text-[#003A4D] font-semibold transition-colors duration-300 group-hover:translate-x-1"
                  >
                    <span>Read more</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}


