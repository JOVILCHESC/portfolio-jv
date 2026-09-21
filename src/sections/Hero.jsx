import Arrow from '../components/Arrow.jsx'
import DataArtwork from '../components/DataArtwork.jsx'

export default function Hero({ content, profile }) {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="status">
            <span />
            {content.stage}
          </p>
          <p className="eyebrow hero-name">{content.introduction}</p>
          <h1 id="hero-title">
            {content.title[0]}
            <br />
            {content.title[1]}
            <br />
            <span>{content.title[2]}</span>
          </h1>
          <p className="hero-description">{content.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              {content.projectsAction}
              <Arrow diagonal />
            </a>
            <a className="text-link" href="#about">
              {content.aboutAction}
              <Arrow />
            </a>
            {profile.cv && (
              <a className="text-link" href={profile.cv} download>
                {content.cvAction}
                <Arrow />
              </a>
            )}
          </div>
          <ul className="hero-disciplines">
            {content.disciplines.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <DataArtwork content={content} />
      </div>
      <div className="hero-bottom">
        <span>{content.bottom}</span>
        <a href="#about">
          {content.scroll}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
