// @vitest-environment jsdom
import { createMocks } from "node-mocks-http"

import db from "@/__mocks__/db"
import mockCharts from "../../__mocks__/charts"
// import createNewPattern from "@/ignore/api/pattern" // NO LONGER USING THIS

vi.mock("@/lib/db")

describe.todo("Server Actions", function () {
    it("createPattern should save a pattern to the database", async function () {
        expect.hasAssertions()
        expect.assertions(3)

        // grab a mock pattern
        const newP: {
            title: string
            gridHeight: number
            gridWidth: number
            pixels: string
        } = mockCharts[0]

        // Mock the Next Req/Res objects
        const { req, res } = createMocks({
            method: "POST",
            body: mockCharts[0],
        })

        // Tell test what to expect to get back from the fake DB call
        db.chart.create.mockResolvedValue({
            id: "1",
            createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
            title: "Smol Boi",
            gridHeight: 3,
            gridWidth: 3,
            pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
            userId: "1",
        })
        // REPLACE THIS
        // const p = await createNewPattern(req, res)

        expect(res._getJSONData().statusCode).toBe(201)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData().payload).toStrictEqual(newP)
    })
})
