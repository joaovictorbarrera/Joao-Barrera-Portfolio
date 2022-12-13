import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import useAppearOnIntersection from '../../hooks/useAppearOnIntersection'
import useScrollOnRedirect from '../../hooks/useScrollOnRedirect'
import useWindowScrollY from '../../hooks/useWindowScrollY'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
import "./Index.css"
import Introduction from './Introduction'
import Projects from './Projects'

function Index() {
  const introRef = React.useRef<HTMLElement>(null)
  const aboutRef = React.useRef<HTMLElement>(null)
  const projectsRef = React.useRef<HTMLElement>(null)
  const contactRef = React.useRef<HTMLElement>(null)

  useAppearOnIntersection([introRef, aboutRef, projectsRef, contactRef])
  useScrollOnRedirect([introRef, aboutRef, projectsRef, contactRef])

  // useEffect(() => console.log("rendered"))

  return (
    <div className='index-page'>
      <GalaxyBackground />
      <Navbar />
      <main>
        <Introduction ref={introRef} />
        <About ref={aboutRef} />
        <Projects ref={projectsRef} />
        <Contact ref={contactRef} />
      </main>
      <Footer />
    </div>
  )
}

// So hook doesnt re-render the entire page....
function GalaxyBackground() {
  const scrollAmount = useWindowScrollY()
  return <div style={{
    backgroundPosition: `${-0.05 * scrollAmount}px`,
    transform: `translate(-50%, -50%) rotate(${-0.001 * scrollAmount}deg)`,
    top: "50%", left: "50%",
    width: "150vmax", height: "150vmax"
  }}
  className='galaxy-background' />
}

export default Index
