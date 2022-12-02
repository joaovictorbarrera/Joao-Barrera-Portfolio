import React from 'react'
import { Link } from 'react-router-dom'
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
      previewImage: "/projects/sample.png",
      title: "React Shopping Cart",
      shortDescription: "Fake store with a shopping cart web application using React.js.",
      redirectLink: "/react-shopping-cart",
      sourceCodeLink: "https://bit.ly/3RWmCQs"
    },
    {
      previewImage: "/projects/sample.png",
      title: "Wordle Discord Bot",
      shortDescription: "A Wordle Game Discord Bot using Discord API and Node.js.",
      redirectIsExternal: true,
      redirectLink: "https://bit.ly/3BW18hd",
      sourceCodeLink: "https://bit.ly/3BW18hd"
    },
    {
      previewImage: "/projects/sample.png",
      title: "Amazon Sidebar Clone",
      shortDescription: "Clone of official amazon sidebar.",
      redirectLink: "/amazon-sidebar",
      sourceCodeLink: "https://github.com/joaovictorbarrera/Amazon-Sidebar"
    },

    {
      previewImage: "/projects/sample.png",
      title: "Toggle Buttons",
      shortDescription: "Custom toggle buttons with authentic source code.",
      redirectLink: "/toggle-buttons",
      sourceCodeLink: ""
    },
    {
      previewImage: "/projects/sample.png",
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
            <ProjectCard project={project} />
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

  // if (project.redirectIsExternal) {
  //   return (
  //     <div className="project-card">
  //         <a href={project.redirectLink} target="_blank">
  //           <img src={project.previewImage} alt={`${project.title} preview image`} />
  //         </a>
  //         <span>{project.title}</span>
  //         <p>{project.shortDescription}</p>
  //         <div style={{display: "flex", gap:"1rem"}}>
  //           <a href={project.redirectLink} target="_blank"><AccentButton text="View Project Live" /></a>
  //           <a href={project.sourceCodeLink} target="_blank"><AccentButton text="View Source Code" /></a>
  //         </div>
  //       </div>
  //   )
  // }

  return (
    <div className="project-card">
        <Link to={project.redirectLink}>
          <img src={project.previewImage} alt={`${project.title} preview image`} />
        </Link>
        <div className='content'>
          <span>{project.title}</span>
          <p>{project.shortDescription}</p>
          <div style={{display: "flex", gap:"1rem"}}>
            <Link to={project.redirectLink}>View Project Live</Link>
            <a href={project.sourceCodeLink} target="_blank">View Source Code</a>
          </div>
        </div>
      </div>
  )
}

export default React.forwardRef(Projects)
