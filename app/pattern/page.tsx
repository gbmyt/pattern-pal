import ContextProvider from "@/context/GridContext"
import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"
import PatternList from "@/components/PatternList"
import PatternDetail from "@/components/PatternDetail"

export const dynamic = "force-dynamic"

function Page() {
    return (
        <ContextProvider>
            <h1 className="font-semibold">Create a New Pattern</h1>
            <PatternForm />
            <Grid />
            <PatternDetail />
            <PatternList />
        </ContextProvider>
    )
}

export default Page
