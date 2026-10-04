import { useEffect, useRef } from 'react'

// Reveal-on-scroll persis seperti mockup (class .reveal -> .in), tanpa re-render React.
export default function Reveal({ as: Tag = 'section', className = '', children, ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`.trim()} {...props}>{children}</Tag>
}
