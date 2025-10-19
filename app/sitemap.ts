import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tenerife.music'
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/events',
    '/venues',
    '/genres',
    '/areas',
    '/calendar',
    '/news',
  ]
  const now = new Date().toISOString()
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path ? 'weekly' : 'daily',
    priority: path ? 0.6 : 1,
  }))
}


