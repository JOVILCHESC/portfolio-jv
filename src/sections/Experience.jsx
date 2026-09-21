import Arrow from '../components/Arrow.jsx'

export default function Experience({ content, profile }) {
  return (
    <section
      className="section container experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div data-reveal="group">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="experience-title">{content.title}</h2>
      </div>
      <div className="timeline">
        <section data-reveal="group" aria-labelledby="work-title">
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
                {entry.highlights && (
                  <ul className="experience-highlights">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
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
        <section
          data-reveal="group"
          id="education"
          aria-labelledby="education-title"
        >
          <p className="timeline-label" id="education-title">
            {content.educationLabel}
          </p>
          <h3>{profile.degree}</h3>
          <span className="education-stage">{content.stage}</span>
          {profile.education.institution && (
            <p>{profile.education.institution}</p>
          )}
          {profile.education.period && <p>{profile.education.period}</p>}
          {profile.education.location && <p>{profile.education.location}</p>}
          <p>{profile.education.status}</p>
          {profile.education.certifications && (
            <div className="certifications">
              <h4>{content.certificationsLabel}</h4>
              <p>{profile.education.certifications.issuer}</p>
              <ul>
                {profile.education.certifications.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}
