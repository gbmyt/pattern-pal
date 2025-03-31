import { Button, Typography } from "@mui/material"

const getPatterns = async () => {
    const res = await fetch("http://localhost:3000/api/patterns", {
        method: "GET",
    })
    if (res.ok) {
        const data = res.json()
        console.log("res", data)
        return data
    } else return "there was a problem"
}

const Page = async () => {
    // const { data } = await getPatterns()
    return (
        <>
            <Typography>Patterns</Typography>
            <Button variant="outlined" component="a" href="/api/auth">Log in with Ravelry</Button>
        </>
    )
}
export default Page