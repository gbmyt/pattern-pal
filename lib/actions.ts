"use server"

import { revalidatePath } from "next/cache"
import db from "./db"

export async function createPatternServerAction(
    pixels: FormData,
    formData: FormData
) {
    const title = formData.get("title") as string
    const width = formData.get("gridWidth")
    const height = formData.get("gridHeight")

    try {
        await db.pattern.create({
            data: {
                title,
                gridWidth: Number(width),
                gridHeight: Number(height),
                pixels: pixels as unknown as string,
            },
        })
    } catch (e) {
        console.log("There was an error in create pattern server action", e)
    }
    revalidatePath("/pattern")
}
