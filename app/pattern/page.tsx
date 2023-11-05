import ContextProvider from "@/context/GridContext"
import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"
import PatternList from "@/components/PatternList"
import PatternDetail from "@/components/PatternDetail"

export const dynamic = "force-dynamic"

// TODO: Make the PatternForm collapse by default.
// Clicking a button to edit the Pattern opens the form
function Page() {
    return (
        <ContextProvider>
            <h1 className="font-semibold">Create a New Pattern</h1>
            <PatternForm />
            <PatternDetail />
            <Grid />
            <PatternList />
        </ContextProvider>
    )
}

export default Page
