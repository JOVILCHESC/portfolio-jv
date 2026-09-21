export default function Skills({ content }) {
  return (
    <section
      className="section container"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="skills-title">{content.title}</h2>
        </div>
        <p className="section-description">{content.description}</p>
      </div>
      <div className="skills-grid">
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
          </article>
        ))}
      </div>
    </section>
  )
}
