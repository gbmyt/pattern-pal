import ContextProvider from "@/context/GridContext"
import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"
import PatternList from "@/components/PatternList"

export const dynamic = "force-dynamic"

async function Page() {
    return (
        <ContextProvider>
            <h1 className="font-semibold">Create a New Pattern</h1>
            <PatternForm />
            <Grid />
            <PatternList />
        </ContextProvider>
    )
}

export default Page
