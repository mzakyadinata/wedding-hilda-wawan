import { useEffect, useState } from 'react'

const calc = (target) => {
  const ms = Math.max(0, target - Date.now())
  const s = Math.floor(ms / 1000)
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, done: ms === 0 }
}

export function useCountdown(iso) {
  const target = new Date(iso).getTime()
  const [t, setT] = useState(() => calc(target))
  useEffect(() => {
    if (t.done) return
    const id = setInterval(() => {
      const next = calc(target)
      setT(next)
      if (next.done) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [target, t.done])
  return t
}
