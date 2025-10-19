import type { Metadata } from 'next'
import Link from 'next/link'
import posts from '@/data/news.json'

export const revalidate = 1800

export async function generateStaticParams() {
  const list = posts as any[]
  return list.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = (posts as any[]).find((p) => p.slug === slug)
  if (!post) return { title: 'News — Tenerife.Music' }
  return {
    title: `${post.title} — Tenerife.Music`,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = (posts as any[]).find((p) => p.slug === slug)
  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">Article not found</h1>
          <Link href="/news" className="text-[#00A6A6] hover:text-[#003A4D]">Back to News</Link>
        </section>
      </main>
    )
  }

  const paragraphs = String(post.content).split(/\n\n+/)

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })} • {post.readTime}</div>
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mt-2">{post.title}</h1>
        <article className="prose max-w-none mt-6 text-gray-800">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>
        <div className="mt-8 flex gap-4">
          <Link href="/news" className="text-[#00A6A6] hover:text-[#003A4D]">← Back to News</Link>
          <Link href="/events" className="text-[#00A6A6] hover:text-[#003A4D]">Browse Events</Link>
          <Link href="/venues" className="text-[#00A6A6] hover:text-[#003A4D]">Explore Venues</Link>
        </div>
      </section>
    </main>
  )
}


