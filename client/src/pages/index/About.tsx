import React from 'react'
import AccentButton from '../../components/AccentButton'

function About(props: {}, ref: any) {

    const aboutMeLongDescription = `
        My name is Joao, I'm a Self-taught Software Developer who specializes in web development.
        If I had to describe myself in one sentence I would say I'm passionate about learning.
    `
    const aboutMeLongDescription2 =`
        Learning for me has never been just about working, but all that I do and appreaciate in life.
        Over these past few years I've put all my effort into collecting knowledge and
        improving my skills towards creating highly functional cool-looking websites.
    `

    return (
        <section ref={ref} className='about' id='about'>
            <div>
                <picture className='about-picture-wrapper'>
                <img src="/full body.png" alt="me" />
                </picture>
                <article className='about-description'>
                    <h2>About Me</h2>
                    <p>{aboutMeLongDescription}</p>
                    <p>{aboutMeLongDescription2}</p>
                    <AboutContact />
                    <a href="/Joao-Barrera-Resume.pdf" target="_blank">
                        <AccentButton text="View Resume" />
                    </a>
                </article>
            </div>
        </section>
  )
}

function AboutContact() {
    const contactInfo: {[index: string]: {[index: string]: string}} = {
        colOne: {
            "Name": "Joao Barrera",
            "Phone Number": "+1 (818) 488-0996",
            "Email": "joao.victor.lotfi@gmail.com"
        },
        colTwo: {
            "Age": "20",
            "Location": "Winter Garden, FL",
            "Personal Experience": "2 Years"
        }
    }

    return (
        <section className='about-contact'>
            {Object.keys(contactInfo).map(col => {
                return (
                    <ul key={col}>
                        {Object.entries(contactInfo[col]).map(([key, value]) => {
                            return (
                                <li key={col+key+value}>
                                    <span key={col+key}>{`${key}: `}</span>
                                    <span key={col+value} className="light-text">{value}</span>
                                </li>
                            )
                        })}
                    </ul>
                )
            })}
        </section>
    )
}

export default React.forwardRef(About)
