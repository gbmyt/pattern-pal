import { render as renderComponent } from "@testing-library/react"
import ContextProvider from "@/context/GridContext"
import userEvent from "@testing-library/user-event"
import { ClerkProvider } from "@clerk/nextjs"
import { AppProps } from "next/app"
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

export const renderWithClerkProvider = (
    component: React.ReactElement,
    pageProps?: AppProps
) => {
    var result = render(
        <ClerkProvider {...pageProps}>{component}</ClerkProvider>
    )
    return result
}
