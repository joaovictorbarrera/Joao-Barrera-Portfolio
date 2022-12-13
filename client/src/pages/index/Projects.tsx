import React from 'react'
import { json, Link } from 'react-router-dom'
import AccentButton from '../../components/AccentButton'

interface ProjectCard {
  disabled?: boolean,
  previewImage: string,
  title: string,
  shortDescription: string,
  redirectIsExternal?: boolean,
  redirectLink: string,
  sourceCodeLink: string
}

function Projects(props: {}, ref: any) {
  const projects: ProjectCard[] = [
    {
      previewImage: "/projects/react-shopping-cart-thumbnail.png",
      title: "React Shopping Cart",
      shortDescription: "Fake store with a shopping cart web application using React.js.",
      redirectLink: "/react-shopping-cart",
      sourceCodeLink: "https://bit.ly/3RWmCQs"
    },
    {
      previewImage: "/projects/wordle-discord-bot-thumbnail.png",
      title: "Wordle Discord Bot",
      shortDescription: "A Wordle Game Discord Bot using Discord API and Node.js.",
      redirectIsExternal: true,
      redirectLink: "https://bit.ly/3BW18hd",
      sourceCodeLink: "https://bit.ly/3BW18hd"
    },
    {
      previewImage: "/projects/amazon-sidebar-thumbnail.png",
      title: "Amazon Sidebar Clone",
      shortDescription: "Clone of official amazon sidebar.",
      redirectLink: "/amazon-sidebar",
      sourceCodeLink: "https://github.com/joaovictorbarrera/Amazon-Sidebar"
    },
    {
      previewImage: "/projects/toggle-buttons-thumbnail.png",
      title: "Toggle Buttons",
      shortDescription: "Custom toggle buttons with authentic source code.",
      redirectLink: "/toggle-buttons",
      sourceCodeLink: "https://github.com/joaovictorbarrera/Toggle-Buttons"
    },
    {
      disabled: true,
      previewImage: "/projects/sample.png",
      title: "Provider's App",
      shortDescription: "Web App to manipulate, process, and display data for company providers.",
      redirectLink: "/providers-app",
      sourceCodeLink: "https://github.com/joaovictorbarrera/ProvidersApp"
    },
    {
      disabled: true,
      previewImage: "/projects/sample.png",
      title: "Login Page",
      shortDescription: "Advanced auth system for registering/login.",
      redirectLink: "/login-page",
      sourceCodeLink: "https://github.com/joaovictorbarrera/login-page"
    },
    {
      disabled: true,
      previewImage: "/projects/quicksort-visualizer-thumbnail.png",
      title: "Quicksort Visualizer",
      shortDescription: "See how quicksort really works with this visualizer tool.",
      redirectLink: "/quicksort-visualizer",
      sourceCodeLink: ""
    }
  ]

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
