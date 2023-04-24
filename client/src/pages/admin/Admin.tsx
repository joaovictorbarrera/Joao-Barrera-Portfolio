import { useState, useEffect } from "react"
import { ResumeUpload } from "./components/ResumeUpload"
import { ProjectsPanel } from "./components/ProjectsPanel"

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

export default Admin
