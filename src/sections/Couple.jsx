import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import Sparkles from '../components/Sparkles'
import { weddingData as d } from '../data/weddingData'

const Botanical = ({ side }) => (
  <svg className={`botanical ${side}`} viewBox="0 0 100 300" fill="none" stroke="var(--accent)" strokeWidth="1" aria-hidden="true">
    <path d="M50 0 Q30 60 50 120 Q70 180 50 240 Q35 270 50 300" />
    <path d="M50 40 Q20 50 10 30 M50 40 Q80 50 90 30" />
    <path d="M50 110 Q18 118 6 95 M50 110 Q82 118 94 95" />
    <path d="M50 180 Q20 190 8 165 M50 180 Q80 190 92 165" />
    <path d="M50 250 Q24 258 14 235 M50 250 Q76 258 86 235" />
  </svg>
)

const Person = ({ p }) => (
  <div className="person">
    <Photo className="ph arch-frame" src={p.photo} alt={`Foto ${p.name}`} />
    <h3 className="serif">{p.name}</h3>
    <p>{p.parents[0]}<br />{p.parents[1]}</p>
  </div>
)

export default function Couple() {
  return (
    <Reveal id="couple">
      <Botanical side="left" /><Botanical side="right" />
      <Sparkles items={[['10%', '30%', '.5s'], ['85%', '70%', '1.7s']]} />
      <div className="wrap couple-grid">
        <Person p={d.groom} />
        <div className="amp-big" aria-hidden="true">&amp;</div>
        <Person p={d.bride} />
      </div>
    </Reveal>
  )
}
