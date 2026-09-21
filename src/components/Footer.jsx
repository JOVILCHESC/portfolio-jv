export default function Footer({ content, profile }) {
  return (
    <footer className="container footer">
      <div>
        <a className="footer-name" href="#home">
          {profile.name}
          <span>.</span>
        </a>
        <p>{content.description}</p>
      </div>
      <span className="footer-note">{content.note}</span>
      <a className="text-link" href="#home">
        {content.top}
        <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}
