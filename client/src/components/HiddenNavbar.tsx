import React, { useState } from 'react'
import Navbar from './Navbar'
import './Components.css'

function HiddenNavbar() {
    const [open, setOpen] = useState<Boolean>(false);

    function toggleOpen() {
        setOpen(state => !state)
    }

    return (
        <div className={`hidden-navbar ${open ? 'open' : ''}`}>
            <Navbar />
            <button onClick={toggleOpen} className='hide-nav-btn'></button>
        </div>
    )
}

export default HiddenNavbar
