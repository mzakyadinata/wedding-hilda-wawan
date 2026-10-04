import Reveal from '../components/Reveal'
import Sparkles from '../components/Sparkles'
import { useCountdown } from '../hooks/useCountdown'
import { pad2 } from '../lib/time'
import { weddingData as d } from '../data/weddingData'

// State countdown hanya hidup di komponen ini, sehingga tick per detik tidak merender bagian lain.
export default function Countdown() {
  const t = useCountdown(d.weddingDate)
  const items = [['HARI', t.d], ['JAM', pad2(t.h)], ['MENIT', pad2(t.m)], ['DETIK', pad2(t.s)]]
  return (
    <Reveal id="countdown" style={{ position: 'relative' }}>
      <Sparkles items={[['15%', '12%', '.3s'], ['70%', '88%', '1.6s']]} />
      <div className="wrap">
        <div className="label" style={{ marginBottom: 26 }}>{t.done ? 'HARI BAHAGIA TELAH TIBA' : 'MENUJU HARI BAHAGIA'}</div>
        <div className="cd-row" role="timer" aria-label="Hitung mundur menuju hari pernikahan">
          {items.map(([lab, val], i) => (
            <div key={lab} style={{ display: 'contents' }}>
              {i > 0 && <div className="cd-sep" aria-hidden="true" />}
              <div className="cd-item"><div className="num">{val}</div><div className="lab">{lab}</div></div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
