"use client"
import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"

const PROJECTS_ENDPOINT = "/api/projects"

export default async function Page() {
    const [projects, setData] = useState<any[]>([])

    useEffect(() => {
        // Fetch data from the API route
        const fetchData = async () => {
            const response = await fetch(PROJECTS_ENDPOINT)
            const data = await response.json()
            setData([...data.projects])
        }
        fetchData()
    }, [])

    return (
        <>
            <Typography>Projects</Typography>
            {projects &&
                projects.map((project: any) => {
                    return (
                        <Typography key={project.name}>
                            {project.name}
                        </Typography>
                    )
                })}
        </>
    )
}
