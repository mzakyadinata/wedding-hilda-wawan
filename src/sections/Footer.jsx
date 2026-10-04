import Reveal from '../components/Reveal'
import Sparkles from '../components/Sparkles'
import { weddingData as d } from '../data/weddingData'

export default function Footer() {
  return (
    <Reveal as="footer">
      <Sparkles items={[['20%', '20%', '.4s'], ['30%', '80%', '1.3s'], ['75%', '50%', '2.2s']]} />
      <div className="rule" />
      <p className="serif">“{d.thanks}”</p>
      <div className="names">{d.bride.short.toUpperCase()} &amp; {d.groom.short.toUpperCase()} · {d.footerDate}</div>
    </Reveal>
  )
}
