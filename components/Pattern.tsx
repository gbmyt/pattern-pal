"use client"
import { useState } from "react"
import ContextProvider from "@/context/GridContext"

import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"

import { Pattern } from "@/types/pattern"

function Pattern() {
    const [pattern, setPattern] = useState<Pattern>({
        title: "",
        gridHeight: 25,
        gridWidth: 25,
    })

    return (
        <ContextProvider>
            <h1 className="font-semibold">Create a New Pattern</h1>
            <PatternForm pattern={pattern} setPattern={setPattern} />
            <Grid height={pattern.gridHeight} width={pattern.gridWidth} />
        </ContextProvider>
    )
}

export default Pattern
