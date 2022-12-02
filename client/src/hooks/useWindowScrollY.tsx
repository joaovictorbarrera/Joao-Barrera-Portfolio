import { useEffect, useState } from "react";

export default function useWindowScrollY() {
    const [scrollAmount, setScrollAmount] = useState<number>(0);

    useEffect(() => {
      function handleScroll() { setScrollAmount(window.scrollY) }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollAmount
}
