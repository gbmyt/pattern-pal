import ContextProvider from "@/context/GridContext"
import PatternForm from "@/components/PatternForm"
import Grid from "@/components/Grid"
import PatternList from "@/components/PatternList"
import PatternDetail from "@/components/PatternDetail"
import { auth } from "@clerk/nextjs"

export const dynamic = "force-dynamic"
async function Page() {
    const { userId } = await auth()

    return (
        <ContextProvider>
            <PatternForm authorized={userId ? true : false} />
            <PatternDetail authorized={userId ? true : false} />
            <Grid />
            {userId && <PatternList />}
        </ContextProvider>
    )
}

export default Page
