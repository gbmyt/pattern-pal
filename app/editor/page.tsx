import ChartEditor from "@/components/ChartEditor"
import ContextProvider from "@/context/GridContext"

export const dynamic = "force-dynamic"
async function Page() {
    return (
        <ContextProvider>
            <ChartEditor />
        </ContextProvider>
    )
}

export default Page
