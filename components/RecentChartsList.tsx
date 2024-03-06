import { getUserByClerkId } from "@/lib/auth"
import Card from "./Card"
import db from "@/lib/db"
import Carousel from "./Carousel"

async function fetchData() {
    const user = await getUserByClerkId()

    if (user) {
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
    } else if (!user) {
        return null
    }
}

async function RecentChartsList() {
    var chartsFromDatabase = await fetchData()

    if (chartsFromDatabase) {
        return (
            <div className="ml-32 my-8">
                <Carousel>
                    {chartsFromDatabase.map((p, i) => (
                        <Card p={p} key={i} />
                    ))}
                </Carousel>
            </div>
        )
    }
}
export default RecentChartsList
