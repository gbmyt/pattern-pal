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
    return <a href="/api/auth">Log in with Ravelry</a>
}
export default Page
