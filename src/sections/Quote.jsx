import Reveal from '../components/Reveal'
import Fx from '../components/Fx'
import { weddingData as d } from '../data/weddingData'

export default function Quote() {
  return (
    <Reveal id="quote">
      <div className="wrap">
        <Fx className="quote-mark script" from="zoom" aria-hidden="true">“</Fx>
        <Fx as="p" className="serif quote-text" delay={0.1}>
          {d.quote.text}
          <span>{d.quote.source}</span>
        </Fx>
      </div>
    </Reveal>
  )
}
