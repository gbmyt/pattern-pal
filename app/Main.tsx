import { auth } from "@clerk/nextjs"

const Main = async () => {
    const { userId } = await auth()
    return (
        <div className="flex h-max flex-col items-center justify-between pr-24 py-24">
            Feed
        </div>
    )
}

export default Main
