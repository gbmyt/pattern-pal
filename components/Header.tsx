"use client"
import headerNavLinks from "@/data/headerNavLinks"
import siteMetadata from "@/data/siteMetadata"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
    const pathname = usePathname()

    return (
        <header className="flex items-center justify-between pb-10">
            <div>
                <Link href="/" aria-label={siteMetadata.headerTitle}>
                    <div className="flex items-center justify-between">
                        {typeof siteMetadata.headerTitle === "string" ? (
                            <div className="hidden h-6 text-2xl font-semibold sm:block">
                                {siteMetadata.headerTitle}
                            </div>
                        ) : (
                            siteMetadata.headerTitle
                        )}
                    </div>
                </Link>
            </div>

            <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
                {headerNavLinks
                    .filter((link) => link.href !== "/")
                    .map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className={`${
                                pathname === link.href
                                    ? "border-b-2 border-cyan-400"
                                    : ""
                            } hidden sm:block font-medium text-gray-900`}
                        >
                            {link.title}
                        </Link>
                    ))}
            </div>
        </header>
    )
}
export default Header
