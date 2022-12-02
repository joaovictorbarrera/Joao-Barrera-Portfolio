export default function scrollTo(query: string) {
    window.scrollTo({
        top: document.querySelector(query)?.getBoundingClientRect().top,
        behavior: 'smooth'
    })
}
