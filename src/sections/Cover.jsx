import { m, useReducedMotion } from 'framer-motion'
import Sparkles from '../components/Sparkles'
import { weddingData as d } from '../data/weddingData'

const SPARKS = [['14%', '18%', '.2s'], ['22%', '78%', '1.4s'], ['40%', '10%', '2.1s'], ['60%', '85%', '.8s'], ['72%', '30%', '1.9s']]

export default function Cover({ onOpen }) {
  const reduce = useReducedMotion()
  const item = (i) => reduce ? {} : {
    initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }
  return (
    <section id="cover" aria-label="Sampul undangan">
      <Sparkles items={SPARKS} />
      <div className="monogram arch-frame" style={{ borderRadius: '50%' }}><span>{d.monogram}</span></div>
      <m.div className="label" {...item(0)}>THE WEDDING OF</m.div>
      <m.h1 className="serif" {...item(1)}>{d.bride.short} <span className="amp">&amp;</span> {d.groom.short}</m.h1>
      <m.div className="date" {...item(2)}>{d.dateLabel} · {d.city}</m.div>
      <m.button type="button" className="cta" onClick={onOpen} {...item(3)}>Buka Undangan</m.button>
    </section>
  )
}
