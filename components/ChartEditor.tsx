import { auth } from "@clerk/nextjs"
import { Suspense } from "react"

// Components
import EditorForm from "./EditorForm"
import Grid from "./Grid"
import RecentChartsList from "./RecentChartsList"
import SearchBar from "./SearchBar"

async function ChartEditor() {
    const { userId } = await auth()

    return (
        <>
            <EditorForm authorized={userId ? true : false} />

            <Suspense fallback={<h2>Loading...</h2>}>
                <SearchBar />
                <Grid />
            </Suspense>

            <Suspense fallback={<h2>Loading...</h2>}>
                <RecentChartsList />
            </Suspense>
        </>
    )
}
export default ChartEditor
