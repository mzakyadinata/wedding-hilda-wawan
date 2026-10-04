import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import { fetchWishes, submitWish } from '../services/wishes'
import { timeAgo } from '../lib/time'

const COOLDOWN_MS = 15000

export default function Wishes() {
  const root = useRef(null)
  const lastSent = useRef(0)
  const [wishes, setWishes] = useState([])
  const [load, setLoad] = useState('idle') // idle | loading | ready | error
  const [form, setForm] = useState({ name: '', message: '', website: '' })
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const loadWishes = () => {
    setLoad('loading')
    fetchWishes().then((d) => { setWishes(d); setLoad('ready') }).catch(() => setLoad('error'))
  }

  // Fetch sekali, hanya ketika section mendekati viewport.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); loadWishes() } }, { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (sending) return
    const name = form.name.trim(), message = form.message.trim()
    if (name.length < 2 || name.length > 80) return setMsg({ type: 'error', text: 'Nama harus 2–80 karakter.' })
    if (message.length < 2 || message.length > 500) return setMsg({ type: 'error', text: 'Ucapan harus 2–500 karakter.' })
    if (Date.now() - lastSent.current < COOLDOWN_MS) return setMsg({ type: 'error', text: 'Mohon tunggu sebentar sebelum mengirim lagi.' })
    if (form.website) return setForm({ name: '', message: '', website: '' }) // honeypot
    setSending(true); setMsg({ type: '', text: '' })
    try {
      const row = await submitWish({ name, message })
      lastSent.current = Date.now()
      setWishes((w) => [row, ...w])
      setLoad((s) => (s === 'ready' ? s : 'ready'))
      setForm({ name: '', message: '', website: '' })
      setMsg({ type: 'ok', text: 'Terima kasih, ucapan Anda sudah terkirim.' })
    } catch (err) {
      setMsg({ type: 'error', text: err?.message === 'NOT_CONFIGURED' ? 'Layanan ucapan belum aktif.' : 'Ucapan gagal terkirim. Silakan coba lagi.' })
    } finally { setSending(false) }
  }

  return (
    <Reveal id="wishes">
      <div className="wrap" ref={root}>
        <div className="label" style={{ textAlign: 'center', marginBottom: 20 }}>UCAPAN &amp; DOA</div>
        <form className="wish-form" onSubmit={onSubmit} noValidate>
          <div className="sr-only-field" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></div>
          <input type="text" placeholder="Nama" aria-label="Nama" value={form.name} onChange={set('name')} maxLength={80} autoComplete="name" />
          <textarea rows={2} placeholder="Tulis ucapan..." aria-label="Ucapan dan doa" value={form.message} onChange={set('message')} maxLength={500} />
          <button type="submit" disabled={sending}>{sending ? 'Mengirim…' : 'Kirim'}</button>
          {msg.text && <div className={msg.type === 'error' ? 'err' : 'form-note'} style={{ textAlign: 'right', marginTop: 0 }} role={msg.type === 'error' ? 'alert' : 'status'}>{msg.text}</div>}
        </form>
        <div className="wish-list" aria-live="polite">
          {load === 'loading' && <div className="wish-empty">Memuat ucapan…</div>}
          {load === 'error' && <div className="wish-empty">Ucapan belum dapat dimuat. <button type="button" className="link-btn" style={{ marginTop: 0 }} onClick={loadWishes}>Coba lagi</button></div>}
          {load === 'ready' && wishes.length === 0 && <div className="wish-empty">Jadilah yang pertama memberikan ucapan.</div>}
          {wishes.map((w) => (
            <div className="wish-card" key={w.id}>
              <div className="who">{w.name} <span>{timeAgo(w.created_at)}</span></div>
              <p>{w.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
