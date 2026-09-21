import { useEffect, useRef, useState } from 'react'
import Arrow from './Arrow.jsx'

export default function Navbar({ content, profile }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    const media = window.matchMedia('(min-width: 800px)')
    const handleResize = () => {
      if (media.matches) setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    media.addEventListener('change', handleResize)
    return () => {
      window.removeEventListener('keydown', handleEscape)
      media.removeEventListener('change', handleResize)
    }
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="container navbar">
        <a
          className="brand"
          href="#home"
          aria-label={`${profile.name}, ${content.homeLabel}`}
          onClick={() => setIsOpen(false)}
        >
          <span className="brand-mark">
            jv<span>.</span>
          </span>
          <span className="brand-name">
            {profile.shortName}
            <span>{content.brandLabel}</span>
          </span>
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? content.closeMenu : content.openMenu}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          className={`navigation ${isOpen ? 'is-open' : ''}`}
          aria-label={content.navLabel}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== toggleRef.current
            )
              setIsOpen(false)
          }}
        >
          {content.navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setIsOpen(false)}
          >
            {content.contactAction}
            <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  )
}
