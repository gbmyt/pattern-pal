import type { Metadata } from "next"
import { AppProps } from "next/app"
import { ClerkProvider } from "@clerk/nextjs"
import { Suspense } from "react"

// Styles
import { Inter } from "next/font/google"
import "@/styles/globals.css"

// Components
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SideBar from "@/components/SideBar"

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
                <body className={`light ${inter.className} max-w-screen`}>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <h1 className="w-screen">
                            <Header />
                            <hr />
                        </h1>
                    </Suspense>

                    <div className="flex flex-row max-w-screen">
                        <SideBar />

                        <div className="flex flex-col max-w-screen">
                            <main className="w-screen min-h-[900px]">
                                {children}
                            </main>

                            <Footer />
                        </div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
