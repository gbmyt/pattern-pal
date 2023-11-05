import { Pattern } from "@/types/pattern"

type FetcherOptions = {
    url: string
    method: string
    body?: object
    json?: boolean
}

// Utils

export const fetcher = async ({ url, method, body, json }: FetcherOptions) => {
    const res = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        throw new Error("API error")
    }

    if (json) {
        const data = await res.json()
        return { data }
    }
}

const createURL = (path: string) => {
    return window.location.origin + path
}

// Patterns
export const createNewPattern = (pattern: Pattern) => {
    return fetcher({
        url: createURL("/api/pattern"),
        method: "post",
        body: pattern,
        json: true,
    })
}
