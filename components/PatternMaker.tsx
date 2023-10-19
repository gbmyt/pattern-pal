"use client"
import ContextProvider from "@/context/GridContext"
import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"
import { Pattern } from "@/types/pattern"

// TODO: Make the PatternForm collapse by default.
// Clicking a button to edit the Pattern opens the form
function Pattern({ pattern }: { pattern: Pattern | null }) {
    return (
        <ContextProvider>
            <h1 className="font-semibold">Create a New Pattern</h1>
            <PatternForm />
            <Grid pattern={pattern} />
        </ContextProvider>
    )
}

export default Pattern
