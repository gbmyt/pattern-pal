import { auth } from "@clerk/nextjs"
import { Suspense } from "react"

// Components
import Chart from "./Chart"
import RecentChartsList from "./RecentChartsList"

async function ChartEditor() {
    const { userId } = await auth()

    return (
        <>
            <Chart userId={userId} />

            <Suspense fallback={<h2>Loading...</h2>}>
                <RecentChartsList />
            </Suspense>
        </>
    )
}
export default ChartEditor
