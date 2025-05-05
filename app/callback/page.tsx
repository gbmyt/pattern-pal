"use client"
import { APP_REDIRECT_PATH } from "@/const/app.const"
import { Typography } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const API_CALLBACK_PATH = "/api/callback"

const Page = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get("code")

    useEffect(() => {
        // Pass code from query params to OAuth provider to authenticate
        // Then redirect user to the protected path that triggered login
        if (code) {
            fetch(API_CALLBACK_PATH, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
                .then((res) => res.json())
                .then((data) => {
                    // handle login success or redirect
                    window.location.pathname = APP_REDIRECT_PATH
                })
                .catch((err) => {
                    console.error("Error fetching Token", err)
                })
        }
    }, [code])

    return <></>
}
export default Page
