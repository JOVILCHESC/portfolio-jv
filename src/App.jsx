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
import { useEffect, useRef } from 'react'
import useReveal from './hooks/useReveal.js'
import ProjectPage from './pages/ProjectPage.jsx'
import { findCaseStudy } from './data/caseStudies.js'

export default function App({ pathname = import.meta.env.BASE_URL }) {
  const content = copy.es
  const project = findCaseStudy(pathname)
  const homeHref = project ? import.meta.env.BASE_URL : ''
  const mainRef = useRef(null)
  useReveal(mainRef)
  useEffect(() => {
    if (!project) return
    document.title = project.metaTitle
    const url = `https://jovilchesc.github.io${import.meta.env.BASE_URL}${project.path}`
    document.querySelector('link[rel="canonical"]').href = url
    for (const [selector, value] of [
      ['meta[name="description"]', project.metaDescription],
      ['meta[property="og:title"]', project.metaTitle],
      ['meta[property="og:description"]', project.metaDescription],
      ['meta[property="og:url"]', url],
    ])
      document.querySelector(selector).content = value
  }, [project])
  return (
    <div id="home">
      <a className="skip-link" href="#main-content">
        {content.skip}
      </a>
      <Navbar content={content} profile={portfolio} homeHref={homeHref} />
      <main ref={mainRef} id="main-content" tabIndex={-1}>
        {project ? (
          <ProjectPage project={project} />
        ) : (
          <>
            <Hero content={content.hero} profile={portfolio} />
            <About content={content.about} profile={portfolio} />
            <Projects
              content={content.projects}
              projects={portfolio.projects}
            />
            <Skills content={content.skills} />
            <Experience content={content.experience} profile={portfolio} />
            <Contact
              content={content.contact}
              profile={portfolio}
              cvLabel={content.hero.cvAction}
            />
          </>
        )}
      </main>
      <Footer
        content={content.footer}
        profile={portfolio}
        homeHref={homeHref}
      />
    </div>
  )
}
