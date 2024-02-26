// @vitest-environment jsdom
import EditorForm from "@/components/EditorForm"
import {
    render,
    renderWithClerkProvider,
    renderWithProvider,
    screen,
} from "./utils"
import ChartEditor from "@/components/ChartEditor"

import "@clerk/nextjs"
import ContextProvider from "@/context/GridContext"

vi.mock("@clerk/nextjs")

describe("Chart Editor", function () {
    beforeAll(() => {
        vi.mock("clerk auth", async () => {
            const res = await vi.importActual("@clerk/nextjs")
            return { res, auth: vi.fn() }
        })
    })

    it("works", async function () {
        expect.hasAssertions()

        var { user } = await renderWithProvider(
            <EditorForm /> // check for guest user too TODO
        )
        const editBtn = screen.getByRole("button", { name: "Edit ✎" })

        // Confirm state was updated to match user-input w/h values
        expect(editBtn).toBeInTheDocument()
    })

    it("Renders the ChartEditor ", async function () {
        // expect.hasAssertions()
        const isSignedIn = new Promise((resolve) => resolve(true))

        var { user } = await renderWithClerkProvider(
            <ContextProvider>
                <ChartEditor />
            </ContextProvider>
        )
        screen.debug()

        // const btn = await screen.getByRole("button", { name: "Hellowerld" })
        // expect(btn).toBeInTheDocument()
    })
})
