import { auth } from "@clerk/nextjs"

const Main = async () => {
    const { userId } = await auth()
    return (
        <div className="flex h-screen flex-col items-center justify-between p-24">
            <div className="max-w-5xl items-center text-sm pb-4 md:pb-0">
                <p className="mb-14">
                    A fiber artist and garment designer&apos;s best friend! The
                    goal of this project is to make creating custom pixel-based
                    patterns fun and easy for fiber artists with a love of
                    crochet and/or knitting 🧶.
                </p>

                <p className="mb-14">
                    Use our chart editor to create a custom grid-based design by
                    hand, or import an existing grid & customize it to your
                    liking by making changes via the chart editor. Once
                    you&apos;re happy with the way your design looks, save it to
                    your account or share it with other crafters on Ravelry,
                    Instagram, or Facebook!
                </p>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                    href="/editor"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Get Started{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Check out the Chart Editor
                    </p>
                </a>

                <a
                    href="/faq"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        FAQ{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Learn about fiber arts and how to make patterns of your
                        own!
                    </p>
                </a>

                <a
                    href="/templates"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Templates{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
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
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Share{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-25`}>
                        Share your designs with the community!
                    </p>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Coming Soon
                    </p>
                </a>
            </div>
        </div>
    )
}

export default Main
