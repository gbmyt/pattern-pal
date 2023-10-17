import { Pattern } from "@/types/pattern"

type FetcherOptions = {
    url: string
    method: string
    body?: object
    json?: boolean
}

export const fetcher = async ({ url, method, body, json }: FetcherOptions) => {
    console.log("Fetcher body", body)

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

// UTILITY FUNCTIONS

// Patterns
export const createNewPattern = (pattern: Pattern) => {
    // console.log("Create New Pattern (api.ts)", pattern)

    return fetcher({
        url: "/api/pattern",
        method: "post",
        body: pattern,
        json: true,
    })
}
