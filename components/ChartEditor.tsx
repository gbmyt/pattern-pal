import { auth } from "@clerk/nextjs"
import EditorForm from "./EditorForm"
import Grid from "./Grid"
import RecentChartsList from "./RecentChartsList"
import { Suspense } from "react"

async function ChartEditor() {
    const { userId } = await auth()

    return (
        <>
            <EditorForm authorized={userId ? true : false} />
            <Suspense fallback={<h2>Loading...</h2>}>
                <Grid />
            </Suspense>
            <Suspense fallback={<h2>Loading...</h2>}>
                <RecentChartsList />
            </Suspense>
        </>
    )
}
export default ChartEditor
