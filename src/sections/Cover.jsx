import { m, useReducedMotion } from 'framer-motion'
import { Flora, Twinkles } from '../components/Ornaments'
import { weddingData as d } from '../data/weddingData'

// Nama tamu dari link: https://situsmu.com/?to=Bapak+Budi  (opsional)
const guestName = () => {
  try {
    return (new URLSearchParams(window.location.search).get('to') || '').trim().slice(0, 60)
  } catch {
    return ''
  }
}

export default function Cover({ onOpen }) {
  const reduce = useReducedMotion()
  const guest = guestName()
  const item = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="cover" aria-label="Sampul undangan">
      <Flora corner="tl" className="lg" delay={0.1} />
      <Flora corner="br" className="lg" delay={0.3} />
      <Twinkles items={[['16%', '82%', '.2s'], ['30%', '9%', '1.2s', 0.8], ['58%', '88%', '2s', 0.7], ['74%', '12%', '.7s']]} />

      <m.div className="cover-label label" {...item(0)}>THE WEDDING OF</m.div>

      <m.div className="cover-arch" {...item(1)}>
        <div className="cover-photo">
          {d.coverImage && <img src={d.coverImage} alt="" fetchPriority="high" decoding="async" />}
        </div>
        <span className="cover-badge"><span>{d.monogram}</span></span>
      </m.div>

      <m.h1 className="script cover-names" {...item(2)}>
        {d.groom.short} <span className="amp">&amp;</span> {d.bride.short}
      </m.h1>
      <m.div className="cover-date" {...item(3)}>{d.dateLabel}</m.div>

      {guest && (
        <m.div className="cover-guest" {...item(4)}>
          <small>Kepada Yth.</small>
          <strong>{guest}</strong>
        </m.div>
      )}

      <m.button type="button" className="cta" onClick={onOpen} {...item(5)}>
        <span>Buka Undangan</span>
        <span className="cta-arrow" aria-hidden="true">↓</span>
      </m.button>
    </section>
  )
}
