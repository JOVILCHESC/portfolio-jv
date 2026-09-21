import Arrow from '../components/Arrow.jsx'

export default function Contact({ content, profile, cvLabel }) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact-layout">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="contact-title">{content.title}</h2>
          <p className="contact-description">{content.description}</p>
          <div className="contact-links">
            {profile.email && (
              <a
                className="button button-dark"
                href={`mailto:${profile.email}`}
              >
                {content.emailAction}
                <Arrow diagonal />
              </a>
            )}
            {profile.socialLinks.map((link) => (
              <a
                className="text-link"
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <Arrow diagonal />
              </a>
            ))}
            {profile.cv && (
              <a className="text-link" href={profile.cv} download>
                {cvLabel}
                <Arrow />
              </a>
            )}
            {!profile.email && profile.socialLinks.length === 0 && (
              <p className="contact-availability">{content.unavailable}</p>
            )}
          </div>
        </div>
        <span className="contact-symbol" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  )
}
