import Arrow from '../components/Arrow.jsx'

export default function Experience({ content, profile }) {
  return (
    <section
      className="section container experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="experience-title">{content.title}</h2>
      </div>
      <div className="timeline">
        <section aria-labelledby="work-title">
          <p className="timeline-label" id="work-title">
            {content.experienceLabel}
          </p>
          {profile.experience.length > 0 ? (
            profile.experience.map((entry) => (
              <article key={entry.id}>
                <h3>{entry.role}</h3>
                {entry.organization && <p>{entry.organization}</p>}
                {entry.period && (
                  <p className="timeline-period">{entry.period}</p>
                )}
                <p>{entry.description}</p>
              </article>
            ))
          ) : (
            <>
              <h3>{content.academicTitle}</h3>
              <p>{content.academicDescription}</p>
              <a className="text-link" href="#projects">
                {content.projectsAction}
                <Arrow diagonal />
              </a>
            </>
          )}
        </section>
        <section id="education" aria-labelledby="education-title">
          <p className="timeline-label" id="education-title">
            {content.educationLabel}
          </p>
          <h3>{profile.degree}</h3>
          <span className="education-stage">{content.stage}</span>
          {profile.education.institution && (
            <p>{profile.education.institution}</p>
          )}
          {profile.education.period && <p>{profile.education.period}</p>}
          <p>{content.educationDescription}</p>
        </section>
      </div>
    </section>
  )
}
