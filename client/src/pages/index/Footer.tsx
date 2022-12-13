import { BsGithub, BsLinkedin } from "react-icons/bs"
import { Link } from "react-router-dom"
import AccentButton from "../../components/AccentButton"

function Footer() {
    return (
        <footer className="index-footer">
            <div className="content">
                <div>
                    <p className="name">Joao Barrera</p>
                    <p className="outro">
                        As a developer, my mission is not only to create applications. It's also taking care of the user's
                        experience, communicating effectively with my team, keeping my code clean and organized, providing
                        valuable insight, and deeply understanding client's needs and requirements.
                    </p>
                </div>
                <Link to="/?scrollTo=contact" className='main-nav-btn'><AccentButton text="Contact Me" /></Link>
                <nav aria-label="footer navigation">
                    <Link to="/"><AccentButton text="Back to the Top" variant="outline"/></Link>
                    <a href={window.portfolio.github || 'github.com'} target="_blank" className='intro-icon'><BsGithub /></a>
                    <a href={window.portfolio.linkedin || 'linkedin.com'} target="_blank" className='intro-icon'><BsLinkedin /></a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
