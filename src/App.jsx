import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import * as THREE from 'three'

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
import Loader from './components/shared/Loader'

// Heavy Three.js / postprocessing bundle is split out and loaded after first paint.
const Scene = lazy(() => import('./components/Scene'))

export default function App() {
  const [, setLoaded] = useState(false)

  // Lenis smooth scroll, synced to GSAP's ticker so ScrollTrigger stays accurate.
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  // Shared refs driving the 3D scene
  const particleProgressRef = useRef(0)
  const orbitalVisRef = useRef(0)
  const constellationVisRef = useRef(0)
  const cameraStateRef = useRef({
    position: new THREE.Vector3(0, 0, 7),
    target: new THREE.Vector3(0, 0, 0),
  })

  return (
    <>
      {/* Loading screen */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Noise film grain */}
      <div className="noise-overlay" />

      {/* Fixed 3D starfield behind everything (lazy-loaded) */}
      <Suspense fallback={null}>
        <Scene cameraStateRef={cameraStateRef} />
      </Suspense>

      {/* Subtle shooting stars */}
      <ShootingStars />

      {/* UI chrome */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Scrollable content on top of canvas — narrative order */}
      <main>
        <div id="hero">
          <HeroSection
            particleProgressRef={particleProgressRef}
            cameraStateRef={cameraStateRef}
          />
        </div>

        <div id="about">
          <AboutSection cameraStateRef={cameraStateRef} />
        </div>

        <div id="experience">
          <ExperienceSection cameraStateRef={cameraStateRef} />
        </div>

        <div id="tech">
          <TechSection
            orbitalVisRef={orbitalVisRef}
            cameraStateRef={cameraStateRef}
          />
        </div>

        <div id="projects">
          <ProjectsSection cameraStateRef={cameraStateRef} />
        </div>

        <div id="recommendations">
          <RecommendationsSection cameraStateRef={cameraStateRef} />
        </div>

        <div id="connect">
          <ConnectSection
            constellationVisRef={constellationVisRef}
            cameraStateRef={cameraStateRef}
          />
        </div>
      </main>
    </>
  )
}
