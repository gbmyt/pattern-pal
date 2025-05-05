'use client'
import React from "react"
import { Button } from "@mui/material"
import { AUTH_ENDPOINT } from "@/const/app.const"

export default function LoginPage() {
  const handleLogoutClick = async () => {
    return await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return <Button variant="outlined" onClick={handleLogoutClick}>Log out</Button>;
}