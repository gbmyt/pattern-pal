import { transitionStyles } from "@/data/styles"

const sideBarLinkStyles =
    "group rounded-lg border border-transparent first-letter:transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-sm p-4"

const SideBar = async () => {
    return (
        <div
            className={`absolute flex items-start translate-y-[10rem] transition-all ease-in-out duration-750" -translate-x-[85%] hover:translate-x-1`}
        >
            <div
                className={`flex flex-col h-fit min-w-max m-0 py-4 pl-4 pr-8 bg-opacity-100 bg-slate-800 rounded-md`}
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
        </div>
    )
}

export default SideBar
