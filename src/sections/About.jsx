export default function About({ content, profile }) {
  return (
    <section
      className="section container about-section"
      id="about"
      data-reveal="group"
      aria-labelledby="about-title"
    >
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="about-title">{content.title}</h2>
      </div>
      <div className="about-copy">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="about-note">
          <span aria-hidden="true">↗</span>
          {profile.location}
        </p>
      </div>
    </section>
  )
}
