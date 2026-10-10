import { useEffect } from 'react'

import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import ExperienceSection from './components/Experience/ExperienceSection'
import TechSection from './components/Tech/TechSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import RecommendationsSection from './components/Recommendations/RecommendationsSection'
import ConnectSection from './components/Connect/ConnectSection'
import Navbar from './components/shared/Navbar'
import ScrollProgress from './components/shared/ScrollProgress'
import CustomCursor from './components/shared/CustomCursor'
import ShootingStars from './components/shared/ShootingStars'
import Starfield from './components/shared/Starfield'
import I18nProvider from './i18n/I18nProvider'
import { useI18n } from './i18n/context'

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  )
}

function Page() {
  const { t } = useI18n()

  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        {t.nav.skip}
      </a>

      {/* Background layers */}
      <Starfield />
      <ShootingStars />
      <div className="vignette" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* UI chrome */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1}>
        <div id="hero">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="experience">
          <ExperienceSection />
        </div>
        <div id="tech">
          <TechSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="recommendations">
          <RecommendationsSection />
        </div>
        <div id="connect">
          <ConnectSection />
        </div>
      </main>
    </>
  )
}
