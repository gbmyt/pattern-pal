import { auth } from "@clerk/nextjs/server"
import db from "../db/db"

export const getUserByClerkId = async () => {
    const { userId } = await auth()

    if (userId) {
        const user = await db.user.findUniqueOrThrow({
            where: {
                clerkId: userId,
            },
        })

        return user
    }
}
