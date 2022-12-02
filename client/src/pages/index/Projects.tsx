import React from 'react'
import { json, Link } from 'react-router-dom'
import AccentButton from '../../components/AccentButton'

interface ProjectCard {
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
          projects.map(project =>
            <ProjectCard key={JSON.stringify(project)} project={project} />
          )
        }
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
          <div style={{display: "flex", gap:"1rem"}}>
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
