import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

function useScrollOnRedirect(elements: React.RefObject<HTMLElement>[]) {
    // ?scrollto=about
    const { search } = useLocation()

    useLayoutEffect(() => {
        const parsedSearch = new URLSearchParams(search)
        const query = parsedSearch.get("scrollTo")
        if (query) {
            const element = elements.find(el => el?.current?.id === query)?.current

            if (element) {
                console.log("scrolled")
                const timeout = setTimeout(() => element.scrollIntoView({
                    behavior: "smooth"
                }), 150)

                return () => clearTimeout(timeout)
            }
        }
    }, [elements, search])
}

export default useScrollOnRedirect
