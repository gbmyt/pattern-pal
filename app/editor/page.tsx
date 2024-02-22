import { auth } from "@clerk/nextjs"
import ContextProvider from "@/context/GridContext"

import EditorForm from "@/components/EditorForm"
import Grid from "@/components/Grid"
import RecentChartsList from "@/components/RecentChartsList"

export const dynamic = "force-dynamic"
async function Page() {
    const { userId } = await auth()

    return (
        <ContextProvider>
            <EditorForm authorized={userId ? true : false} />
            <Grid />
            {userId && <RecentChartsList />}
        </ContextProvider>
    )
}

export default Page
