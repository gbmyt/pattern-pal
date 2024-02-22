"use client"
import links from "@/data/links"
import siteMetadata from "@/data/siteMetadata"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
    const pathname = usePathname()

    return (
        <header className="flex items-center justify-between p-4 w-full">
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
                {links.headerNavLinks
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

                <SignedIn>
                    {/* Mount the UserButton component */}
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                    {/* Signed out users get sign in button */}
                    <div className="sm:block font-medium">
                        <SignInButton />
                    </div>
                </SignedOut>
            </div>
        </header>
    )
}
export default Header
