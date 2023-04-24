import React from 'react'
import AccentButton from '../../components/AccentButton'
import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from '../../utils/BASE_URL'

function About(props: {}, ref: any) {

    const { data, isLoading, isError } = useQuery(['about'], () => {
        return fetch(`${BASE_URL}/data/about`)
        .then(res => res.json())
    })

    const aboutData = data?.about

    const aboutMeLongDescription = aboutData?.longDescription1
    const aboutMeLongDescription2 = aboutData?.longDescription2
    const personalInfo = aboutData?.personalInfo

    if (isLoading) {
        return (
        <section ref={ref} className='about' id='about'>
            <div style={{display:"flex", flexDirection: "column"}}>
            <h2>About Me</h2>
            <p>Error</p>
            </div>
        </section>
        )
    }

    if (isError) {
        return (
        <section ref={ref} className='about' id='about'>
            <div style={{display:"flex", flexDirection: "column"}}>
                <h2>About Me</h2>
                <p>Error</p>
            </div>
        </section>
        )
    }

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
                    <AboutContact personalInfo={personalInfo}/>
                    <a href="/Joao-Barrera-Resume.pdf" target="_blank">
                        <AccentButton text="View Resume" />
                    </a>
                </article>
            </div>
        </section>
  )
}

interface AboutContactProps {
    personalInfo: {
        [index: string]: {
            [index: string]: string
        }
    }
}

function AboutContact({personalInfo}: AboutContactProps) {

    return (
        <section className='about-contact'>
            {Object.keys(personalInfo).map(col => {
                return (
                    <ul key={col}>
                        {Object.entries(personalInfo[col]).map(([key, value]) => {
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
