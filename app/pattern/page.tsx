import PatternDetail from "@/components/PatternDetail"
import db from "@/lib/db"

export const revalidate = 1
async function Page() {
    async function fetchData() {
        const res = await db.pattern.findMany()
        return res
    }
    var allPatterns = await fetchData()

    return <PatternDetail allPatterns={allPatterns} />
}

export default Page
