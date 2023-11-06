import { auth } from "@clerk/nextjs"
import db from "./db"

export const getUserByClerkId = async () => {
    console.log("in get user by clerk id")
    const { userId } = await auth()

    console.log("GOT USER ID", userId)
    const user = await db.user.findUniqueOrThrow({
        where: {
            clerkId: userId,
        },
    })
    console.log("GOT DB USER", user)

    return user
}
