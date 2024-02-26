// @vitest-environment jsdom
import EditorForm from "@/components/EditorForm"
import { render, renderWithProvider, screen } from "./utils"

import Grid from "@/components/Grid"

const defaultPattern = {
    title: "",
    gridHeight: 5,
    gridWidth: 5,
    pixels: JSON.stringify(new Array(3).fill(new Array(3).fill(null))),
}

describe.only("Editor Grid", function () {
    it.todo(
        "Grid height should be divisible by its width OR its width should be divisible by its height",
        function () {
            expect.hasAssertions()
            // Get grid height and width (from state or UI?) and check if it's cleanly divisible
            // expect().toBe();
        }
    )

    it.todo(
        "Grid component height should match the pattern state's 'gridHeight' property.",
        async function () {
            expect.hasAssertions()

            render(<Grid />)
        }
    )

    it.todo(
        "Grid width should correspond to the pattern width state variable (input by the user or default) ",
        function () {
            expect.hasAssertions()

            // Get the grid height and width
            // Get height/width from state
            // Compare them to confirm same
            // expect().toBe();
        }
    )

    it("User can set a custom grid size ", async function () {
        expect.hasAssertions()

        // Render the Editor Form
        var { user } = await renderWithProvider(
            <EditorForm authorized={true} /> // check for guest user too TODO
        )

        // Click on the Edit Button to expand Menu Controls
        const editBtn = screen.getByRole("button", { name: "Edit ✎" })
        await user.click(editBtn)

        // Confirm a user can type in a number in the width/height form fields
        const heightInput = screen.getByRole("spinbutton", {
            name: "gridHeight",
        })
        const widthInput = screen.getByRole("spinbutton", {
            name: "gridWidth",
        })

        await user.clear(heightInput)
        await user.type(heightInput, "3")
        await user.clear(widthInput)
        await user.type(widthInput, "3")

        // Confirm state was updated to match user-input w/h values
        expect(heightInput).toHaveValue(3)
        expect(widthInput).toHaveValue(3)

        // Confirm rendered Grid updated to render the user's updated dimensions
        const gridUI = (await screen.queryByTestId("grid")) as Array

        if (gridUI) {
            const gridHeightFromStyle =
                gridUI[Object.keys(gridUI)[0]].child.pendingProps.style
                    .gridTemplateColumns

            const height = parseInt(
                Array.from(gridHeightFromStyle)
                    .slice(7, gridHeightFromStyle.split("").indexOf(","))
                    .join("")
            )

            var width
            Array.from(gridUI.children).forEach(function (element) {
                width = element.children.length / height
            })

            // Expect Rendered Grid Height & Width to match user input values
            expect(height).toBe(
                parseInt((heightInput as HTMLInputElement).value)
            )
            width &&
                expect(parseInt(width)).toBe(
                    parseInt((widthInput as HTMLInputElement).value)
                )
        }
    })
})

/**
 * Addt'l Grid Functions to Test
 * GridContext: composeGrid, renderEmptyGrid, renderGridFromPattern
 * */

describe("GridContext Utils", function () {
    it.todo("renderEmptyGrid", function () {
        expect.hasAssertions()

        // width and height should match pattern w/h or user inputs
        // if there is no predefined w/h the grid should have a height/width of 0 (null check)
        // All pixels should be empty (no fill color, 'false' fill state)
        // Renders the default grid (5x5, Empty)
        // sets the Grid state (React elements instead of fill color hex strings)

        // expect().toBe();
    })

    it.todo("renderGridFromPattern", function () {
        expect.hasAssertions()

        // width and height should match pattern w/h or user inputs
        // should reference the pattern.pixels array to render the correct pattern grid
        // Array should either have null or strings
        // Renders the grid using pattern dimensions
        // sets the Grid state (React elements instead of fill color hex strings)

        // expect().toBe();
    })

    it.todo("composeGrid", function () {
        expect.hasAssertions()

        // Should map over input array,
        // converting string hex codes to filled GridPixel components
        // and converting null spots to empty GridPixel components

        // GridPixels should store their position in the pixels array for updating their state later
        // should return a grid of React elements

        // expect().toBe();
    })
})
