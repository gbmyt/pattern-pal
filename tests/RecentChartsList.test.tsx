// @vitest-environment jsdom

import { render, screen } from "./utils"
import { createMocks } from "node-mocks-http"
import RecentChartsList from "@/components/RecentChartsList"

import db from "@/lib/__mocks__/db"
import mockCharts from "../__mocks__/charts"

vi.mock("@/lib/db")

describe("Recent Charts List", function () {
    it.todo(
        "should render a list of Charts from the database",
        async function () {
            expect.hasAssertions()
            expect.assertions(3)

            render(<RecentChartsList />)

            const list = await screen.findByText("Recent")
            const first = await screen.findByText(mockCharts[0].title)
            const second = await screen.findByText(mockCharts[1].title)

            expect(list).toBeInTheDocument()
            expect(first).toBeInTheDocument()
            expect(second).toBeInTheDocument()
        }
    )

    it.todo(
        "should render new pattern in RecentChartsList UI after saving to the database",
        async function () {
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
            db.chart.create.mockResolvedValue({
                id: "4",
                createdAt: "2023-10-25T19:46:37.781Z" as unknown as Date,
                title: "New One",
                gridHeight: 3,
                gridWidth: 3,
                pixels: '[["#0000FF",null,"#0000FF"],[null,null,null],[null,"#0000FF",null]]',
                userId: "1",
            })
            const p = await createNewPattern(req, res)

            expect(res._getJSONData().statusCode).toBe(201)
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData().payload).toStrictEqual(newP)

            // check the rendered RecentChartsList updated to reflect the new chart's title
            // todo: Render updated list automatically after db save
            var setCurrentPattern = vitest.fn()
            var { user } = await render(<RecentChartsList />)

            const list = await screen.findByText("Recent")
            const first = await screen.findByText(mockCharts[0].title)
            const second = await screen.findByText(mockCharts[1].title)

            expect(list).toBeInTheDocument()
            expect(first).toBeInTheDocument()
            expect(second).toBeInTheDocument()
            // TODO: Re-render RecentChartsList after db save, and check the updated list shows the new title
        }
    )

    it.todo(
        "should render the Chart in the Chart Editor on click to the title in list",
        function () {
            expect.hasAssertions()
            // render the PatternList
            // click on a title
            // expect the clicked pattern to render in Grid UI
        }
    )
})
