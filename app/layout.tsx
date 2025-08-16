import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Suspense } from "react"

// Styles
import { Inter } from "next/font/google"
import "@/styles/globals.css"

// Components
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AiAssistant from "@/components/AiAssistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Pattern Pal - A Fiber Artist's Best Friend",
    description: "Create custom pixel grids, save and share them with friends!",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`light ${inter.className} max-w-screen`}>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <header className="w-screen">
                            <Header />
                        </header>
                    </Suspense>

                    <AiAssistant />
                    <div className="flex flex-row max-w-screen">
                        <div className="flex flex-col max-w-screen h-[calc(100vh-88px)]">
                            <main className="w-screen">
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
