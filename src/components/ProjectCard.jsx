import Arrow from './Arrow.jsx'
import ProjectVisual from './ProjectVisual.jsx'

export default function ProjectCard({ project, content }) {
  const hasDetails =
    project.objective ||
    project.development ||
    project.contribution ||
    project.outcome ||
    project.technologies.length > 0
  return (
    <article
      className="project-card"
      data-reveal="group"
      aria-labelledby={`${project.id}-title`}
    >
      <div className={`project-image ${project.visual}`}>
        <span className="project-number">{project.number} /</span>
        {project.image ? (
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            width="480"
            height="270"
          />
        ) : (
          <>
            <ProjectVisual type={project.visual} />
            <span className="visual-caption">{content.illustration}</span>
          </>
        )}
      </div>
      <div className="project-body">
        <div className="project-meta">
          <p className="project-category">{project.category}</p>
          {project.year && (
            <time className="project-year" dateTime={String(project.year)}>
              {project.year}
            </time>
          )}
        </div>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {hasDetails && (
          <details className="project-details">
            <summary>{content.details}</summary>
            <dl>
              {['objective', 'development', 'contribution', 'outcome'].map(
                (key) =>
                  project[key] && (
                    <div key={key}>
                      <dt>{content[key]}</dt>
                      <dd>{project[key]}</dd>
                    </div>
                  ),
              )}
            </dl>
            {project.technologies.length > 0 && (
              <div className="project-technologies">
                <p>{content.technologies}</p>
                <ul className="tags">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            )}
          </details>
        )}
        {project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
