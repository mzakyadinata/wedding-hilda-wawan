import { m, useReducedMotion } from 'framer-motion'

// Animasi masuk saat elemen terlihat di layar (sekali saja).
// from: up | down | left | right | zoom | fade | mask (terbuka dari bawah, cocok untuk foto lengkung)
const START = {
  up: { opacity: 0, y: 34 },
  down: { opacity: 0, y: -34 },
  left: { opacity: 0, x: -46 },
  right: { opacity: 0, x: 46 },
  zoom: { opacity: 0, scale: 0.86 },
  fade: { opacity: 0 },
  mask: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
}
const END = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  zoom: { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
  mask: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
}
const EASE = [0.22, 1, 0.36, 1]

export default function Fx({
  as = 'div',
  from = 'up',
  delay = 0,
  duration = 0.9,
  children,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Comp = m[as]
  return (
    <Comp
      initial={reduce ? false : START[from]}
      whileInView={END[from]}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
