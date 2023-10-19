"use client"
import { Pattern } from "@/types/pattern"
import { SetStateAction } from "react"

function PatternList({
    allPatterns,
    setCurrentPattern,
}: {
    allPatterns: Pattern[]
    setCurrentPattern: React.Dispatch<SetStateAction<Pattern | null>>
}) {
    return (
        <div className="inline-block">
            <h1 className="font-bold">Pattern List</h1>

            {allPatterns &&
                allPatterns.map((p, i) => (
                    <div onClick={() => setCurrentPattern(p)} key={i}>
                        {p.title}
                    </div>
                ))}
        </div>
    )
}
export default PatternList
