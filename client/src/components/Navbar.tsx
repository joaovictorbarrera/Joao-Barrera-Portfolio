import React from 'react'
import {Link} from 'react-router-dom'
import AccentButton from './AccentButton'
import './Components.css'

function Navbar({isHidden}: {isHidden?: boolean}) {
  return (
    <nav className='main-nav'>
        <Link to="/" className='main-nav-btn active'>Home</Link>
        <Link to="/?scrollTo=about" className='main-nav-btn'>About</Link>
        <Link to="/?scrollTo=projects" className='main-nav-btn'>Projects</Link>
        <Link to="/?scrollTo=contact" className='main-nav-btn'><AccentButton variant="outline" text="Contact Me"/></Link>
    </nav>
  )
}

export default Navbar
