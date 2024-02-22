const sideBarLinkStyles =
    "group rounded-lg border border-transparent first-letter:transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-sm p-4"

const SideBar = async () => {
    return (
        <div
            className={`absolute min-w-max m-0 py-4 pl-4 pr-8 opacity-0 hover:opacity-100`}
        >
            <a href="/editor">
                <h2 className={sideBarLinkStyles}>Chart Editor</h2>
            </a>

            <a href="/symbols">
                <h2 className={sideBarLinkStyles}>Chart Symbols</h2>
            </a>
            <a href="/dashboard">
                <h2 className={sideBarLinkStyles}>Dashboard </h2>
            </a>
            <a href="/templates">
                <h2 className={sideBarLinkStyles}>Templates </h2>
            </a>

            <a href="/community">
                <h2 className={sideBarLinkStyles}>Community </h2>
            </a>
        </div>
    )
}

export default SideBar
