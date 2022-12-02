import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import useAppearOnIntersection from '../../hooks/useAppearOnIntersection'
import useWindowScrollY from '../../hooks/useWindowScrollY'
import About from './About'
import "./Index.css"
import Introduction from './Introduction'
import Projects from './Projects'

function Index() {
  const introRef = React.useRef<HTMLElement>(null)
  const aboutRef = React.useRef<HTMLElement>(null)
  const projectsRef = React.useRef<HTMLElement>(null)

  useAppearOnIntersection([introRef, aboutRef, projectsRef])

  return (
    <div className='index-page'>
      <GalaxyBackground />
      <Navbar />
      <Introduction ref={introRef} />
      <About ref={aboutRef} />
      <Projects ref={projectsRef} />
    </div>
  )
}

// So hook doesnt re-render the entire page....
function GalaxyBackground() {
  const scrollAmount = useWindowScrollY()
  return <div style={{backgroundPosition: `${0.1 * scrollAmount}px`}} className='galaxy-background' />
}

export default Index
