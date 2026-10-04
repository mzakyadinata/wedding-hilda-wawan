import Reveal from '../components/Reveal'
import { weddingData as d } from '../data/weddingData'

export default function Hero() {
  const bg = d.heroImage
    ? { backgroundImage: `linear-gradient(180deg, rgba(10,20,40,.15), rgba(10,20,40,.96)), url(${d.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : undefined
  return (
    <Reveal id="hero">
      <div className="photo" style={bg}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="label">WE&apos;RE GETTING MARRIED</div>
          <h2 className="serif">{d.heroTitle[0]}<br />{d.heroTitle[1]}</h2>
          <div className="divider" />
        </div>
      </div>
    </Reveal>
  )
}
