import { auth } from "@clerk/nextjs"
import EditorForm from "./EditorForm"
import Grid from "./Grid"
import RecentChartsList from "./RecentChartsList"

async function ChartEditor() {
    const { userId } = await auth()

    return (
        <>
            <EditorForm authorized={userId ? true : false} />
            <Grid />
            <RecentChartsList />
        </>
    )
}
export default ChartEditor
