"use client"
import { transitionStyles } from "@/data/styles"
import Image from "next/image"
import { Suspense, useEffect, useState } from "react"

type ContributorsType = {
    username: string
    github: string
    repository?: string
    avatar_url: string
    contribution: string
}

function ContributorsList({
    contributorsList,
}: {
    contributorsList: ContributorsType[]
}) {
    const [contributors, setCB] = useState<ContributorsType[]>([])

    useEffect(() => {
        contributorsList && setCB(contributorsList)
    }, [contributorsList])

    return (
        <>
            <Suspense fallback={<h2>Loading...</h2>}>
                <div className="flex flex-col">
                    {contributors &&
                        contributors.map((cb, index) => (
                            <a
                                key={index}
                                href={cb.repository ? cb.repository : cb.github}
                            >
                                <span className="inline-flex items-center my-2">
                                    <Image
                                        className={`mx-4 rounded-full hover:scale-105 ${transitionStyles}`}
                                        src={cb.avatar_url && cb.avatar_url}
                                        width="100"
                                        height="100"
                                        alt="Profile pic"
                                    />{" "}
                                    {cb.contribution && (
                                        <span className="ml-4">
                                            | {cb.contribution}
                                        </span>
                                    )}
                                </span>
                            </a>
                        ))}
                </div>
            </Suspense>
        </>
    )
}

export default ContributorsList
