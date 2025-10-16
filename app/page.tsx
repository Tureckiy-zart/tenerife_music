
import Hero from '@/components/hero'
import About from '@/components/about'
import EventsRefactored from '@/components/events-refactored'
import Articles from '@/components/articles'
import Venues from '@/components/venues'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <EventsRefactored />
        <Articles />
        <Venues />
      </main>
      <Footer />
    </>
  )
}
