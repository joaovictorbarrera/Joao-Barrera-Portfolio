import { useMutation } from "@tanstack/react-query"
import AccentButton from "../../../components/AccentButton"
import { BASE_URL } from "../../../utils/BASE_URL"

export function ResumeUpload() {
    function postResume(formData: FormData) {
        return fetch(`${BASE_URL}/file`, {
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
                    Resume: <input type="file" name="resume-file"
                    accept=".pdf" formEncType="multipart/form-data" required />
                </label>
                <AccentButton variant="outline" type="submit" text="Update" />
            </form>
            <span>{status === "idle" ? "" : status}</span>
        </section>
    )
}
