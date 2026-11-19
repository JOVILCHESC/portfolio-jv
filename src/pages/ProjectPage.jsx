import ProjectGallery from '../components/ProjectGallery.jsx'

export default function ProjectPage({ project }) {
  const cover = project.images[0]
  return (
    <>
      <section className="case-hero container" aria-labelledby="project-title">
        <a className="case-back" href={`${import.meta.env.BASE_URL}#projects`}>
          Volver a proyectos
        </a>
        <div className="case-introduction">
          <div>
            <p className="eyebrow">{project.category}</p>
            <p className="case-name">
              {project.name} <span>/ Prototipo local</span>
            </p>
            <h1 id="project-title">{project.title}</h1>
          </div>
          <div className="case-summary">
            <h2>{project.subtitle}</h2>
            <p>{project.description}</p>
            <ul className="case-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <a className="case-action" href="#gallery">
              Explorar las capturas
            </a>
          </div>
        </div>
        <figure className="case-cover">
          <img
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={cover.alt}
            fetchPriority="high"
          />
          <figcaption>
            <span>Vigía / Interfaz de supervisión</span>
            <span>Archivo histórico · Cámara desconectada</span>
          </figcaption>
        </figure>
      </section>
      <nav className="case-index container" aria-label="En esta página">
        <a href="#context">Contexto</a>
        <a href="#gallery">Capturas</a>
        <a href="#architecture">Arquitectura</a>
        <a href="#status">Estado del proyecto</a>
      </nav>
      <section
        className="case-context container case-section"
        id="context"
        aria-labelledby="context-title"
        data-reveal="group"
      >
        <div>
          <p className="eyebrow">EL PROBLEMA</p>
          <h2 id="context-title">
            Observar es el inicio.
            <br />
            Conservar el contexto, el siguiente paso.
          </h2>
        </div>
        <div>
          <p>{project.problem}</p>
          <p>{project.scope}</p>
        </div>
      </section>
      <section
        className="case-gallery-section"
        id="gallery"
        aria-labelledby="gallery-title"
      >
        <div className="container">
          <div className="case-section-heading">
            <div>
              <p className="eyebrow">EL SISTEMA EN PANTALLA</p>
              <h2 id="gallery-title">
                De la vista general
                <br />a cada evidencia.
              </h2>
            </div>
            <p>
              Seis capturas, un recorrido por el sistema.
              <br />
              Selecciona una vista y amplíala para explorar sus detalles.
            </p>
          </div>
          <ProjectGallery images={project.images} />
        </div>
      </section>
      <section
        className="container case-section"
        id="architecture"
        aria-labelledby="architecture-title"
      >
        <div className="case-section-heading">
          <div>
            <p className="eyebrow">DEL FOTOGRAMA A LA INTERFAZ</p>
            <h2 id="architecture-title">
              Dos flujos.
              <br />
              Un mismo contexto.
            </h2>
          </div>
          <p>
            El video viaja por WebSocket. El historial y las observaciones se
            consultan mediante HTTP.
          </p>
        </div>
        <ol className="architecture-flow" aria-label="Flujo de funcionamiento">
          {project.architecture.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p className="flow-tool">{step.tool}</p>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="technology-ledger">
          {project.technologies.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="case-status"
        id="status"
        aria-labelledby="status-title"
      >
        <div className="container case-status-layout">
          <div>
            <p className="eyebrow">ALCANCE Y EVOLUCIÓN</p>
            <h2 id="status-title">
              Un prototipo.
              <br />
              Límites explícitos.
            </h2>
            <p>
              El valor está en conectar detección, evidencia y consulta, con una
              lectura honesta del estado del sistema.
            </p>
          </div>
          <div className="status-list">
            {project.status.map((item) => (
              <section key={item.label}>
                <p className="status-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section
        className="container case-closing"
        aria-labelledby="closing-title"
      >
        <p className="eyebrow">SIGUE EXPLORANDO</p>
        <h2 id="closing-title">
          Más perspectivas.
          <br />
          La misma base de ingeniería.
        </h2>
        <a
          className="button button-primary"
          href={`${import.meta.env.BASE_URL}#projects`}
        >
          Ver los otros proyectos
        </a>
      </section>
    </>
  )
}
