// @vitest-environment jsdom

import { render, screen } from "@/test/utils"
import { createMocks } from "node-mocks-http"
import PatternList from "@/components/PatternList"

import db from "@/lib/__mocks__/db"
import mockPatterns from "../__mocks__/patterns"
import createNewPattern from "@/pages/api/pattern"

vi.mock("@/lib/db")

describe("Pattern List", function () {
    it("should render a list of Patterns from the database", async function () {
        expect.hasAssertions()
        expect.assertions(3)

        var setCurrentPattern = vitest.fn()

        render(
            <PatternList
                allPatterns={mockPatterns}
                setCurrentPattern={setCurrentPattern}
            />
        )

        const list = await screen.findByText("Pattern List")
        const firstPattern = await screen.findByText(mockPatterns[0].title)
        const secondPattern = await screen.findByText(mockPatterns[1].title)

        expect(list).toBeInTheDocument()
        expect(firstPattern).toBeInTheDocument()
        expect(secondPattern).toBeInTheDocument()
    })

    it.only("should render new pattern in PatternList UI after saving to the database", async function () {
        expect.hasAssertions()
        expect.assertions(6)

        const newP: {
            id: string
            createdAt: Date
            title: string
            gridHeight: number
            gridWidth: number
            pixels: string
        } = {
            id: "4",
            createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
            title: "New One",
            gridHeight: 3,
            gridWidth: 3,
            pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
        }

        // Mock the Next Req/Res objects
        const { req, res } = createMocks({
            method: "POST",
            body: newP,
        })

        // Tell test what to expect to get back from the fake DB call
        db.pattern.create.mockResolvedValue({
            id: "4",
            createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
            title: "New One",
            gridHeight: 3,
            gridWidth: 3,
            pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
        })
        const p = await createNewPattern(req, res)

        expect(res._getJSONData().statusCode).toBe(201)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData().payload).toStrictEqual(newP)

        // check the rendered PatternList updated to reflect the new pattern's title
        // todo: Render updated list automatically after db save
        var setCurrentPattern = vitest.fn()
        var { user } = await render(
            <PatternList
                allPatterns={mockPatterns}
                setCurrentPattern={setCurrentPattern}
            />
        )

        const list = await screen.findByText("Pattern List")
        const firstPattern = await screen.findByText(mockPatterns[0].title)
        const secondPattern = await screen.findByText(mockPatterns[1].title)

        expect(list).toBeInTheDocument()
        expect(firstPattern).toBeInTheDocument()
        expect(secondPattern).toBeInTheDocument()
        // TODO: Re-render PatternList after db save, and check the updated list shows the new pattern title
    })

    it.todo(
        "should render the Pattern in the PatternMaker on click to the title in list",
        function () {
            expect.hasAssertions()
            // render the PatternList
            // click on a title
            // expect the clicked pattern to render in Grid UI
        }
    )
})
