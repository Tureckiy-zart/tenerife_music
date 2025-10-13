
import Hero from '@/components/hero'
import About from '@/components/about'
import Events from '@/components/events'
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
        <Events />
        <Articles />
        <Venues />
      </main>
      <Footer />
    </>
  )
}
