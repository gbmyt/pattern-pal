import PatternCard from "./PatternCard"
import db from "@/lib/db"

async function fetchData() {
    const data = await db.pattern.findMany({
        orderBy: [
            {
                createdAt: "desc",
            },
        ],
    })
    return data
}

async function PatternList() {
    var allPatterns = await fetchData()

    return (
        <div className="inline-block">
            <h1 className="font-bold">Patterns</h1>
            {allPatterns &&
                allPatterns.map((p, i) => <PatternCard p={p} key={i} />)}
        </div>
    )
}
export default PatternList
