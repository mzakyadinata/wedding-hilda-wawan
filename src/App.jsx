import { useEffect, useState } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import Cover from './sections/Cover'
import Invitation from './layouts/Invitation'
import NavDock from './components/NavDock'
import Petals from './components/Petals'
import MusicToggle from './components/MusicToggle'
import { useAudio } from './hooks/useAudio'
import { weddingData } from './data/weddingData'

export default function App() {
  const [opened, setOpened] = useState(false)
  const reduce = useReducedMotion()
  const { playing, play, toggle } = useAudio(weddingData.music)

  // Kunci scroll selama cover tampil.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [opened])

  const open = () => {
    play() // dipanggil langsung dari gesture user agar tidak diblokir browser
    window.scrollTo(0, 0)
    setOpened(true)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <Petals />
      <MusicToggle playing={playing} onToggle={toggle} />

      {opened && <NavDock />}

      {opened && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0.2 : 1, delay: reduce ? 0 : 0.35 }}>
          <Invitation />
        </m.div>
      )}

      <AnimatePresence>
        {!opened && (
          <m.div key="cover" className="cover-wrap" exit={reduce ? { opacity: 0 } : { opacity: 0, y: -48, scale: 1.04 }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <Cover onOpen={open} />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
