import React from 'react'
import { BsGithub, BsLinkedin } from "react-icons/bs"
import AccentButton from '../../components/AccentButton'
import scrollTo from '../../util/scrollTo'

function Introduction(props: {}, ref: any) {
    return (
        <section ref={ref} className='introduction'>
            <picture className='pfp-wrapper'>
            <img src="/profile.jpg" alt="my profile picture, me" />
            </picture>

            <h1 className="name-intro">I'm Joao</h1>
            <p className='occupation-intro'>Web Developer <i className='blinking-cursor'></i></p>
            <ul className='links-intro'>
                <li><a href={window.portfolio.github || 'github.com'} target="_blank" className='intro-icon'><BsGithub /></a></li>
                <li><a href={window.portfolio.linkedin || 'linkedin.com'} target="_blank" className='intro-icon'><BsLinkedin /></a></li>
            </ul>
            <AccentButton onClick={() => scrollTo("#about")} text="Learn more..." />
        </section>
    )
}

export default React.forwardRef(Introduction)
