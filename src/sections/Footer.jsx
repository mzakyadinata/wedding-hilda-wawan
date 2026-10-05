import Reveal from '../components/Reveal'
import Fx from '../components/Fx'
import { Flora, Sprig, Twinkles } from '../components/Ornaments'
import { weddingData as d } from '../data/weddingData'

export default function Footer() {
  return (
    <Reveal as="footer" className="dark batik-dark">
      <Flora corner="tl" className="on-dark" />
      <Flora corner="tr" className="on-dark" delay={0.2} />
      <Twinkles items={[['20%', '20%', '.4s'], ['34%', '84%', '1.3s'], ['72%', '12%', '2.2s']]} />
      <Fx className="label" from="down">TERIMA KASIH</Fx>
      <Fx as="p" className="serif foot-quote" delay={0.1}>“{d.thanks}”</Fx>
      <Sprig />
      <Fx className="script foot-names" from="zoom" delay={0.15}>
        {d.groom.short} &amp; {d.bride.short}
      </Fx>
      <div className="names">{d.footerDate}</div>
    </Reveal>
  )
}
