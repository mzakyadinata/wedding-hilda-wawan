import { useMemo } from 'react'

export default function Petals() {
  const petals = useMemo(() => {
    const count = window.matchMedia('(max-width:600px)').matches ? 6 : 10
    return Array.from({ length: count }, () => {
      const size = 9 + Math.random() * 6
      return {
        left: Math.random() * 100, size,
        duration: 14 + Math.random() * 10, delay: Math.random() * -20,
        opacity: 0.35 + Math.random() * 0.35,
      }
    })
  }, [])
  return (
    <div className="petals-layer" aria-hidden="true">
      {petals.map((p, i) => (
        <div key={i} className="petal" style={{ left: `${p.left}vw`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}>
          <svg width={p.size} height={p.size * 1.3} viewBox="0 0 10 13">
            <path d="M5 0 C9 3 9 10 5 13 C1 10 1 3 5 0 Z" fill="var(--accent)" opacity={p.opacity} />
          </svg>
        </div>
      ))}
    </div>
  )
}
