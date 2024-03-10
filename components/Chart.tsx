import EditorForm from "./EditorForm"
import Grid from "./Grid"
import SearchBar from "./SearchBar"
import { Suspense } from "react"

const Chart = ({ userId }: { userId: string | null }) => {
    return (
        <div>
            <EditorForm authorized={userId ? true : false} />

            <Suspense fallback={<h2>Loading...</h2>}>
                <SearchBar />
                <Grid />
            </Suspense>
        </div>
    )
}
export default Chart
