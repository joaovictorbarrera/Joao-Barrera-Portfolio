import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { ProjectCard } from "../index/Projects"
import AccentButton from "../../components/AccentButton"

function Admin() {
    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        if (!auth) {
            const typedPass = window.prompt("Enter admin password")
            if (typedPass === (import.meta.env.VITE_ADMIN_PASSWORD ?? "unsecret")) {
                setAuth(true)
            }
        }
    })

    if (!auth) return <></>
    return (
        <div style={{display: "flex", flexDirection: "column", gap:"2rem", padding: "1rem"}}>
            <h1>Admin</h1>
            <ResumeUpload />
            <ProjectsPanel />
        </div>
    )
}

function ResumeUpload() {

    function postResume(formData: FormData) {
        return fetch(`${import.meta.env.VITE_BASE_URL ?? ""}/file`, {
            method: "POST",
            body: formData
        })
    }

    const { mutate, status } = useMutation(postResume)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        mutate(new FormData(e.target as HTMLFormElement))
    }

    return (
        <section>
            <h2>Resume</h2>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column", alignItems: "flex-start"}}>
                {/* <input type="hidden" name="auth" value="true" /> */}
                <label>
                    Resume: <input type="file" name="resume-file" accept=".pdf" formEncType="multipart/form-data" />
                </label>
                <AccentButton variant="outline" type="submit" text="Update" />
            </form>
            <span>{status}</span>
        </section>
    )
}

function ProjectsPanel() {
    const {data, isLoading, isError} = useQuery(['projects'], () => {
        return fetch(`${import.meta.env.VITE_BASE_URL ?? ""}/data/projects`)
        .then(res => res.json())
    })

    if (isError) {
        return <div>Error</div>
    }

    const projects: ProjectCard[] = isLoading ? [] : data.projects

    return (
        <section>
            <h2>Projects Panel</h2>
            <ul>
                {projects.map(project => (
                    <li key={JSON.stringify(project)}>
                        <label>
                            {project.title}
                            <input type="checkbox" defaultChecked={!project.disabled} name="" id="" />
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Admin
