import { m, useReducedMotion } from 'framer-motion'

/* ---------- Rangkaian bunga & daun (SVG buatan sendiri, nuansa navy–biru) ---------- */

const TONES = ['#16295a', '#2a4682', '#4b6bb0', '#8ea7d6']
const LEAF = 'M0 0 C 10 -11 28 -11 40 0 C 28 11 10 11 0 0 Z'

const bez = (p, t) => {
  const u = 1 - t
  return [
    u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0],
    u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1],
  ]
}
const tangent = (p, t) => {
  const u = 1 - t
  const dx = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0])
  const dy = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1])
  return (Math.atan2(dy, dx) * 180) / Math.PI
}
const path = (p) => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`.replaceAll(',', ' ')

const STEMS = [
  [[-6, 28], [52, 44], [108, 118], [128, 238]],
  [[28, -6], [92, 22], [168, 56], [232, 128]],
  [[-6, 120], [34, 124], [60, 152], [72, 192]],
]

function leavesFor(stem, ts, s0, s1, seed) {
  return ts.map((t, i) => {
    const [x, y] = bez(stem, t)
    const side = i % 2 ? 1 : -1
    return {
      x, y,
      r: tangent(stem, t) + side * (34 + (i % 3) * 8),
      s: s0 + (s1 - s0) * (i / (ts.length - 1)),
      tone: (i + seed) % 4,
    }
  })
}

const LEAVES = [
  ...leavesFor(STEMS[0], [0.12, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], 1.05, 0.7, 0),
  ...leavesFor(STEMS[1], [0.14, 0.24, 0.34, 0.45, 0.56, 0.67, 0.78], 1.0, 0.65, 1),
  ...leavesFor(STEMS[2], [0.25, 0.45, 0.65, 0.85], 0.8, 0.55, 2),
]

const BLOOMS = [
  { at: bez(STEMS[0], 1), s: 1.35, r: 12 },
  { at: bez(STEMS[1], 1), s: 1.15, r: -20 },
  { at: bez(STEMS[2], 1), s: 0.85, r: 30 },
  { at: bez(STEMS[0], 0.55), s: 0.7, r: 50, off: [-16, 10] },
  { at: bez(STEMS[1], 0.5), s: 0.62, r: 10, off: [8, -14] },
]
const BERRIES = [
  [60, 60, 2.6], [76, 54, 2], [92, 98, 2.4], [150, 52, 2.2], [176, 80, 2.6], [112, 176, 2.2], [38, 160, 2],
]

function Bloom({ x, y, s, r }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="0" cy="-11" rx="6.2" ry="11" transform={`rotate(${i * 72})`}
          fill={i % 2 ? '#e7eefb' : '#d3e0f6'} stroke="#4b6bb0" strokeWidth=".8" />
      ))}
      <circle r="4.6" fill="#16295a" />
      <circle r="2" fill="#c9a96a" />
    </g>
  )
}

/** Satu sudut rangkaian bunga. corner: tl | tr | bl | br */
export function Flora({ corner = 'tl', className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <div className={`flora ${corner} ${className}`.trim()} aria-hidden="true">
      <m.div
        className="flora-in"
        initial={reduce ? false : { opacity: 0, scale: 0.55, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 260 300" className="flora-svg" fill="none">
          {STEMS.map((s, i) => (
            <path key={i} d={path(s)} stroke="#16295a" strokeWidth={i === 2 ? 1.3 : 1.7} strokeLinecap="round" />
          ))}
          {LEAVES.map((l, i) => (
            <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.r.toFixed(1)}) scale(${l.s.toFixed(2)})`}>
              <path d={LEAF} fill={TONES[l.tone]} fillOpacity=".92" />
              <path d="M3 0 H33" stroke="#fff" strokeOpacity=".35" strokeWidth=".8" />
            </g>
          ))}
          {BERRIES.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#4b6bb0" />
          ))}
          {BLOOMS.map((b, i) => (
            <Bloom key={i} x={b.at[0] + (b.off?.[0] ?? 0)} y={b.at[1] + (b.off?.[1] ?? 0)} s={b.s} r={b.r} />
          ))}
        </svg>
      </m.div>
    </div>
  )
}

/** Garis hias dengan ornamen tengah; garis "menggambar dirinya" saat terlihat. */
export function Sprig({ className = '' }) {
  const reduce = useReducedMotion()
  const draw = (d) => (
    <m.path
      d={d}
      initial={reduce ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, ease: 'easeInOut' }}
    />
  )
  return (
    <div className={`sprig ${className}`.trim()} aria-hidden="true">
      <svg width="190" height="34" viewBox="0 0 190 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        {draw('M2 17 H66')}
        {draw('M124 17 H188')}
        {draw('M95 4 C104 10 104 24 95 30 C86 24 86 10 95 4 Z')}
        {draw('M78 17 C84 11 88 11 91 17 M112 17 C106 11 102 11 99 17')}
        <circle cx="95" cy="17" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="72" cy="17" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="118" cy="17" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    </div>
  )
}

/** Bintang kecil berkedip, dipakai sebagai pernak-pernik di sekitar foto/teks. */
export function Twinkles({ items }) {
  return items.map(([top, left, delay, size = 1], i) => (
    <svg key={i} className="twinkle" aria-hidden="true" viewBox="0 0 24 24"
      style={{ top, left, animationDelay: delay, width: 14 * size, height: 14 * size }}>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="currentColor" />
    </svg>
  ))
}
