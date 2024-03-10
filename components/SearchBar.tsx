"use client"
import { useGridContext } from "@/context/GridContext"

// Implementation TODO
const SearchBar = () => {
    const { editorFillMode } = useGridContext()
    if (editorFillMode === "Symbol") {
        return (
            <div className="flex justify-center m-4 border-2 border-gray-200 rounded-md max-w-fit mx-auto px-8 py-2">
                <h3>Symbols Search Bar</h3>
            </div>
        )
    }
}

export default SearchBar
