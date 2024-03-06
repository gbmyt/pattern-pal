// @vitest-environment jsdom

import Carousel from "@/components/Carousel"
import { render, renderWithProvider, screen } from "./utils"
import mockCharts from "@/__mocks__/charts"
import Card from "@/components/Card"

describe("Carousel", function () {
    it.todo("should render a list of Cards", async function () {
        expect.hasAssertions()
        const cardElems =
            mockCharts && mockCharts.map((p, i) => <Card p={p} key={i} />)

        // figure out why this wont render
        var { user } = await renderWithProvider(
            <Carousel>cardElems[0]</Carousel>
        )

        const titleElem = screen.getByRole("h1")
        expect(titleElem).toBeInTheDocument()
        expect(titleElem).toHaveTextContent("Recent")

        const title = screen.getByText("Recent")
        expect(title).toBeInTheDocument()
    })
})
