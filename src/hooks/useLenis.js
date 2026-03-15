import { useEffect } from 'react'
import Lenis from 'lenis'

const useLenis = (active = true) => {
  useEffect(() => {
    if (!active) return

    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [active])
}

export default useLenis
