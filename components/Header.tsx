"use client"
import links from "@/data/links"
import siteMetadata from "@/data/siteMetadata"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"
import SearchBarModal from "./SearchActive"
import { useSearch } from "@/hooks/useSearch"
import SideBar from "./SideBar"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
    const pathname = usePathname()
    const {searchOpen, setOpen} = useSearch();

    return (
        <header className="flex items-center justify-between p-4 pr-8 w-full">
            <SideBar />
            {/* <div>
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
            </div> */}

            <div style={{ position: "relative", zIndex: 1101 }}>
                {!searchOpen ? (
                    <SearchBar />
                ) : (
                    <SearchBarModal open={searchOpen} setOpen={setOpen} />
                )}
            </div>

            <div
                className="flex items-center leading-5 space-x-4 sm:space-x-6 relative z-1101"
                style={{ position: "relative", zIndex: 1101 }}
            >
                {links.headerNavLinks
                    .filter((link) => link.href !== "/")
                    .map((link: any) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.title}
                                href={link.href}
                                className={`${
                                    pathname === link.href
                                        ? "border-b-2 border-purple"
                                        : ""
                                } hidden sm:block font-medium text-gray-900`}
                            >
                                {Icon ? <Icon /> : <>{link.title}</>}
                            </Link>
                        )
                    })}
            </div>
        </header>
    )
}
export default Header
