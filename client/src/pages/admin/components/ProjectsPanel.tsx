import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "../../../utils/BASE_URL"
import AccentButton from "../../../components/AccentButton"
import { ProjectCard } from "../../index/Projects"
import { useState } from "react"

export function ProjectsPanel() {
    return (
        <div style={{display: "flex",
        flexDirection: "column", gap: "2rem"}}>
            <h2>Projects Panel</h2>
            <AddProject />
            <Panel />
        </div>
    )
}

function AddProject() {
    const queryClient = useQueryClient()

    function postProject(formData: URLSearchParams) {
        return fetch(`${BASE_URL}/data/projects`, {
            method: "POST",
            body: formData
        })
    }

    const { mutate: mutateAddProject, status } = useMutation({
        mutationFn: postProject,
        onSuccess: () => queryClient.invalidateQueries(['projects'])
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const urlencodedform = new URLSearchParams(form as any)
        mutateAddProject(urlencodedform)
    }

    return (
        <div>
            <h4>ADD a new project:</h4>
            {status === "idle" ? "" : status}
            <form
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit}
            style={{display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                    alignItems:"flex-start"
            }}>
                <label>
                    Image URL:
                    <input type="text" name="previewImage" required />
                </label>
                <label>
                    Project Title:
                    <input type="text" name="title" required />
                </label>
                <label>
                    Short Description:
                    <input type="text" name="shortDescription" required />
                </label>
                <label>
                    Redirect/Live Link:
                    <input type="text" name="redirectLink" required />
                </label>
                <label>
                    Source Code Link:
                    <input type="text" name="sourceCodeLink" required />
                </label>
                <label>
                    Redirect Is External?
                    <input type="checkbox" name="redirectIsExternal" />
                </label>
                <label>
                    Disabled?
                    <input type="checkbox" name="disabled" />
                </label>
                <AccentButton variant="outline" type="submit" text="Add" />
            </form>
        </div>
    )
}

function Panel() {
    const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null)
    const {data, isLoading, isError} = useQuery(['projects'], () => {
        return fetch(`${BASE_URL}/data/projects`)
        .then(res => res.json())
    })

    if (isError) { return <div>Error</div> }

    const projects: ProjectCard[] = isLoading ? [] : data.projects

    function handleSelectProject(project: ProjectCard) {
        setSelectedProject(project)
    }

    return (
        <section>
            <h4>EDIT existing project:</h4>
            {selectedProject === null ?
            <ProjectList
            projects={projects}
            handleSelectProject={handleSelectProject}
            /> :
            <EditProject
            selectedProject={selectedProject}
            handleUnselect={() => setSelectedProject(null)}/>
            }
        </section>
    )
}

interface ProjectListProps {
    handleSelectProject: (project: ProjectCard) => void,
    projects: ProjectCard[]
}

function ProjectList({handleSelectProject, projects}: ProjectListProps) {
    const projectListStyle = {
        backgroundColor: "grey", padding: ".5rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyItems: "stretch",
        gap: ".5rem",
        maxWidth: "800px"
    }

    const projectListItemStyle = {
        backgroundColor: "black",
        textAlign: "center" as CanvasTextAlign
    }

    return (
        <>
        <p>Select one to Edit:</p>
        <ul style={projectListStyle}>
            {projects.map(project => (
                <li
                key={project.uuid}
                style={projectListItemStyle}
                >
                    <button
                    style={{width: "100%"}}
                    onClick={() => handleSelectProject(project)}>
                        {project.title}
                    </button>
                </li>
            ))}
        </ul>
        </>
    )
}

interface EditProjectsProps {
    selectedProject: ProjectCard,
    handleUnselect: () => void
}

function EditProject({selectedProject, handleUnselect}: EditProjectsProps) {
    const queryClient = useQueryClient()

    function deleteProject(uuid: string) {
        const params = new URLSearchParams()
        params.set("uuid", uuid)
        return fetch(`${BASE_URL}/data/projects?`+ params, {
            method: "DELETE"
        })
    }

    const { mutate: mutateDeleteProject, status } = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
            handleUnselect()
        },
        onError: () => {
            window.alert("Error on delete")
        }
    })

    function handleDeleteProject() {
        if (window.confirm("Delete this project?")) {
            mutateDeleteProject(selectedProject.uuid)
        }
    }

    return (
    <div>
        <p>you have selected: {selectedProject.title}</p>
        <p>uuid: {selectedProject.uuid}</p>
        <EditingForm handleUnselect={handleUnselect} project={selectedProject}/>
        <AccentButton style={{borderColor: "red", color: "red"}}
        onClick={handleDeleteProject} variant="outline" text="Delete" />
        <AccentButton onClick={handleUnselect} text="Unselect" />
    </div>
    )
}

interface EditingFormProps {
    project: ProjectCard,
    handleUnselect: () => void
}

function EditingForm({project, handleUnselect}: EditingFormProps) {
    const queryClient = useQueryClient()

    function putProject(formData: URLSearchParams) {
        return fetch(`${BASE_URL}/data/projects`, {
            method: "PUT",
            body: formData
        })
    }

    const { mutate: mutatePutProject, status } = useMutation({
        mutationFn: putProject,
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
            handleUnselect()
        }
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const urlencodedform = new URLSearchParams(form as any)
        urlencodedform.set("uuid", project.uuid)
        mutatePutProject(urlencodedform)
    }

    return (
        <form
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit}
        style={{display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                alignItems:"flex-start"
        }}>
            <label>
                Image URL:
                <input defaultValue={project.previewImage} type="text" name="previewImage" required />
            </label>
            <label>
                Project Title:
                <input defaultValue={project.title} type="text" name="title" required />
            </label>
            <label>
                Short Description:
                <input defaultValue={project.shortDescription} type="text" name="shortDescription" required />
            </label>
            <label>
                Redirect/Live Link:
                <input defaultValue={project.redirectLink} type="text" name="redirectLink" required />
            </label>
            <label>
                Source Code Link:
                <input defaultValue={project.sourceCodeLink} type="text" name="sourceCodeLink" required />
            </label>
            <label>
                Redirect Is External?
                <input defaultChecked={project.redirectIsExternal} type="checkbox" name="redirectIsExternal" />
            </label>
            <label>
                Disabled?
                <input defaultChecked={project.disabled} type="checkbox" name="disabled" />
            </label>
            <AccentButton variant="outline" type="submit" text="Update" />
        </form>
    )
}
