import { m, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Fx from '../components/Fx'
import { Flora, Twinkles } from '../components/Ornaments'
import { useCountdown } from '../hooks/useCountdown'
import { pad2 } from '../lib/time'
import { weddingData as d } from '../data/weddingData'

// Angka "menukik" turun tiap kali nilainya berganti.
function Num({ value }) {
  const reduce = useReducedMotion()
  return (
    <span className="num-clip">
      <m.span key={value} className="num-val" initial={reduce ? false : { y: '-70%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        {value}
      </m.span>
    </span>
  )
}

// State countdown hanya hidup di komponen ini, sehingga tick per detik tidak merender bagian lain.
export default function Countdown() {
  const t = useCountdown(d.weddingDate)
  const items = [['HARI', t.d], ['JAM', pad2(t.h)], ['MENIT', pad2(t.m)], ['DETIK', pad2(t.s)]]
  return (
    <Reveal id="countdown" className="dark batik-dark">
      <Flora corner="tl" className="on-dark" />
      <Flora corner="br" className="on-dark" delay={0.2} />
      <Twinkles items={[['12%', '78%', '.3s'], ['40%', '8%', '1.4s', 0.8], ['86%', '70%', '2s']]} />
      <div className="wrap">
        <Fx className="drop" from="zoom" duration={1.2}>
          <svg className="drop-bg" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true">
            <path d="M150 6 C150 6 36 150 36 268 a114 114 0 0 0 228 0 C264 150 150 6 150 6 Z" />
            <path className="drop-line" d="M150 22 C150 22 52 152 52 268 a98 98 0 0 0 196 0 C248 152 150 22 150 22 Z" />
          </svg>
          <div className="drop-in">
            <div className="label">{t.done ? 'HARI BAHAGIA TELAH TIBA' : 'MENUJU HARI BAHAGIA'}</div>
            <div className="script drop-title">Save the Date</div>
            <div className="cd-row" role="timer" aria-label="Hitung mundur menuju hari pernikahan">
              {items.map(([lab, val], i) => (
                <div key={lab} style={{ display: 'contents' }}>
                  {i > 0 && <div className="cd-sep" aria-hidden="true" />}
                  <div className="cd-item">
                    <div className="num"><Num value={val} /></div>
                    <div className="lab">{lab}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="drop-date">{d.dateLabel}</div>
          </div>
        </Fx>
      </div>
    </Reveal>
  )
}
