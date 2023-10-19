import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function createNewPattern(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const pattern = await db.pattern.create({
            data: {
                title: req.body.title,
                gridWidth: req.body.gridWidth,
                gridHeight: req.body.gridHeight,
                pixels: req.body.pixels,
            },
        })
        return res.json(pattern)
    } catch (err) {
        return res.json({ error: "Failed to create pattern", status: 500 })
    }
}
