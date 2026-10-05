import Reveal from '../components/Reveal'
import Fx from '../components/Fx'
import Photo from '../components/Photo'
import { Flora, Twinkles } from '../components/Ornaments'
import { weddingData as d } from '../data/weddingData'

const Person = ({ p, from }) => (
  <Fx className="person" from={from} duration={1.1}>
    <div className="oval">
      <Photo className="ph" src={p.photo} alt={`Foto ${p.name}`} />
    </div>
    <h3 className="script">{p.name}</h3>
    <p>
      {p.parents[0]}
      <br />
      {p.parents[1]}
    </p>
  </Fx>
)

export default function Couple() {
  return (
    <Reveal id="couple" className="tint batik">
      <Flora corner="tl" />
      <Flora corner="br" delay={0.2} />
      <Twinkles items={[['8%', '86%', '.5s'], ['52%', '6%', '1.7s', 0.8], ['92%', '40%', '1s', 0.7]]} />
      <div className="wrap">
        <Fx className="label center" from="down">BISMILLAH</Fx>
        <Fx as="h2" className="script sec-title" delay={0.05}>Mempelai</Fx>
        <div className="couple-grid">
          <Person p={d.groom} from="left" />
          <Fx className="amp-big script" from="zoom" delay={0.2} aria-hidden="true">&amp;</Fx>
          <Person p={d.bride} from="right" />
        </div>
      </div>
    </Reveal>
  )
}
