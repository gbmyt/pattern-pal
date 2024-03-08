import ContributorsList from "@/components/ContributorsList"
import Image from "next/image"

async function fetchData(username: string) {
    return await fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((res) => {
            return res.avatar_url
        })
}

const contributors = [
    {
        username: "marnen",
        avatar_url: "",
        github: `https://github.com/marnen`,
        repository: `https://github.com/marnen/knitting_symbols`,
        contribution: "Japanese Knit Symbol Images",
    },
]

async function Page() {
    await contributors.forEach(async (contributor) => {
        contributor.avatar_url = await fetchData(contributor.username)
    })

    return (
        <div className="ml-24 my-8">
            <h1 className="font-semibold text-lg mb-8">
                Check out our Contributors
            </h1>
            <ContributorsList contributorsList={contributors} />
        </div>
    )
}

export default Page
