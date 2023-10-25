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

// Patterns
export const createNewPattern = (pattern: Pattern) => {
    var urlString

    if (process.env.NODE_ENV === "test") {
        const baseURL = "http://localhost:3000"
        urlString = `${baseURL}/api/pattern`
    } else {
        urlString = `/api/pattern`
    }

    return fetcher({
        url: urlString,
        method: "post",
        body: pattern,
        json: true,
    })
}
