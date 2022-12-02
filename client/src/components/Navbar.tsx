import React from 'react'
import {Link} from 'react-router-dom'
import scrollTo from '../util/scrollTo'
import './Components.css'

function Navbar() {
  return (
    <nav className='main-nav'>
        <Link to="/" className='main-nav-btn active'>Home</Link>
        <button onClick={() => scrollTo("#about")} className='main-nav-btn'>About</button>
        <button onClick={() => scrollTo("#projects")} className='main-nav-btn'>Projects</button>
    </nav>
  )
}

export default Navbar
