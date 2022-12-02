import {useEffect} from 'react'

function useAppearOnIntersection(elements: React.RefObject<HTMLElement>[]) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        })
    }, {threshold: 0})

    useEffect(() => {
        elements.forEach(element => {
        if (element != null && element.current != null) {
            element.current.classList.toggle('intersect-show', true)
            observer.observe(element.current)
        }
        })
    }, [elements])

    return () => observer.disconnect()
}

export default useAppearOnIntersection
