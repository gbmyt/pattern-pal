import React from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Typography } from "@mui/material"

export default function Stash() {
    return (
        <>
            <Typography>Stash</Typography>
            <SignedIn>
                <h1>Signed in</h1>
            </SignedIn>
            <SignedOut>
                <h1>Signed out</h1>
            </SignedOut>
        </>
    )
}
