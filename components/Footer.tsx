import Link from "next/link"
import siteMetadata from "@/data/siteMetadata"
import SocialIcon from "@/components/social-icons"

// TODO: Instead of rendering 2 separate lists, adjust styles to create
// new columns on the fly/as-needed/dynamically
const FOOTER_LINKS = {
    main: [
        { linkText: "About", href: "/about" },
        { linkText: "FAQ", href: "/faq" },
        { linkText: "Contact", href: "/contact" },
        { linkText: "Careers", href: "/careers" },
    ],
    secondary: [
        { linkText: "Contributors", href: "/contributors" },
        { linkText: "Terms of Service", href: "/terms" },
        { linkText: "Privacy Policy", href: "/privacy-policy" },
        { linkText: "Legal", href: "/legal" },

        // { linkText: "Help improve this page", href: "/feedback" },
    ],
}

function Footer() {
    return (
        <footer>
            <div className="flex flex-row mt-8 ml-32">
                <div className="my-8 mr-8">
                    {FOOTER_LINKS.main.map((link, index) => (
                        <a
                            className="flex text-xs my-2 text-gray-300 hover:text-purple-300"
                            href={link.href}
                            key={index}
                        >
                            {link.linkText}
                        </a>
                    ))}
                </div>
                <div className="my-8 mr-8">
                    {FOOTER_LINKS.secondary.map((link, index) => (
                        <a
                            className="flex text-xs my-2 text-gray-300
                            hover:text-purple-300"
                            href={link.href}
                            key={index}
                        >
                            {link.linkText}
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex flex-col items-center">
                {/* Social Icons/Links */}
                <div className="mb-3 flex space-x-4">
                    <SocialIcon
                        kind="mail"
                        href={`mailto:${siteMetadata.email}`}
                        size={6}
                    />
                    <SocialIcon
                        kind="github"
                        href={siteMetadata.github}
                        size={6}
                    />
                    <SocialIcon
                        kind="linkedin"
                        href={siteMetadata.linkedin}
                        size={6}
                    />
                </div>

                {/* Site References/Contributor Links */}
                <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="https://github.com/gbmyt">
                        {" "}
                        Gabriela Taylor
                    </Link>
                    <div>{` • `}</div>
                    <div>{`© ${new Date().getFullYear()}`}</div>
                    <div>{` • `}</div>
                    <Link href={siteMetadata.siteRepo}>
                        {siteMetadata.title}
                    </Link>
                </div>
                <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                    The content of this site is licensed under the MIT License.
                </div>
            </div>
        </footer>
    )
}

export default Footer
