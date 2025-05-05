'use client'
import React from "react"
import { Button, Typography } from "@mui/material"
import { AUTH_ENDPOINT } from "@/const/app.const";

export default function LoginPage() {
  return <Button 
    variant="outlined" 
    component="a" 
    href={AUTH_ENDPOINT}
    >Log in with Ravelry</Button>;
}