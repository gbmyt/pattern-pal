// "use client"
import { APP_BASE_URL, RAVELRY_API_URL } from "@/const/app.const";
import { Button, Typography } from "@mui/material"

const PUBLIC_ENDPOINT = "/fiber_attributes.json";

const fetchData = async () => {
    
    try {
        const res = await fetch(`${RAVELRY_API_URL}${PUBLIC_ENDPOINT}`)
        const data = await res.json()
        return data
    } catch (err: any) {
        console.error("Error from fetch", err.statusText, 'Error code: ', err.status)
    }
}

const Page = async () => {
    const data = await fetchData();
    return (
        <>
            <Typography component="h1">Fiber Attributes</Typography>
            {
                data && data.fiber_attributes.map((item: any) => {
                    return <Typography key={item.id}>{item.name}</Typography>
                })
            }
        </>
    )
}
export default Page