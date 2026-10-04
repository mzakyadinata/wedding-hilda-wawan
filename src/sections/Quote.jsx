import Reveal from '../components/Reveal'
import { weddingData as d } from '../data/weddingData'

export default function Quote() {
  return (
    <Reveal id="quote">
      <div className="wrap">
        <p className="serif">“{d.quote.text}”<span>{d.quote.source}</span></p>
      </div>
    </Reveal>
  )
}
