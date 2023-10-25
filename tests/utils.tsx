import { render as renderComponent } from "@testing-library/react"
import ContextProvider from "@/context/GridContext"
import userEvent from "@testing-library/user-event"
export * from "@testing-library/react"

type RenderOptions = Parameters<typeof renderComponent>[1]

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
    return {
        ...renderComponent(ui, options),
        user: userEvent.setup(),
    }
}

export const renderWithProvider = (component: React.ReactElement) => {
    var result = render(<ContextProvider>{component}</ContextProvider>)
    return result
}
