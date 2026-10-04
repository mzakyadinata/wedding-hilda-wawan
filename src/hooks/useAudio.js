import { useCallback, useEffect, useRef, useState } from 'react'

// Background music: tidak autoplay; mulai hanya setelah interaksi user. Gagal play = diam, tanpa error.
export function useAudio(src) {
  const ref = useRef(null)
  const wasPlaying = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = new Audio()
    a.loop = true
    a.preload = 'none'
    a.src = src
    ref.current = a
    return () => { a.pause(); a.removeAttribute('src') }
  }, [src])

  const play = useCallback(async () => {
    try { await ref.current.play(); setPlaying(true) } catch { setPlaying(false) }
  }, [])
  const pause = useCallback(() => { ref.current?.pause(); setPlaying(false) }, [])
  const toggle = useCallback(() => (ref.current && !ref.current.paused ? pause() : play()), [play, pause])

  // Jeda otomatis saat tab/app disembunyikan, lanjut saat kembali.
  useEffect(() => {
    const onVis = () => {
      const a = ref.current
      if (!a) return
      if (document.hidden) { wasPlaying.current = !a.paused; a.pause() }
      else if (wasPlaying.current) { a.play().catch(() => setPlaying(false)); wasPlaying.current = false }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return { playing, play, pause, toggle }
}
