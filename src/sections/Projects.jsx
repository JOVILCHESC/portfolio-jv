import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects({ content, projects }) {
  return (
    <section
      className="projects-section section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal="group">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="projects-title">{content.title}</h2>
          </div>
          <p className="section-description">{content.description}</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} content={content} />
          ))}
        </div>
      </div>
    </section>
  )
}
