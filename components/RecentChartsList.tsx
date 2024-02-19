import { getUserByClerkId } from "@/lib/auth"
import Card from "./Card"
import db from "@/lib/db"

async function fetchData() {
    const user = await getUserByClerkId()

    const data = await db.chart.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: [
            {
                createdAt: "desc",
            },
        ],
    })
    return data
}

async function RecentChartsList() {
    var allPatterns = await fetchData()

    return (
        <div className="mt-10">
            <h1 className="font-semibold mb-2 text-center md:text-left">
                Recent
            </h1>
            <div className="md:h-60 flex flex-col justify-center items-center md:flex-row md:overflow-scroll md:flex-nowrap md:justify-start">
                {allPatterns &&
                    allPatterns.map((p, i) => <Card p={p} key={i} />)}
            </div>
        </div>
    )
}
export default RecentChartsList
