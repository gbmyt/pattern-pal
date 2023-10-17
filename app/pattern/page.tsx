import Pattern from "@/components/Pattern"
import PatternList from "@/components/PatternList"
import { db } from "@/lib/db"

async function Page() {
    // async function fetchData() {
    //     const res = await db.pattern.findMany()
    //     console.log("AP", res)
    //     return res
    // }
    // var allPatterns = await fetchData()

    return (
        <>
            <Pattern />
            {/* <PatternList allPatterns={allPatterns} /> */}
        </>
    )
}

export default Page
