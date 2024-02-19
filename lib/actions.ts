"use server"

import { revalidatePath } from "next/cache"
import db from "./db"
import { currentUser } from "@clerk/nextjs"
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
        redirect("/pattern")
    }
}

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
            await db.pattern.create({
                data: {
                    title,
                    gridWidth: Number(width) || DEFAULTGRIDHEIGHT,
                    gridHeight: Number(height) || DEFAULTGRIDWIDTH,
                    pixels: pixels as unknown as string,
                    userId: user.id,
                },
            })
        } catch (e) {
            console.log("There was an error in create pattern server action", e)
        } finally {
            revalidatePath("/pattern")
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
            await db.pattern.upsert({
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
            revalidatePath("/pattern")
        }
    }
}

export async function deletePixelGridServerAction(id: string) {
    const user = await getUserByClerkId()

    if (user) {
        try {
            await db.pattern.delete({
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
            revalidatePath("/pattern")
        }
    }
}
