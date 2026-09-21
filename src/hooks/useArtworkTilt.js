import { useEffect } from 'react'

export default function useArtworkTilt(artworkRef) {
  useEffect(() => {
    const artwork = artworkRef.current
    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let frame = 0
    let bounds
    let position

    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      bounds = null
      artwork.style.removeProperty('--tilt-x')
      artwork.style.removeProperty('--tilt-y')
    }
    const enter = (event) => {
      if (event.pointerType === 'mouse')
        bounds = artwork.getBoundingClientRect()
    }
    const move = (event) => {
      if (event.pointerType !== 'mouse' || !bounds) return
      position = { x: event.clientX, y: event.clientY }
      if (frame) return
      frame = requestAnimationFrame(() => {
        const x = Math.max(
          -0.5,
          Math.min(0.5, (position.x - bounds.left) / bounds.width - 0.5),
        )
        const y = Math.max(
          -0.5,
          Math.min(0.5, (position.y - bounds.top) / bounds.height - 0.5),
        )
        artwork.style.setProperty('--tilt-x', `${-y * 3}deg`)
        artwork.style.setProperty('--tilt-y', `${x * 3}deg`)
        frame = 0
      })
    }
    const disconnect = () => {
      artwork.removeEventListener('pointerenter', enter)
      artwork.removeEventListener('pointermove', move)
      artwork.removeEventListener('pointerleave', reset)
      artwork.removeEventListener('pointercancel', reset)
      window.removeEventListener('blur', reset)
      reset()
    }
    const connect = () => {
      disconnect()
      if (!media.matches) return
      artwork.addEventListener('pointerenter', enter, { passive: true })
      artwork.addEventListener('pointermove', move, { passive: true })
      artwork.addEventListener('pointerleave', reset)
      artwork.addEventListener('pointercancel', reset)
      window.addEventListener('blur', reset)
    }
    connect()
    media.addEventListener('change', connect)
    return () => {
      disconnect()
      media.removeEventListener('change', connect)
    }
  }, [artworkRef])
}
