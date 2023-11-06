import ContextProvider from "@/context/GridContext"
import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"
import PatternList from "@/components/PatternList"
import PatternDetail from "@/components/PatternDetail"

export const dynamic = "force-dynamic"
function Page() {
    return (
        <ContextProvider>
            <PatternForm />
            <PatternDetail />
            <Grid />
            <PatternList />
        </ContextProvider>
    )
}

export default Page
