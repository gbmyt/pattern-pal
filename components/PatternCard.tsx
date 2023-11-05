"use client"

import { useGridContext } from "@/context/GridContext"
import { Pattern } from "@prisma/client"

const PatternCard = ({ p }: { p: Pattern }) => {
    const { setCurrentPattern } = useGridContext()

    const handleClick = async (e: React.MouseEvent) => {
        setCurrentPattern(p)
    }
    return (
        <div>
            <button onClick={handleClick}>{p.title}</button>
        </div>
    )
}
export default PatternCard
