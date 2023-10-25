// @vitest-environment jsdom
import { createMocks } from "node-mocks-http"

import db from "@/lib/__mocks__/db"
import mockPatterns from "../__mocks__/patterns"
import createNewPattern from "@/pages/api/pattern"

vi.mock("@/lib/db")

describe("Pattern API", function () {
    it.only("createPattern should save a pattern to the database", async function () {
        expect.hasAssertions()
        expect.assertions(3)

        // grab a mock pattern
        const newP: {
            title: string
            gridHeight: number
            gridWidth: number
            pixels: string
        } = mockPatterns[0]

        // Mock the Next Req/Res objects
        const { req, res } = createMocks({
            method: "POST",
            body: mockPatterns[0],
        })

        // Tell test what to expect to get back from the fake DB call
        db.pattern.create.mockResolvedValue({
            id: "1",
            createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
            title: "Smol Boi",
            gridHeight: 3,
            gridWidth: 3,
            pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
        })
        const p = await createNewPattern(req, res)

        expect(res._getJSONData().statusCode).toBe(201)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData().payload).toStrictEqual(newP)
    })
})

describe.todo("Fetcher", function () {
    it("TODO", function () {
        expect.hasAssertions()
        // expect().toBe();
    })
})
