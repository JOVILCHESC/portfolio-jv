import { useEffect, useRef, useState } from 'react'

export default function ProjectGallery({ images }) {
  const [selected, setSelected] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isOriginalSize, setIsOriginalSize] = useState(false)
  const dialogRef = useRef(null)
  const image = images[selected]

  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  function move(direction) {
    setSelected(
      (current) => (current + direction + images.length) % images.length,
    )
    setIsOriginalSize(false)
  }

  return (
    <div className="project-gallery">
      <nav className="gallery-navigation" aria-label="Vistas del sistema">
        {images.map((entry, index) => (
          <a
            key={entry.id}
            href={entry.original}
            aria-current={index === selected ? 'true' : undefined}
            onClick={(event) => {
              if (
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return
              event.preventDefault()
              setSelected(index)
            }}
          >
            {entry.label}
          </a>
        ))}
      </nav>
      <figure className="gallery-feature" aria-live="polite" aria-atomic="true">
        <a
          className="gallery-image"
          href={image.original}
          aria-label={`Ampliar: ${image.label}`}
          onClick={(event) => {
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              !dialogRef.current?.showModal
            )
              return
            event.preventDefault()
            setIsOriginalSize(false)
            setIsOpen(true)
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
          <span className="image-expand">Ampliar captura</span>
        </a>
        <figcaption>
          <span className="gallery-count">
            {String(selected + 1).padStart(2, '0')} /{' '}
            {String(images.length).padStart(2, '0')}
          </span>
          <div>
            <h3>{image.title}</h3>
            <p>{image.caption}</p>
          </div>
        </figcaption>
      </figure>
      <p className="gallery-provenance">
        Capturas reales del prototipo local. Las fotografías aparecen
        difuminadas en la interfaz; las evidencias originales se conservan. No
        es una transmisión en vivo.
      </p>
      <dialog
        ref={dialogRef}
        className="image-dialog"
        aria-labelledby="image-dialog-title"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            const controls = [
              ...event.currentTarget.querySelectorAll('button, a[href]'),
            ]
            const first = controls[0]
            const last = controls.at(-1)
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first.focus()
            }
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            move(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            move(-1)
          }
        }}
      >
        {isOpen && (
          <>
            <div className="image-dialog-toolbar">
              <h2 id="image-dialog-title">{image.label}</h2>
              <button type="button" onClick={() => setIsOpen(false)} autoFocus>
                Cerrar
              </button>
            </div>
            <div
              className={`image-dialog-scroll ${isOriginalSize ? 'is-original' : ''}`}
            >
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
              />
            </div>
            <div className="image-dialog-controls">
              <button type="button" onClick={() => move(-1)}>
                Anterior
              </button>
              <span aria-live="polite">
                {selected + 1} / {images.length}
              </span>
              <button type="button" onClick={() => move(1)}>
                Siguiente
              </button>
              <button
                type="button"
                aria-pressed={isOriginalSize}
                onClick={() => setIsOriginalSize(!isOriginalSize)}
              >
                {isOriginalSize ? 'Ajustar a pantalla' : 'Tamaño original'}
              </button>
              <a href={image.original} download>
                Descargar PNG
              </a>
            </div>
          </>
        )}
      </dialog>
    </div>
  )
}
