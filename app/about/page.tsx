import { auth } from "@clerk/nextjs"
import { Typography } from "@mui/material"

const About = async () => {
    const { userId } = await auth()
    return (
        <div className="flex h-max flex-col items-center justify-between pr-24 py-24">
            <div className="max-w-5xl items-center text-sm pb-4 md:pb-0">
                <Typography fontWeight="bold" variant="h4">Heading</Typography>
                <p className="mb-14">
                    A fiber artist and garment designer&apos;s best friend! The
                    goal of this project is to make creating custom pixel-based
                    patterns fun and easy for fiber artists with a love of
                    crochet and/or knitting 🧶.
                </p>

                <Typography fontWeight="bold" variant="h5">Subheading</Typography>
                <p className="mb-14">
                    Use our chart editor to create a custom grid-based design by
                    hand, or import an existing grid & customize it to your
                    liking by making changes via the chart editor. Once
                    you&apos;re happy with the way your design looks, save it to
                    your account or share it with other crafters on Ravelry,
                    Instagram, or Facebook!
                </p>
                
                <Typography fontWeight="bold" variant="h5">Subheading</Typography>
                <p className="mb-14">
                    Irure excepteur do duis tempor proident proident. Dolor adipisicing voluptate veniam aliqua deserunt officia veniam amet consectetur amet culpa dolore excepteur laborum eiusmod. Consequat elit fugiat minim nostrud est dolor qui esse enim. Id nulla magna ea commodo laborum adipisicing ad eiusmod irure voluptate et et proident. Ad ea irure quis irure culpa ut in proident non. Id est irure ut ea magna amet deserunt dolore in ipsum. Irure culpa quis est est commodo incididunt est adipisicing incididunt sunt amet duis. Fugiat enim culpa proident commodo ex et anim sit pariatur commodo sunt mollit minim id. Eu sunt nulla ullamco reprehenderit labore. Exercitation mollit aliqua nostrud ullamco ut. Mollit tempor magna veniam labore cupidatat labore cillum do eiusmod veniam tempor do proident. Id ut anim aliqua deserunt proident reprehenderit culpa mollit eiusmod velit commodo commodo reprehenderit minim. Laboris eiusmod dolor duis nulla sit reprehenderit aliqua nisi aliqua.  Veniam ex minim reprehenderit dolore esse veniam quis pariatur veniam officia duis nulla. Enim aliquip sint voluptate aute non sit. Reprehenderit commodo nisi laborum consequat irure ullamco id duis adipisicing ipsum fugiat eiusmod. Consequat est commodo dolor laborum laboris id eiusmod et tempor magna non veniam minim voluptate. Ad nostrud proident anim velit ea velit veniam velit duis reprehenderit voluptate elit nostrud do. Nisi mollit pariatur consectetur sint duis dolor ex occaecat non Lorem duis ex minim reprehenderit. Fugiat cillum laborum fugiat eiusmod duis eu magna amet consectetur cillum pariatur culpa ipsum velit ea.
                </p>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                    id="editor-cta"
                    href="/editor"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mr-6"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Get Started{" "}
                        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span> */}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-25`}>
                        Create a grid
                    </p>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        View the Editor
                    </p>
                </a>

                <a
                    href="/templates"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mr-6"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Templates{" "}
                        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span> */}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-25`}>
                        Create a new chart from one of our templates
                    </p>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Coming Soon
                    </p>
                </a>

                <a
                    href={userId ? "/share" : "/new-user"}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mr-6"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Share{" "}
                        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span> */}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-25`}>
                        Share your designs with the community!
                    </p>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Coming Soon
                    </p>
                </a>

                <a
                    href={userId ? "/pricing" : "/new-user"}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mr-6"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Pricing{" "}
                        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span> */}
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-25`}>
                        Pricing details
                    </p>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Coming Soon
                    </p>
                </a>
            </div>
        </div>
    )
}

export default About
