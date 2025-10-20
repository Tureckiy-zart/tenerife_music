import type { Metadata } from 'next'
import Link from 'next/link'
import posts from '@/data/news.json'
import Navigation from '@/components/navigation'
import BackNavigation from '@/components/back-navigation'
import PageHeader from '@/components/page-header-fixed'
import { FileText } from 'lucide-react'

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
        <PageHeader
          icon={<FileText className="w-10 h-10 text-white" />}
          title="News & Blog"
          description="Editorial highlights, venue guides, and festival tips. Stay updated with the latest from Tenerife's music scene."
        />

        {/* News Articles */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <BackNavigation />
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


