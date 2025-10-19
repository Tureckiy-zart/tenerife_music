import type { Metadata } from 'next'
import Link from 'next/link'
import posts from '@/data/news.json'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'News — Tenerife.Music',
  description: 'Latest news and articles about Tenerife music scene.',
  alternates: { canonical: '/news' },
}

export default async function NewsPage() {
  const list = (posts as any[])
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-2">News</h1>
        <p className="text-gray-600 mb-8">Editorial highlights, venue guides, and festival tips. Also see <Link href="/events" className="underline">events</Link> and <Link href="/venues" className="underline">venues</Link>.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <article key={p.slug} className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
              <div className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })} • {p.readTime}</div>
              <h2 className="mt-2 text-lg font-montserrat font-bold text-[#003A4D]">{p.title}</h2>
              <p className="text-gray-700 mt-2 flex-1">{p.excerpt}</p>
              <Link href={`/news/${p.slug}`} className="mt-4 text-[#00A6A6] hover:text-[#003A4D] font-semibold">Read more →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}


