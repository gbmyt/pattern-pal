"use client"
import { transitionStyles } from "@/data/styles"
import Image from "next/image"
import { Suspense } from "react"

type ContributorsType = {
    username: string
    github: string
    repository: string
    avatar_url: string
    contribution: string
}

function ContributorsList({
    contributors,
}: {
    contributors: ContributorsType[]
}) {
    return (
        <>
            <Suspense fallback={<h2>Loading...</h2>}>
                <div className="flex justify-center items-center w-fit">
                    {contributors &&
                        contributors.map((cb, index) => (
                            <a
                                key={index}
                                href={cb.repository ? cb.repository : cb.github}
                            >
                                <span className="inline-flex items-center">
                                    <Image
                                        className={`mx-4 rounded-full hover:scale-105 ${transitionStyles}`}
                                        src={cb.avatar_url && cb.avatar_url}
                                        width="100"
                                        height="100"
                                        alt="Profile pic"
                                    />{" "}
                                    |{" "}
                                    <span className="ml-4">
                                        {cb.contribution}
                                    </span>
                                </span>
                            </a>
                        ))}
                </div>
            </Suspense>
        </>
    )
}

export default ContributorsList
