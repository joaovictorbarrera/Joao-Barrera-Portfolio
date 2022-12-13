import React from 'react'
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { Link } from 'react-router-dom'
import AccentButton from '../../components/AccentButton'

function Introduction(props: {}, ref: any) {
    return (
        <section ref={ref} className='introduction' id="introduction">
            <picture className='pfp-wrapper'>
            <img src="/profile.jpg" alt="my profile picture, me" />
            </picture>

            <h1 className="name-intro">I'm Joao</h1>
            <p className='occupation-intro'>Web Developer <i className='blinking-cursor'></i></p>
            <ul className='links-intro'>
                <li><a href={window.portfolio.github || 'github.com'} target="_blank" className='intro-icon'><BsGithub /></a></li>
                <li><a href={window.portfolio.linkedin || 'linkedin.com'} target="_blank" className='intro-icon'><BsLinkedin /></a></li>
            </ul>
            <Link to="/?scrollTo=about"><AccentButton text="Learn more..." /></Link>
        </section>
    )
}

export default React.forwardRef(Introduction)
