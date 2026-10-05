import { m, useReducedMotion } from 'framer-motion'

// Pembungkus section: fade-up halus saat masuk layar. Animasi detail ada di <Fx>.
export default function Reveal({ as: Tag = 'section', className = '', children, ...props }) {
  const reduce = useReducedMotion()
  const Comp = m[Tag]
  return (
    <Comp
      className={`reveal ${className}`.trim()}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Comp>
  )
}
