import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "@/styles/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { AppProps } from "next/app"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Pattern Pal - A Fiber Artist's Best Friend",
    description: "Create custom pixel grids, save and share them with friends!",
}

export default function RootLayout({
    children,
    pageProps,
}: {
    pageProps: AppProps
    children: React.ReactNode
}) {
    return (
        <ClerkProvider {...pageProps}>
            <html lang="en">
                <body className={`${inter.className} pb-10`}>
                    <div className="flex h-screen flex-col">
                        <Header />
                        <hr />
                        <main>{children}</main>
                        <Footer />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
