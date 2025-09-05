"use server"
import { revalidatePath } from "next/cache"
import db from "../db/db"
import { currentUser } from "@clerk/nextjs/server"
import { getUserByClerkId } from "./auth"
import { DEFAULTGRIDHEIGHT, DEFAULTGRIDWIDTH } from "@/lib/globals"
import { model } from '@/lib/ai';
import { generateText } from 'ai';

// AI Actions 
export async function getAIResponse(prompt: string) {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
}

// User Actions 
export const createNewUser = async (path: string | undefined = undefined) => {
    console.log('creating user')
    // Get the clerk user
    const user = await currentUser()

    if (!user) {
        return null;
    }

    // check if the user exists in our db already
    const dbUser = await db.user.findUnique({
        where: {
            clerkId: user.id,
        },
    })
    if (dbUser) {
        return dbUser;
    }

    try {
        // Create one if not
        const response = await db.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
            },
        })
        return response;
    } catch (e) {
        console.log("---- ERROR CREATING USER", e)
    }
    return null;
}

const deleteUser = async () => {
    const user = await currentUser()

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
            }
        } catch (e) {
            console.log("THERE WAS A PROBLEM DELETING YOUR ACCOUNT", e)
        }
    } catch (e) {
        // error handling
        console.log("Couldn't find your account. Please try again", e)
    } finally {
        // clean up, maybe re-route them to the home page or sign up page
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
