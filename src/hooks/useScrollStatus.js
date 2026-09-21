import { useEffect, useState } from 'react'

export default function useScrollStatus(headerRef, progressRef) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const header = headerRef.current
    const progress = progressRef.current
    const sections = [...document.querySelectorAll('main > section[id]')]
    let offsets = []
    let maxScroll = 0
    let markerOffset = 0
    let frame = 0
    let needsMeasure = true
    let currentSection = ''

    const update = () => {
      frame = 0
      if (needsMeasure) {
        offsets = sections.map((section) => ({
          id: section.id,
          top: section.offsetTop,
        }))
        maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        )
        markerOffset =
          header.offsetHeight + Math.min(180, window.innerHeight * 0.25)
        needsMeasure = false
      }
      const scroll = Math.max(0, window.scrollY)
      const ratio = maxScroll > 0 ? Math.min(1, scroll / maxScroll) : 0
      progress.style.transform = `scaleX(${ratio})`
      const section =
        ratio >= 0.999 && maxScroll > 0
          ? (offsets.at(-1)?.id ?? '')
          : (offsets.findLast((entry) => entry.top <= scroll + markerOffset)
              ?.id ?? '')
      if (section !== currentSection) {
        currentSection = section
        setActiveSection(section)
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const measure = () => {
      needsMeasure = true
      schedule()
    }
    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    resizeObserver?.observe(document.body)
    resizeObserver?.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
    }
  }, [headerRef, progressRef])

  return activeSection
}
