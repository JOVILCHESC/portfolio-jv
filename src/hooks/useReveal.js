import { useEffect } from 'react'

export default function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = [...root.querySelectorAll('[data-reveal]')]
    let observer

    const observe = () => {
      observer?.disconnect()
      if (preference.matches) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return
            target.dataset.revealed = 'true'
            observer.unobserve(target)
          })
        },
        { threshold: 0, rootMargin: '0px 0px -32px 0px' },
      )

      targets
        .filter((target) => !target.dataset.revealed)
        .forEach((target) => observer.observe(target))
    }

    observe()
    preference.addEventListener('change', observe)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', observe)
    }
  }, [rootRef])
}
