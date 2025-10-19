import type { Metadata } from 'next'
import Image from 'next/image'
import events from '@/data/events_tenerife.json'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Events — Tenerife.Music',
  description: 'Discover music events across Tenerife: concerts, festivals, club nights.',
  alternates: { canonical: '/events' },
}

function formatDateRange(startISO?: string, endISO?: string) {
  if (!startISO) return ''
  const start = new Date(startISO)
  const end = endISO ? new Date(endISO) : undefined
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const startStr = start.toLocaleDateString('en-GB', opts)
  const endStr = end ? end.toLocaleDateString('en-GB', opts) : undefined
  return endStr && endStr !== startStr ? `${startStr} – ${endStr}` : startStr
}

export default async function EventsPage() {
  const list = (events as any[]).slice(0, 36)

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#003A4D] mb-2">Events</h1>
        <p className="text-gray-600 mb-8">Real data from Tenerife events (MVP). Filters and detail pages will follow.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((e) => {
            const img = e.image_url && e.image_url.length > 0 ? e.image_url : '/images/hero-festival.jpg'
            return (
              <article key={e.event_id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                <div className="relative aspect-video bg-gray-200">
                  <Image src={img} alt={e.name} fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="text-lg font-montserrat font-bold text-[#003A4D]">{e.name}</h3>
                  <div className="text-sm text-gray-600">{formatDateRange(e.start_date, e.end_date)}</div>
                  <div className="text-sm text-gray-700 flex items-center">
                    <span className="truncate">{e.venue?.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(e.genres || []).slice(0, 3).map((g: string) => (
                      <span key={g} className="bg-[#00A6A6]/10 text-[#003A4D] px-2 py-1 rounded-full text-xs font-medium">
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-3">
                    {e.ticket_url && (
                      <a href={e.ticket_url} target="_blank" rel="noopener noreferrer" className="text-white bg-[#003A4D] hover:bg-[#00536B] px-3 py-2 rounded-lg text-sm font-poppins">Tickets</a>
                    )}
                    {e.source_url && (
                      <a href={e.source_url} target="_blank" rel="noopener noreferrer" className="text-[#003A4D] hover:text-[#00536B] underline text-sm">Source</a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}


