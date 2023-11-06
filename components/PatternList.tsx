import { getUserByClerkId } from "@/lib/auth"
import PatternCard from "./PatternCard"
import db from "@/lib/db"

async function fetchData() {
    const user = await getUserByClerkId()

    const data = await db.pattern.findMany({
        where: {
            userId: user.id,
        },
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
        <div className="mt-10">
            <h1 className="font-semibold mb-2 text-center md:text-left">
                Patterns
            </h1>
            <div className="md:h-60 flex flex-col justify-center items-center md:flex-row md:overflow-scroll md:flex-nowrap md:justify-start">
                {allPatterns &&
                    allPatterns.map((p, i) => <PatternCard p={p} key={i} />)}
            </div>
        </div>
    )
}
export default PatternList
