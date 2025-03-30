import React from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Typography } from "@mui/material"

export default function ProjectDetail() {
    return (
        <>
            <Typography>Project Detail</Typography>
            <SignedIn>
                <h1>Signed in</h1>
            </SignedIn>
            <SignedOut>
                <h1>Signed out</h1>
            </SignedOut>
        </>
    )
}
