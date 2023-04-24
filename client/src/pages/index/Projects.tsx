import React from 'react'
import { json, Link } from 'react-router-dom'
import AccentButton from '../../components/AccentButton'
import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from '../../utils/BASE_URL'

export interface ProjectCard {
  uuid: string,
  disabled?: boolean,
  previewImage: string,
  title: string,
  shortDescription: string,
  redirectIsExternal?: boolean,
  redirectLink: string,
  sourceCodeLink: string
}

function Projects(props: {}, ref: any) {
  const { data, isLoading, isError } = useQuery(['projects'], () => {
    return fetch(`${BASE_URL}/data/projects`)
    .then(res => res.json())
  })

  if (isLoading) {
    return (
      <section ref={ref} className='projects' id='projects'>
        <h2>Projects</h2>
        <p>Loading...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section ref={ref} className='projects' id='projects'>
        <h2>Projects</h2>
        <p>Error</p>
      </section>
    )
  }

  const projects: ProjectCard[] = data.projects

  return (
    <section ref={ref} className='projects' id='projects'>
        <h2>Projects</h2>
        <div className='projects-cards-grid-wrapper'>
          {
            projects.map(project => {
              return !project.disabled ? <ProjectCard key={JSON.stringify(project)} project={project} /> : null
            })
          }
          <div className="project-card" style={{opacity: "80%", filter: "brightness(90%)", border: "1px dashed yellow"}}>
              <div style={{backgroundColor: "#222", height: "200px"}}></div>
              <div style={{backgroundColor: "hsl(0, 0%, 10%)"}} className="content">
                <span>WIP</span>
                <p>More will be added soon...</p>
              </div>
          </div>
        </div>
    </section>
  )
}

interface ProjectCardProps {
  project: ProjectCard
}

function ProjectCard({ project }: ProjectCardProps) {

  if (!project.redirectLink) return null

  return (
    <div className="project-card">
        <CorrectedLink link={project.redirectLink} isExternal={project.redirectIsExternal}>
          <img src={project.previewImage} alt={`${project.title} preview image`} />
        </CorrectedLink>
        <div className='content'>
          <span>{project.title}</span>
          <p>{project.shortDescription}</p>
          <div style={{display: "flex", gap:"1rem", marginTop: "auto"}}>
            <CorrectedLink link={project.redirectLink} isExternal={project.redirectIsExternal}>
              View Project Live
            </CorrectedLink>
            <a href={project.sourceCodeLink} className={`${!project.sourceCodeLink ? "unavailable" : ""}`} target="_blank">View Source Code</a>
          </div>
        </div>
    </div>
  )
}

interface CorrectedLinkProps {
  isExternal?: boolean,
  link: string,
  children: React.ReactNode
}

function CorrectedLink({isExternal, link, children}: CorrectedLinkProps) {
  if (isExternal) {
    return <a href={link} target="_blank">{children}</a>
  }

  return <Link to={link}>{children}</Link>
}

export default React.forwardRef(Projects)
