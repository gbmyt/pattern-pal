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
            <div className="mx-16">
                <div className="flex justify-center items-center">
                    <div className={`max-w-1/2 w-fit overflow-scroll`}>
                        <Carousel title="Recently Viewed">
                            {chartsFromDatabase.map((p, i) => (
                                <Card p={p} key={i} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        )
    }
}
export default RecentChartsList
