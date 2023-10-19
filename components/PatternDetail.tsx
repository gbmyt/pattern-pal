"use client"
import PatternMaker from "@/components/PatternMaker"
import PatternList from "@/components/PatternList"
import { useState } from "react"
import { Pattern } from "@/types/pattern"

function PatternDetail({ allPatterns }: { allPatterns: Pattern[] }) {
    const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null)
    return (
        <>
            <PatternMaker pattern={currentPattern} />
            <PatternList
                allPatterns={allPatterns}
                setCurrentPattern={setCurrentPattern}
            />
        </>
    )
}

export default PatternDetail
