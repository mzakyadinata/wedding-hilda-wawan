import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import Fx from '../components/Fx'
import { Flora, Sprig, Twinkles } from '../components/Ornaments'
import { weddingData as d } from '../data/weddingData'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Foto sedikit bergeser berlawanan arah scroll (parallax) di dalam bingkai lengkung.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%'])

  return (
    <Reveal id="hero">
      <Flora corner="tr" />
      <Twinkles items={[['9%', '8%', '.4s'], ['44%', '92%', '1.5s', 0.8], ['80%', '6%', '2.2s', 0.7]]} />
      <div className="wrap hero-wrap">
        <Fx className="label" from="down">WE&apos;RE GETTING MARRIED</Fx>

        <Fx className="hero-arch" from="mask" duration={1.4} ref={ref}>
          {d.heroImage && <m.img src={d.heroImage} alt={`${d.groom.short} dan ${d.bride.short}`} style={{ y }} decoding="async" />}
        </Fx>

        <Fx as="h2" className="serif hero-title" delay={0.15}>
          {d.heroTitle[0]}<br />{d.heroTitle[1]}
        </Fx>
        <Sprig />
        <Fx as="p" className="hero-date" delay={0.2}>{d.dateLabel} · {d.city}</Fx>
      </div>
    </Reveal>
  )
}
