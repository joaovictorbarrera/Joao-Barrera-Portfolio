import React, {useState} from 'react'
import AccentButton from '../../components/AccentButton'
import {HiOutlineCheckCircle, HiXCircle} from "react-icons/hi"

type status = "unset" | "successful" | "error"
function Contact(props: {}, ref: any) {
    const [contactStatus, setContactStatus] = useState<status>("unset");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const statusMessage = {
        "unset": null,
        "successful": <span className='statusMessage success'>Sent Successfully <HiOutlineCheckCircle /></span>,
        "error": <span className='statusMessage error'>Error: {errorMessage} <HiXCircle /></span>
    }[contactStatus]

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setContactStatus("unset")

        const form = e.target as HTMLFormElement

        const URL = import.meta.env.PROD ? "/contact" : "http://localhost:5000/contact"

        fetch(URL, {
            method: "POST",
            body: new FormData(form)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") setContactStatus("successful")
            else {
                setErrorMessage(data.error)
                setContactStatus("error")
            }
        })
        .catch(console.log)
    }

    return (
        <section ref={ref} id="contact" className='contact'>
            <form method='POST' onSubmit={handleSubmit}>
                <h2>Connect with me</h2>
                <fieldset>
                    <label>
                        First Name:
                        <input name="firstName" type="text" required />
                    </label>

                    <label>
                        Last Name:
                        <input name="lastName" type="text" required />
                    </label>
                </fieldset>

                <fieldset>
                    <label>
                        Email Address:
                        <input name="email"  type="email" required />
                    </label>
                </fieldset>

                <fieldset style={{flexDirection: "column"}}>
                    <label>
                        Subject:
                        <input name="subject" type="text" required />
                    </label>
                    <label>
                        Your Message:
                        <textarea name="message" required />
                    </label>
                </fieldset>

                <AccentButton text="Submit" type="submit"/>
                {statusMessage}
            </form>
        </section>
    )
}

export default React.forwardRef(Contact)
