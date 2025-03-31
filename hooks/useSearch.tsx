"use client"
import { useEffect, useState } from "react"

export function useSearch() {
    const [searchOpen, setOpen] = useState(false);
    const [searchText, setText] = useState("");

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (
                !searchOpen &&
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault()
                setOpen(!searchOpen);
            }
        }
        
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, []);

    return {
        searchOpen,
        setOpen,
        searchText,
        setText
    }
}
