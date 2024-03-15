"use server"

import { revalidatePath } from "next/cache"
import db from "./db"
import { clerkClient, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { getUserByClerkId } from "./auth"
import { DEFAULTGRIDHEIGHT, DEFAULTGRIDWIDTH } from "@/lib/globals"

export const createNewUser = async (path: string | undefined = undefined) => {
    // Get the clerk user
    const user = await currentUser()

    try {
        // check if the user exists in our db already
        const match = await db.user.findUnique({
            where: {
                clerkId: user?.id as string,
            },
        })

        try {
            // Create one if not
            if (user && !match) {
                await db.user.create({
                    data: {
                        clerkId: user.id,
                        email: user.emailAddresses[0].emailAddress,
                    },
                })
            }
        } catch (e) {
            console.log("CREATE USER ERROR", e)
        }
    } catch (e) {
        console.log("CREATE USER MATCH CLERK ID ERROR", e)
    } finally {
        redirect("/editor")
    }
}

export const deleteUser = async () => {
    const user = await currentUser()

    if (user) {
        try {
            // to find and delete the user from our database, AND all of their charts.
            const match = await db.user.findUnique({
                where: {
                    clerkId: user?.id as string,
                },
            })

            try {
                if (user && match) {
                    await db.user.delete({
                        where: {
                            clerkId: user?.id,
                        },
                    })
                    try {
                        await clerkClient.users.deleteUser(user.id)
                    } catch (e) {
                        console.log(
                            "there was a problem deleting clerk user\n",
                            e
                        )
                    }
                }
            } catch (e) {
                console.log("THERE WAS A PROBLEM DELETING YOUR ACCOUNT", e)
            }
        } catch (e) {
            // error handling
            console.log("Couldn't find your account. Please try again", e)
        } finally {
            revalidatePath("/")
        }
    }
}

// Chart Editor Actions
export async function createPixelGridServerAction(
    pixels: FormData,
    formData: FormData
) {
    const user = await getUserByClerkId()
    const title = formData.get("title") as string
    const width = formData.get("gridWidth")
    const height = formData.get("gridHeight")

    if (user) {
        try {
            await db.chart.create({
                data: {
                    title,
                    gridWidth: Number(width) || DEFAULTGRIDHEIGHT,
                    gridHeight: Number(height) || DEFAULTGRIDWIDTH,
                    pixels: pixels as unknown as string,
                    userId: user.id,
                },
            })
        } catch (e) {
            console.log("There was an error in create server action", e)
        } finally {
            revalidatePath("/editor")
        }
    }
}

export async function updatePixelGridServerAction(
    pixels: FormData,
    id: string,
    formData: FormData
) {
    const user = await getUserByClerkId()
    const title = formData.get("title") as string
    const width = formData.get("gridWidth")
    const height = formData.get("gridHeight")

    if (user) {
        try {
            await db.chart.upsert({
                where: {
                    id,
                    userId: user.id,
                },
                update: {
                    title,
                    gridWidth: Number(width) || DEFAULTGRIDHEIGHT,
                    gridHeight: Number(height) || DEFAULTGRIDWIDTH,
                    pixels: pixels as unknown as string,
                },
                create: {
                    title,
                    gridWidth: Number(width) || DEFAULTGRIDHEIGHT,
                    gridHeight: Number(height) || DEFAULTGRIDWIDTH,
                    pixels: pixels as unknown as string,
                    userId: user.id,
                },
            })
        } catch (e) {
            console.log("There was an error in update server action", e)
        } finally {
            revalidatePath("/editor")
        }
    }
}

export async function deletePixelGridServerAction(id: string) {
    const user = await getUserByClerkId()

    if (user) {
        try {
            await db.chart.delete({
                where: {
                    id,
                },
            })
        } catch (e) {
            console.log(
                "An error occurred while deleting your pixel grid - from delete server action",
                e
            )
        } finally {
            revalidatePath("/editor")
        }
    }
}
