export default function Skills({ content }) {
  return (
    <section
      className="section container"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading" data-reveal="group">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="skills-title">{content.title}</h2>
        </div>
        <p className="section-description">{content.description}</p>
      </div>
      <div className="skills-grid" data-reveal="group">
        {content.groups.map((group) => (
          <article className="skill-group" key={group.number}>
            <span className="skill-number">{group.number}</span>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {group.tools && (
              <div className="skill-tools">
                <p>{content.toolsLabel}</p>
                <ul className="skill-list">
                  {group.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
