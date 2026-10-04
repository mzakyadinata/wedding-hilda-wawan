import Hero from '../sections/Hero'
import Quote from '../sections/Quote'
import Couple from '../sections/Couple'
import Event from '../sections/Event'
import Countdown from '../sections/Countdown'
import Location from '../sections/Location'
import Gallery from '../sections/Gallery'
import Rsvp from '../sections/Rsvp'
import Wishes from '../sections/Wishes'
import Footer from '../sections/Footer'
import Flourish from '../components/Flourish'

export default function Invitation() {
  return (
    <main>
      <Hero />
      <Flourish />
      <Quote />
      <Couple />
      <Event />
      <Flourish />
      <Countdown />
      <Location />
      <Gallery />
      <Rsvp />
      <Wishes />
      <Footer />
    </main>
  )
}
