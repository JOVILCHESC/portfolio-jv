import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Contact from './sections/Contact.jsx'
import { portfolio } from './data/portfolio.js'
import { copy } from './data/copy.js'
import { useRef } from 'react'
import useReveal from './hooks/useReveal.js'

export default function App() {
  const content = copy.es
  const mainRef = useRef(null)
  useReveal(mainRef)
  return (
    <div id="home">
      <a className="skip-link" href="#main-content">
        {content.skip}
      </a>
      <Navbar content={content} profile={portfolio} />
      <main ref={mainRef} id="main-content" tabIndex={-1}>
        <Hero content={content.hero} profile={portfolio} />
        <About content={content.about} />
        <Projects content={content.projects} projects={portfolio.projects} />
        <Skills content={content.skills} />
        <Experience content={content.experience} profile={portfolio} />
        <Contact
          content={content.contact}
          profile={portfolio}
          cvLabel={content.hero.cvAction}
        />
      </main>
      <Footer content={content.footer} profile={portfolio} />
    </div>
  )
}
